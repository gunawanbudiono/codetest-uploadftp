var Search={    
    init    :   function(){
        
        var $this=this;
        
        $this.handler();     
                
    },
    handler :function(){
        var $this=this;
        
        Global.findMyLocation(function(){
                                
            $('#txtSrcLoc').val(Global.client.city);            

            //Component.create.notify('Current Position : '+Global.client.city,Global.client.address,false);

            Global.param = {
                'src'   :   $('.text-search').val(),
                'cat'   :   $('#srcCategory').val(),
                'loc'   :   $('#txtSrcLoc').val()
            }                                

            Events.List.getNearBy(function(){


                Events.List.renderByLocation({page:page,div:'#divRenderByLocation'},function(){

                    $('#spnLocation').text($('#txtSrcLoc').val());
                    $('#spnLocation1').text($('#txtSrcLoc').val());
                    
                });

            });

        });

        $('#mnu_start').off().on('click',function(){
            $('#modal-register-login').modal('show');

            return false;
        });

        if(Global.getCookie('myId') != ""){
            $('.btn-slider').hide();
        }

        $('.btn-slider').off().on('click',function(){
            $('#modal-register-login').modal('show');

            return false;
        });

        $('.btn-search').off().on('click',function(){

            Global.param = {
                'src'   :   $('.text-search').val(),
                'cat'   :   $('#srcCategory').val(),
                'loc'   :   $('#txtSrcLoc').val()
            }                                

            Events.List.getNearBy(function(){


                 Events.List.renderByLocation({page:page,div:'#divRenderByLocation'},function(){

                    $('#spnLocation').text($('#txtSrcLoc').val());
                    $('#spnLocation1').text($('#txtSrcLoc').val());
                    
                });

             });

            console.log(Global.param);

        });
               
    }
}