var Media = {
    scope       :   "Gallery",
    onCropping  :   false,
    galleries   :   {},
    selectedFile    :   null,
    multiselect     :   false,
    _setItems   :   function(){
                
        var $this=Media;
        var me = this;        
        var blob = $('#js-txt-blob').val();
        var o = $('#js-btn-upload-asset');
        var text= o.text();
                
                
        Global.browser.activity_name = "add_gallery_item";                
        Global.param.browser = Global.browser;
        Global.param.i_gallery = Global.b64EncodeUnicode($('#js-opt-album').val());  
        Global.param.i_user = Global.b64EncodeUnicode(Global.getCookie('myId'));  
        Global.param.title = Global.b64EncodeUnicode($('.js-txt-upload-asset').val());                
        
        
        if(blob != ""){
                        
            Global.prepareBtnPost($(this));
                        
            Request.do('POST',Request.Gallery.item.set,function(){

                Global.afterBtnPost(o,text);

                if(Request.response.status=="1"){

                    Component.create.jbox.notif('Ahaa..',"File berhasil ditambahkan!",true);                                           
                }

            });

        }else{
            

            Component.create.jbox.notif('Opps..','Anda belum memilih file!',false);

        }
                
    },
    _setDefault :   function(){
        var $this = this;
                        
        var el="";
        el+="<div class='box-assets-cover'>";
            el+="<img src='"+Global.BASE_ASSETS()+"images/1070x365.jpg')}}' class='assets-cover-img' id='js-img-ori'>";
        el+="</div>";

        $('#fileHolder').empty().html(el);
        $('.js-txt-upload-asset').val('');

        //re assign object coy
        $this._setCroppic();
        
        $('.js-btn-back').hide();        
        
    },
    _setCroppic :function(){                
                           
            var croppicHeaderOptions = {            
                cropUrl                 :Global.BASE_URL()+"images/croppic",
                customUploadButtonId    :'js-btn-browse',
                modal               :   false,
                processInline       :   true,
                loaderHtml          :   '<div class="loader bubblingG"><span id="bubblingG_1"></span><span id="bubblingG_2"></span><span id="bubblingG_3"></span></div> ',
                onBeforeImgUpload   :   function(){

                    $('.js-cropped-img').remove();

                },
                onAfterImgUpload    :   function(){ 

                },
                onImgDrag           :   function(){ 

                    //Component.create.jbox.notif('Ahaa..','Drag',true);

                },
                onImgZoom           :   function(){ console.log('onImgZoom') },
                onBeforeImgCrop     :   function(){ console.log('onBeforeImgCrop') },
                onAfterImgCrop      :   function(){ console.log('onAfterImgCrop') },
                onReset             :   function(){ console.log('onReset') },
                onError             :   function(errormessage){ console.log('onError:'+errormessage) },
                destination         :   './cdn/front/assets/'
            }
        
            var croppic = new Croppic('fileHolder', croppicHeaderOptions);
                      
    },
    renderDefault   :   function(data){
        
        var $this = Media;
        $this.galleries = data;
        
        var renders=[
            {
                type    :   'option',
                obj     :   '#js-opt-album'
            },
            {
                type    :   'gallery',
                obj     :   '.js-container-list-foto'
            },            
            {
                type    :   'table',
                obj     :   '.js-m-view-album-table'
            },

        ];

        for(var i=0;i<renders.length;i++){

            Render.gallery.list(data,renders[i].obj,renders[i].type,function(){


            });
        }
        
    },
    _get  : {
        gallery :   function(f){
            
            var $this = Media;
                                    
            Request.do('GET',Request.Gallery.get.byUserId('json'),function(){
                                    
                $this.renderDefault(Request.response.data);
                
                f();

            }); 
        },
        galleryItems :   function(id,f){
            
            var $this = Media;
                        
            Request.do('GET',Request.Gallery.get.items(id,'json'),function(){                                    
                
                f();

            }); 
        },
    },
    init    :   function(){
        var $this = this;
                
        $this._setCroppic();
                
        
        $this.handler();
    },
    handler :   function(){
        
        var $this=Media;
        var me = this;
        
        $this._setDefault();                
                                                        
        
        $('.js-btn-trigger-modal-asset').off().on('click',function(){
            
            var scope = $(this).data('scope');
            $this.scope = scope
            
            Global.param.i_user = Global.b64EncodeUnicode(Global.getCookie('myId'));
            
            $this._get.gallery(function(){

                $this.handlerButtons();
                
            });
            
            $('#uploadAssetsModal').modal({backdrop:'static',keyboard:false}).on('shown.bs.modal', function(e) {            
                
                               
        
            }).on('hidden.bs.modal', function(e) {            
                
                //document.location=Global.BASE_URL()+"media";
                
            });
            
            $('#js-upload-list-assets1').off().on('click',function(){
                
                $this._setDefault();
            });
                
                
            return false;
            
        });
        
                        
        $('#js-btn-upload-album').off().on('click',function(){
            
            var text = $(this).text();
                        
            var  o = $(this);
            
            $('#js-form-upload-album').parsley('validate');

            if($('#js-form-upload-album').parsley('isValid')){
                
                Global.prepareBtnPost($(this));
                
                Global.browser.activity_name = "gallery";
                Global.param.browser = Global.browser;
                Global.param.i_user = Global.b64EncodeUnicode(Global.getCookie('myId'));                
                Global.param.gallery_title = Global.b64EncodeUnicode($('.js-txt-upload-album').val());                

                Request.do('POST',Request.Gallery.set,function(){
                    
                    Global.afterBtnPost(o,text);
                    
                    if(Request.response.status=="1"){
                                                
                        $this.renderDefault(Request.response.data);
                        
                        Component.create.jbox.notif('Ahaa',"Gallery berhasil dibuat.",true);
                            
                        $('.js-txt-upload-album').val('');

                        $('#js-list-assets1').trigger('click');                        

                        $this.handlerButtons();
                        
                    }
                    
                });
            }
            
        });
        
        $('#js-btn-upload-asset').off().on('click',function(){
            
            var text = $(this).text();
                        
            var  o = $(this);
            
            $('#js-form-upload-asset').parsley('validate');

            if($('#js-form-upload-asset').parsley('isValid')){
                    
                Global.prepareBtnPost(o);
                
                if($this.onCropping){
                    
                    
                    $('.cropControlCrop').trigger('click');
                    
                }else{
                                        
                    $this._setItems();                    
                    
                }
                
                Global.prepareBtnPost(o,'Submit');
                
            }
            
        });
        
        $(".action-assets-via-table").click(function(){
            
            $(".view-assets-via-table").show();
            $(".view-assets-via-gallery").hide();

            return false;
         });
         $(".action-assets-via-gallery").click(function(){
             
            $(".view-assets-via-table").hide();
            $(".view-assets-via-gallery").show();

            return false;
         });
                
        
    },
    handlerButtons  :   function(){
        
        var $this = Media;
                
        
        //*ALBUM *//
        //view album
        $.each($('.js-trigger-view-events-list-foto'),function(i,e){
            $(e).off().on('click',function(){                                
                
                $('.js-detail-album').eq(i).trigger('click');
                
            });
        })        
        
        $.each($('.js-detail-album'),function(i,e){

            $(e).off().on('click',function(){

                var code = $(e).data('code');
                var title = $(e).data('title');
                var container='.js-container-list-foto';
                
                $('.js-btn-back').show();                
                
                $this._get.galleryItems(Global.b64EncodeUnicode(code),function(){
                                        
                    Render.gallery.items(Request.response.data,container,'gallery',function(){
                        
                        
                        $this.handlerButtons();
                        
                        $('.js-btn-back').off().on('click',function(){
                        
                            $this._get.gallery(function(){

                                $this.handlerButtons();
                            });
                            
                            $(this).hide();

                        });
                        

                        $.each($(".js-img-check-single"),function(i,e){

                            $(e).off().on('click',function(){

                                $(e).toggleClass("check");

                                if($(e).hasClass("check")){

                                    alert('add selected');

                                }else{

                                    alert('remove selected');

                                }

                                console.log($this.selectedFile);


                            }); 

                        });
                    
                    });
                    
                    
                });
                

            });
        });

        //add album items

        $.each($('.js-add-album'),function(i,e){

            $(e).off().on('click',function(){
                
                var el="";
                var selected="";
                var id=$(e).data('code');
                
                
                if($this.galleries.length > 0){
                                        
                    $.each($this.galleries,function(i,e){
                                                                                                
                        selected=e.code==id?"selected":"";
                        
                        el+="<option value='"+e.code+"' "+selected+">"+e.gallery_title+"</option>"; 
                        
                    });
                    
                    $('#js-opt-album').empty().html(el);

                }

                $('#js-upload-list-assets1').trigger('click');


            });
        });
        
        //delete album

        $.each($('.js-delete-album'),function(i,e){

            $(e).off().on('click',function(){
                
                var code = $(e).data('code');
               
                Component.create.confirm.action(
                                {
                        //type    :   'warning',
                        title   :   'Hapus '+$this.scope,
                        content :   'Apakah Anda ingin menghapus album '+$(e).data('title')+'?'
                    },function(){

                        //hapus gallery ini
                        Component.create.jbox.notif('Opps..',code+' sedang dalam proses perbaikan!',false);
                        

                });                                           

            });
        });
        
        //*END ALBUM *//
        
                
        //change avatar anywhere
        $.each($('.js-change-avatar'),function(i,e){//button jadikan sebagai

            $(e).off().on('click',function(){
               
                var code = $(e).data('code');
                var file = $(e).data('file');
                var path = $(e).data('path');
                var profile = $(e).data('profile');
                
                console.log(code);
                console.log(file);
                console.log(path);
                console.log(profile);                                
                
                $('.js-img-avatar').attr('src',path);
                
                Global._setBrowserActivity('change_avatar');
                Global.param.profile = Global.b64EncodeUnicode(profile);
                Global.param.file = Global.b64EncodeUnicode(file);
                
                //set async
                $('.js-no-image').attr('src',path);
                $('.images-trainer-detail').attr('style',"background-image: url('"+path+"')");
                $('.header-images-user').attr('style',"background-image: url('"+path+"')");
                
                Request.do('POST',Request.Person.profile.change_avatar(),function(){
                    
                    Component.create.jbox.notif('Ahaa..','Foto Avatar telah diperbaharui!',true);
                    $('#uploadAssetsModal').modal('hide');
                    
                });
                
            });
        });        
        
        $.each($('.js-change-events-banner'),function(i,e){

            $(e).off().on('click',function(){
               
                var code = $(e).data('code');
                var file = $(e).data('file');
                var path = $(e).data('path');
                var profile = $(e).data('profile');
                var currentId = $(e).data('selected'); //event id
                
                
                console.log(code);
                console.log(file);
                console.log(path);
                console.log(profile);                                
                
                $('.js-img-events-banner').attr('src',path);
                
                Global._setBrowserActivity('change_events_banner');
                Global.param.i_event = Global.b64EncodeUnicode(currentId);
                Global.param.file = Global.b64EncodeUnicode(file);
                
                Request.do('POST',Request.Events.change_banner(Global.b64EncodeUnicode(currentId),Global.b64EncodeUnicode(file)),function(){
                    
                    Component.create.jbox.notif('Ahaa..','Sampul cover telah diperbaharui!',true);
                    $('#uploadAssetsModal').modal('hide');
                    
                    Events.renderPanel(Request.response.data);
                    
                });
                
            });
        });
        
        $.each($('.js-change-events-gallery'),function(i,e){

            $(e).off().on('click',function(){
               
                var code = $(e).data('code');
                var file = $(e).data('file');
                var path = $(e).data('path');
                var profile = $(e).data('profile');
                var currentId = $(e).data('selected'); //event id
                
                
                console.log(code);
                console.log(file);
                console.log(path);
                console.log(profile);                                
                                                
                Global._setBrowserActivity('add_events_gallery');
                
                //S01.GLR.1709.0000002
                Global.param.i_gallery = Global.b64EncodeUnicode(code); //selectall content of gallery
                Global.param.i_event = Global.b64EncodeUnicode(currentId);
                Global.param.i_user = Global.b64EncodeUnicode(Global.getCookie('myId'));
                Global.param.file = Global.b64EncodeUnicode(file);
                
                Request.do('POST',Request.Events.add_gallery(),function(){
                    
                    Events.renderPanel(Request.response.data);
                    Component.create.jbox.notif('Ahaa..','Foto telah ditambahkan!',true);
                    
                    $('#uploadAssetsModal').modal('hide');
                    
                });
                
            });
        });
        
        $.each($('.js-delete-album-items'),function(i,e){

            $(e).off().on('click',function(){
               
               var code = $(e).data('code');
               
               Component.create.confirm.action(
                                {
                        //type    :   'warning',
                        title   :   'Hapus Data',
                        content :   'Apakah Anda ingin menghapus album '+$(e).data('title')+'?'
                    },function(){

                        //hapus item gallery ini
                        Component.create.jbox.notif('Opps..',code+' Sedang dalam proses perbaikan!',false);

                });

            });
        });        
        
        //*END ALBUM ITEMS*//
        
        
    }
          
}