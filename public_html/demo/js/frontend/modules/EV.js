$(function(){
    
    
    Global.getMyBrowser();
    Global.getMyLocation();
    Global.checkBrowser();
    //Global.getTimerCloseBook(Global.minuteBooking);
    getCurrentTime('btn-time');
    
    //global search all page
    $('.search-header').keyup(function(e){
        if(e.keyCode==13){
                    
            var str = $(this).val();                    
            Global.setCookie('searchText',str);

            document.location = Global.BASE_URL()+"search/"+str;

        }

        e.preventDefault();
    });
    
    //declare the serbice worker
    /*
    if ('serviceWorker' in navigator) {        
        window.addEventListener('load', function() {
            
            navigator.serviceWorker.register(Global.BASE_ASSETS()+"js/modules/Services.js").then(function(registration) {

            console.log('ServiceWorker registered on scope: ', registration.scope);
            
          }).catch(function(err) {

            console.log('ServiceWorker registration failed: ', err);
            
          });
        });
    }
    */

    
    switch(page){
        case    "index":
            Global.setCookie('currentTab',null);

            $('.js-btn-newsletter').off().on('click',function(){
                var o=$(this);
                var email = $('.js-txt-newsletter').val();
                Global._setBrowserActivity('reg_subscribers');                
                
                if(email !=""){
                    
                    $(this).val('Mengirim...')
                    
                    Request.do('POST',Request.Newsletter._request(Global.b64EncodeUnicode(email)),function(){
                        $('.js-txt-newsletter').val('');
                        o.val('Kirim');
                        
                        Component.create.jbox.notif('Ahaa',Request.response.messages,true);
                    });
                } else {
                    Component.create.jbox.notif('Opps..','Anda belum mengisi email!',false);
                }
            }); 
            
            Map.bindSearch('js-txt-search-location');
            
            $('.js-txt-search-location').keyup(function(e){
                var src= $(this).val();
                
                if(e.keyCode==13){                
                    Events.search(src);
                }

                e.preventDefault();
                return false;
            }).change(function(){
                var src= $(this).val();
                Events.search(src);
            });                        

            
            $('.js-txt-search').keyup(function(e){
                if(e.keyCode==13){
                    
                    var str = $(this).val();                    
                    Global.setCookie('searchText',str);
                    
                    document.location = Global.BASE_URL()+"search/"+str;
                    
                }
                
                e.preventDefault();
                
            })
        break;
                
        case "search":
            
            $('.js-txt-search-result').text(Global.getCookie('searchText'));
            $('.text-default-search-full').val(Global.getCookie('searchText'));
            
            $('.text-default-search-full').keyup(function(e){
                if(e.keyCode==13){
                    
                    var str=$(this).val();
                    Global.setCookie('searchText',str);
                    
                    document.location = Global.BASE_URL()+"search/"+str;
                    
                }
            });
            
            if($('#js-count-search').val()==0){
                $('.js-txt-search-result').text('Tidak ditemukan!');
            }
            
        break;
        
        case    "trainer.list":
            
        break;

        case    "trainer.detail":
            $('*[role="person"]').trainer();
            Share.init();
        break;

        case    "how-it-work":
        break;

        case    "help":
        break;

        case    "account.register":
            User.profile.init();
        break;

        case    "account.dashboard":
            Dashboard.init();
        break;
        
        case    "account.messages":
            Messages.init();
        break;

        case    "account.participants":
        break;

        case    "account.gallery":
        break;

        case    "account.import":
        break;

        case    "account.interest":
            Interest.init();
        break;

        case    "account.manage-course":
            
            Events.onManage.init();
            
        break;
        case    "account.manage-trainer":            
            Profile.add();
        break;

        case    "account.media":
            Media.init();
        break;

        case    "account.payment":
            Payment.init();
        break;

        case    "account.withdrawl":
            Withdrawl.init();
        break;

        case    "account.wishlist":
            Wishlist.init();
        break;

        case    "account.setting":
            Setting.init();
        break;

        case    "account.profile":
            Profile.init();
        break;
        
        case    "events.list":
        break;
        
        case    "events.booking":
            Global.setCountDown(Global.minuteBooking,0,function(){
                
            });
            
            Booking.init();
        break;
        
        case    "events.booking-summary":
            Payment.init();
        break;
        
        case    "events.create":
            Events.onCreate.default();
        break;

        case    "events.edit":
            Events.onEdit.default();
        break;
        
        case    "events.detail":
            Events.onDetail.default();
            Share.init();
        break;

        case    "venue.list":
            Venues.init();
        break;
        
        default :
        break;
    }
    
    
        
    $('#topMenuCreate').off().on('click',function(){
        if (Global.getCookie('myId') != ''){
            window.location.href=Global.BASE_URL()+"create-course";
        } else {
            Component.create.notify('Opps..','Silahkan login terlebih dahulu!',true);
        }
    });
    
    User.init();        
    Menus.left.account.init();
    Tooltip.handler();
    Form.reset();
       
    console.log("public : "+Global.myPublicId());
});