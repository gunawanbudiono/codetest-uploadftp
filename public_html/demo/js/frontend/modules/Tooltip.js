var Tooltip =   {
    text    :   function(scope,field){
        var s="";
        var scope = scope+'-'+field;
        
      switch(scope){
            case  'profile-bidang':
              s="Ini menerangkan tentant apa bidang keahlian Anda.";
            break;
      }  
      
      return s;
    },
    handler    :   function(){                
        
        $.each($('.fa-question-circle-o'),function(i,e){
            
           $(e).mouseenter(function(){
                $(e).css({
                   cursor   :   'pointer'
                });

           }).off().on('click',function(){
               
                var scope = $(e).data('scope');
                var field = $(e).data('field');
               
                var text= Tooltip.text(scope,field);                
                              
                Component.create.jbox.tooltip('Ahaa','dimana',false,'.js-tooltip');
                //$('.js-tooltip').trigger('click');
                              
               return false;
           }); 
        });
    },
    view    :   {
        
    }
}