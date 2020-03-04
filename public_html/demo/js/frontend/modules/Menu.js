var Menus={
    route   :   "",
    setPage :   function(p){
        
        $('#txtPage').val(p);
        
    },
    top :   {
        init    :function(){
            var $this = Menus;
            var me = this;
            
            me.handler();
            
        },
        handler :   function(){
            
            
        }
    },
    left :   {
        account :   {                    
            init    :function(){

                var $this = Menus;
                var me = this;                                
                
                me.handler($this);

            },
            handler :   function($this){
                var $this=Menus;
                
                var me = this;
                
                $.each($('.link'),function(i,e){
                    
                    $('#accordion').find('li').removeClass('accordion-active');
                    $('#accordion').find('li').eq(Global.getCookie('leftActive')).addClass('accordion-active');
                    
                    $(e).off().on('click',function(){
                        
                        $('#accordion').find('li').removeClass('accordion-active');
                        
                        Global.setCookie('leftActive',i);
                                                
                        
                    });
                                       
                });

                $.each($('.left-menu'),function(i,e){

                    $(e).off().on('click',function(){
                        
                        var route = $(e).data('route') ;
                        var scope = $(e).data('scope') ;
                        var page = $(e).data('page') ;
                                             
                        $this.route=route;
                        Menus.setPage(page);
                                                
                        if(scope=='events-create'){
                            
                            //cek apakah biography sudah omplete?
                            Events.onCreate.checkRequirement(Global.b64EncodeUnicode(Global.getCookie('myId')),function(){
                                                          
                                Global.param={};
                                
                                if(Request.response.status==1){
                                                                        
                                    $('#createEventModal').modal({backdrop: 'static', keyboard: false}).on('shown.bs.modal', function(e) {
                   
                                        Events.onCreate.default();                                        
                   
                                    }).on('hidden.bs.modal', function(e) {



                                    });
                                                                        
                                    
                                }else{
                                    
                                    Component.create.jbox.notif('Opps..',"Mohon Lengkapi biodata Anda. klik <a href='#' id='js-upgrade-group'>disini!.</a>");
                                    
                                    $('#js-upgrade-group').off().on('click',function(){
            
                                        document.location = Global.BASE_URL()+"profile/"+Global.b64EncodeUnicode(Global.getCookie('myId'));

                                    });
                                    
                                    return false;
                                }
                                
                            });
                            
                            
                        }else if(scope=='logout'){
                            
                            Request.do('GET',Request.User.logout,function(){                                                                        
                                
                                window.location.href=Global.BASE_URL();

                            });
                            
                        }else{
                            
                            Menus.handler.load(route,scope,function(){


                            }); 
                            
                        }
                        
                        
                        return false;

                    });
                });                                
                        

            } 
        },
        venue   :   {
            init    :function(){

                var $this = Menus;
                var me = this;

                me.handler($this);

            },
            handler :   function($this){

                var me = this;

                $.each($('.left-menu'),function(i,e){

                    $(e).off().on('click',function(){
                        
                        var route = Global.BASE_URL()+$(e).data('route') ;
                        var scope = $(e).data('scope') ;                                                         
                        
                        Menus.handler.load(route,scope,function(){


                        });

                        return false;

                    });
                })

            }
            
        }
    },
    bottom :   {
        
    },
    handler :{
        state    :   function(scope){
                                   
            Component._getBreadChrumb(scope);
            history.pushState(scope, "page 2", scope);    
            
        },
        load    :   function(route,scope,f){
                                
            Request.html('GET',Global.BASE_URL()+route,function(){
                                       
                Menus.handler.action(scope,route);                
                
                f();
            });                      
            
        },
        action  :   function(scope,route){
            
            //Component.create.jbox.info('Ahaa',scope,true);            
                                    
            Menus.handler.state(scope);
            
            
            switch(scope){
            
                case "dashboard":
                                       
                    Dashboard.init();
                                            
                break;
                
                case "interest":
                                                  
                    Interest.init();                    
                                            
                break;
                case "profile":
                                        
                    
                    Profile.init();
                                            
                break;
                case "events-create":
                    
                    console.log("this menu is redirect to url");
                                            
                break;
                case "events-manage":
                    
                    Events.onManage.handler();
                                            
                break;
                
                case "media":
                    
                    //document.location = Global.BASE_URL()+"media";
                    Media.init();
                                            
                break;
                case "wishlist":
                    
                    Wishlist.init();
                                            
                break;
                                
                default :  
                    
                    
                break;
               
            }
            
        }
    }
}