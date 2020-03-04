var Comments={    
    post    :   function(f){
        
        var $this = this;                
                        
        $.ajaxSetup({

            headers: Request.headers

        });  

        $.ajax({
            type        :   'post',
            url         :   Request.Comments.post(),
            dataType    :   'json',
            data        :   Global.param,
            beforeSend  :   function(){

                Global.cekConsole();
                Global.showLoaderEventObject('#btnPostComment');                

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

                Request.data=r.data;  

                Global.cekConsole();                    

                f();
            }

        });
    },
    get    :   function(id,f){
        
        var $this = this;                
                        
        $.ajaxSetup({

            headers: Request.headers

        });  

        $.ajax({
            type        :   'get',
            url         :   Request.Comments.get(id),
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

                Request.data=r;  

                Global.cekConsole();                    

                f();
            }

        });
    },
    render  :   function(o){
        
        var $this=this;
        var el="";
        var data=Request.data;
        
        if(data.length > 0){
            
            $.each(data,function(i,e){                
                
               el+="<div class='detail-replay-comments'>";
                    el+="<div class='row'>";

                        el+="<div class='col-sm-1 mobile-col-sm-1-comments'>"; 
                            el+="<div class='wrapper-user-comments'>";
                            el+="<img src='"+Global.BASE_ASSETS()+"img/events-comment.jpg' class='img-user-comments'>";
                            el+="</div>";          
                        el+="</div>";
                        el+="<div class='col-sm-11'>";
                            el+="<div class='row'>";
                                el+="<div class='col-sm-8  mobile-col-sm-8-comments'>";
                                    el+="<div class='row'>";
                                        el+="<div class='col-sm-8 mobile-user-comments'>";
                                            el+="<div class='user-comments'>";
                                            el+=e.first_name;
                                            el+="</div>";
                                        el+="</div>";
                                    el+="</div>";
                                el+="</div>";
                                el+="<div class='col-sm-4 mobile-date-comments'>";
                                    el+="<div class='date-comments'>";
                                        el+=e.created_at;
                                    el+="</div>";
                                el+="</div>";
                            el+="</div>";
                            el+="<div class='margin-replay-comments'></div>";
                            el+="<div class='description-comments'>";
                            el+=e.comment;
                            el+="</div>";
                        el+="</div>";
                    el+="</div>";
                    el+="<div class='clearer'></div>";
                el+="</div>";
                
            });
                        
        }
        
        o.empty().html(el);
        
        $('#form-comments').hide();
        
    },
    renderFormComment   :   function(o,f){
        var $this = this;
        
        var el="";
        
        $('#cont_comment').remove();
        
        el+="<div id='cont_comment'>";
            el+="<textarea placeholder='Write your comment' class='textarea-comments' id='txtComment'></textarea>";

            el+="<div align='right'>";
                el+="<input type='submit' class='btn-gold' value='Submit' id='btnPostComment'>";
            el+="</div>";
        el+="</div>";
        
        $(el).appendTo(o);
        
        f();
        
        
    }
}