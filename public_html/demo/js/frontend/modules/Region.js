var Region={        
    get    :   function(f){
        
        var $this = this;                
                        
        Request.do('GET',Request.Region.get.all('json'),function(){
            
            f();
            
        });
        
    },
    getRoot    :   function(f){
        
        var $this = this;                
                        
        Request.do('GET',Request.Region.get.root('json'),function(){
            
            f();
            
        });
        
        
        
    },
    getById    :   function(id,f){                
        
        var $this = this;                
                        
        Request.do('POST',Request.Region.get.id(id,'json'),function(){
            f();
        });
                
    },
    render  :   function(o,id,f){
        
        var $this=this;
                        
        var el="";
                
                
        el+="<option value=''>-- Pilih Kota --</option>";                
                
        
        if(Request.response.status==1){
                        
            $.each(Request.response.data,function(i,e){
                
                var selected=id==e.code?"selected":"";
                
                el+="<option value='"+e.code+"' "+selected+">"+e.n_region+"</option>";
                
            });
        }
        
        
        $(o).empty().html(el);
        f();
        
    },        
    
}