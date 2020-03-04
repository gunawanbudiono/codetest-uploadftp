var Invoices={    
    init            :   function(){
        
        var $this=this;
                 
        $this.handler();
        
    },       
    handler :   function(){
        var $this=this;
        
        Global.prepareUpload(null);
        
        $(".paymentConfirmation").click(function(){
            
            $this.confirmation.setProperty();
            
            $("#modal-payment-confirmation").modal('show');
        });
        
        Payment.get(function(){
            Payment.render('#optPaymentMethod',$('#txtHiddenPaymentMethod').val(),function(){});
        });
        
        Bank.get(function(){
            Bank.render('#optBankAccount',function(){});
        });
        
        $('#btnMakePayment').off().on('click',function(){
            
            $('#form-payment').parsley('validate');
                
            if($('#form-payment').parsley('isValid')){
                
                $this.setParam();
                
                Payment.post(function(){
                    window.location.href=Global.BASE_URL()+"invoice/"+Global.b64EncodeUnicode($('#txtInvoiceNo').val())
                });
                
            }else{
                
                Component.create.notify('Opps..','Anda harus mengisi!',true);
                
            }
            
            
            return false;
            
        });
        
    },
    confirmation   :   {
        setProperty:function(m,p){
            
            if(m == undefined){
                                    
                var amount = $('#txtHiddenAmount').val();                
                
                $('#txtDueDate').val($('#txtHiddenDueDate').val());            
                $('#txtInvoiceNo').val($('#txtHiddenInvoiceId').val());
                $('#txtAmount').val(parseFloat(amount).formatMoney());
                $('#txtCurrency').val($('#txtHiddenCurrency').val());
                
            }else{
                               
                $('#txtDueDate').val(p.due_date);            
                $('#txtInvoiceNo').val(p.code);
                $('#txtAmount').val(p.amount.formatMoney());
                $('#txtCurrency').val(p.currency);
                
            }
            
        },
    },
    renderInvoiceSummary    :   function(p){
        var $this = this;
        var el="";
        
        el+="<div class='panel-group' id='accordion'>";
            el+="<div class='panel panel-default'>";
                el+="<div class='panel-heading'>";
                    el+="<div class='row'>";
                        el+="<div class='col-sm-12'>";
                            el+="<h4 class='panel-title'>";
                                el+="<div class='title-form-order-details'>";
                                    el+="DETAIL INVOICE";
                                el+="</div>";
                            el+="</h4>";
                        el+="</div>";
                    el+="</div>";
                el+="</div>";
                el+="<div class='panel-collapse collapse in'>";
                    el+="<div class='panel-body'>";
                        el+="<div class='tab-content'>";
                            el+="<div class='tab-pane fade in active'>";
                                el+="<div class='wrapper-detail-purchase-ticket'>";

                                    el+="<div class='row'>";
                                        el+="<div class='col-sm-6'>";
                                            el+="<div class='bio-order'>";
                                                el+="<div class='row margin-bio-order'>";
                                                    el+="<div class='col-sm-3'>";
                                                        el+="Name <div class='icon-title'> : </div>";
                                                    el+="</div>";
                                                    el+="<div class='col-sm-6'>";
                                                        el+=p.fullname;
                                                    el+="</div>";
                                                el+="</div>";
                                                el+="<div class='row margin-bio-order'>";
                                                    el+="<div class='col-sm-3'>";
                                                        el+="Address <div class='icon-title'> : </div>";
                                                    el+="</div>";
                                                    el+="<div class='col-sm-6'>";
                                                        el+=p.address;
                                                    el+="</div>";
                                                el+="</div>";
                                                el+="<div class='row margin-bio-order'>";
                                                    el+="<div class='col-sm-3'>";
                                                        el+="Email <div class='icon-title'> : </div>";
                                                    el+="</div>";
                                                    el+="<div class='col-sm-6'>";
                                                        el+=p.email;
                                                    el+="</div>";
                                                el+="</div>";
                                                el+="<div class='row margin-bio-order'>";
                                                    el+="<div class='col-sm-3'>";
                                                        el+="Phone <div class='icon-title'> : </div>";
                                                    el+="</div>";
                                                    el+="<div class='col-sm-6'>";
                                                        el+=p.phone;
                                                    el+="</div>";
                                                el+="</div>";
                                                el+="<div class='row margin-bio-order'>";
                                                    el+="<div class='col-sm-3'>";
                                                        el+="Status Payment <div class='icon-title'> : </div>";
                                                    el+="</div>";
                                                    el+="<div class='col-sm-6'>";                                                                    
                                                        el+="<b id='statusBayar'>"+p.payment_status+"</b>";
                                                    el+="</div>";
                                                el+="</div>";
                                            el+="</div>";
                                        el+="</div>";
                                        el+="<div class='col-sm-6'>";
                                            el+="<div class='order-no'>No. #"+p.code+"</div>";
                                        el+="</div>";
                                    el+="</div>";

                                    el+="<div class='line-bio-order'></div>";

                                    el+="<div class='row mobile-row-disable'>";
                                        el+="<div class='col-sm-6'>";
                                            el+="<div class='title-row-th'>Events</div>";
                                        el+="</div>";
                                        el+="<div class='col-sm-6'>";
                                            el+="<div class='row'>";
                                                el+="<div class='col-sm-3'>";
                                                    el+="<div class='title-row-th'>Ticket</div>";
                                                el+="</div>";
                                                el+="<div class='col-sm-3'>";
                                                    el+="<div class='title-row-th'>Price</div>"; 
                                                el+="</div>";
                                                el+="<div class='col-sm-3'>";
                                                    el+="<div class='title-row-th'>Qty</div>";
                                                el+="</div>";
                                                el+="<div class='col-sm-3'>";
                                                    el+="<div class='title-row-th'>Total</div>";
                                                el+="</div>";
                                            el+="</div>";
                                        el+="</div>";
                                    el+="</div>"; 
                                    el+="<div class='events-book'>";
                                        el+="<div class='row'>";

                                            el+="<div class='col-sm-6'>";
                                            
                                                el+="<div class='row'>";                                            

                                                        el+="<div class='col-sm-3'>";
                                                        
                                                            el+="<img src='"+Global.CDN()+"images/events/cover/"+p.ev_images+"'  class='img-events-book'>";                                                                            
                                                            
                                                        el+="</div>";
                                                        
                                                        el+="<div class='col-sm-8'>";
                                                           el+="<div class='events-book-date'>";

                                                           el+="</div>";
                                                           el+=p.ev_name;
                                                           
                                                        el+="</div>";

                                                el+="</div>";
                                                
                                            el+="</div>";

                                            el+="<div class='col-sm-6' style='font-size:10px;'>";
                                                
                                                if(p.items.length > 0){
                                                    var total=0;
                                                el+="<div class='row' style='font-size:10px;'>";
                                                    
                                                    $.each(p.items,function(i,e){
                                                        var amount=parseFloat(e.amount);
                                                        
                                                        total+=parseInt(e.amount);
                                                        
                                                        el+="<div class='col-sm-3'>";
                                                            el+="<div class='title-row-td title-row-td-mobile'>Price</div>";
                                                            el+="<span style='font-size: 15px;'>"+e.item+"</span>";
                                                        el+="</div>";

                                                        el+="<div class='col-sm-3'>";
                                                            el+="<div class='title-row-td title-row-td-mobile'>Price</div>";
                                                            el+="<span style='font-size: 15px;'>"+e.currency+" "+amount.formatMoney()+"</span>";
                                                        el+="</div>";

                                                        el+="<div class='col-sm-3'>";
                                                            el+="<div class='title-row-td title-row-td-mobile'>Qty</div>";
                                                            el+=e.qty;
                                                        el+="</div>";

                                                        el+="<div class='col-sm-3'>";
                                                            el+="<div class='title-row-td title-row-td-mobile'>Total</div>";
                                                            el+="<span style='font-size: 15px;'>"+e.currency+" "+parseInt(e.amount * e.qty).formatMoney()+"</span>";
                                                        el+="</div>";
                                                    
                                                    });

                                                el+="</div>";
                                                }
                                            el+="</div>";

                                        el+="</div>";  
                                    el+="</div>";                                   

                                    el+="<div class='events-book'>";
                                        el+="<div class='row'>";
                                            el+="<div class='col-sm-5'></div>";
                                            el+="<div class='col-sm-2'>";
                                                el+="<div class='title-row-td'>TOTAL</div>";
                                            el+="</div>";
                                            el+="<div class='col-sm-4'>";
                                                el+="<span style='font-size: 11px;'>"+total.formatMoney()+"</span>";
                                            el+="</div>";
                                        el+="</div>";  
                                    el+="</div>";

                                    el+="<div class='wrapper-order-details'>";
                                        el+="<div class='title-notif-order-details'>";
                                            el+="Payment Method "+p.payment_method_name+"<br />";                                            
                                        el+="</div>";
                                    el+="</div>";
                                    
                                el+="</div>";
                            el+="</div>";
                        el+="</div>";
                    el+="</div>";
                el+="</div>";
            el+="</div>";

        el+="</div>";
                               
        
       return el;
    },
    setParam    :   function(p){
        var $this = this;
        
        var objAmount=$('#txtHiddenAmount');                
        
        Global.param.inv            =   Global.b64EncodeUnicode($('#txtInvoiceNo').val());
        Global.param.i_pym_mthd     =   $('#optPaymentMethod').val();
        Global.param.description    =   $('#txtPaymentDescription').val();
        Global.param.currency       =   $('#txtCurrency').val();
        Global.param.amount         =   objAmount.length > 0?$('#txtHiddenAmount').val():p.amount;
            
    },
    getById    :   function(id,f){
        
        var $this = this;                
                        
        $.ajaxSetup({

            headers: Request.headers

        });  

        $.ajax({
            type        :   'get',
            url         :   Request.Invoice.get(Global.b64EncodeUnicode(id)),
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

                Request.response=r;  

                Global.cekConsole();                    

                f();
            }

        });
    },
}