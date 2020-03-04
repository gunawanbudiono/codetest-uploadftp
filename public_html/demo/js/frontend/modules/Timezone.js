var Timezone={        
    get    :   function(f){
        
        var $this = this;                
                        
        $.ajaxSetup({

            headers: Request.headers

        });  

        $.ajax({
            type        :   'get',
            url         :   Request.Timezone.get(),
            dataType    :   'json',
            data        :   Global.param,
            beforeSend  :   function(){

                Global.cekConsole();

            },
            statusCode: {
                200: function (r) {
                                                            
                },
                201: function (r) {

                },
                400: function (r) {

                },
                404: function (r) {

                },
                500: function (r) {

                }
            },
            success :   function(r){

                Request.response=r;  

                Global.cekConsole();                    

                f();
            }

        });
    },
    getById    :   function(id,f){
        
        var $this = this;                
                        
        $.ajaxSetup({

            headers: Request.headers

        });  

        $.ajax({
            type        :   'get',
            url         :   Request.Timezone.getById(id),
            dataType    :   'json',
            data        :   Global.param,
            beforeSend  :   function(){

                Global.cekConsole();

            },
            statusCode: {
                200: function (r) {
                                                            
                },
                201: function (r) {

                },
                400: function (r) {

                },
                404: function (r) {

                },
                500: function (r) {

                }
            },
            success :   function(r){

                Request.response=r;  

                Global.cekConsole();                    

                f();
            }

        });
    },    
    
}