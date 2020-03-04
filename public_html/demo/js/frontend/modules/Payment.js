var Payment={
    scope   :   'payment',
    attr    :   {
        i_bank      : $('.js-opt-payment-bank-account-modal').find(":selected").val(),
        i_invoice   : $('.js-txt-payment-i_invoice').val(),
        i_pym_mthd  : $('.js-txt-payment-method').val(),
        i_event     : $('.js-txt-payment-i_event').val(),
        event_name     : $('.js-txt-payment-event_name').val(),
        bill_to     : $('.js-txt-payment-bill_to').val(),
        currency    : $('.js-txt-payment-currency').val(),        
        amount      : $('.js-txt-payment-amount').val(),        
        need_doc    :   $('.js-txt-payment-need_doc').val(),
        is_rejected :   $('.js-txt-payment-rejected').find(":selected").val()
    },
    init            :   function(){
        
        var $this=this;
        $this.property();
        $this.handler();
        
    },
    handler :   function(){
        
        var $this=this;
        
        var modal = $('.js-txt-modal').val();
                
        if(modal=='modal'){  // trigger konfirmasi dari email      
            
            $('#confirmModal').modal({backdrop: 'static', keyboard: false}).on('shown.bs.modal', function(e) {
                   
                                      
            }).on('hidden.bs.modal', function(e) {


            });
            
        }
        
        
        $('.js-btn-confirm-payment').off().on('click',function(){
            
            $('#confirmModal').modal({backdrop: 'static', keyboard: false}).on('shown.bs.modal', function(e) {
                   
                                      
            }).on('hidden.bs.modal', function(e) {


            });
        });
        
        // on modal        
        $.each($('.js-opt-payment-bank-account-modal'),function(i,e){
            $(e).change(function(){
                $this.attr.i_bank = $(e).find(":selected").val();
            });
            
        });
        
        $('.js-btn-transfer').off().on('click',function(){
           Component.create.jbox.notif('Opps..','Menunggu proses pembayaran!',false);
        });
        
        $('.js-btn-do-payment').off().on('click',function(){
            
            $('#js-form-payment').parsley('validate');

                if($('#js-form-payment').parsley('isValid')){
                                    
                    var o = $(this);
                    
                    if($this.cekParam()){
                        
                        $this.setParam(o);
                        
                        console.table(Global.param);

                        Global.prepareBtnPost(o);

                        Component.create.progress({
                            title       :   'Sedang memproses..',
                             appendTo   :   '.js-div-cont-progress'

                         },function(){

                             Global.showProgressBar();

                         });
                        Request.do('POST',Request.Payment.set(),function(){

                            //Global.afterBtnPost(o,'Submit'); still locked karena ada lead time pas redirect
                            var code = $this.attr.i_invoice;
                            var email= Global.getCookie('myEmail');

                            document.location.href=Global.BASE_URL()+"booking-summary/"+Global.b64EncodeUnicode(code+"|"+email);

                        });
                    }
                    
                }
            
        });

        $('.js-action-refund').off().on('click', function(e) {
            var $row = $(this).closest('tr');

            $('#refund-message').val('');
            $('#refund-booking').val($(this).data('book'));
            $('#refund-event').text($row.children().eq(1).text());
            $('#refund-invoice').text($row.children().eq(2).text());
            $('#refund-amount').text($row.children().eq(3).text());
        });

        $('.js-btn-do-refund').off().on('click', function(e) {
            $('#js-form-event-refund').parsley('validate');

            var $btn    = $(this);
            var btnText = $btn.text();

            if ($('#js-form-event-refund').parsley('isValid')) {
                Global.prepareBtnPost($btn);
                Global._setBrowserActivity("refund_events", Global.b64DecodeUnicode($('#refund-booking').val()));
                Global.param.code    = $('#refund-booking').val();
                Global.param.message = $('#refund-message').val();

                Request.do('POST', Request.Payment.setRefund($('#refund-booking').val()), function() {
                    Global.afterBtnPost($btn, btnText);

                    if (Request.response.success) {
                        $('#question-message, #question-booking').val('');
                        Component.create.jbox.notif("Ahaa..", "Permintaan untuk pengembalian dana berhasil terkirim!", true);
                        window.location.reload();
                    } else {
                        Component.create.jbox.notif("Opps..", "Pesan minimal 20 karakter",false);
                    }

                    $('#js-form-event-refund').parsley('reset');
                });
            }
        });
    },
    property    :   function(){
        var $this = this;
        
        Global.prepareUpload('file-upload-payment','fileholder-payment',Profile.config,'avatar'); //sesuai kan settingan dengan ukuran profile avatar        
    },
    setParam    :   function(o){
        
        var $this = this;
        var ret =false;        
                    
        Global.param.i_invoice = Global.b64EncodeUnicode($this.attr.i_invoice);                                
        Global.param.i_pym_mthd = Global.b64EncodeUnicode($this.attr.i_pym_mthd);
        Global.param.i_event = Global.b64EncodeUnicode($this.attr.i_event);            
        Global.param.bill_to = Global.b64EncodeUnicode($this.attr.bill_to);
        Global.param.currency = Global.b64EncodeUnicode($this.attr.currency);
        Global.param.amount = Global.b64EncodeUnicode($this.attr.amount);
        Global.param.image = Global.b64EncodeUnicode(Global.param.images_blob);
        Global.param.i_bank = Global.b64EncodeUnicode($this.attr.i_bank);
        Global.param.need_doc = $this.attr.need_doc;
        Global.param.user_bank_no = Global.b64EncodeUnicode($this.attr.i_bank);
        Global.param.user_bank_name = Global.b64EncodeUnicode($('.js-txt-payment-bank-account-name-modal').val());
        
        Global.param.description = Global.b64EncodeUnicode($('.js-txt-payment-notes-modal').val());
        
        Global._setBrowserActivity('event_payment',Global.param.i_invoice);
        
    },
    cekParam    :   function(){
        var $this= this;
        var ret=false;
        
        if($this.attr.need_doc=='1' ){

            if($('#img-result').length==0){ //cek object is exist
                
                Component.create.jbox.notif('Opps..','Mohon sertakan bukti pembayaran!',false);                
                ret = false;            
                
            }else{
                ret = true;
            }                        
            
        }else{
            ret = true;
        }
        return ret
    }
}