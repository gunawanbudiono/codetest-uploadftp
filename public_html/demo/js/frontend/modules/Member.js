

var Member  =   {

    url :   {

        group   :   "http://www.everyvents.com/g/",

        event   :   "http://www.everyvents.com/e/"

    },

    init    :  function(){

        

        var $this= this;

                        

        $this.handler();

        

    },    

    handler   :   function(){

        

        var $this=this;
        
        $('#trigger-signin').off().on('click',function(){
            
            $('#signinModal').modal('show');
            
        });
    
        

        $('#btnLogin').off().on('click',function(){
                                    
            var text = $(this).text();

            var  o = $(this);

            $('#form-login').parsley('validate');

            if($('#form-login').parsley('isValid')){
                        
                Global.prepareBtnPost($(this));
                
                Global.browser.activity_name = "login";

                Global.param.email = $('#txtLoginEmail').val();

                Global.param.password = $('#txtLoginPassword').val();

                $this.login(function(){
                    
                    Global.afterBtnPost(o,text);
                    
                    if(Request.response.status=="1"){
                        
                        $('#modal-register-login').modal('hide');                                                         

                        window.location.href = Global.BASE_URL()+"welcome";
                                            
                    }else{                        

                        Component.create.notify("Notification","Your Account is not regitered.",true);
                        
                    }
                    
                });
                                            
            }
                                               
            return false;
            
        });

        $('#txtLoginEmail').focus(function(){
            $('#txtRegisterFirstname').val('');
            $('#txtRegisterEmail').val('');
            $('#txtRegisterPassword').val('');
        });
        
        $('#txtLoginEmail').keyup(function(e){

            if(e.keyCode==13){                

                $('#btnLogin').trigger('click');                

            }
            
            e.preventDefault();

        });
        
        $('#txtLoginPassword').keyup(function(e){

            if(e.keyCode==13){                

                $('#btnLogin').trigger('click');                

            }
            
            e.preventDefault();

        });
               
        $('#btnRegister').off().on('click',function(){

            var text = $(this).text();
            var  o = $(this);
            
            Global.browser.activity_name = "registration";
                                               
            $('#form-register').parsley('validate');
          
            if($('#form-register').parsley('isValid')){

                Global.prepareBtnPost($(this));
                
                Global.param_token      =   $('meta[name=csrf-token]').attr('content');
                Global.param.name       =   $('#txtRegisterFirstname').val();
                Global.param.email      =   $('#txtRegisterEmail').val();
                Global.param.password   =   $('#txtRegisterPassword').val();
                Global.param.scope      =   "public",
                Global.param.browser    =   Global.browser;

                $this.register(function(){
                    
                    if(Request.response.status==1){ // belum ada di db
                        // set temporary user after register for set interest
                        Global.clearForm();
                        Global.setCookie('userTemp',Request.response.data[0].id);
                                                
                        $('.close-modal').trigger('click');                   

                        Component.create.notify('Notification',Request.response.message,false);

                    }else{
                        
                        Global.clearForm('#txtRegisterFirstname');
                        $('#txtRegisterEmail').focus();
                        Component.create.notify('Notification',Request.response.message,true);

                    }
                    
                    Global.afterBtnPost(o,text);                    

                });

            }

            $('.close-modal').off().on('click',function(){
                $('.modal').modal('hide');
            });

            return false;

        });

        
        $('#txtRegisterFirstname').keyup(function(e){

            if(e.keyCode==13){

                $('#btnRegister').trigger('click');

            }

        });
        
        $('#txtRegisterEmail').keyup(function(e){

            if(e.keyCode==13){

                $('#btnRegister').trigger('click');

            }

        });

        $('#confPass').keyup(function(e){
            if(e.keyCode==13){
                $('#btn-setting').trigger('click');
            }
        }); 

        $('#desc').keyup(function(e){
            if(e.keyCode==13){
                $('#btn-setting').trigger('click');
            }
        });

        
        $('#txtRegisterPassword').keyup(function(e){

            if(e.keyCode==13){

                $('#btnRegister').trigger('click');

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

        

    },

    login   :   function(f){

        var $this = this;
                
        
        $.ajaxSetup({           
            headers: Request.headers
        });  

        $.ajax({

            type        :   'post',
            url         :   Request.User.login(),
            dataType    :   'json',
            data        :   Global.param,
            cache       :   false,
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

    register    :   function(f){

        

        var $this = this;

        

        $.ajaxSetup({

            

            headers: Request.headers

            

        });  



        $.ajax({

            type        :   'post',

            url         :   Request.User.register(),

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

                    Component.create.notify("Opps..","Cek koneksi internet Anda!");
                    

                }

            },

            success :   function(r){

                                

                Request.response=r;  



                Global.cekConsole();



                f();

            }



        });

        

    },

    forget    :   function(f){

        

        var $this = this;

        

        $.ajaxSetup({

            

            headers: Request.headers

            

        });  



        $.ajax({

            type        :   'post',

            url         :   Request.User.forget(),

            dataType    :   'json',

            data        :   Global.param,

            beforeSend  :   function(){



                Global.cekConsole();

                

                

            },

            statusCode: {

                200: function (r) {

                                                       

                    Component.create.notify('Notification',Request.data.message,Request.data.status==0?true:false);                    

                    

                    if(Request.data.status==1){

                                                

                        $('#login').trigger('click');

                        $('#modal-register-login').modal('hide');

                                            

                    }

                    

                    $('#txtForgetEmail').val("").focus();

                    

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

    profile   :   {

        load    :   function(){

            var $this = this;

            

            Member.messages.me(function(){

                

            });

            

            $('#btnSendEmail').off().on('click',function(){

                

               $('#form-message').parsley('validate') ;

               

               if($('#form-message').parsley('isValid')){

                   

                   Global.param={

                       from     :   Global.getCookie('myId'),

                       to       :   $('#txtMessageEmail').val(),   

                       status   :   0,   

                       message  :   $('#txtMessageContent').val()   

                   }

                   

                   Global.prepareBtnPost($('#btnSendEmail'));

                   

                   Member.messages.post(function(){

                       

                       $('.close').trigger('click');

                       

                       Global.afterBtnPost($('#btnSendEmail'),'Send');

                       

                       $('#txtMessageEmail').val('')

                       $('#txtMessageContent').val('')

                       

                       Member.messages.me(function(){

                           

                           Member.messages.render('#containerMessage',function(){

                               

                           })

                       });

                       

                   });

               }

               

               return false;

               

            });
            
            $('#btnReplyEmail').off().on('click',function(){

                

               $('#replyForm').parsley('validate');

               //alert('heres');

               if($('#replyForm').parsley('isValid')){

                   

                   Global.param={

                       from     :   Global.getCookie('myId'),

                       to       :   $('#toemail').val(),   

                       status   :   0,   

                       message  :   $('#content-reply').val()   

                   }

                   

                   Global.prepareBtnPost($('#btnReplyEmail'));

                   

                   Member.messages.reply(function(){

                       

                       $('.close').trigger('click');

                       

                       Global.afterBtnPost($('#btnReplyEmail'),'Send');

                       

                       $('#toemail').val('')

                       $('#content-reply').val('')

                       

                       Member.messages.me(function(){

                           

                           Member.messages.render('#containerMessage',function(){

                               

                           })

                       });

                       

                   });

               }

               

               return false;

               

            });

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
                        Component.create.notify("Notification","Please Cek Your Confrim Password!!!",true);
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

    interestByMemberId    :   function(){

        

        var $this = this;

        

        $.ajaxSetup({
          
            headers: Request.headers
           
        });  



        $.ajax({

            type        :   'post',

            url         :   Request.Member.interest.getByMemberId(),

            dataType    :   'json',

            data        :   Global.param,

            beforeSend  :   function(){

                Global.cekConsole();               

            },

            statusCode: {

                200: function (r){

                                                            



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

                                                      

                if(Request.data.status==1){

                    

                    Component.create.modal({legend:'Interest',content:Request.data.message});                    



                }else{



                    //muncul popup modal                    

                    $this.chooseInterest();



                }

                                    

            }



        });

    },

    varifiedNewMember   :   function(){

        

        var $this = this;

        

        $this.interestByMemberId();

        

    },

    chooseInterest  :   function(){

        

        var $this = this;

        

        Events.Category.getAll(function(){

                                                                        

            Global.renderHtml('#div_render_category',Events.Category.renderByIcon(),function(){



                $.each($(".img-check"),function(i,e){



                    $(e).off().on('click',function(){



                        var id=$(e).data('code');



                        $(e).toggleClass("check");



                        if($(e).hasClass("check")){



                            Global.listChk.push(id);

                            $this.countInterest();

                            

                        }else{



                            Global.listChk = Global.removeArrayItem(Global.listChk, id);                                        

                            $this.countInterest();



                        }



                        Global.param.interest = Global.listChk;

                        console.log(Global.listChk);



                    }); 

                });





                $('#modal-category-everyvents').modal();





            });



        });

                   

    },

    countInterest   :   function(){

        

        var $this=this;

        

        var x = 3-parseInt(Global.listChk.length);

        

        if(x<=0){

            //replace with button

            $('#btnCategory').empty().html("<a href='#' class='btn btn-primary btn-lg btnSetInterest' style='width:100%;'>Submit</a>")

            

        }else{

            

            $('#btnCategory').empty().html("<div class='info-pick'>Pick <span id='txtCountCategory'></span> <span id='txtLabelCategory'>Categories</span></div>");

        }

        

        if(x==1){

            

            $('#txtLabelCategory').text('Category');

            

        }else if(x > 1){

            

            $('#txtLabelCategory').text('Categories');

        }

        

        $('#txtCountCategory').text(x);

        

        $('.btnSetInterest').off().on('click',function(){

                    

            if(Global.param.interest != undefined){



                Global.param.i_user = Global.getCookie('myId');



                $this.setInterest(function(){});



            }else{



                Component.create.notify("Notification","Please choose at  least 1 category!",true);

            }



        });

                



    },

    setInterest   :   function(f){

        

        var $this = this;

        

        $.ajaxSetup({

            

            headers: Request.headers

            

        });  



        $.ajax({

            type        :   'post',

            url         :   Request.Member.interest.set(),

            dataType    :   'json',

            data        :   Global.param,

            beforeSend  :   function(){



                Global.cekConsole();

                

                

            },

            statusCode: {

                200: function (r) {

                    

                    $('#modal-category-everyvents').modal('hide');

                    

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

    setParam    :   function(k){
        switch(k){
            case    "setting":
                console.log(Global.getCookie('password'));
                //hidden
                Global.param.id                 =   $('#myid').val();
                Global.param.name               =   $('#first-name').val();
                Global.param.address            =   $('#address').val();
                Global.param.country            =   $('#country').val();
                Global.param.timezone           =   $('#timezone').val();
                Global.param.email              =   $('#email').val();
                Global.param.phone              =   $('#phone').val();
                Global.param.website            =   $('#website').val();
                Global.param.desc               =   $('#desc').val();
                Global.param.curPass            =   $('#curPass').val();
                Global.param.newPass            =   $('#newPass').val();
                Global.param.confPass           =   $('#confPass').val();
                
                Global.param.status             =  1;
                Global.param.created_by         =  Global.getCookie('myId');
                Global.param.updated_by         =  Global.getCookie('myId');                

            break;
            default :   
                Global.param={};
            break;
        }
        
        console.log(Global.param);
        
        Global.setDataTmp(Global.param);

    },

}

