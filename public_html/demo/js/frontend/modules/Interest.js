var Interest = {
    minHave    :   5,
    checked :   function(){
        
        var $this=Interest;
                        
        Request.do('GET',Request.User.interest._get(),function(){
                               
            //console.log(Request.response);return false;
            if(Request.response.status==1){
                if(Request.response.data.length > 0){
                
                    $.each(Request.response.data,function(i,e){

                        Global.listChk.push(e.i_category);

                        for(var i=0;i< $(".img-check").length;i++){

                            if(e.i_category == $(".img-check").eq(i).data('code')){

                                $(".img-check").eq(i).toggleClass('check');

                            }

                        }

                    });

                    console.log(Global.listChk);
                    $('.js-txt-terpilih').text("[ "+Request.response.data.length+" ] kategori terpilih.");
                                
                }
            }
        });
            
    },
    _get    :   {
        all :   function(f){
            Request.do('GET',Request.User)
        },
        _byUserId   :   function(f){
        
            var $this=Interest;
                        
            Request.do('GET',Request.User.interest._get(),function(){
                                
                if(Request.response.status==0){

                    $("#interestModal").modal({backdrop: 'static', keyboard: false}).on('shown.bs.modal', function(e) {
  
                        Events.category.all(function(){

                            Render.events.category(Request.response.data,'#js-modal-body-dynamic-interest',function(){
                                
                                $this.handler();                                

                            })

                        });
                                         
                    }).on('hidden.bs.modal', function() {
                                                
                        
                    });

                }
                f();
            });
        }
    },    
    init    :   function(){
        var $this = this;
        
        $this.handler();
        
    },
    handler :function(){
        
        var $this = this;
        
        $this.checked();
                
        
        $.each($(".img-check"),function(i,e){
            
            var id=$(e).data('code');
            
            $(e).off().on('click',function(){
                
                $(e).toggleClass("check");

                if($(e).hasClass("check")){

                    Global.listChk.push(id);                    
                    
                }else{
                    
                    if(Global.listChk.length <= $this.minHave){
                                                     
                        $(e).addClass('check');
                        
                        Component.create.jbox.notif('Opps..','Minimal harus 5 kategori yang Anda pilih!');
                        
                    }else{
                        
                        Global.listChk = Global.removeArrayItem(Global.listChk, id);                                        
                        
                    }                                        
                    
                }

                Global.param.interest = Global.listChk;
                
                $('.js-txt-terpilih').text("[ "+Global.param.interest.length+" ] kategori yang dipilih!");
                
                console.log(Global.listChk);
                

            }); 

        });
        
        
    }
}