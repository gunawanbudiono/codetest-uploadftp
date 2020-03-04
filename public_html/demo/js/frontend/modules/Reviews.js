var Reviews={
    load    :   function(){
        var $this= this;
                
        
        Reviews.getByEventId(Global.b64EncodeUnicode($('#txtId').val()),function(){
                
            Reviews.render('#container_review',function(){
                
                $this.handler();
                
            });
            

        });
    },
    handler :   function(){
        var $this=this;
        
        var a = $('#rating-all-events-review').data('sum');
        var b = a/5;
        
        $('#rating-all-events-review').raty({
            readOnly : true,
            score    : b,
            half     : true,
            size     : 25,
            precision  : false
        });
        
        $('#rating-all-events-review-process').raty({
            half	: true,
            size        : 28,
            precision   : false,
            starHalf    : 'star-on-big.jpg',
            starOff	: 'star-off-big.jpg',
            starOn	: 'star-on-big.jpg'
        });

        $.each($('.rating-events-review'),function(i,e){

            var score = $(e).data('value');

            $(e).raty({
                readOnly : true,
                half	: true,
                score	: score,
                size        : 25,
                precision  : false,
                starHalf : 'star-on-small.jpg',
                starOff	: 'star-off-small.jpg',
                starOn	: 'star-on-small.jpg'
            });
        });

        $.each($('.lnk_like'),function(i,e){

            $(e).off().on('click',function(){

                Global.setCookie('myReview',$(e).data('code'));

                if(Global.getCookie('myId') == ""){

                    $('#modal-register-login').modal('show');

                }else{                                                        

                    Global.param={
                        'i_review'  :   Global.b64EncodeUnicode(Global.getCookie('myReview')),
                        'i_user'    :   Global.getCookie('myId'),
                        'like_type' :   1
                    }

                    Likes.post(function(){
                        $('.txtLikes').eq(i).text(Request.data.length);
                    });
                }

                return false;

            });
        });

        $.each($('.lnk_comment'),function(i,e){

            $(e).off().on('click',function(){
                                
                //alert($('.wrapper-replay-comments').length);
                
                Global.setCookie('myReview',$(e).data('code'));

                if(Global.getCookie('myId') == ""){

                    $('#modal-register-login').modal('show');

                }else{                    
                    
                    Comments.renderFormComment($('.form-comments').eq(i),function(){

                        $('#txtComment').focus();

                        $('#btnPostComment').off().on('click',function(){

                            Global.param={
                                'i_review'  :   Global.b64EncodeUnicode(Global.getCookie('myReview')),
                                'i_user'    :   Global.getCookie('myId'),
                                'comment'   :   $('#txtComment').val()
                            }

                            if(Global.param.comment != ""){
                                
                                $(this).parent().parent().hide();

                                Comments.post(function(){

                                    $('#txtComments').text(Request.data.length);
                                    $('#txtComment').val('');      

                                    Comments.render($('.wrapper-replay-comments').eq(i));

                                    $this.load();
                                    

                                });
                            }

                            return false;
                        });



                    });



                }

                return false;

            });
        });

        $.each($(".share"),function(i,e){
            $(e).click(function(){
                $("#modal-share").modal('show');
            });
        });
    },
    post    :   function(f){
        
        var $this = this;                
                        
        $.ajaxSetup({

            headers: Request.headers

        });  

        $.ajax({
            type        :   'post',
            url         :   Request.Reviews.post(),
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

                Request.data=r.data;  

                Global.cekConsole();
                $('#modal-post-review').modal('hide');

                f();                                
                
            }

        });
    },
    getByEventId    :   function(id,f){
        
        var $this = this;                
                        
        $.ajaxSetup({

            headers: Request.headers

        });  

        $.ajax({
            type        :   'get',
            url         :   Request.Reviews.get(id),
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

                Request.data=r.data;  

                Global.cekConsole();                

                f();                                
                
            }

        });
    },
    render  :   function(o,f){
        var $this = this;
        var data = Request.data;
        var el="";
        
        if(typeof data !== 'null'){
            if( data.length > 0){
            
                $.each(data,function(i,e){

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
                                        el+="<div class='col-sm-4 mobile-user-comments'>";
                                            el+="<div class='user-comments'>";
                                                el+=e.reviews.first_name;
                                            el+="</div>";
                                        el+="</div>";
                                        el+="<div class='col-sm-8 mobile-wrapper-rate-small'>";
                                            el+="<div class='wrapper-rate-small'>";
                                                el+="<div class='value-rate-small'>"+e.reviews.rating+"</div>";
                                                el+="<div class='rating-events-review' data-value='"+e.reviews.rating+"'></div>";
                                                el+="<div class='clearer'></div>";
                                            el+="</div>";
                                        el+="</div>";
                                    el+="</div>";
                                el+="</div>";
                                el+="<div class='col-sm-4 mobile-date-comments'>";
                                    el+="<div class='date-comments'>";
                                        el+=e.reviews.created_at;
                                    el+="</div>";
                                el+="</div>";
                            el+="</div>";
                            el+="<div class='title-events-comment'>"+e.reviews.title+"</div>";
                            el+="<div class='description-comments'>";
                                el+=e.reviews.review;
                            el+="</div>";

                            el+="<div class='likes-comments'>";
                                el+="<div class='total-likes-comments'>";
                                    el+="<span class='txtLikes'>"+e.detail.likes.length+"</span> Likes";
                                el+="</div>";
                                el+="<div class='total-likes-comments'>";
                                    el+="<span class='txtComments'>"+e.detail.comments.length+"</span> Comments";
                                el+="</div>";
                                el+="<div class='clearer'></div>";
                            el+="</div>";
                            el+="<div class='img-likes-comments'>";
                                el+="<div class='icon-likes-comments'>";
                                    el+="<a href='#' class='lnk_like' data-code='"+e.reviews.code+"'>";
                                        el+="<img src='"+Global.BASE_ASSETS()+"img/icon-like-comment.jpg')}}'>";
                                    el+="</a>";
                                el+="</div>";
                                el+="<div class='icon-likes-comments'>";
                                    el+="<div class='user-comments-event'>";
                                        el+="<a href='#' class='lnk_comment' data-code='"+e.reviews.code+"'>";
                                            el+="<img src='"+Global.BASE_ASSETS()+"img/icon-comment.jpg' />";
                                        el+="</a>";
                                    el+="</div>";
                                el+="</div>";
                                el+="<div class='icon-likes-comments'>";
                                    el+="<div class='share'>";
                                        el+="<img src='"+Global.BASE_ASSETS()+"img/icon-share.jpg' >";
                                    el+="</div>";
                                el+="</div>";
                                el+="<div class='clearer'></div>";
                            el+="</div>";
                            el+="<div class='row'>";
                                el+="<div class='col-sm-12'>";

                                    el+="<div class='wrapper-replay-comments'>";

                                        //loop comment for each review
                                        if(e.detail.comments.length > 0){

                                            $.each(e.detail.comments,function(a,b){

                                                el+="<div class='detail-replay-comments' style='min-height:50px;'>";
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
                                                                            el+=b.first_name;
                                                                            el+="</div>";
                                                                        el+="</div>";
                                                                    el+="</div>";
                                                                el+="</div>";
                                                                el+="<div class='col-sm-4 mobile-date-comments'>";
                                                                    el+="<div class='date-comments'>";
                                                                        el+=b.created_at;
                                                                    el+="</div>";
                                                                el+="</div>";
                                                            el+="</div>";
                                                            el+="<div class='margin-replay-comments'></div>";
                                                            el+="<div class='description-comments'>";
                                                            el+=b.comment;
                                                            el+="</div>";
                                                        el+="</div>";
                                                    el+="</div>";
                                                    el+="<div class='clearer'></div>";
                                                el+="</div>";

                                            });
                                        }

                                        //end loop

                                        el+="<div class='form-comments'>";

                                            //render form text area for comment

                                        el+="</div>";

                                        el+="<div class='clearer'></div>";

                                    el+="</div>";

                                el+="</div>";
                            el+="</div>";

                        el+="</div>";
                    el+="</div>";

                    el+="<br>";

                });



            }else{
                el+="<div class='alert alert-warning' >No Reviews</div>";
            }
        }
        
        
        $(o).empty().html(el);
        
        f();
        
    }    
}