var Agreement   =   {
    scope   :   null,
    category   :   null,
    agree   :   "none",
    beAPartner  :   function(){
        var $this = this;
        
            $("#trainer-term-condition").modal({backdrop:'static',keyboard:false}).on('shown.bs.modal', function(e) {            

                Global.iCheck();
                
                $('.iradio_minimal-grey').removeProp('checked');
                
                $('.js-spn-app').text(Global.config.AppName);
                                
                
                if($this.scope == 'register'){
                    
                    if($this.category == 'personal'){
                        
                        $('.js-spn-identity').text($('.js-txt-identity-personal').val());                                        
                        $('.js-spn-firstname').text($('.js-txt-firstname-personal').val());
                        
                    }else if($this.category == 'institusi'){
                        
                        $('.js-spn-identity').text('-');                                        
                        $('.js-spn-firstname').text($('.js-txt-company-institusi').val());
                    }
                    
                    
                }else{
                    
                    $('.js-spn-firstname').text(Global.getCookie('myFirstName'));
                    $('.js-container-identity').hide();
                    
                }
                                
                $('.js-spn-today').text(Global.dateToIndo());

                $this.handler();


            }).on('hidden.bs.modal', function(e) {            

            });
            
        
                
    },
    handler :   function(){
        var $this = this;
                
        
        $.each($('.js-rdo-agree'),function(i,e){

            $(e).off().on('ifChanged', function(event){
                                
                $this.agree= event.target.value;

                if($this.agree=='0'){
                    
                    if($this.scope=="register"){
                        
                        document.location = Global.BASE_URL();
                        
                    }else{
                        
                        $("#trainer-term-condition").modal('hide');                           
                        
                    }               
                    
                }

            });

        });
        
        $('.js-btn-register-partner').off().on('click',function(){
            
            var o=$(this);                    
            $this.agree=1;
            
            if($this.agree!='none'){                                
                
                Global.prepareBtnPost(o);
            
                if($this.scope=="register"){

                    User.profile.upgradeTrainer(function(){
                        $('.js-btn-cancel-partner').trigger('click');
                    });                                                        

                }else{

                    User.group.change(function(){

                        Component.create.jbox.notif('Ahaa..','Akun Anda sudah dirubah menjadi akun Trainer!',true)

                        document.location=Global.BASE_URL()+"profile/"+Global.b64EncodeUnicode(Global.getCookie('myId'));

                    });

                }
                
            }else{

                Component.create.jbox.notif('Opps..','Anda belum memilih setuju atau tidak menjadi Trainer!',false);

                return false;

            }
            


        });
        
        $('.js-btn-cancel-partner').off().on('click',function(){
           $("#trainer-term-condition").modal('hide');
        });
        
    }
}
