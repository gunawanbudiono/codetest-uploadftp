var Booking={
    eventId         :   null,
    me              :   true,    
    tickets         :   [],
    persons         :   [],
    on_order        :   [],
    subTotal        :   0,
    grandTotal      :   parseFloat(0),
    total_amount    :   0,
    maxPerTicket    :   4,
    payment_method  :   'S01.MPY.1701.0000001',//set default to manual transfer
    charge_bank_percent     :   0,//if user use credit card
    charge_bank_amount     :   0,//if user use credit card
    charge_vendor_fee   :   0,//kita bayar vendor untuk service payment gateway * if user use it
    qty             :   0,    
    AllowedAdd      :   true,
    gender          :   1,
    init            :   function(){
        
        var $this=this;                                    
                
        $this.setDefault();
        $this.handler();     
                                                
    },
    setDefault : function(){
        var $this = this;
        /*
        window.onbeforeunload = function () {
            var a=1;
            if (a) {
                return "If you reload this page, your previous action will be repeated";
            } else {
                return "";
            }
        }
        */
        
        $('.timer-minute').text(Global.minuteBooking);
        $('.timer-second').text(Global.minuteBooking);
        
        var dob ='2017-01-01';
                
        
        Global.setDate('.js-opt-date-birth',Global.extractDate(dob)['tanggal']);
        Global.setMonth('.js-opt-month-birth',Global.extractDate(dob)['bulan']);
        Global.setYear1('.js-opt-year-birth',Global.extractDate(dob)['tahun']);
       
        Global.setCookie('onBooking',1);        
                        
       
       // Booking Steps
        $("#wizard").steps({
            headerTag: "h2",
            bodyTag: "section",
            transitionEffect: "slideLeft"
        });            
        
        $('.img-loader').hide();
                
    },       
    _findLastRecord :function(){
        var $this = this;
        if(this.me || Global.getCookie('myId') !='null'){
            $('.js-txt-fullname-booking').val(Global.getCookie('myFirstName'));
            $('.js-txt-email-booking').val(Global.getCookie('myEmail'));
            $('.js-txt-fullname-itembooking').eq(0).val($('.js-txt-fullname-booking').val());
            $('.js-txt-email-itembooking').eq(0).val($('.js-txt-email-booking').val());
        }
        
        $this.setParam();
        
    },
    setTicketOnOrder :   function(){
        var $this = this;
        var el="";
        var selected="";
        var disabled="";
        
        $this.setTickets(); //re-update ticket order
        $this.on_order=[];
        
        $.each($this.tickets,function(i,e){
            if(i!=(i-1)){
                $this.on_order.push({code : e.i_ticket,ticket:e.ticket_name,price:e.ticket_price});
            }
        });
        
        
        if($this.on_order.length > 0){
            
            for(var i=0;i < $this.on_order.length;i++){             
                
                el+="<option value='"+$this.on_order[i]['code']+"' data-qty='1' data-price='"+$this.on_order[i]['price']+"' "+selected+"  data-type='"+$this.on_order[i]['ticket']+"'>";
                    el+=$this.on_order[i]['ticket'];
                el+="</option>";
                
            }
           
            if($this.on_order.length ==1){
                
                $('.js-opt-ticket-itembooking').attr('disabled','disabled');                                            

            }
            
            
        }                          
                       
        $('.js-opt-ticket-itembooking').empty().html(el);
        $this.setParam();
                                    
    },        
    countInvoice    :   function(){
        
        var $this = this;   
        var subTotal=0;        
        var totalQty=0;
                        
                
        for(var i = 0;i < $('.js-txt-price').length;i++){            

            var total = parseInt($('.js-txt-price').eq(i).val()) * parseInt($('js-txt-qty').eq(i).val());
            var qty =  parseInt($('js-txt-qty').eq(i).val());
            
            //for display in format 
            total1 = total.formatMoney();
           
            $('.js-txt-total').eq(i).text(total1);
                       
            subTotal+=total;
            totalQty+=qty;
        }

        $('#js-txt-subtotal').text(subTotal.formatMoney());
        $('#js-txt-grandtotal').text(subTotal.formatMoney());

        //tab 2

        $('#txtQty').text(totalQty);

        $('#txtTotal1').text(subTotal.formatMoney());
        $('#txtSubTotal1').text(subTotal.formatMoney());
        $('#txtGrandTotal1').text(subTotal.formatMoney());

        $this.total_amount = subTotal;
                    
    },
    setTickets   :   function(){
        
        var $this = this;
        var a = $('.js-txt-qty');
        
        $this.tickets=[];
                
        for(var i=0;i< a.length;i++){
            
            if(a.eq(i).val() != 0){
                                
                $this.tickets.push({
                    i_ticket        :   $('.js-txt-code-ticket').eq(i).val(),
                    ticket_name     :   $('.js-txt-ticket-name').eq(i).val(),                    
                    ticket_price    :   $('.js-txt-price').eq(i).val(),
                    ticket_currency :   $('.js-spn-ticket-currency  ').eq(i).text(),                    
                    qty             :   a.eq(i).val(),                    
                    ori_price       :   $('.js-txt-price-original').eq(i).val(),
                    discount        :   $('.js-txt-price-discount').eq(i).val(),
                    is_free         :   $('.js-txt-isfree').eq(i).val()==""?0:$('.js-txt-isfree').eq(i).val(),
                    is_promo        :   $('.js-txt-ispromo').eq(i).val()==""?0:$('.js-txt-ispromo').eq(i).val(),
                    is_earlybird    :   $('.js-txt-isearlybird').eq(i).val()==""?0:$('.js-txt-isearlybird').eq(i).val(),
                });
            }
            
        }
        
        console.table($this.tickets);
        
        
    },    
    handler :   function(){
        var $this=this;
                
        Global.iCheck();
                
                
        $this._callOrderManager();
        
        $.each($('.js-opt-gender'),function(i,e){
            
            $(e).off().on('ifChanged', function(event){
                                
                $this.gender= event.target.value;                

            });

        });
        
        $('.js-opt-region').off().change(function(){
                       
            var code = $(this).find(":selected").val(); 
            
            console.log("Selected region: "+code);
            
            Region.getById(Global.b64EncodeUnicode(code),function(){

                Region.render('.js-opt-subregion',null,function(){
                    
                    
                    
                });

            });


        });
        
        
        //STEP 1
        $.each($('.js-btn-plus'),function(i,e){
            
            $(e).off().on('click',function(){
                
                var a = parseInt($('.js-txt-qty').eq(i).val());
                var b = parseInt(0);
                var total = 0;
                var max=$('.js-txt-sisa-ticket').eq(i).val();
                
                b=parseInt(a)+1;
                //set max limit based on available ticket
                
                if(b <= max){
                    
                    total+=parseInt($('.js-txt-price').eq(i).val())*b;

                    $('.js-txt-qty').eq(i).val(b); //qty


                    $('.js-txt-total').eq(i).val(total);
                    $('.js-txt-total-format').eq(i).text(total.formatMoney());


                    $this._callOrderManager();
                    
                }else{
                    
                    //booking qty is out of limit
                    $(e).attr('disabled','disabled');
                    Component.create.jbox.notif('Opps...','Jumlah booking melebihi Maximum Quantity',false);
                    
                }
                
            });
            
        });
        
        $.each($('.js-btn-min'),function(i,e){
            
            $(e).off().on('click',function(){
                
                var a = parseInt($('.js-txt-qty').eq(i).val());
                var b = parseInt(0);
                var total = 0;
                b=parseInt(a)-1;
                
                total+=parseInt($('.js-txt-price').eq(i).val())*b;                                
                
                $('.js-btn-plus').removeAttr('disabled');
                
                if(a > 0){
                    
                    $('.js-txt-qty').eq(i).val(b);
                    
                    console.log('triggered : '+total);
                    
                    $('.js-txt-total').eq(i).val(total);
                    $('.js-txt-total-format').eq(i).text(total.formatMoney());
                    
                    $this._callOrderManager();
                                        
                    console.table($this.tickets);
                }
                                                                                
            
            });
            
        });                                  
              
              
        //STEP 2
        //billing detail                
        $($('.js-chk-joiner')).off().on('ifChanged', function(event){

            if(event.target.checked){

                $this.me=false;
                
                $('.js-txt-fullname-itembooking').eq(0).val('');
                $('.js-txt-email-itembooking').eq(0).val('');                

            }else{

                $this.me=true;
                $('.js-txt-fullname-itembooking').eq(0).val($('.js-txt-fullname-booking').val());
                $('.js-txt-email-itembooking').eq(0).val($('.js-txt-email-booking').val());
            }
            
            

        });                            
                                    
        $('.js-txt-fullname-booking').keyup(function(){
            if($this.me){
                $('.js-txt-fullname-itembooking').eq(0).val($(this).val());
            }
            
        }).change(function(){
            if($this.me){
                
                $('.js-txt-fullname-itembooking').eq(0).val($(this).val());
            }            
        });
        
        $('.js-txt-email-booking').keyup(function(){
            if($this.me){
                $('.js-txt-email-itembooking').eq(0).val($(this).val());
                
            }            
        }).change(function(){
            if($this.me){
                
                $('.js-txt-email-itembooking').eq(0).val($(this).val());
            }            
        });
                                                
        
        //STEP 3
        $('.book-now-next').off().on('click',function(){                        
            
            $('#finishModal').modal({backdrop: 'static', keyboard: false}).on('shown.bs.modal', function(e) {
                
                    $this.setParam();
                    
                    $('.js-btn-confirm-booking').off().on('click',function(){
                        var o=$(this);
                        
                        $('.js-div-cont-progress').fadeIn();
                        
                        Global.prepareBtnPost(o);
                        
                        $this.validateBooking(function(){
                            
                        });                        

                        return false;
                    })
                   
            }).on('hidden.bs.modal', function(e) {



            });
           
        });
                
        
        //confirm booking
        $.each($(".js-payment_method"),function(i,e){
            
            $(e).off().on('ifChanged', function(event){

            
                $this.payment_method = event.target.value;
                
                console.log('Cara pembayaran: '+$this.payment_method);                
                
                var charge_bank_percent = parseFloat($(".js-payment_method").eq(i).data('bank_fee'));
                $this.charge_bank_percent = charge_bank_percent;
                console.log('Biaya bank: '+$this.charge_bank_percent); //persentage
                
                var charge_vendor_fee= parseFloat($(".js-payment_method").eq(i).data('vendor_fee'));
                $this.charge_vendor_fee= charge_vendor_fee;
                console.log('Biaya pihak ketiga: '+$this.charge_vendor_fee);
                
                $('.js-spn-bank-charge').text(" "+$this.charge_bank_percent+"%");
                
                Booking.setParam();

            }); 
        });
                
        
        
    },    
    countFormDelegate : function(){
        var $this = this;        
                
        $this.qty = 0;
        
        $('.js-txt-qty').each(function(i,e){ 
            
            $this.qty += parseInt($(e).val());                        
            
            /*
            if($('.qty').eq(i).val() > $this.maxPerTicket){ //limit for user book ticket
                
                $('.qty').eq(i).val($this.maxPerTicket);
                $('.qtyyplus').eq(i).attr('disabled','disabled');
                
                Component.create.notify('Opps','Maximum Ticket that you can book is '+$this.maxPerTicket,true);
                
                $this.AllowedAdd = false;
                $this.countInvoice();
                
            }else{
                
                $('.qtyyplus').eq(i).removeAttr('disabled');            
                $this.AllowedAdd = true;
                
            }
            */
        });
                                            
        
        if($this.qty > 0 && $this.AllowedAdd){
            
            $('#formPerson').empty();
            
            for(var a=0;a < $this.qty;a++){

                $('#formPerson').append($this.setForm());
                
                if($('#txtFullName').val() != ""){
                    
                    if($this.me){
                        
                        $('.txtPersonName').eq(0).val($('#txtFullName').val());
                        $('.txtPersonEmail').eq(0).val($('#txtEmail').val());
                        
                    }
                }
            }
            
        }else{
            
            //Component.create.notify('Opps..','Pilih minimal 1 tiket!',true);
            
        }
                
        $this.setTicketOnOrder();
                                        
    },
    _callOrderManager  :   function(){
        
        var $this = this;
        var totalQty=0;
        var totalRupiah=parseInt(0);
        
        $.each($('.js-txt-qty'),function(i,e){
            
           totalQty+=parseInt($(e).val());
           $('.js-txt-sum').text(totalQty);
           $this.qty = totalQty;
           
        });
        
        $.each($('.js-txt-total'),function(a,b){
            
            totalRupiah+=parseInt($(b).val());
            
            $('.js-txt-subtotal').text(totalRupiah.formatMoney());
            $('.js-txt-grandtotal').text(totalRupiah.formatMoney());

            $('#js-summary-total').text(totalRupiah.formatMoney());
            $('#js-summary-subtotal').text(totalRupiah.formatMoney());
            $('#js-summary-grandtotal').text(totalRupiah.formatMoney());
            
            $this.subTotal = totalRupiah;
            $this.grandTotal = totalRupiah;
            $this.total_amount = totalRupiah;
        
        });
                        
        
        $this.setForm(function(){}); //re-update form
        $this.setTicketOnOrder();//re-update order
                                
    },
    checkParam   :   function(){ //userd for step.js
        var $this = this;
        var match=true;
                
        $('#js-form-booking').parsley('validate');

        if($('#js-form-booking').parsley('isValid')){
            for(var i=0;i < $('.js-txt-fullname-itembooking').length;i++){
                if($('.js-txt-fullname-itembooking').eq(i).val()==""){
                    match = false;
                }
            }

            for(var i=0;i < $('.js-txt-email-itembooking').length;i++){
                if($('.js-txt-email-itembooking').eq(i).val()==""){
                    match = false;
                }
            }        
            
            $this.setParam();
            
        }else{
            return
        }
                
                                                        
        return match;
    },    
    setForm   :   function(f){
        
        var $this=this;
        
        return Render.booking.formTicket('#js-form-booking-list',$this.qty,f);
        
    },    
    pushPerson  :   function(f){
        
        var $this=Booking;
        var is_booker=0; 
        var idr= $('.js-spn-ticket-currency').eq(0).text();
        var n=1;
        var el="";        
        
        $this.persons = [];                                       
                
        $this.grandTotal=0;
        
        if($('.js-txt-fullname-itembooking').length > 0){
            for(var i=0;i < $('.js-txt-fullname-itembooking').length;i++){
                if($this.me){
                    if($('.js-txt-fullname-itembooking').eq(0).val() == $('.js-txt-fullname-booking').val()){
                        is_booker=1;
                    }
                }
                                
                
                $this.persons.push({
                    ticket      :   $('.js-opt-ticket-itembooking').eq(i).val(),
                    ticket_name :   $('.js-opt-ticket-itembooking').eq(i).find(':selected').text(),
                    ticket_price:   parseFloat($('.js-opt-ticket-itembooking').eq(i).find(':selected').data('price')),
                    person      :   $('.js-txt-fullname-itembooking').eq(i).val(),
                    email       :   $('.js-txt-email-itembooking').eq(i).val(),
                    is_booker   :   is_booker,
                    booked_by  :   $('.js-txt-fullname-booking').val(),
                    email_booker:   $('.js-txt-email-booking').val()
                });
                                
                                
                $this.grandTotal+=$('.js-opt-ticket-itembooking').eq(i).find(':selected').data('price');
                
                
            }
                   
            $('.js-spn-name-confirm').text($('.js-txt-fullname-booking').val());
            $('.js-spn-email-confirm').text($('.js-txt-email-booking').val());
            $('.js-spn-phone-confirm').text($('.js-txt-areacode').val()+$('.js-txt-phone-booking').val());
            $('.js-spn-address-confirm').text($('.js-txt-address-booking').val());        
            $('.js-spn-country-confirm').text($('#js-opt-country').find(":selected").text());        
            $('.js-spn-region-confirm').text($('#js-opt-region').find(":selected").text());
            $('.js-spn-subregion-confirm').text($('#js-opt-subregion').find(":selected").text());
            
            if($this.persons.length > 0){                         

                $.each($this.persons,function(i,e){

                    el+="<tr>";
                        //el+="<td>"+n+"</td>";
                        el+="<td style='text-align:center;'>"+e.person+"</td>";
                        el+="<td style='text-align:center;'>"+e.ticket_name+"</td>";
                        el+="<td style='text-align:center;'>1</td>";
                        el+="<td style='text-align:right;'>"+idr+" "+parseFloat(e.ticket_price).formatMoney()+"</td>";
                    el+="</tr>";

                    n++;

                });
        
        
                el+="<tr>";
                   // el+="<td></td>";


                    el+="<td></td>";
                    el+="<td></td>";
                 
                    el+="<td style='text-align:center;'>Biaya transaksi Kartu Kredit <br /> <div class='text-label'><small>(3,2% + IDR 2.750,-)</small></div></td>";
                    el+="<td style='text-align:right;'>"+idr+" <span id='js-summary-bank-charge'>0</span></td>";
                el+="</tr>";
                el+="<tr>";
                    //el+="<td></td>";
                    el+="<td></td>";
                    el+="<td></td>";
                    el+="<td style='text-align:center;'>TOTAL</td>";
                    el+="<td style='text-align:right;'>"+idr+" <span id='js-summary-grandtotal'>0</span></td>";
                el+="</tr>";

                $('.js-div-list-confirm-order').empty().html(el);

            }
        }
                
         
    },    
    getStepValidationForBooking   :   function(p,f){
        var $this = this;                
                
        $.ajaxSetup({

            headers: Request.headers

        });                  

        $.ajax({
            xhr: function() {
                var xhr = new window.XMLHttpRequest();
                
                xhr.upload.addEventListener("progress", function(evt){
                    if (evt.lengthComputable) {
                        var percentComplete = evt.loaded / evt.total;
                        
                        console.log(percentComplete);
                    }
               }, false);

               // Download progress
               xhr.addEventListener("progress", function(evt){
                   if (evt.lengthComputable) {
                       var percentComplete = evt.loaded / evt.total;
                       // Do something with download progress
                       console.log(percentComplete);
                   }
               }, false);

               return xhr;
            },
            type        :   'POST',
            url         :   p.url,
            data        :   Global.param,
            dataType    :   'json',
            async: true,
            beforeSend  :   function(){

                Global.cekConsole();
                
                Component.create.progress({
                   title       :   'Sedang memproses..',
                    appendTo   :   '.js-div-cont-progress'

                },function(){

                    Global.showProgressBar();

                });

            },
            statusCode: {
                200: function (r) {

                    $('#prg_bar').css({
                        width   :   "100%"
                    });


                    if(r.status==0){

                        $.each(r.data.error,function(i,e){
                           Global.errors.push(e);
                           Global.displayErrors('#div_cont_error_validation');                               
                        });

                    }
                    
                    f();
                    
                },
                201: function (r) {

                },
                400: function (r) {

                },
                404: function (r) {

                },
                500: function (r){
                    
                    Component.create.jbox.notif('Opps..','Cek koneksi internet Anda!',true);
                    
                    
                }
            },
            success :   function(r){

                Request.response=r;  

                Global.cekConsole();                               
            }

        });
    },                
    validateBooking    :   function(f){
        var $this = this;

        Global.errors=[];
                

        $('.js-div-cont-error-validation').empty();
        

        Booking.getStepValidationForBooking({
             id      :   null,
             step    :   1,
             url     :   Request.Booking.postMember(),
             title   :   'Cek akun..'
         },function(){

             Booking.getStepValidationForBooking({
                 id      :   null,
                 step    :   2,
                 url     :   Request.Booking.postBooking(),
                 title   :   'Cek tiket yang tersedia..'   
             },function(){

                 //response data
                 Global.param.i_user = Request.response.data[0].i_user;
                 Global.param.book_cd = Request.response.data[0].code;                    
                 Global.param.usr_tkn = Request.response.data[0].my_token;                    


                 Booking.getStepValidationForBooking({
                     id      :   null,
                     step    :   3,
                     url     :   Request.Booking.postInvoice(),
                     title   :   'Membuat tagihan..'
                 },function(){

                     Global.param.i_invoice = Request.response.data[0].code;
                     Global.param.book_cd = Request.response.data[0].i_booking;


                     Booking.getStepValidationForBooking({
                         id      :   null,
                         step    :   4,
                         url     :   Request.Booking.postInvoiceItems(),
                         title   :   'Memasukkan data tagihan..'   
                     },function(){

                         Booking.getStepValidationForBooking({
                             id      :   null,
                             step    :   4,
                             url     :   Request.Booking.postBookingItems(),
                             title   :   'Memasukkan data pesanan..'   
                         },function(){                             

                             //if ok send email to user
                             var id =Request.response.data[0].id;
                             var title =Request.response.data[0].title;
                             var code =Request.response.data[0].code;                             
                             var email = Global.getCookie('myEmail');
                            
                                //share to medsos
                             var url = "https://www.facebook.com/sharer.php?t=ev-class&u="+encodeURIComponent(Global.BASE_URL()+"/class/"+title+"-"+id);
                             window.open(url, '_blank', 'toolbar=0,location=0,menubar=0');                                        
                             
                             setTimeout(function(){
                                 window.location.href=Global.BASE_URL()+"booking-summary/"+Global.b64EncodeUnicode(code+"|"+email);
                             },'500');
                             

                             

                         });

                     });

                 });


             });

         });

        f();
                                                
        },
    post    :   function(f){
        
        var $this = this;                
                        
        $.ajaxSetup({

            headers: Request.headers

        });  

        $.ajax({
            type        :   'post',
            url         :   Request.Booking.post(),
            dataType    :   'json',
            data        :   Global.param,
            beforeSend  :   function(){

                Global.cekConsole();
                               
            },
            statusCode: {
                200: function (r) {

                },
                201: function (r) {

                },
                400: function (r) {

                },
                404: function (r) {

                },
                500: function (r) {

                }
            },
            success :   function(r){

                Request.data=r.data;  

                Global.cekConsole();                    

                f();                                                
                
            }

        });
    },
    get    :   function(id,f){
        
        var $this = this;                
                        
        $.ajaxSetup({

            headers: Request.headers

        });  

        $.ajax({
            type        :   'get',
            url         :   Request.Booking.get(id),
            dataType    :   'json',
            data        :   Global.param,
            beforeSend  :   function(){

                Global.cekConsole();

            },
            statusCode: {
                200: function (r) {
                                                            
                },
                201: function (r) {

                },
                400: function (r) {

                },
                404: function (r) {

                },
                500: function (r) {

                }
            },
            success :   function(r){

                Request.data=r;  

                Global.cekConsole();                    

                f();
            }

        });
    },
    setParam    :   function(){
        var $this = this;
        
        $this.setTickets();
        $this.pushPerson();
        
        var charge_bank_amount=(parseFloat($this.total_amount) * parseFloat($this.charge_bank_percent))/100;
        var subtotal_amount=parseFloat($this.total_amount);
        var total_amount=parseFloat($this.total_amount+charge_bank_amount);
                
        
        console.log("Biaya bank: "+charge_bank_amount);
        console.log("Total biaya: "+total_amount);
        
        $('.js-summary-bank-charge').text(charge_bank_amount.formatMoney());
        $('.js-summary-grandtotal').text(total_amount.formatMoney());
        
        $('#js-summary-bank-charge').text(charge_bank_amount.formatMoney());
        $('#js-summary-grandtotal').text(total_amount.formatMoney());
        
        var lahir = $('.js-opt-year-birth').find(":selected").val();
        lahir = lahir +"-"+ $('.js-opt-month-birth').find(":selected").val();
        lahir = lahir +"-"+ $('.js-opt-date-birth').find(":selected").val();
                
        Global.param={                        
            i_app               :   Global.AppId,
            i_user              :   Global.param.i_user,
            i_country           :   $('#js-opt-country').find(":selected").val(),
            i_region            :   $('#js-opt-region').find(":selected").val(),
            i_subregion         :   $('#js-opt-subregion').find(":selected").val(),
            i_global_code       :   'S01.COD.1701.0000001',
            i_event             :   $('.js-txt-code-event').val(),
            i_pym_mthd          :   $this.payment_method,
            i_pym_mthd_name     :   $(".js-payment_method").data('selected'),
            i_pym_sts           :   'S01.PYS.1701.0000001',
            identity_type       :   $('.js-opt-identity-type').find(":selected").val(),
            identity_number     :   $('.js-txt-identity').val(),
            dob                 :   lahir,
            gender              :   $this.gender,
            fullname            :   $('.js-txt-fullname-booking').val(),
            email               :   $('.js-txt-email-booking').val(),
            address             :   $('.js-txt-address-booking').val(),
            phone               :   $('.js-txt-areacode').val()+""+$('.js-txt-phone-booking').val(),                                    
            postcode            :   $('.js-txt-poscode-booking').val(),
            description         :   $('.js-spn-event-name').text(),
            currency            :   $('.js-spn-ticket-currency').eq(0).text(),            
            charge_bank_percent :   $this.charge_bank_percent,
            charge_bank_amount  :   charge_bank_amount, //hitung dulu
            charge_vendor_fee   :   $this.charge_vendor_fee,
            unit_amount         :   $this.subTotal,//sub total before extra charge
            total_amount        :   total_amount,
            persons             :   $this.persons,
            tickets             :   $this.tickets,            

        }                 
        
        
        Global._setBrowserActivity('event_booking',Global.param.i_event);
        
    }
}