
var User  =   {
    scope   :   "user",
    interests   :   {
        min :   5,
        cek :   function(f){
            var $this= User;
            var me = this;
            
            Interest._get._byUserId(function(){
               f(); 
            });          
        
        },
        countInterest   :   function(){
            
            var $this=this;
            
            
            if(parseInt(Global.param.interest.length) < parseInt($this.min)){
                
                Component.create.jbox.notif('Opps..',"Anda belum memilih "+$this.min+" kategori yang Anda minati!",false);
                return false;
            }else{
                
                return true;
            }

        },
        setInterest   :   function(f){

            var $this = this;
            Request.do('POST',Request.User.interest._set(),function(){
                
                $("#interestModal").modal('hide');                
                
            });
        },
    },    
    init    :  function(){
        
        var $this= this;        
        $this.handler();
                
        if(Global.property.profile.show){
                        
            $('.js-profile-property').empty().html(Render.person.property());
            
        }
       
    },    
    handler   :   function(){
       
        var $this=this;
        
        Global.hideFbLoader();
                                                                      
        
        //* START LOGIN***//    
        
        $('#trigger-signin').off().on('click',function(){
            
            $("#signinModal").modal({backdrop:'static',keyboard:false}).on('shown.bs.modal', function(e) {                            
                
                $('.js-login-email').val('');
                $('.js-login-password').val('');
                
                $('.js-register-firstname').val('');
                $('.js-register-lastname').val('');
                $('.js-register-email').val('');
                $('.js-register-password').val('');
                
                Form.reset();
                        
            }).on('hidden.bs.modal', function(e) {                           

            });            
            
            return false; 
            
        });
                    
        $('.js-action-signup-user-modal').click(function(){ //term and condition
                                    
            $("#user-term-condition").modal({backdrop:'static',keyboard:false}).on('shown.bs.modal', function(e) {                            
                        
            }).on('hidden.bs.modal', function(e) {                           

            });            
            
            return false; 
        });
        
        $('.js-login-btn').off().on('click',function(){
                                    
            var text = $(this).text();
                        
            var  o = $(this);
            
            $('#js-login-form').parsley('validate');

            if($('#js-login-form').parsley('isValid')){
                        
                Global.prepareBtnPost($(this));
                
                Global._setBrowserActivity($this.scope+"_login");
                
                Global.param.email = Global.b64EncodeUnicode($('.js-login-email').val());
                Global.param.password = Global.b64EncodeUnicode($('.js-login-password').val());

                Request.do('GET',Request.User.login,function(){
                    
                    Global.afterBtnPost(o,text);
                                        
                    if(Request.response.status=="1"){
                        
                        $('#signinModal').modal('hide');                                                         
                        
                        Component.create.jbox.notif('Ahaa..',"Anda berhasil melakukan login!",true);
                        
                        if (Request.response.redirect === false) {
                                                                                                                          
                            Global.setCookie('myId',Request.response.data[0].code);                                                                                             
                            document.location = Global.BASE_URL()+"profile/"+Global.b64EncodeUnicode(Request.response.data[0].code);
                            
                        } else {
                            
                            window.location.href = Request.response.redirect;
                        }
                                            
                    }else{                        
                                                
                        Component.create.jbox.notif('Opps..',"Akun Anda belum terdaftar!",false);
                        $('.js-login-email').focus();
                                                
                    }
                    
                });
                                                        
            }
                                               
            return false;
            
        });
        
        $('.js-login-email').keyup(function(e){

            if(e.keyCode==13){                

                $('.js-login-btn').trigger('click');                

            }
            
            e.preventDefault();

        });
        
        $('.js-login-password').keyup(function(e){

            if(e.keyCode==13){                

                $('.js-login-btn').trigger('click');                

            }
            
            e.preventDefault();

        });
              
        //* END LOGIN***//
        
        //* START REGISTER***//
        
        $('.js-register-firstname').keyup(function(e){

            if(e.keyCode==13){

                $('.js-register-btn').trigger('click');

            }

        });
        
        $('.js-register-lastname').keyup(function(e){

            if(e.keyCode==13){

                $('.js-register-btn').trigger('click');

            }

        });
        
        $('.js-register-email').keyup(function(e){

            if(e.keyCode==13){

                $('.js-register-btn').trigger('click');

            }

        });
        
        $('.js-register-password').keyup(function(e){

            if(e.keyCode==13){

                $('.js-register-btn').trigger('click');

            }

        });
        
        $('.js-register-btn').off().on('click',function(){

            var text = $(this).text();
            var  o = $(this);
            
            Global._setBrowserActivity($this.scope+"_register");
                                               
            $('#js-register-form').parsley('validate');
          
            if($('#js-register-form').parsley('isValid')){

                //Global.prepareBtnPost($(this));
                                                
                Global._setBrowserActivity($this.scope+"_register");
                
                Global.param.firstname  =   Global.b64EncodeUnicode($('.js-register-firstname').val());
                Global.param.lastname   =   Global.b64EncodeUnicode($('.js-register-lastname').val());
                Global.param.email      =   Global.b64EncodeUnicode($('.js-register-email').val());
                Global.param.password   =   Global.b64EncodeUnicode($('.js-register-password').val());
                Global.param.scope      =   "public";        
                Global.param.auto_reg      =   false;                

                Request.do('GET',Request.User.register,function(){
                                                            
                    if(Request.response.status=='1'){ // belum ada di db
                        
                        // set temporary user after register for set interest
                        
                        Global.setCookie('userTempCode',Request.response.data.code);
                                                
                        $('#signinModal').modal('hide');
                                                
                        document.location = Global.BASE_URL()+"info-activation/"+Global.param.email;
                                                
                    }else if(Request.response.status=='0'){
                                                
                        
                        Form.reset();
                        
                        $('.js-register-email').val('').focus();
                        
                        Component.create.jbox.notif('Opps..',"Akun Email sudah digunakan!",false);                        
                        
                    }
                    
                    Global.afterBtnPost(o,text);                    

                });

            }

            $('.close-modal').off().on('click',function(){
                $('.modal').modal('hide');
            });

            return false;

        });
        
        //* END REGISTER***//

        
        //*FORGOT PASSWORD*//
        
        // Forgot Password
        $(".forgot-password").click(function(){
           $(".form-forgot").show();
           $(".form-login").hide();
           
           return false;
        });
        
        $(".login-password").click(function(){
           $(".form-forgot").hide();
           $(".form-login").show();
           return false;
        });
    
        $('.js-forget-btn').off().on('click',function(){

            var text = $(this).text();
            var  o = $(this);
                        
                                               
            $('#js-forget-form').parsley('validate');
          
            if($('#js-forget-form').parsley('isValid')){
                
                Global.prepareBtnPost($(this));
                                
                Global._setBrowserActivity($this.scope+"_change_password");
                
                Global.param.email = Global.b64EncodeUnicode($('.js-forget-email').val());
                
                Request.do('GET',Request.User.reset,function(){
                    
                    Global.afterBtnPost(o,text);
                    
                                        
                    if(Request.response.status=="1"){
                                                                                                                                
                        Component.create.jbox.notif('Ahaa..',"Kata sandi Anda telah diperbaharui, silahkan cek email Anda!",true);
                        $(".login-password").trigger('click');
                        $('#signinModal').modal('hide');
                        
                    }else{
                                                
                        Component.create.jbox.notif('Opps..',"Email tidak terdaftar!",false);
                                                
                    }                                        
                    
                });
            }
        });
                       
        
        $('#btn-forget-password').off().on('click',function(){
            
            var text = $(this).text();

            var  o = $(this);
                                    
            $('#form-forget-password').parsley('validate');
            
            if($('#form-forget-password').parsley('isValid')){
                
                Global.prepareBtnPost($(this));
                
                Global.param.email = $('#txtForgetEmail').val();
                
                $this.forget(function(){

                    Global.afterBtnPost(o,text);

                });               
            }            
        });
        
        //**END FORGOT*//
        
        //**LOGOUT***/
        
            $('#trigger-logout').off().on('click',function(){
                
                Global._setBrowserActivity($this.scope+'_logout');
                                
                Request.do('GET',Request.User.logout,function(){
                    
                    Global.clearSession();
                    
                    setTimeout(function(){
                        //window.location.href = Global.BASE_URL();
                    },'2000')
                    
                })
            })
            
        //END LOGOUT***/
        
        $('#btnNotifBePartner').off().on('click',function(){
         
            window.location.href=Global.BASE_URL()+"profile/"+Global.b64EncodeUnicode(Global.getCookie('myId'));
                           
        });        
        
    },    
    profile   :   {        
        init    :   function(){
            
            var $this = User.profile;
            
            Map.bindSearch('js-txt-alamat-personal','map-view-personal');
            Map.bindSearch('js-txt-alamat-institusi','map-view-institusi');
            
            $('.js-opt-profile-type').change(function(){
                                
                if($(this).val()=='1'){//personal
                    
                    Component.create.jbox.tooltip('Opps..',Render.tooltip.profile('personal'),false,'.js-tooltip-cat');
                    $('.js-tooltip-cat').trigger('click');
                    
                }else if($(this).val()=='2'){ //institusi
                    
                    Component.create.jbox.tooltip('Opps..',Render.tooltip.profile('institusi'),false,'.js-tooltip-cat');
                    $('.js-tooltip-cat').trigger('click');
                    
                }
            });
            
            
            $('.js-btn-next-register').off().on('click',function(){
                
                var cat=$('.js-opt-profile-type').find(':selected').val();
                                
                $('#js-form-register-category').hide();
                
                if(cat=='1'){
                    $('#js-form-register-partner').show('slide');
                    $('#js-form-register-institusi').hide();
                }
                
                if(cat=='2'){
                    $('#js-form-register-institusi').show('slide');
                    $('#js-form-register-partner').hide();
                }
                                
                
            });
            
            $.each($('.action-back'),function(i,e){
                $(e).off().on('click',function(){
                    
                    $('#js-form-register-institusi').hide();
                    $('#js-form-register-partner').hide();
                    $('#js-form-register-category').show('slide');
                });
            })
            
            $.each($('.action-signup-modal'),function(i,e){
                $(e).off().on('click',function(){
                    
                    var category = $(e).data('category');
                    
                    if(category=='personal'){
                        //set param
                        $('#js-form-register-partner').parsley('validate');

                        if($('#js-form-register-partner').parsley('isValid')){

                            Agreement.scope="register";
                            Agreement.category=category;
                            Agreement.beAPartner();

                        }else{

                            Component.create.jbox.notif('Opps..','Mohon lengkapi data registrasi Anda!',false);
                        }
                        
                    }else if(category=='institusi'){
                        
                        //set param
                        $('#js-form-register-institusi').parsley('validate');

                        if($('#js-form-register-institusi').parsley('isValid')){

                            Agreement.scope="register";            
                            Agreement.category=category;
                            Agreement.beAPartner();

                        }else{

                            Component.create.jbox.notif('Opps..','Mohon lengkapi data registrasi Anda!',false);
                        }
                        
                    }
                    
                    return false; 

                });
            
            
            });
            
        },
        upgradeTrainer  :   function(f){
            
            var $this = this;
            
            Global._setBrowserActivity(User.scope+"_register_partner");
            
            Global.param.person_type        =   Agreement.category=='personal'?Global.b64EncodeUnicode(1):Global.b64EncodeUnicode(2);
            Global.param.firstname          =   Agreement.category=='personal'?Global.b64EncodeUnicode($('.js-txt-firstname-personal').val()):Global.b64EncodeUnicode($('.js-txt-company-institusi').val());
            Global.param.nick_name          =   Agreement.category=='personal'?Global.b64EncodeUnicode($('.js-txt-firstname-personal').val()):Global.b64EncodeUnicode($('.js-txt-kontak-institusi').val());
            Global.param.lastname           =   Agreement.category=='personal'?Global.b64EncodeUnicode($('.js-txt-lastname-personal').val()):null;
            Global.param.email              =   Agreement.category=='personal'?Global.b64EncodeUnicode($('.js-txt-email-personal').val()):Global.b64EncodeUnicode($('.js-txt-email-institusi').val());
            Global.param.password           =   Agreement.category=='personal'?Global.b64EncodeUnicode($('.js-txt-password-personal').val()):Global.b64EncodeUnicode($('.js-txt-password-institusi').val());
            Global.param.areacode           =   Agreement.category=='personal'?Global.b64EncodeUnicode($('.js-txt-areacode-personal').val()):Global.b64EncodeUnicode($('.js-txt-areacode-institusi').val());
            Global.param.phone              =   Agreement.category=='personal'?Global.b64EncodeUnicode($('.js-txt-phone-personal').val()):Global.b64EncodeUnicode($('.js-txt-phone-institusi').val());            
            Global.param.identity_type      =   Agreement.category=='personal'?Global.b64EncodeUnicode($('.js-opt-identity-type').val()):null;            
            Global.param.identity_number    =   Agreement.category=='personal'?Global.b64EncodeUnicode($('.js-txt-identity-personal').val()):null;            
            Global.param.company            =   Agreement.category=='institusi'?Global.b64EncodeUnicode($('.js-txt-company-institusi').val()):null;
            Global.param.address            =   Agreement.category=='personal'?Global.b64EncodeUnicode($('.js-txt-alamat-personal').val()):Global.b64EncodeUnicode($('.js-txt-alamat-institusi').val());
            Global.param.scope              =   "public";
            Global.param.agree              =   Agreement.agree;
            Global.param.auto_reg           =   false;                
            Global.param.i_group            =   Global.b64EncodeUnicode('S01.USG.1701.0000014');//set to trainer group
            
            Global.param.person_lat             = Global.b64EncodeUnicode($('#js-txt-lat').val());
            Global.param.person_long            = Global.b64EncodeUnicode($('#js-txt-long').val());
            Global.param.person_position        = Global.b64EncodeUnicode($('#js-txt-position').val());
            Global.param.person_url_location    = Global.b64EncodeUnicode($('#js-txt-url-location').val());
            
                        
            if(Global.param.agree!='none'){
                
                Request.do('GET',Request.User.register,function(){
                
                    if(Request.response.status==1){ // belum ada di db
                        
                        document.location = Global.BASE_URL()+"info-activation/"+Global.param.email;
                        
                        /*
                        $("#successTrainer").modal({backdrop:'static',keyboard:false}).on('shown.bs.modal', function(e) {                            
                                
                        
                        }).on('hidden.bs.modal', function(e) {                           
                            
                            document.location = Global.BASE_URL()+"info-activation/"+Global.param.email;
                            
                        });                                     
                        */
                        
                    }else{                                       

                        Global.param={};
                        Component.create.jbox.notif('Opps..',"Akun email sudah digunakan!",false);                        

                    }
                    
                    Global.afterBtnPost($('.js-btn-register-partner'),'Setuju');

                });
                                
            }else{

                Component.create.jbox.notif('Opps..','Anda harus memilih setuju atau tidak menjadi Trainer!',false);

                return false;

            }
                                    
            f();
                
        },        
        load    :   function(){

            
        },

        set :   function(){

            

        },            

    },
    setting   :   {
        load    :   function(){
            var $this = this;
            $this.handler();
            
        },
        handler :   function(){
            
            $('#browseAvatar').off().on('click',function(){
               $('#modal-avatar').modal('show'); 
            });

            $('#btn-setting').off().on('click',function(){
                
                var t = $(this).text();
                var o = $(this);

                Member.setParam('setting');  

                $('#form-setting').parsley('validate');
                
                if($('#form-setting').parsley('isValid')){
                    if(Global.param.newPass != Global.param.confPass){
                        Component.create.notify("Notifikasi","Cek konfirmasi kata sandi Anda!",true);
                        // Component.create.modal({title:'Event\'s Interest',content:'Please Cek Your Confrim Password'});
                    }else{
                        Global.prepareBtnPost($(this)); 
                        $.ajaxSetup({
                            
                            headers: Request.headers
                            
                        });  

                        $.ajax({
                            type        :   'post',
                            url         :   Request.Member.setting.post(),
                            dataType    :   'json',
                            data        :   Global.param,
                            beforeSend  :   function(){

                                Global.cekConsole();
                                
                                
                            },
                            statusCode: {
                                200: function (r){
                                                   console.log('200');                         

                                },
                                201: function (r) {
                                        console.log('201');
                                },
                                400: function (r) {
                                    console.log('400');
                                },
                                404: function (r) {
                                    console.log('404');
                                },
                                500: function (r) {
                                    console.log('500');
                                }
                            },
                            success :   function(r){
                                                
                                Request.data=r;  
                                
                                Global.afterBtnPost($(this),'Save');
                                
                                Global.cekConsole();
                                console.log(Request.data);                    
                                if(Request.data.status==0){
                                    Component.create.notify("Notification",Request.data.message,true);
                                    Global.afterBtnPost(o,t);
                                    
                                }else{
                                    Component.create.modal({title:'Event\'s Profile',content:'your data is change!!!'});                    
                                    Global.afterBtnPost(o,t);
                                    
                                }
                                                    
                            }

                        });
                    }
                    
                }
                                
                return false;
            });

        },
        set :   function(){
            
        },            
    },
    messages   :   {        

        post :   function(f){

            var $this=this;            

        

            $.ajaxSetup({



                headers: Request.headers



            });  



            $.ajax({

                type        :   'post',

                url         :   Request.Member.messages.post(),

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

        reply :   function(f){

            var $this=this;            

        

            $.ajaxSetup({



                headers: Request.headers



            });  



            $.ajax({

                type        :   'post',

                url         :   Request.Member.messages.reply(),

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

        me  :   function(f){

            var $this=this;            

        

            $.ajaxSetup({



                headers: Request.headers



            });  



            $.ajax({

                type        :   'post',

                url         :   Request.Member.messages.me(),

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

        render  :   function(o,f){

            

            var $this = this;

            var el="";

            

            if(Request.data.length > 0){

                $.each(Request.data,function(i,e){

                    el+="<a href='#' class='detail-new-message'>";

                        el+="<div class='content-messages'>";



                            el+="<div class='content-foto-messages'>";

                                el+="<img src='{{URL::asset('assets/img/img-profile.jpg')}}' style='width: 100%; margin-top: 4px; '>";

                            el+="</div>";

                            el+="<div class='content-detail-messages'>";

                                el+="content";

                                el+="<div class='row'>";

                                    el+="<div class='col-sm-9'>";

                                        el+="<div class='date-messages'>";

                                            el+="asdasd";

                                        el+="</div>";

                                    el+="</div>";

                                    el+="<div class='col-sm-3'>";

                                        el+="<div align='right'>";

                                            el+="<span class='glyphicon glyphicon-trash'></span>";

                                        el+="</div>";

                                    el+="</div>";

                                el+="</div>";



                            el+="</div>";

                            el+="<div class='clearer'></div>";

                        el+="</div>";

                    el+="</a>";



                });                            

                

            }

            

            $(o).empty().html(el);

        }

    },
    newsletter  :   function(f){
        var $this = this;
        Request.do('POST','',function(){
            
        });
    },
    group   :   {
        change  :   function(f){
                       
            Request.do('GET',Request.User.profile.changeGroup(
                    Global.b64EncodeUnicode(Global.getCookie('myId')),
                    Global.b64EncodeUnicode('S01.USG.1701.0000014')
                    ),function(){
                
                        f()
                        
                    });
        }
    }
}