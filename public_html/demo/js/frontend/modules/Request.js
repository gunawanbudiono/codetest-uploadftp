var Request={    
    headers     :   { 'X-CSRF-Token' : $('meta[name=csrf-token]').attr('content') },    
    data        :   {},
    response    :   {},        
    do          :   function(t,u,f){        
        
        var $this = this;
                        
        Global.param._token=Global._token;
        
        $.ajaxSetup({

            headers: $this.headers

        });  
                
        $.ajax({
            type        :   t,
            url         :   u,
            dataType    :   'json',
            data        :   Global.param,
            cache       :   true,
            beforeSend  :   function(){

                Global.cekConsole
                
                if(!Global.onForm){
                //    Component.create.iosOverlay();
                }                

            },
            statusCode: {

                200: function (r) {

                    Request.response=r;
                                        
                    f();

                },
                201: function (r) {

                    Request.response=r;  

                },
                400: function (r) {

                    Request.response=r;  

                },
                404: function (r) {


                    Request.response=r;  

                },
                500: function (r) {
                    
                    Component.create.jbox.notif('Opps','Request time out',false);
                    
                    setTimeout(function(){
                        location.reload();
                    },'500');
                    
                    $('button').removeAttr('disabled','disabled');
                    Request.response=r;
                    

                }
            },
            success :   function(r){
                
                Request.response=r;  

                Global.cekConsole();                
                
            }

        });        
        
    },
    doWithLoading   :   function(t,u,f){
        var $this = this;
                        
        Global.param._token=Global._token;

        $.ajaxSetup({

            headers: $this.headers

        });  

        $.ajax({
            type        :   t,
            url         :   u,
            dataType    :   'json',
            data        :   Global.param,
            beforeSend  :   function(){

                Global.cekConsole();                                        

                $('.js-img-loader').show();

            },
            statusCode: {

                200: function (r) {

                    Request.response=r;

                    f();


                },
                201: function (r) {

                    Request.response=r;  

                },
                400: function (r) {

                    Request.response=r;  

                },
                404: function (r) {


                    Request.response=r;  

                },
                500: function (r) {

                    Request.response=r;


                }
            },
            success :   function(r){

                Request.response=r;  

                Global.cekConsole();                

            }

        });        
    },
    html          :   function(t,u,f){        
        
        var $this = this;
                
        
        Global.param._token=Global._token;
                
        
        $.ajaxSetup({

            headers: $this.headers

        });  

        $.ajax({
            type        :   'GET',
            url         :   u,
            dataType    :   'html',
            data        :   Global.param,
            beforeSend  :   function(){

                Global.cekConsole();                
                //Component.create.iosOverlay();

            },
            statusCode: {

                200: function (r) {

                    $('#main-content').empty().html(r);
                    Global.hideFbLoader();
                                        
                    f();

                },
                201: function (r) {

                    Request.response=r;  

                },
                400: function (r) {

                    Request.response=r;  

                },
                404: function (r) {


                    Request.response=r;  

                },
                500: function (r) {

                    Request.response=r;  
                    
                    //$('#main-content').empty().html("tes");

                }
            },
            success :   function(r){
                
                Request.response=r;  

                Global.cekConsole();                    
                
            }

        });        
        
    },     
    config  :   function(f){
        
        return Global.BASE_URL()+"cnf/"+f;

    },
    Apps   :   {
        get :   {

            All :   function(f){                

                return Global.BASE_URL()+"app/all/"+f;                

            },            
            byId    :   function(id){

                return Global.BASE_URL()+"app/id/"+id;                

            },
        },        

        set :   function(act){

            return Global.BASE_URL()+"Events/act/"+act;                

        },

    },
    Points   :   {
        get :   {

            All :   function(f){                

                return Global.BASE_URL()+"poi/all/"+f;                

            },
            AllTrx :   function(f){                

                return Global.BASE_URL()+"poi/all-trx/"+f;                

            },
            byId    :   function(id){

                return Global.BASE_URL()+"poi/id/"+id;                

            },
        },        

        set :   function(act){

            return Global.BASE_URL()+"Events/act/"+act;                

        },

    },
    Modules   :   {        
        
        get :   {

            All :   function(t){                

                return Global.BASE_URL()+"mdl/all/"+t;

            },

            byId    :   function(id,t){

                return Global.BASE_URL()+"mdl/id/"+id+"/"+t;                

            },
            byUserGroup    :   function(id,t){

                return Global.BASE_URL()+"mdl/grp/"+id+"/"+t;                

            }

        },

    },    
    Menus   :   {
        front   :   {
            get :   {
                All :   function(f){
                    return Global.BASE_URL()+"mnu-front/all/"+f;
                }
            }
        },
        back    :   {
            get :   {
            
                byGroupModules    :   function(grp,mod,t){

                    return Global.BASE_URL()+"mnu-group-module/"+grp+"/"+mod+"/"+t;                

                },
                byGroupRoles    :   function(code,t){

                    return Global.BASE_URL()+"mnu-group-role/"+code+"/"+t;                

                }


            },
        }        
    },
    User    :   {
        login       :   Global.BASE_URL()+"usr/login",        
        logout      :   Global.BASE_URL()+"usr/logout",       
        register    :   Global.BASE_URL()+"usr/register",        
        forgot      :   Global.BASE_URL()+"usr/forgot",        
        reset       :   Global.BASE_URL()+"usr/reset",
        changePassword       :   Global.BASE_URL()+"usr/change-password",
        interest    :   {
            _get    :   function(){
                
                return Global.BASE_URL()+"usr/interest"
            },
            _set    :   function(){
                
                return Global.BASE_URL()+"usr/set-interest"
                
            }
        },
        profile :   {
            changeGroup :   function(a,b){
                
                return Global.BASE_URL()+"usr/change-group/"+a+"/"+b;
                        
            }
        },
        public  :  function(f){
            
            return Global.BASE_URL()+"usr/public/"+f
            
        },
        system  :  function(f){
            
            return Global.BASE_URL()+"usr/system/"+f
            
        },
        group  :  {
            all :   function(f){
            
                return Global.BASE_URL()+"usr/get-group/"+f
            
            },
            modules :   function(f){
                return Global.BASE_URL()+"usr/group-modules/"+f
            },
            roles :   function(f){
                return Global.BASE_URL()+"usr/group-roles/"+f
            },
            dashboard :   function(f){
                return Global.BASE_URL()+"usr/group-dashboard/"+f
            },
        }
    },
    Person  :   {
        mine    :   function(id,f){                        
                
                return Global.BASE_URL()+"prs/mine/"+id+"/"+f
            
        },
        profile :   {
            id :   function(id,f){
                
                return Global.BASE_URL()+"prs/id/"+id+"/"+f
                
            },
            usr :   function(id,f){
                
                return Global.BASE_URL()+"prs/usr/"+id+"/"+f
                
            },            
            set         :   Global.BASE_URL()+"prs/profile/set",
            update      :   Global.BASE_URL()+"prs/profile/update",
            change_avatar   :   function(){
                
                    return Global.BASE_URL()+"prs/profile/change_avatar";
            }
        },
        rekening   :   {            
            set    :   Global.BASE_URL()+"prs/rekening/set",
            delete  :   Global.BASE_URL()+"prs/rekening/delete"
        },
        education   :   {            
            set    :   Global.BASE_URL()+"prs/education/set",
            delete  :   Global.BASE_URL()+"prs/education/delete"
        },
        experience   :   {            
            set    :   Global.BASE_URL()+"prs/experience/set",
            delete  :   Global.BASE_URL()+"prs/experience/delete"
        },
        achievement   :   {            
            set    :   Global.BASE_URL()+"prs/achievement/set",
            delete  :   Global.BASE_URL()+"prs/achievement/delete",
        },
        
    },
    Events   :   {
        get :   {
            All :   function(f){                
                return Global.BASE_URL()+"evn/all/"+f;                
            },
            byId    :   function(id,f){
                return Global.BASE_URL()+"evn/id/"+id+"/"+f;                
            },
            byCategory    :   function(id){
                return Global.BASE_URL()+"evn/cat/"+id;                
            }
        },
        set :   function(f){
            return Global.BASE_URL()+"evn/set/"+f
        },
        setWishlist : function(f) {
            return Global.BASE_URL()+"evn/set-wishlist/"+f
        },
        setQuestion : function(f) {
            return Global.BASE_URL()+"evn/set-question/"+f
        },
        setMateri  :   function(f){
            return Global.BASE_URL()+"evn/set-materi/"+f
        },
        updateMateri  :   function(id){
            return Global.BASE_URL()+"evn/update-materi/"+id
        },
        updateMateriItem  :   function(id){
            return Global.BASE_URL()+"evn/update-materi-item/"+id
        },
        delMateri  :   function(f){
            return Global.BASE_URL()+"evn/del-materi/"+f
        },
        delMateriItem  :   function(f){
            return Global.BASE_URL()+"evn/del-materi-item/"+f
        },
        delTicket  :   function(f){
            return Global.BASE_URL()+"evn/del-ticket/"+f
        },        
        setFaq  :   function(f){
            return Global.BASE_URL()+"evn/set-faq/"+f
        },
        updateFaq  :   function(f){
            return Global.BASE_URL()+"evn/update-faq/"+f
        },
        delFaq  :   function(f){
            return Global.BASE_URL()+"evn/del-faq/"+f
        },
        delGallery  :   function(f){
            return Global.BASE_URL()+"evn/del-gallery/"+f
        },
        update :   function(){
            return Global.BASE_URL()+"evn/update"
        },
        validateUrl :   function(t){
            return Global.BASE_URL()+"events/validate-url/"+t;
        },
        validateCreate :   function(id,f){
            return Global.BASE_URL()+"evn/validate-create/"+id+"/"+f
        },
        validateToPublish :   function(c,s){
            return Global.BASE_URL()+"evn/validate-publish/"+c+"/"+s;
        },
        setPublish  :   function(){
            return Global.BASE_URL()+"evn/go-publish";
        },
        setDraft  :   function(){
            return Global.BASE_URL()+"evn/go-draft";
        },
        change_banner   :   function(a,b){
            return Global.BASE_URL()+"evn/change-banner/"+a+"/"+b;
        },
        add_gallery   :   function(a,b){
            return Global.BASE_URL()+"evn/add-gallery";
        },
        Group   :   {            
            get :   {
                All :   function(f){

                    return Global.BASE_URL()+"grp/all/"+f

                }, 
            }                       
        },      
        Category   :   {
            get :   {
                All :   function(f){

                    return Global.BASE_URL()+"evn/cat-all/"+f;
                    
                },
                Property :   function(f){

                    return Global.BASE_URL()+"evn/cat-property/"+f;
                    
                },
                ById :   function(c,f){

                    return Global.BASE_URL()+"evn/cat-id/"+c+"/"+f;                

                },            
                getByUser :   function(act){

                    return Global.BASE_URL()+"events/category/"+act;

                },
                getItems    :   function(id){
                    
                    return Global.BASE_URL()+"evn/root-item/"+id+"/json";
                    
                }

            },                      
        },
        materi  :   {
            items   :   function(id){
                return Global.BASE_URL()+"evn/materi-item/"+id;
            }
        }
        
    },
    Messages   : {
        get : {
            byId : function(id){
                return Global.BASE_URL() + "msg/id/" + id;                
            },
        },
        reply : function(id){
            return Global.BASE_URL() + "msg/reply/" + id;                
        },
        delete : function(id, withChild){
            if (withChild === true) {
                return Global.BASE_URL() + "msg/delete/p/" + id;                
            }

            return Global.BASE_URL() + "msg/delete/n/" + id;                
        },
    },
    Tickets   :   {

        get :   {

            All :   function(f){                

                return Global.BASE_URL()+"tkt/all/"+f;                

            },
            Booked :   function(f){                

                return Global.BASE_URL()+"tkt/booked/"+f;                

            },
            event   :   function(id,f){
                
                return Global.BASE_URL()+"tkt/evn/"+id+"/"+f;                
                
            },

            byId    :   function(id){

                return Global.BASE_URL()+"Tickets/id/"+id;                

            },

            byCategory    :   function(id){

                return Global.BASE_URL()+"Tickets/cat/"+id;                

            }

        },        

        set :   function(){

            return Global.BASE_URL()+"tkt/set"; 

        },
        update :   function(){

            return Global.BASE_URL()+"tkt/update"; 

        },
        setEarlyBird :   function(){

            return Global.BASE_URL()+"tkt/set-earlybird"; 

        },
        updateEarlyBird :   function(){
                        
            return Global.BASE_URL()+"tkt/update-earlybird"; 

        },

    },
    Like   :   {        
        _set : function(id) {
            return Global.BASE_URL() + "lik/set";                
        },

        _get : function(id) {
            return Global.BASE_URL() + "lik/get";                
        }
    },
    Comments   :   {        

        post :   function(){

            return Global.BASE_URL()+"comments/set";                

        },

        get :   function(id){

            return Global.BASE_URL()+"comments/get/"+id;                

        },

    },
    Interest    :   {
        all :   function(){
            return Global.BASE_URL()+"comments/get/"+id;
        }
    },
    Newsletter    :   {
        _request :   function(email){
            return Global.BASE_URL()+"nws/request/"+email;
        }
    },
    Follow   :   {
        _set :   function(id){
            return Global.BASE_URL()+"flw/set";           
        },

        _get :   function(id){
            return Global.BASE_URL()+"flw/get";
        },
    },
    Reviews   :   {        

        post :   function(){

            return Global.BASE_URL()+"rvw/set";                

        },
        get :   function(id){

            return Global.BASE_URL()+"rvw/get/"+id;                

        },
    },
    Billing   :   {
        get :   {

            All :    {
                ConfigPeriod :   function(f){                

                    return Global.BASE_URL()+"bll/all-period/"+f;                

                },            
            }
        },       
    },
    Booking   :   {                
        postMember  :   function(){
            return Global.BASE_URL()+"bkk/post-member";
        },
        postBooking  :   function(){
            return Global.BASE_URL()+"bkk/post-booking";
        },
        postBookingItems  :   function(){
            return Global.BASE_URL()+"bkk/post-booking-items";
        },
        postInvoice  :   function(){
            return Global.BASE_URL()+"bkk/post-invoice";
        },
        postInvoiceItems  :   function(){
            return Global.BASE_URL()+"bkk/post-invoice-items";
        },
        post :   function(){

            return Global.BASE_URL()+"bkk/set";                

        },
        get :   {
            All     :   function(f){
                
                return Global.BASE_URL()+"bkk/all/"+f
                
            },                
            byId    :   function(id){
                
                return Global.BASE_URL()+"bkk/get/"+id;
                
            }
        },
    },
    Wishlist   :   {                        
        post :   function(){

            return Global.BASE_URL()+"bkk/set";                

        },
        get :   {
            All     :   function(f){
                
                return Global.BASE_URL()+"wsl/all/"+f
                
            },                
            byId    :   function(id){
                
                return Global.BASE_URL()+"wsl/get/"+id;
                
            }
        },
    },
    Venues   :   {
        get :   {

            All :   function(f){                

                return Global.BASE_URL()+"vel/all/"+f;                

            },
            AllCategory :   function(f){                

                return Global.BASE_URL()+"vel/cat-all/"+f;                

            },
            byId    :   function(id){

                return Global.BASE_URL()+"vel/id/"+id;                

            },

            byCategory    :   function(id){

                return Global.BASE_URL()+"vel/cat/"+id;                

            }

        },        

        set :   function(act){

            return Global.BASE_URL()+"Events/act/"+act;                

        },
        findByRangeCoordinate    :   function(a,b,f){
            
            return Global.BASE_URL()+"vel/search-range-coordinate/"+a+"/"+b+"/"+f;
        }
    },
    Subscribers   :   {
        get :   {

            All :   function(f){                

                return Global.BASE_URL()+"sbr/all/"+f;                

            },            
            byId    :   function(id){

                return Global.BASE_URL()+"sbr/id/"+id;                

            },           

        },        
        set :   function(act){

            return Global.BASE_URL()+"sbr/act/"+act;                

        },

    },
    Timezone    :   {
        get :   {
            all :   function(f){
            
                return Global.BASE_URL()+"tmz/all/"+f

            },
        }
        
    },
    Bank   :   {               
        get :   {
            all :   function(f){
                return Global.BASE_URL()+"bnk/all/"+f; 
            }            
        },
    },
    Payment   :   {
        get :   {
            all :   {
                payment  :   function(f){
                    
                    return Global.BASE_URL()+"pym/all/"+f; 
                },
                paymentMethod  :   function(f){
                    
                    return Global.BASE_URL()+"mpy/all/"+f; 
                },
                paymentStatus  :   function(f){
                    
                    return Global.BASE_URL()+"pys/all/"+f; 
                }
            }
        },        
        set : function(){
            return Global.BASE_URL()+"pym/set"; 
        },   
        setRefund : function(){
            return Global.BASE_URL()+"pym/refund"; 
        },        
    },
    Withdrawl : {
        get : function(id) {
            return Global.BASE_URL()+"wdr/evn/"+id;
        },
        post : function(id) {
            return Global.BASE_URL()+"wdr/evn/"+id;
        },
    },
    Invoices :   {
        get :   {
            all    :   function(f){
                return Global.BASE_URL()+"inv/all/"+f; 
            },
            status :   function(f){
                   return Global.BASE_URL()+"inv/status/"+f; 
            },
            byId    :   function(id,f){
                return Global.BASE_URL()+"inv/id/"+id+"/"+f; 
            }
        }
    },    
    Country   :   {               
        get :   {
            all :   function(f){
                return Global.BASE_URL()+"cty/all/"+f; 
            },
        },
        getById :   function(id){
            return Global.BASE_URL()+"country/get/"+id; 
        },

    },
    Region   :   {               
        get :   {
            all :   function(f){
                
                return Global.BASE_URL()+"rgn/all/"+f; 
                
            },
            root :   function(f){
                
                return Global.BASE_URL()+"rgn/root/"+f; 
                
            },
            id :   function(id,f){
                
                return Global.BASE_URL()+"rgn/id/"+id+"/"+f; 
                
            },
        },        
    },
    Languages   :   {               
        get :   {
            all :   function(f){
                return Global.BASE_URL()+"lng/all/"+f; 
            }
        },
        getById :   function(id){
            return Global.BASE_URL()+"lng/get/"+id; 
        },

    },
    Profesi   :   {               
        get :   {
            all :   function(f){
                return Global.BASE_URL()+"prf/all/"+f; 
            }
        },
        getById :   function(id){
            return Global.BASE_URL()+"prf/get/"+id; 
        },

    },
    Level   :   {               
        get :   {
            all :   function(f){
                return Global.BASE_URL()+"lvl/all/"+f; 
            }
        },
        getById :   function(id){
            return Global.BASE_URL()+"lvl/get/"+id; 
        },

    },
    General   :   {               
        code    :   {
            get :   {
                all :   function(f){
                    return Global.BASE_URL()+"cod/all/"+f; 
                }
            },
            getById :   function(id){
                return Global.BASE_URL()+"cod/get/"+id; 
            },
        }
        

    },
    Range   :   {               
        value    :   {
            get :   {
                all :   function(f){
                    return Global.BASE_URL()+"rng/all/"+f; 
                }
            },
            getById :   function(id){
                return Global.BASE_URL()+"rng/get/"+id; 
            },
        }
        

    },
    Case   :   {               
        get :   {
            all :   function(f){
                return Global.BASE_URL()+"cst/all/"+f; 
            }
        },
        getById :   function(id){
            
            return Global.BASE_URL()+"rng/get/"+id; 
            
        },        
    },
    Common  :   {
        _setFlag    :   function(){
            
            return Global.BASE_URL()+"flag/set"; 
            
        },
        _updateField    :   function(){
            
            return Global.BASE_URL()+"flag/update-field";
            
        }
    },
    Gallery   :   {        
        
        get :   {

            All :   function(f){                

                return Global.BASE_URL()+"glr/all/"+t;

            },
            items    :   function(id,f){

                return Global.BASE_URL()+"glr/items/"+id+"/"+f;                

            },
            byId    :   function(f){

                return Global.BASE_URL()+"glr/id/"+f;                

            },
            byUserId    :   function(f){

                return Global.BASE_URL()+"glr/usr/"+f;                

            }

        },
        set :   Global.BASE_URL()+"glr/set",
        item    :   {
            set :   Global.BASE_URL()+"glr/set-item",
        }

    },
    
    //CONFIG SYSTEM = NMS
    Server  :   {
        get :   {
            all :   function(f){
                return Global.BASE_URL()+"svr/all/"+f; 
            }
        }
    }
    
}