var Country={        
    get    :   function(o,f){
        
        var $this = this;
        
        Request.do('GET',Request.Country.get.all('json'),function(){
            $this.render(o,'ID');
        });
        
    },    
    render  :   function(o,id){
        var $this=this;
        var el="";
        var selected="";
                                
        el+="<option value=''>-- Pilih Negara --</option>";
        
        if(Request.response.status==1){                              
            
            $.each(Request.response.data,function(i,e){
                
                if(e.code==id){
                    
                    selected="selected";
                    
                }else{
                    
                    selected="";
                }
                
                el+="<option value='"+e.code+"' "+selected+">"+e.country+"</option>";
            });
        }
        
        $(o).empty().html(el);
        
    }
    
}