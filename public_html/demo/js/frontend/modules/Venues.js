var Venues = {
    breadchrumb :   "Venues",
    perPage     :   10,
    offset      :   0,
    totalData   :   0,
    scope       :   null,
    route       :   null,    
    init        : function(){
        var $this = Venues;
        
        $this.handler();
        
    },
    setRoute    :function(r){
        var $this = Venues;
       
        $this.route =r;
    },
    getRoute    :function(){
        var $this = Venues;
        var me = this;
        
        return Global.BASE_URL()+$this.route;
    },
    handler :function(){
        
        var $this = Venues;
        var me = this;
        
        
            
        
        

    },
    load    :   function(route,f){
        
        var $this = Venues;
        var me = this;
        
                             
        Request.html('GET',route,function(){
                        
            Component._getBreadChrumb($this.breadchrumb);
            
            history.pushState(route, "page 2", route);
            
            $this.action(route,function(){});
            
        });
        f();

    },
    action  :   function(s,r,f){
        var $this = Venues;
        var me = this;
                        
        $('.pagination li').removeClass('active');
        if($this.offset==0)$('.pagination li').eq(1).addClass('active');
        
        // Channge Location
        $('.box-change-location').click(function(){
            $('.info-search-title').hide();
            $('.info-search-form').show();
            return false;
        });
        
        $('.box-change-form-location').click(function(){
            $('.info-search-title').show();
            $('.info-search-form').hide();
            return false;
        });
        
        
        
        $.each($('.pagination li a'),function(i,e){
            $(e).off().on('click',function(){
               
                $this.offset = $(e).text();
                
                alert($this.offset);
                
                $this.load($this.getRoute(),function(){
                
                    $('.pagination li').eq($this.offset).addClass('active');    

                });

                return false;
                
            });
        });
        
        $.each($('.prev'),function(i,e){
           $(e).off().on('click',function(){
               
            $this.offset = parseInt($this.offset)>0?parseInt($this.offset)-1:0;
            
            $this.load($this.getRoute(),function(){
                
                $('.pagination li').eq($this.offset).addClass('active');    

            });

            return false;
              
           }); 
        });
        
        $.each($('.next'),function(i,e){
            
           $(e).off().on('click',function(){
               
            $this.offset = parseInt($this.offset)+1;
            
            
            $this.load($this.getRoute(),function(){
                
                $('.pagination li').eq($this.offset).addClass('active');            

            });

            return false;
              
              
              
           }); 
        });
    }
}