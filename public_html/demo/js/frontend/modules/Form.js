var Form = {
    reset   :   function(){                
        
        $.each($('form[id]'),function(i,e){
            $(e).parsley().destroy();
        });
        
        
    }
}