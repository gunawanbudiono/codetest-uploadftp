var Person={    
        profile :   {
            get :   {
                id  :   function(id,f){

                    Request.do('GET',Request.Person.profile.id(id,'json'),function(){

                        f();

                    });
                },
                usr    :   function(id,f){

                    Request.do('GET',Request.Person.profile.usr(id,'json'),function(){
                        
                        f();

                    });
                }
            }
        }
    
}