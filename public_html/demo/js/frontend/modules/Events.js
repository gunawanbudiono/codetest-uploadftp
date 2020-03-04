var Events  =   {
    uri         :   null,
    data        :   {},
    activity  :   'event',
    mode        :   'create',
    groupId     :   $('#myEventGroup').val(),
    selectedId  :   $('#js-txt-current-id').val(),
    is_multiday :   0,
    is_published :   0,
    i_materi    :   null,
    i_materi_item    :   null,
    start_date  :   null,
    start_hour  :   null,
    start_minute  :   null,
    end_date  :   null,
    end_hour  :   null,
    end_minute  :   null,
    type        :   'public',
    level        :   null,
    certificated    :   0,
    categories  :   [],
    i_category  :   null,
    language    :   null,    
    indicator   :   9,
    toPublish   :   0,
    tabHandler  :   function(tabs){
        var state=null;

        $.each($(tabs),function(i,e){
            $(e).off().on('click',function(){
                                
                var a = Global.getCookie('currentTab');
                var scope = $(e).data('scope');
                
                if(scope=='alamat' && Global.getCookie('onEdit')==0){
                    location.reload();
                }
                
                Global.setCookie('currentTab','#js-tab-event-'+scope);
                Global.getCookie('currentTab');

             });
        });


        if(Global.getCookie('tab') !='null'){
          // get object here...
        }

    },                
    search  :function(str){                   
        Request.do('GET',Global.BASE_URL()+"evn/search/"+str,function(){
            Render.events.location(Request.response,'.js-div-event-location');            
        });
    },
    validateEventToPublic    :   function(f){
        var $this = this;
        var date=$('.js-txt-event-publish-date').val();

        Global.errors=[];
        
        $('.js-div_cont_progress').show();  
        $('#js-div-cont-error-validation').empty();            
                
        Global.param.code=Global.b64EncodeUnicode($this.selectedId); 
        Global.param.date=date;
              
        $this.getStepValidationToPublished({
            id      :   $this.selectedId,
            step    :   1,
            url     :   Request.Events.validateToPublish(Global.b64EncodeUnicode($this.selectedId),1),
            title   :   'Cek Sampul Cover!'
        },function(){
            $this.getStepValidationToPublished({
                id      :   $this.selectedId,
                step    :   2,
                url     :   Request.Events.validateToPublish(Global.b64EncodeUnicode($this.selectedId),2),
                title   :   'Cek Judul Acara!'
            },function(){
                            
                $this.getStepValidationToPublished({
                    id      :   $this.selectedId,
                    step    :   3,
                    url     :   Request.Events.validateToPublish(Global.b64EncodeUnicode($this.selectedId),3),
                    title   :   'Cek Deskripsi Acara!'
                },function(){

                    $this.getStepValidationToPublished({
                        id      :   $this.selectedId,
                        step    :   4,
                        url     :   Request.Events.validateToPublish(Global.b64EncodeUnicode($this.selectedId),4),
                        title   :   'Cek Kategori Acara!'
                    },function(){
                        $this.getStepValidationToPublished({
                            id      :   $this.selectedId,
                            step    :   5,
                            url     :   Request.Events.validateToPublish(Global.b64EncodeUnicode($this.selectedId),5),
                            title   :   'Cek Tanggal Acara!'   
                        },function(){
                            
                            $this.getStepValidationToPublished({
                                id      :   $this.selectedId,
                                step    :   6,
                                url     :   Request.Events.validateToPublish(Global.b64EncodeUnicode($this.selectedId),6),
                                title   :   'Cek Venue Acara!'   
                            },function(){
                                
                                $this.getStepValidationToPublished({
                                    id      :   $this.selectedId,
                                    step    :   7,
                                    url     :   Request.Events.validateToPublish(Global.b64EncodeUnicode($this.selectedId),7),
                                    title   :   'Cek Materi!'   
                                },function(){
                                    
                                    $this.getStepValidationToPublished({
                                        id      :   $this.selectedId,
                                        step    :   8,
                                        url     :   Request.Events.validateToPublish(Global.b64EncodeUnicode($this.selectedId),8),
                                        title   :   'Cek FAQ!'
                                    },function(){

                                        $this.getStepValidationToPublished({
                                            id      :   $this.selectedId,
                                            step    :   9,
                                            url     :   Request.Events.validateToPublish(Global.b64EncodeUnicode($this.selectedId),9),
                                            title   :   'Cek Tiket dan Harga!'
                                        },function(){
                                            
                                            $('.js-btn-publish-now').removeClass('disabledanchor').text('Submit');
                                            
                                            var a = Global.errors.length;
                                            var l="";
                                            var m="";

                                            if(a > 0){
                                                if(a==1){

                                                    l="is";
                                                    m="Error";

                                                }else if(a > 1){

                                                    l="are";
                                                    m="Errors";

                                                }

                                                $('#lblCountError').text('Terdapat '+a+" "+m+" dalam draft event Anda, mohon diperbaiki!");

                                            }else{

                                                //publication is published
                                                Component.create.progress({
                                                    title       :   'Proses publikasi..',
                                                    appendTo    :   '.js-div_cont_progress'   

                                                },function(){

                                                    Global.showProgressBar();                                                    
                                                    
                                                    Request.do('POST',Request.Events.setPublish(),function(){
                                                        
                                                        Component.create.jbox.notif('Ahaa..','Event Anda sudah berhasil dipublikasi!',true);
                                                        
                                                        $this.renderPanel(Request.response.data);
                                                        $('#publishModal').modal('hide');
                                                        
                                                        //document.location.href=$this.uri;
                                                        
                                                    });


                                                });


                                            }

                                        });
                                    });                                
                                });
                            });
                        });
                    });
                });
            });
        });

        f();
    },
    getStepValidationToPublished   :   function(p,f){
        var $this = this;                

        $.ajaxSetup({

            headers: Request.headers

        });  

        $.ajax({
            type        :   'get',
            url         :   p.url,
            dataType    :   'json',                
            beforeSend  :   function(){
                Global.cekConsole();
                $('#lbl_pg_bar').text('');
                
                Component.create.progress({
                    title       :   p.title,
                    appendTo    :   '.js-div_cont_progress'   
                },function(){
                    Global.showProgressBar();
                });
            },
            statusCode: {
                200: function (r) {

                    $('#prg_bar').css({
                        width   :   "100%"
                    });
                    
                    if(r.status==0){

                        $.each(r.errors,function(i,e){
                            
                           Global.errors.push(e);                           
                           Global.displayErrors('#js-div-cont-error-validation');                               
                        });

                    }
                    $('#lbl_pg_bar').text('Data sudah lengkap!');

                    f();

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

            }

        });
    },                
    materi  :   {
        scope   :   null,
        data    :   [],
        trainer :   Global.getCookie('myProfile'),
        selectedId  :   null,
        selectedTrainer :   Global.getCookie('myProfile'),        
        clearForm   :function(){
            
            $('.js-txt-session-detail').focus();
            $('.js-txt-session-detail').val('');
            $('.js-txt-session-description').val('');
            $('.js-opt-event-materi-start-minute').val('00');
            $('.js-opt-event-materi-end-minute').val('00');
                        
        },
        refresh :   function(){
            
            var $this = Events;
                        
            $this.materi.render(Events.materi.data,'#js-div-table-item-materi'); //show in table
            $this.materi.fireEvent();
        },        
        renderForm  :function(data,index){
            var $this = Events;
            var el="";
            var startHour="";
            var startHourTime="AM";
            
            var endHour="";
            var endHourTime="AM";
            
            var selected1="";
            var selected2="";
            var n=1;                                                
                el+="<form id='js-form-edit-materi'>";
                
                    $.each(data,function(i,e){
                        
                        el+="<div class='well-alt'>";                    
                        
                        el+="ITEM "+n+"<div class='clearer'></div>";
                                        
                        el+="<div class='row'>";
                            el+="<div class='col-md-6'>";
                                el+="<div class='text-label'>Jam Mulai</div>";
                                el+="<div class='row'>";
                                    el+="<div class='col-md-6'>";
                                        el+="<span class='select-option'>";
                                            el+="<select  name='js-opt-edit-event-materi-start-hour' class='js-opt-edit-event-materi-start-hour' required >";
                                                for(var i=1;i< 24;i++){                                                                                                        
                                                                                                                                                            
                                                    if(i < 10){
                                                        startHour = '0'+i;                                                        
                                                    }else{
                                                        startHour=i;
                                                    }
                                                                                                        
                                                    
                                                    if(startHour == e.start_hour){
                                                        
                                                        selected1="selected";
                                                    }else{
                                                        selected1="";
                                                    }
                                                    
                                                    if(i>12){
                                                        startHourTime="PM";
                                                    }
                                                    el+="<option value='"+startHour+"' data-time='"+startHourTime+"' "+selected1+">"+startHour+" "+startHourTime+"</option>";
                                                    
                                                }
                                                
                                                
                                            el+="</select>";
                                        el+="</span>";
                                    el+="</div>";
                                    el+="<div class='col-md-6'>";
                                        el+="<span class='select-option'>";
                                            el+="<select  name='js-opt-edit-event-materi-start-minute' class='js-opt-edit-event-materi-start-minute' required>";
                                                var x="";
                                                
                                                for(var i=0;i< 60;i++){
                                                    
                                                    if(i < 10){
                                                        
                                                        i="0"+i;                                                        
                                                        
                                                    }
                                                    
                                                    if(i==e.start_minute){
                                                        
                                                        x="selected";
                                                        
                                                    }else{
                                                        x="";
                                                    }
                                                    
                                                    el+="<option value='"+i+"' "+x+">"+i+"</option>";
                                                    
                                                }                                                                                                
                                                
                                            el+="</select>";
                                        el+="</span>";
                                    el+="</div>";
                                el+="</div>";
                            el+="</div>";
                            
                            el+="<div class='col-md-6'>";
                                el+="<div class='text-label'>Jam berakhir</div>";
                                el+="<div class='row'>";
                                    el+="<div class='col-md-6'>";
                                        el+="<span class='select-option'>";
                                            el+="<select  name='js-opt-edit-event-materi-end-hour' class='js-opt-edit-event-materi-end-hour' required>";
                                                for(var i=1;i< 24;i++){
                                                    
                                                    if(i < 10){
                                                        endHour = '0'+i;                                                        
                                                    }else{
                                                        endHour=i;
                                                    }
                                                    
                                                    if(endHour== e.end_hour){
                                                        selected2="selected";
                                                    }else{
                                                        selected2="";
                                                    }
                                                    
                                                    if(i>12){
                                                        
                                                        endHourTime="PM";
                                                        
                                                    }
                                                    el+="<option value='"+endHour+"' data-time='"+endHourTime+"' "+selected2+">"+endHour+" "+endHourTime+"</option>";
                                                    
                                                }
                                            el+="</select>";
                                        el+="</span>";
                                    el+="</div>";
                                    el+="<div class='col-md-6'>";
                                        el+="<span class='select-option'>";
                                            el+="<select name='js-opt-edit-event-materi-end-minute' class='js-opt-edit-event-materi-end-minute' required>";
                                            
                                                var x="";
                                                
                                                for(var i=0;i< 60;i++){
                                                    
                                                    if(i < 10){
                                                        
                                                        i="0"+i;                                                        
                                                        
                                                    }
                                                    
                                                    if(i==e.end_minute){
                                                        x="selected";
                                                        
                                                    }else{
                                                        x="";
                                                    }
                                                    
                                                    el+="<option value='"+i+"' "+x+">"+i+"</option>";
                                                    
                                                }                                                                                                
                                                
                                            el+="</select>";
                                        el+="</span>";
                                    el+="</div>";
                                el+="</div>";
                            el+="</div>";
                            
                            el+="<div class='col-md-12'>";
                                el+="<div class='text-label'>Sesi</div>";
                                el+="<input type='text' name='js-txt-edit-session-detail' class='text-default js-txt-edit-session-detail' value='"+e.materi_session+"' required>";
                                el+="<div class='text-label'>Deskripsi</div>";
                                el+="<textarea class='textarea-default js-txt-edit-session-description' required>"+e.materi_description+"</textarea>";
                            el+="</div>";
                            
                        el+="</div>";                                                
                        
                        el+="</div>"; // end well
                        n++;
                        
                    });                                        
                                    
                                
                el+="<p>";
                
                el+="<div align='right'>";
                    el+="<a href='#' class='button-default js-save-edit-materi'>Simpan</a>";
                    el+="<a href='#' class='button-cancel cancel-edit-material js-cancel-content-materi'>Batal</a>";
                el+="</div>";
                
                el+="</form>";
                
            
            $('.js-div-edit-table-materi-'+index).hide();
            $('.js-div-edit-'+index).empty().html(el).show();
            
            
            $('.js-btn-add-edit-materi').off().on('click',function(){
                
                
                
                return false;
                
            });
           
            $('.js-cancel-content-materi').off().on('click',function(){
                
                $('.view-content-material').show();
                $('.js-div-edit-table-materi-'+index).show();
                $('.js-div-edit-'+index).hide();
                
                $('.div-cover-btn').show();
                
                return false;
                
            });
           
            $('.js-save-edit-materi').off().on('click',function(){
                
                //update materi data before push
                $('#js-form-edit-materi').parsley('validate');
                
                if($('#js-form-edit-materi').parsley('isValid')){
                    
                    Component.create.confirm.action(
                        {
                            //type    :   'question',
                            title   :   'Perubahan Data',
                            content :   'Apakah Anda ingin merubah?'
                        },function(){
                                
                            Events.materi.data=[];
                            
                            $.each($('.js-txt-edit-session-detail'),function(i,e){
                                                        
                                Events.materi.data.push({                    
                                    'i_person'              :   $this.materi.trainer,
                                    'materi_session'        :   $('.js-txt-edit-session-detail').eq(i).val(),
                                    'materi_description'    :   $('.js-txt-edit-session-description').eq(i).val(),                                                                                
                                    'start_hour'            :   $('.js-opt-edit-event-materi-start-hour').eq(i).find(":selected").val(),
                                    'start_time'            :   $('.js-opt-edit-event-materi-start-hour').eq(i).find(":selected").data('time'),
                                    'start_minute'          :   $('.js-opt-edit-event-materi-start-minute').eq(i).find(":selected").val(),
                                    'end_hour'              :   $('.js-opt-edit-event-materi-end-hour').eq(i).find(":selected").val(),
                                    'end_minute'            :   $('.js-opt-edit-event-materi-end-minute').eq(i).find(":selected").val(),
                                    'end_time'              :   $('.js-opt-edit-event-materi-end-hour').eq(i).find(":selected").data('time'),
                                });


                            });
                            
                            console.table(Events.materi.data);
                            

                            Global.param.i_event = Global.b64EncodeUnicode($this.selectedId);
                            Global.param.items=Events.materi.data;

                            if(Events.materi.data.length > 0){

                                Request.do('POST',Request.Events.updateMateri(Global.b64EncodeUnicode($this.i_materi),'json'),function(){
                                    
                                    $this.renderPanel(Request.response.data);
                                    $('.js-cancel-content-materi').trigger('click');
                                });

                                Component.create.jbox.notif('Ahaa..','Data sudah diperbaharui!',true);

                            }else{

                                Component.create.jbox.notif('Opps..','Data gagal diperbaharui!',false);

                            }                    
                            
                    });
                    
                    return false;               
                }
            });
            
        },
        setMateri  :   function(f){
        
            var $this = Events;

            Request.do('POST',Request.Events.setMateri('json'),function(){
                
                f();

            });
        },        
        delMateri:function(f){
            var $this = Events;
            
            Request.do('POST',Request.Events.delMateri('json'),function(){                                

                f();

            });
        },
        updateMateriItem  :   function(f){
        
            var $this = Events;

            Request.do('POST',Request.Events.updateMateriItem('json'),function(){
                
                f();

            });
        },
        delMateriItem:function(f){
            var $this = Events;
            
            Request.do('POST',Request.Events.delMateriItem('json'),function(){                                

                f();

            });
        },
        fireEvent :   function(){
            var $this = Events;
            var me = Events.onEdit;
            
            $('.readOnly').raty({ readOnly: true, score: 0 });
            $('.actionStar').raty({ half: true }); // Default Course Review
            $('.div-group-modify-btn-materi').hide();
            
            $.each($('.table-silabus tbody tr'),function(i,e){
                
               $(e).mouseenter(function(){
                   
                   $('.div-group-modify-btn-materi').eq(i).show();
                   
                   $(e).css({
                       cursor           :   'pointer'
                   });                                      
                   
                }).on('mouseleave',function(){
                    
                    $('.div-group-modify-btn-materi').eq(i).hide();
                    
                }).on('dblclick',function(){
                   
                   Events.materi.scope='edit';
                   $('.js-save-content-material').text('Simpan');
                   
                   var i_item = $(e).data('code');
                   $this.i_materi_item=i_item;
                   
                   var start_hour = $(e).data('start_hour');
                   $('.js-opt-event-materi-start-hour').val(start_hour);
                                      
                   var start_minute = $(e).data('start_minute');                   
                   $('.js-opt-event-materi-start-minute').val(start_minute);
                   
                   var end_hour = $(e).data('end_hour');
                   $('.js-opt-event-materi-end-hour').val(end_hour);
                   
                   var end_minute = $(e).data('end_minute');
                   $('.js-opt-event-materi-end-minute').val(end_minute);
                                      
                   var title = $(e).data('title');
                   $('.js-txt-session-detail').val(title);
                   
                   var description = $(e).data('description');
                   $('.js-txt-session-description').val(description);
                   
                   $('.js-head-materi').hide();
                   $('.form-content-material').show();
                   
                   $('.view-content-material').hide();
                   $('.js-btn-remove-item-materi').show();
                   
               });
               
            });
            
            $.each($('.box-content-material-root'),function(i,e){
            
                $(e).off().on('mouseenter',function(){                                

                    $('.div-group-modify-btn-materi-root').hide()
                    $('.div-group-modify-btn-materi-root').eq(i).show();

                }).on('mouseleave',function(){

                    $('.div-group-modify-btn-materi-root').hide()

                });

            });
            
            $.each($('.box-content-material'),function(i,e){
            
                $(e).off().on('mouseenter',function(){                                

                    $('.div-group-modify-btn-materi').hide()
                    $('.div-group-modify-btn-materi').eq(i).show();

                }).on('mouseleave',function(){

                    $('.div-group-modify-btn-materi').hide()

                });

            });
            
            $.each($('.js-btn-edit-view-materi'),function(i,e){
                
               $(e).off().on('click',function(){
                   
                   $('.table-silabus tbody tr').eq(i).trigger('dblclick');
                   
                   return false;
                   
               });
               
            });
           
            $.each($('.js-btn-remove-view-materi'),function(i,e){
               $(e).off().on('click',function(){
                   var code = $(e).data('code');
                   
                   Component.create.confirm.action(
                        {                            
                            title   :   'Hapus Data',
                            content :   'Apakah Anda ingin menghapus?'
                        },function(){
                   
                            me.state = 'delete';
                            //Global._setBrowserActivity($this.activity+'_delete_materi',$this.selectedId);
                            Global.param.code = Global.b64EncodeUnicode($this.selectedId);
                            Global.param.materi_id = Global.b64EncodeUnicode($(e).data('code'));
                            
                            
                            $this.materi.delMateri(function(){

                                $this.renderPanel(Request.response.data);

                            });                    
                            
                    });
                    
                    return false;
               }); 
            });
            
            $.each($('.js-btn-remove-item-materi'),function(i,e){
                
               $(e).off().on('click',function(){
                   
                   var code = $(e).data('code');                   
                   $this.i_materi_item=code;                                      
                   
                   Component.create.confirm.action(
                        {                            
                            title   :   'Hapus Data',
                            content :   'Apakah Anda ingin menghapus?'
                        },function(){
                            
                            me.state = 'delete';
                            //Global._setBrowserActivity($this.activity+'_delete_materi',$this.selectedId);
                            Global.param.code = Global.b64EncodeUnicode($this.selectedId);
                            Global.param.i_materi_item = Global.b64EncodeUnicode($this.i_materi_item);

                            $this.materi.delMateriItem(function(){                                
                                $this.renderPanel(Request.response.data);                                
                                Global.param={};
                            });

                    });
                                      
                   
                   return false;
                   
               }) 
            });
            
            $.each($('.js-opt-event-materi-trainer'),function(i,e){

                $(e).off().on('ifChanged', function(event){
                                                    
                    var targetBox = $("." + event.target.value);
                    $(".m-box-trainer").not(targetBox).hide();
                    $(targetBox).show();
                                    
                    $this.materi.trainer=event.target.value=="sendiri"?Global.getCookie('myProfile'):$this.materi.trainer;
                    
                    console.log("last post trainer"+$this.materi.trainer); 
                                        
                    
                    if(event.target.value=='partner-trainer'){
                                                
                        console.log('find the person by creator');
                        
                        $this.onEdit.loadOtherPartner(function(){
                            
                            $.each($('.js-chk-other-trainer'),function(i,e){
                                
                                $(e).off().on('ifChanged', function(event){
                                    
                                    if(event.target.checked){
                                        
                                        $this.materi.trainer=event.target.value;
                                        
                                    }else{
                                        
                                        $this.materi.trainer=Global.getCookie('myProfile');
                                    }
                                    
                                });                            
                                 
                             });
                        
                            $this.onEdit.handler();
                        });
                        
                                                
                    }
                    
                    
                });

            });
            
            //trigger to person modules
            
            $('.js-btn-add-other-trainer').off().on('click',function(){
                
                $('#addTrainerModal').modal({backdrop: 'static', keyboard: false}).on('shown.bs.modal', function(e) {
                    
                    $('.js-action-education').hide();
                    $('.js-action-work-experience').hide();
                    $('.js-action-achievement').hide();                    
                    
                    if(Profile.triggerIn==0){
                        
                        Profile.triggerIn=1;
                        Profile.scope="event";
                        Profile.activity="create_profile";

                        //get region value
                        Region.getRoot(function(){

                            Region.render('.js-opt-region',null,function(){

                                Region.getById(Global.b64EncodeUnicode(null),function(){

                                    Region.render('.js-opt-subregion',null,function(){



                                    });

                                });

                            });

                        });

                        Profile.handler();
                        
                    }else{
                        
                        Profile.handler();
                        
                    }
                    
                }).on("hidden.bs.modal",function(e){
                    
                    $this.onEdit.loadOtherPartner(function(){
                        $this.onEdit.handler();
                    });
                    
                    
                });
                
                $('.js-btn-submit-other-trainer').off().on('click',function(){
                    $('.close').trigger('click');
                });
                
                return false;
            });
            
            //show form materi item
            $.each($('.js-btn-show-form-materi'),function(i,e){
                
               $(e).off().on('click',function(){
                   
                   Events.materi.scope='create';
                   $('.js-save-content-material').text('Simpan');
                   
                    var id = $(e).data('code');
                    $('.js-txt-session-detail').focus();
                    $('.js-txt-event-materi-date').val(Global.formatDateEngToIndo($(e).data('date')));
                    
                    $this.materi.selectedId=id;
                                        
                    //view form
                    
                    $('.js-head-materi').show();
                    $('.view-content-material').hide();
                    $('.form-content-material').show();
                    $('.js-btn-remove-item-materi').hide();
                                        
                    //Component.moveDomToCenter('.form-content-material');                    
                    $this.onEdit.resetFormMateri();
                    Events.materi.fireEvent();
                    
                    return false;
                   
               }); 
            });                                    
                        
            $('.js-cancel-content-material').click(function(){                                
                
                $('.view-content-material').show();
                $('.form-content-material').hide();
                                                
                return false;
            });
        }
    },
    multidate   :   {
        data    :   [],
        lastDate:   null,
        minDate :   null,
        refresh :   function(){
            
            var $this=this;
            Events.multidate.data=[];
            
            $.each($('.js-txt-event-custom-start-date'),function(i,e){
                
                if($(e).val()!= ""){
                                        
                    Events.multidate.data.push({
                         'i_event'       :   Events.selectedId,
                         'start_date'    :   $('.js-txt-event-custom-start-date').eq(i).val(),                    
                         'start_hour'    :   '00',
                         'start_time'    :   '00',
                         'start_minute'  :   'AM',                    
                         'end_hour'      :   '00',
                         'end_minute'    :   '00',
                         'end_time'      :   'AM'                    
                    }); 
                                    
                }
            });
            
            Events.multidate.data.sort(function(a, b){
                var a1= a.start_date, b1= b.start_date;
                if(a1== b1) return 0;
                return parseInt(a1)> parseInt(b1)? 1: -1;
            });
            
            Render.events.form.loopMultidate('.js-form-table-custom-date',Events.multidate.data,function(){
                $this.fireEvent();
            });
                                   
            
        },
        fireEvent   :function(){
            var $this = Events;                        
            
            $this.onEdit.setPicker();
                                    
            
            $.each($('.js-btn-remove-multidate'),function(i,e){
                
                $(e).off().on('click',function(){
                                                                                
                    Component.create.confirm.action(
                        {                            
                            title   :   'Hapus Data',
                            content :   'Apakah Anda ingin menghapus?'
                        },function(){
                            
                            $(e).parent().parent().parent().parent().remove();                                                        
                            
                            Events.multidate.refresh();                                                        
                            
                    });

                    return false;                
                    
                });
            });
                                                               
        },
        render  :function(data,o){
            
            var $this = Events.multidate;
            var el="";
            var n=1;
            
            if(data.length > 0){
                el+="<div class='panel panel-default'>";
                    el+="<div class='panel-heading'>";
                        el+="Multi Sesi";
                    el+="</div>";
                    el+="<div class='panel-body'>";
                        el+="<table class='table table-responsive'>";
                                el+="<thead>";
                                el+="<tr>";
                                    el+="<th>";
                                        el+="Hari";
                                    el+="</th>";
                                    el+="<th>";
                                        el+="Tanggal";
                                    el+="</th>";                                    
                                    
                                    el+="<th>";
                                    el+="</th>";
                                    
                                el+="</tr>";
                                el+="</thead>";
                                el+="<tbody>";
                                    $.each(data,function(i,e){
                                        
                                        el+="<tr class='multidate-items'>";
                                            el+="<td>";
                                                el+=n;
                                            el+="</td>";
                                            el+="<td>";
                                                el+=Global.formatDateEngToIndo(e.start_date);
                                            el+="</td>";                                            
                                            el+="<td>";
                                                el+="<a href='#' class='js-btn-delete-multidate-item'><span class='glyphicon glyphicon-trash '></span></a>";
                                            el+="</td>";
                                        el+="</tr>";

                                        n++;

                                    });

                                el+="</tbody>";                                                            
                            el+="</table>";

                        el+="</div>";

                    el+="</div>";
                el+="</div>";
                
                
            }
            
            $(o).empty().html(el);
            
        }
    },
    tickets   :   {
        mode        :   'create',
        isFree      :   0,
        isPromo     :   0,        
        isEarlybird :   0,
        allowedSave :true,
        data    :   [],
        scope   :   null,
        clicked :   0,
        earlybird   :   {
            data    :   [],
            render  :   function(){
                
            }
        },
        selectedId   :  null,
        setProperty :   function(a){
            var $this = Events;
            Events.tickets.selectedId=a.code;
                              
            
            if(a.scope=='free'){
                    
                $this.is_free=1;
                $this.tickets.isFree = 1;
                $this.tickets.isPromo = 0;
                $this.tickets.isEarlybird=0;
                
                //form
                if(Events.tickets.mode=='edit'){
                    
                    //render form value
                    $('.js-txt-free-ticket-seats').val(a.seats).number(true,0);
                    $('.js-txt-ticket-description-free').val(a.description);                    
                    
                    $('.free').show();
                    $('.normal').hide();
                    $('.discount').hide();
                    $('.earlybird').hide();
                }

                $('.js-btn-save-ticket-default').hide();
                $('.js-btn-save-ticket-free').show();
                $('.js-btn-save-ticket-normal').hide();
                $('.js-btn-save-ticket-discount').hide();
                $('.js-btn-save-ticket-earlybird').hide();

                $('.js-txt-ticket-type').attr('disabled','disabled')

            }else if(a.scope=='normal'){

                $this.is_free=0;
                $this.tickets.isFree = 0;
                $this.tickets.isPromo = 0;
                $this.tickets.isEarlybird=0;
                
                //form
                if(Events.tickets.mode=='edit'){
                    
                    $('js-opt-currency-normal').val(a.currency);
                    $('.js-txt-ticket-normal-price').val(a.price_normal).number(true,0);
                    $('.js-txt-ticket-normal-seats').val(a.seats).number(true,0);
                    $('.js-txt-ticket-description-normal').val(a.description);
                    
                    $('.free').hide();
                    $('.normal').show();
                    $('.discount').hide();
                    $('.earlybird').hide();
                }
                
                $('.js-btn-save-ticket-default').hide();
                $('.js-btn-save-ticket-free').hide();
                $('.js-btn-save-ticket-normal').show();
                $('.js-btn-save-ticket-discount').hide();
                $('.js-btn-save-ticket-earlybird').hide();

                $('.js-txt-ticket-type').removeAttr('disabled');

            }else if(a.scope=='discount'){

                $this.is_free=0;
                $this.tickets.isFree = 0;
                $this.tickets.isPromo = 1;                    
                $this.tickets.isEarlybird=0;

                //form
                if(Events.tickets.mode=='edit'){                                        
                    
                    $('js-opt-currency-discount').val(a.currency);
                    $('.js-txt-ticket-discount-price').val(a.price_normal).number(true,0);
                    $('.js-txt-ticket-discount-fix').val(a.price).number(true,0);                    
                    $('.js-txt-ticket-discount-value').val(a.discount).number(true,0);
                    
                    $('.js-txt-ticket-discount-seats').val(a.seats).number(true,0);
                    $('.js-txt-ticket-description-discount').val(a.description);
                    
                    $('.free').hide();
                    $('.normal').hide();
                    $('.discount').show();
                    $('.earlybird').hide();
                }
                
                $('.js-btn-save-ticket-default').hide();
                $('.js-btn-save-ticket-free').hide();
                $('.js-btn-save-ticket-normal').hide();
                $('.js-btn-save-ticket-discount').show();
                $('.js-btn-save-ticket-earlybird').hide();

                $('.js-txt-ticket-type').removeAttr('disabled');

            }else if(a.scope=='earlybird'){

                $this.is_free=0;
                $this.tickets.isFree = 0;
                $this.tickets.isPromo = 0;
                $this.tickets.isEarlybird=1;

                //form
                if(Events.tickets.mode=='edit'){
                    //form
                    $('js-opt-currency-earlybird').val(a.currency);
                    $('.js-txt-ticket-earlybird-price').val(a.price_normal).number(true,0);                    
                    $('.js-txt-ticket-early-fix').val(a.price).number(true,0);                    
                    $('.js-txt-ticket-earlybird-rate').val(a.price).number(true,0);                    
                    
                    $('.js-txt-ticket-discount-earlybird-value').val(a.discount).number(true,0);                    
                    $('.js-txt-ticket-earlybird-seats').val(a.seats).number(true,0);
                    $('.js-txt-ticket-earlybird-maxperson').val(a.seats).number(true,0);
                    $('.js-txt-ticket-description-earlybird').val(a.description);
                    
                    $('.free').hide();
                    $('.normal').hide();
                    $('.discount').hide();
                    $('.earlybird').show();
                }
                
                $('.js-btn-save-ticket-default').hide();
                $('.js-btn-save-ticket-free').hide();
                $('.js-btn-save-ticket-normal').hide();
                $('.js-btn-save-ticket-discount').hide();
                $('.js-btn-save-ticket-earlybird').show();

                $('.js-txt-ticket-type').removeAttr('disabled');

            }else{

                Events.tickets.resetForm();

            }
        },
        saveTicket  :   function(scope,ticket_name){ 
                                                
            $('#js-form-'+scope+'-ticket').parsley('validate');
                        
            if($('#js-form-'+scope+'-ticket').parsley('isValid')){
                
                var table="";
                table+="<table class='table table-resposive'>";
                    table+="<tr>";
                        table+="<td>";
                            table+="Harga Normal";
                        table+="</td>";
                        table+="<td>";
                            table+=parseFloat($('.js-txt-ticket-discount-price').val()).formatMoney();
                        table+="</td>";
                    table+="</tr>";

                    table+="<tr>";
                        table+="<td>";
                            table+="Total Tiket";
                        table+="</td>";
                        table+="<td>";
                            table+=$('.js-txt-ticket-discount-seats').val();
                        table+="</td>";
                    table+="</tr>";

                    table+="<tr>";
                        table+="<td>";
                            table+="Diskon";
                        table+="</td>";
                        table+="<td>";
                            table+=parseFloat($('.js-txt-ticket-discount-value').val())+" %";
                        table+="</td>";
                    table+="</tr>";

                    table+="<tr>";
                        table+="<td>";
                            table+="Harga Diskon";
                        table+="</td>";
                        table+="<td>";
                            table+=parseFloat($('.js-txt-ticket-discount-fix').val()).formatMoney();
                        table+="</td>";
                    table+="</tr>";
                    
                table+="</table>";
                
                var s=scope=='discount'?table+"<br>":s;

                Component.create.confirm.action(
                    {                                        
                        title   :   'Simpan Data',
                        content :   s+"Apakah Anda ingin menyimpan?"

                    },function(){
                        
                        var url="";                                                                        
                        
                        Events.tickets.setParam(scope);
                        
                        
                        Global.prepareBtnPost($('.js-btn-save-ticket-'+scope));
                        
                        if(Events.tickets.mode=='create'){
                            
                            url=Request.Tickets.set();                            
                            
                        }else if(Events.tickets.mode=='edit'){
                                                                                                               
                            url=Request.Tickets.update();
                            
                        }
                        
                        Request.do('POST',url,function(){

                            if(Request.response.status==1){  
                                                                
                                Events.renderPanel(Request.response.data);

                                Events.tickets.resetForm();

                                $('#priceTicketsModal').modal('hide');

                                Component.create.jbox.notif('Ahaa..','Tiket '+ticket_name.ucwords()+' berhasil dibuat!',true);

                            }else{

                                Component.create.jbox.notif('Opps..','Nama Tiket untuk event ini sudah dibuat!',false);
                                $('.js-txt-ticket-type').focus();

                            }

                            Global.afterBtnPost($('.js-btn-save-ticket-'+scope),'Simpan');

                        });

                    }
                );

            }
                        
        },
        resetForm   :   function(){
            
            var $this = Events.tickets;
            
            $this.data=[];                 
            
            $('.js-opt-ticket-price-type').removeAttr('disabled');
            $('.js-txt-ticket-type').removeAttr('disabled');
            
            //give popove for what must first select
            //Component.create.jbox.tooltip('Halo','Pilih harga terlebih dahulu.',true,'.js-lbl-price-type');
            $('.js-lbl-price-type').trigger('click');                    
            //end give

            //reset form
            $('.js-txt-ticket-type').val('');
            $('.js-txt-ticket-description').val('');
            $('.js-opt-ticket-price-type').val('');
            
            //reset form free
            $('.js-txt-free-ticket-seats').val(0);
            $('.js-txt-ticket-description-free').val('');
            
            //reset form normal
            $('.js-txt-ticket-normal-price').val(0);
            $('.js-txt-ticket-normal-seats').val(0);
            $('.js-txt-ticket-description-normal').val('');
            
            //reset form discount
            $('.js-txt-ticket-discount-price').val(0);
            $('.js-txt-ticket-discount-seats').val(0);
            $('.js-txt-ticket-discount-value').val(0);
            $('.js-txt-ticket-description-discount').val('');
            $('.js-txt-ticket-discount-fix').val(0);
            
            //reset form earlybird
            $('.js-txt-ticket-earlybird-price').val(0);
            $('.js-txt-ticket-earlybird-seats').val(0);
            $('.js-txt-ticket-discount-earlybird-value').val(0);            
            $('.js-txt-ticket-description-earlybird').val('');
            
            $('.js-txt-ticket-earlybird-rate').val(0);            
            $('.js-txt-ticket-earlybird-maxperson').val(0);
            $('.js-txt-ticket-early-fix').val(0);

            //form
            $('.free').hide();
            $('.normal').hide();
            $('.discount').hide();
            $('.earlybird').hide();
            
            
            //button
            $('.js-btn-save-ticket-default').show();
            $('.js-btn-save-ticket-free').hide();
            $('.js-btn-save-ticket-normal').hide();
            $('.js-btn-save-ticket-discount').hide();
            $('.js-btn-save-ticket-earlybird').hide();
            
            
        },
        setParam    :   function(scope){
            
            var $this=Events;
            
            switch(scope){
                            
                case       'free':

                    Global.param.email = Global.getCookie('myEmail');
                    Global.param.fields = {
                        i_event             :   Events.selectedId,
                        ticket_name         :   $('.js-txt-ticket-type').val(),
                        ticket_description  :   $('.js-txt-ticket-description-free').val(),
                        ticket_currency     :   $('.js-opt-currency').val(),
                        ticket_price        :   0,
                        ticket_fix_price    :   0,
                        ticket_seats        :   $('.js-txt-free-ticket-seats').val(),
                        ticket_available    :   $('.js-txt-free-ticket-seats').val(),
                        ticket_paid         :   0,
                        ticket_retur        :   0, 
                        is_free             :   $this.tickets.isFree,
                        is_promo            :   $this.tickets.isPromo,
                        is_earlybird        :   $this.tickets.isEarlybird,
                    }

                break;

                case    "normal":
                    Global.param.email = Global.getCookie('myEmail');
                    Global.param.fields = {
                        i_event             :   Events.selectedId,
                        ticket_name         :   $('.js-txt-ticket-type').val(),
                        ticket_description  :   $('.js-txt-ticket-description-normal').val(),
                        ticket_currency     :   $('.js-opt-currency').val(),
                        ticket_price        :   $('.js-txt-ticket-normal-price').val(),
                        ticket_fix_price    :   $('.js-txt-ticket-normal-price').val(),
                        ticket_seats        :   $('.js-txt-ticket-normal-seats').val(),                                
                        ticket_available    :   $('.js-txt-ticket-normal-seats').val(),
                        ticket_paid         :   0,
                        ticket_retur        :   0, 
                        is_free             :   $this.tickets.isFree,
                        is_promo            :   $this.tickets.isPromo,
                        is_earlybird        :   $this.tickets.isEarlybird,
                    }

                break;
                case    "discount":
                                        
                    Global.param.email = Global.getCookie('myEmail');
                    Global.param.fields = {
                        i_event             :   Events.selectedId,
                        ticket_name         :   $('.js-txt-ticket-type').val(),
                        ticket_description  :   $('.js-txt-ticket-description-discount').val(),
                        ticket_currency     :   $('.js-opt-currency').val(),
                        ticket_price        :   $('.js-txt-ticket-discount-price').val(),
                        ticket_fix_price    :   $('.js-txt-ticket-discount-fix').val(), //hitung
                        ticket_discount     :   $('.js-txt-ticket-discount-value').val(),
                        ticket_seats        :   $('.js-txt-ticket-discount-seats').val(),
                        ticket_available    :   $('.js-txt-ticket-discount-seats').val(),
                        ticket_paid         :   0,
                        ticket_retur        :   0, 
                        is_free             :   $this.tickets.isFree,
                        is_promo            :   $this.tickets.isPromo,
                        is_earlybird        :   $this.tickets.isEarlybird,
                    }

                break;

            }
            
            if(Events.tickets.mode=='edit'){
                
                Global.param.fields.i_ticket=Events.tickets.selectedId;
                
            }
                        
        },
        handler :   function(){
            
            var $this = Events.onEdit;
            
            $('.div-group-modify-btn-ticket').hide();
            
            $('.js-txt-ticket-normal-price, .js-txt-ticket-discount-price, .js-txt-ticket-earlybird-price').focus(function(){
                
                $('#js-div-rekomendasi-price').show();
                $('#js-div-terbilang').show();
                
            }).blur(function(){
                
                $('#js-div-rekomendasi-price').hide();
                $('#js-div-terbilang').hide();
                
            }).keydown(function(){
                
                $(this).number(true,0);                 
                
            });
            
            //number format when user change
            $.each($('.digit'),function(i,e){
                
                $(e).keydown(function(){
                
                    $(e).number(true,0);
                    //terbilang('.digit','#js-result-terbilang');
                    
                });
                
            });
            
            $('#btn-cal-disc').click(function(){
                
                var a=$('.js-txt-ticket-discount-value').val()==""?0:$('.js-txt-ticket-discount-value').val();
                var b = $('.js-txt-ticket-discount-price').val();
                var c=$('.js-txt-ticket-discount-price').val()-(parseFloat(a)*parseFloat(b))/100;
                
                if(c > 0){
                    $('.js-txt-ticket-discount-fix').val(c).number(true,0);
                    Events.tickets.allowedSave=true;
                }else{
                    Events.tickets.allowedSave=false;
                }
                
                return false;
            });
            
            $('#btn-cal-disc-early').click(function(){
                
                var a=$('.js-txt-ticket-earlybird-price').val()==""?0:$('.js-txt-ticket-earlybird-price').val();
                var b = $('.js-txt-ticket-discount-earlybird-value').val();
                var c= ($('.js-txt-ticket-earlybird-price').val()-(parseFloat(a)*parseFloat(b))/100);
                
                if(c > 0){
                    $('.js-txt-ticket-early-fix').val(c).number(true,0);
                    $('.js-txt-ticket-earlybird-rate').val($('.js-txt-ticket-early-fix').val()).number(true,0);
                    
                    Events.tickets.allowedSave=true;
                }else{
                    
                    Events.tickets.allowedSave=false;
                }
                
                return false;
            });
            
            
            $('#js-show-ticket').off().on('click',function(){
                                               
                if(Events.tickets.clicked==0){
                    $('.js-div-render-ticket').show();
                    $(this).attr('data-scope','hide').text('Sembunyikan');
                    Events.tickets.clicked=1;                    
                }else if(Events.tickets.clicked==1){
                    $('.js-div-render-ticket').hide();
                    $(this).attr('data-scope','show').text('Lihat');
                    Events.tickets.clicked=0;
                    
                }
                
                Events.tickets.handler();
                return false;
            });
            
            
            $.each($('.tickets'),function(i,e){
                
               $(e).mouseenter(function(){
                   
                   $(e).css({
                       
                       cursor   :   'pointer'
                   });
                   
                   $('.div-group-modify-btn-ticket').eq(i).show();
                   
               }).mouseleave(function(){
                   
                   $('.div-group-modify-btn-ticket').eq(i).hide();
                   
               });
               
            });
            
            $.each($('.js-btn-edit-ticket'),function(i,e){
               $(e).off().on('click',function(){
                   //default
                   var ticket_type="normal";
                    Events.tickets.mode="edit";
                                                            
                    var prop={
                        code : $(e).data('code'),
                        ticket : $(e).data('ticket'),
                        currency : $(e).data('currency'),
                        price : $(e).data('price'),
                        price_normal : $(e).data('price_normal'),
                        scope : $(e).data('scope'), // scope utk render type
                        discount : $(e).data('discount'),
                        seats : $(e).data('seats'),
                        description : $(e).data('description'),
                        is_promo : $(e).data('is_promo'),
                        is_free : $(e).data('is_free'),
                        is_earlybird : $(e).data('is_earlybird'),
                    }
                                                                                

                    $('#priceTicketsModal').modal('show');
                    Component.moveDomToCenter('.js-txt-ticket-type');

                    Events.tickets.setProperty(prop);
                    
                    if(prop.is_free=="1"){
                        
                        ticket_type="free";
                        
                    }else if(prop.is_promo=="1"){
                        
                        ticket_type="discount";
                        
                    }else if(prop.is_earlybird){
                        
                        ticket_type="earlybird";
                        //load 
                        
                    }else{
                        
                        ticket_type="normal";
                    }
                        
                    
                    $('.js-opt-ticket-price-type').val(ticket_type).attr('disabled','disabled')
                    $('.js-txt-ticket-type').val(prop.ticket);

                    console.log("Kode: "+prop.code+" Tiket: "+prop.ticket+" Harga: "+prop.price);
                    
                    Events.tickets.handler();
                    return false;
               });
            });
            
            $.each($('.js-btn-remove-ticket'),function(i,e){
               $(e).off().on('click',function(){
                    var code = $(e).data('code')
                    var ticket = $(e).data('ticket')
                    var price = $(e).data('price');
                   
                    var o = $(e);
                    var text = $(e).text();
                   
                   Component.create.confirm.action(
                        {                            
                            title   :   'Hapus Data',
                            content :   'Apakah Anda ingin menghapus?'
                        },function(){
                                                        
                            
                            Events.state = 'delete';
                            //Global._setBrowserActivity(Events.activity+'_delete_ticket',Events.selectedId);
                            Global.param.code = Global.b64EncodeUnicode(Events.selectedId);
                            Global.param.ticket_id = Global.b64EncodeUnicode($(e).data('code'));
                            
                            Events.tickets.delTicket(function(){
                                
                                Events.tickets.mode='create';
                                
                                Events.renderPanel(Request.response.data);                                
                                
                            });                            
                            
                    });
                                      
                   console.log("Kode: "+code+" Tiket: "+ticket+" Harga: "+price);
                   
                   return false;
               });
            });
        },
        delTicket  :   function(f){
        
            var $this = Events;

            Request.do('POST',Request.Events.delTicket('json'),function(){
                
                Component.create.jbox.notif('Ahaa...','Tiket sudah dihapus',true);
                f();

            });
        }
    },
    const   :   function(data){ //constructor
                                
        this.code = data.code;        
        this.i_file = data.i_file;
        this.i_category = data.i_category;
        this.i_group = data.i_group;
        this.i_global_code = data.i_global_code;
        this.venue_name = data.venue_name;
        this.event_name = data.event_name;
        this.event_subname = data.event_subname;
        this.event_description = data.event_description;        
        this.event_place_id = data.event_place_id;
        this.event_lat = data.event_lat;
        this.event_lang = data.event_lang;
        this.event_position = data.event_position;
        this.event_address = data.event_address;
        this.event_city = data.event_city;
        this.event_state = data.event_state;
        this.event_country = data.event_country;
        this.event_timezone = data.event_timezone;
        this.event_url_location = data.event_url_location;
        this.event_tag = data.event_tag;
        
        this.start_date = data.start_date;
        this.start_hour = data.start_hour;
        this.start_minute = data.start_minute;
        this.start_time = data.start_time;
        
        this.end_date = data.end_date;
        this.end_hour = data.end_hour;
        this.end_minute = data.end_minute;
        this.end_time = data.end_time;
        
        this.published_date = data.published_date;
        this.last_book_date = data.last_book_date;
        this.days_last_book = data.days_last_book;
        this.reminder_seats = data.reminder_seats;
        this.is_free = data.is_free;
        this.is_published = data.is_published;
        this.is_completed = data.is_completed;
        this.is_multiday = data.is_multiday;
        this.is_validated = data.is_validated;
        this.is_closed = data.is_closed;
                
    },
    onCreate  :   {
        checkRequirement    :   function(id,f){
            
            var $this =Events;
            
            Request.do('GET',Request.Events.validateCreate(id,'json'),function(){
                f();
            });
        },        
        default : function(){
                                            
            var $this = Events;
            var me  = $this.onCreate;
                        
            
            $('.wish-list').attr('disabled','disabled');
            
            $('.js-txt-events-title').val('')
            $('.js-txt-events-subtitle').val('')
            
            
            var msg="";
            msg+="Anda harus mengisi topik dan sub topik!";
            Component.create.jbox.tooltip('Halo',msg,true,'.js-txt-events-title-create');
            
            $('.js-txt-events-title-create').trigger('click');
            
            Events.onCreate.handler();
                        
        },        
        handler :function(){
            
            var $this = Events;
            var me  = $this.onCreate;
                        
            $('.js-save-title-course-create').off().on('click',function(){
                                                
                $('#js-form-event-create').parsley('validate');

                if($('#js-form-event-create').parsley('isValid')){
                    
                    var text = $(this).text();
                    var  o = $(this);
                    
                    Global.prepareBtnPost(o);
                    
                    //Global._setBrowserActivity("create_event",Global.getCookie('myId'));                                        
                    Global.param.mode = $this.mode;                    
                    Global.param.code = Global.b64EncodeUnicode($this.selectedId);
                    Global.param.i_user = Global.b64EncodeUnicode($('#myId').val());                                    
                    Global.param.event_name = Global.b64EncodeUnicode($('.js-txt-events-title-create').val());
                    Global.param.event_subname = Global.b64EncodeUnicode($('.js-txt-events-subtitle-create').val());
                                        
                    
                    Request.do('POST',Request.Events.set('json'),function(){
                        
                        Global.param={};                        

                        if(Request.response.status=="1"){
                            
                            me.clear('title');
                            
                            $('.action-title-course').attr('disabled','disabled').text('Edit');                           
                            
                            $('.cancel-title-course').trigger('click');
                            
                            $this.mode="edit";
                            $('#txtMode').val($this.mode);
                            
                            Global.setCookie('currentId',Request.response.data[0].code);
                            $this.selectedId = Request.response.data[0].code;                            
                            
                            document.location=Global.BASE_URL()+"edit-course/"+Global.b64EncodeUnicode($this.selectedId+"|"+Global.getCookie('myEmail'))
                            
                            /*
                            Global.makeTinyUrl({
                                url :  Request.response.data[0].event_url+"-"+Request.response.data[0].id 
                            },function(){
                                alert(Global.bitly.resultUrl);
                                
                            });
                             */                           

                        }else{
                            
                            Global.afterBtnPost(o,text);
                            Component.create.jbox.notif("Opps..","Acara dengan Judul sama sudah digunakan!",false);

                        }

                    });
                
                }
            
                return false;
                
            });
            
            $('.js-cancel-title-course-create').off().on('click',function(){
                
                $('#createEventModal').modal('hide');
                
                return false;
            }); 
            //end title course                                    
        },      
        clear   :   function(t){
            switch(t){
                case    "title":
                
                    $('.js-txt-events-title').val('');
                    $('.js-txt-events-subtitle').val('');
                    
                break;
            }
        }
    },
    onEdit  :   {
        venueSearchModel   :   1,
        tabs    :   [
            {id:'js-tab-event-deskripsi',href:'#deskripsi'},
            {id:'js-tab-event-materi',href:'#materi'},
            {id:'js-tab-event-alamat',href:'#alamat'},
            {id:'js-tab-event-foto',href:'#foto'}
        ],
        lockTabs :   function(tabs){
            var $this = Events.onEdit;
            
            $('.js-tab-event').removeClass('blur');
                        
            if(tabs.length > 0){                                
                
                for(var i=0;i< tabs.length;i++){                                        
                    
                    $('#'+$this.tabs[tabs[i]].id).addClass('blur');
                   
                }; 
                
            }else{
                
                $('.js-tab-event').removeClass('blur');
                
            }
        },
        blurIt  :function(step){
                                
            $('.panel-default').removeClass('blur');

            if(step.length > 0){                        

                for(var i=0;i < step.length;i++){

                    $('.panel-default').eq(step[i]).addClass('blur');

                }
            }
        },
        backdrop    :function(panels){
            panels=[];
            
            if(panels.length > 0){
                
                if(panels[0]!='box-cover-events' || panels[0] !='view-ticket' || panels[0]!='view-address-course' || panels[1]!='form-address-course'){
                    
                    $('body').find($('.form-focus')).removeClass('form-focus');
                    $('.box-cover-events').find($('.form-focus')).removeClass('form-focus');


                    for(var i=0;i < panels.length;i++){

                        $('.'+panels[i]).addClass('form-focus');

                    }
                    
                    $('.backdrop-focus').addClass('backdrop-focus');
                    
                }else{
                    $('.backdrop-focus').removeClass('backdrop-focus').addClass('displaynone');
                }
            }
            
            
        },
        unbackdrop    :function(){
            
            $('.backdrop').remove();
            
            
        },
        checkStepComplete    :   function(data,onSubPanel){
            var step=[];
            var $this = this;
            var completeBanner=false;
            var completeDeskripsi1=false;
            var completeDeskripsi2=false;
            var completeDeskripsi3=false;
            var completeDeskripsi4=false;            
            
            var completeMateri1=false;
            var completeMateri2=false;
            
            var completeLokasi=false;
            var completeTiket=false;
            
            //set default to publish button
            $('.js-btn-start-publish').attr('disabled','disabled');
            
            //cek events
            if(data.events.length > 0){

                $.each(data.events,function(i,e){
                                        
                    if(e.is_published==0){
                        
                        $('.notif-events').show();                        
                        $('.notif-publish').hide();
                        $('.js-btn-start-publish').removeAttr('disabled').css({color:'#c02b3a'});
                        $('.js-btn-save-draft').attr('disabled','disabled').css({color:'#aeb6bf'});
                        
                    }else if(e.is_published==1){
                        
                        $('.notif-publish').show();
                        $('#info-published').text(Global.formatDateEngToIndo(e.published_date));                        
                        $('.notif-events').hide();
                                                
                        $('.js-btn-start-publish').attr('disabled','disabled').css({color:'#aeb6bf'});
                        $('.js-btn-save-draft').removeAttr('disabled').css({color:'#c02b3a'});
                    }
                    
                    Events.is_published=e.is_published;

                    if(e.i_file !=  null){
                        completeBanner=true;
                        $('.js-img-modal-event').removeAttr('src').attr('src',Global.BASE_URL()+e.file_path);
                        
                        $('.btn-fb').attr("href",
                        "https://facebook.com/share.php?m2w&s=100&p[url]="+encodeURIComponent(e.event_url)+ 
                        "&p[images][0]="+encodeURIComponent(Global.BASE_URL()+e.file_path)+ 
                        "&p[title]="+encodeURIComponent(e.event_name)+
                        "&p[summary]="+encodeURIComponent(e.event_description));
                        
                        $('.btn-gplus').attr("href",
                        "https://plus.google.com/share?url="+encodeURIComponent(e.event_url))
                        
                        $('.btn-linkedin').attr('href',
                        "https://www.linkedin.com/shareArticle?mini=true&url="+encodeURIComponent(e.event_url)+
                        "&title="+encodeURIComponent(e.event_name)+
                        "&source="+encodeURIComponent(e.event_url)
                        );
                    }else{
                        completeBanner=false;                    
                    }

                    if(e.event_description !=  null){
                        completeDeskripsi1=true;                                                
                        
                    }else{
                        completeDeskripsi1=false;                                                
                    }
                    
                    if(e.i_category !=  null){
                        completeDeskripsi2=true;                                                
                        
                    }else{
                        completeDeskripsi2=false;                                                
                    }
                    
                    if(e.start_date !=  null){
                        completeDeskripsi3=true;                                                
                        
                    }else{
                        completeDeskripsi3=false;                                                
                    }
                    
                    if(e.i_language !=  null){
                        completeDeskripsi4=true;                                                
                        
                    }else{
                        completeDeskripsi4=false;                                                
                    }
                    
                    
                    if(e.event_address !=  null){                                        
                        completeLokasi=true;                                        
                    }else{                  
                        completeLokasi=false;
                        
                        Global.setCookie('onEdit',1);
                    }
                    
                    if(e.start_date != null){
                        
                        Events.start_date=e.start_date;
                        $('.js-notif-available-publish').text("Event dapat dipublikasikan sebelum tanggal : "+Global.formatDateEngToIndo(e.start_date));
                        $('.js-notif-available-publish1').text("Batas kisaran tanggal earlybird : "+Global.formatDateEngToIndo(e.start_date));
                        
                    }

                });

            }
                        
            //end cek event
            

            //cek materi
            
            if(data.materi.content.length > 0){                                                                                                                
                
                if(data.materi.content[0].items['materi'].length >0){
                    
                    completeMateri1=true;                                        
                    
                }else{
                    
                    completeMateri1=false;
                                                            
                }                
                
            }else{
                
                completeMateri1=false;
                
            }
                        
            
            //end materi
            
            //cek faq
            if(data.faqs.content.length > 0){
                
                completeMateri2=true;
                
            }else{
                
                completeMateri2=true;
                
            }
            
            //end faq
            
            //cek tiket
            if(data.tickets.length > 0){                          
                completeTiket=true;
                //$('.js-btn-start-publish').removeAttr('disabled');
            }else{
                completeTiket=false;            
            }
            //end tiket
                        
            
            console.log("Sampul Cover: "+completeBanner);
            
            console.log("Deskripsi: "+completeDeskripsi1);
            console.log("Kategori: "+completeDeskripsi2);
            console.log("Tanggal: "+completeDeskripsi3);
            console.log("pengaturan: "+completeDeskripsi4);
            
            console.log("Materi: "+completeMateri1);
            console.log("FAQ: "+completeMateri2);
            
            console.log("Lokasi: "+completeLokasi);
            console.log("Tiket: "+completeTiket);

            if(!completeBanner &&
                !completeDeskripsi1 &&
                    !completeDeskripsi2 &&
                        !completeDeskripsi3 &&
                            !completeDeskripsi4 &&
                                !completeMateri1 &&
                                    !completeMateri2 &&
                                        !completeLokasi && 
                                            !completeTiket
                    ){
                step = [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];
                $this.blurIt(step);                
                $this.lockTabs([0,1,2,3]);
                //$this.backdrop(['box-cover-events'])
                
                if($('.box-cover-events').length > 0){
                    
                    Component.create.jbox.tooltip('Opps..','Mohon unggah sampul cover sesuai ukuran!',false,'.box-cover-events');
                    $('.box-cover-events').trigger('click');
                    
                    Component.moveDomToCenter('.box-cover-events');
                    
                }

                //set percentage
                Events.onEdit.showProgress(0,function(){
                    
                    $('#xbanner').trigger('click');
                    
                });
                
                
                console.log("Panel blur on: "+step);

                return;
            }
            
            //paq ada tapi other blank
            if(completeBanner &&
                !completeDeskripsi1 &&
                    !completeDeskripsi2 &&
                        !completeDeskripsi3 &&
                            !completeDeskripsi4 &&
                                !completeMateri1 &&
                                    completeMateri2 &&
                                        !completeLokasi && 
                                            !completeTiket
                    ){
                step = [4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];
                
                $this.blurIt(step);
                $this.lockTabs([1,2,3]);
                $this.backdrop(['view-summary-description','form-summary-description'])
                
                if($('.tooltip1').length > 0){

                    Component.create.jbox.tooltip('Opps..','Mohon mengisi ringkasan acara!',false,'.tooltip1');

                    $('.tooltip1').trigger('click');
                    Component.moveDomToCenter('.tooltip1');
                }                                
                
                //set percentage
                Events.onEdit.showProgress(1,function(){
                    $('#xbanner').trigger('click');
                });

                return;
            }
            
            
            
            //blank panel deskripsi
            if(completeBanner &&
                !completeDeskripsi1 &&
                    !completeDeskripsi2 &&
                        !completeDeskripsi3 &&
                            !completeDeskripsi4 &&
                                !completeMateri1 &&
                                    !completeMateri2 &&
                                        !completeLokasi &&
                                            !completeTiket 
                    ){
                
                
                step = [4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];
                
                $this.blurIt(step);
                $this.lockTabs([1,2,3]);
                $this.backdrop(['view-summary-description','form-summary-description'])
                
                if($('.tooltip1').length > 0){

                    Component.create.jbox.tooltip('Opps..','Mohon mengisi ringkasan acara!',false,'.tooltip1');

                    $('.tooltip1').trigger('click');
                    Component.moveDomToCenter('.tooltip1');
                }                                
                
                //set percentage
                Events.onEdit.showProgress(1,function(){
                    $('#xbanner').trigger('click');
                });
                
                return;
                
            }
            
            //blank panel kategori
            if(completeBanner &&
                completeDeskripsi1 &&
                    !completeDeskripsi2 &&
                        !completeDeskripsi3 &&
                            !completeDeskripsi4 &&
                                !completeMateri1 &&
                                    !completeMateri2 &&
                                        !completeLokasi &&
                                            !completeTiket 
                    ){
                
                
                step = [6,7,8,9,10,11,12,13,14,15,16,17,18,19];
                
                $this.blurIt(step);
                $this.lockTabs([1,2,3]);
                $this.backdrop(['view-course-category','form-course-category'])
                
                if($('.tooltip2').length > 0){

                    Component.create.jbox.tooltip('Opps..','Mohon mengisi kategori!',false,'.tooltip2');

                    $('.tooltip2').trigger('click');
                    Component.moveDomToCenter('.tooltip2');
                }                                
                
                //set percentage
                Events.onEdit.showProgress(2,function(){
                    $('#xbanner').trigger('click');
                });
                
                return;
            }
            
            //paq ada tapi other blank
            if(completeBanner &&
                completeDeskripsi1 &&
                    !completeDeskripsi2 &&
                        !completeDeskripsi3 &&
                            !completeDeskripsi4 &&
                                !completeMateri1 &&
                                    completeMateri2 &&
                                        !completeLokasi && 
                                            !completeTiket
                    ){
                step = [6,7,8,9,10,11,12,13,14,15,16,17,18,19];
                
                $this.blurIt(step);
                $this.lockTabs([1,2,3]);
                $this.backdrop(['view-course-category','form-course-category'])
                
                if($('.tooltip2').length > 0){

                    Component.create.jbox.tooltip('Opps..','Mohon mengisi kategori!',false,'.tooltip2');

                    $('.tooltip2').trigger('click');
                    Component.moveDomToCenter('.tooltip2');
                }                                
                
                //set percentage
                Events.onEdit.showProgress(2,function(){
                    $('#xbanner').trigger('click');
                });

                return;
            }
            
            //blank panel tanggal
            if(completeBanner &&
                completeDeskripsi1 &&
                    completeDeskripsi2 &&
                        !completeDeskripsi3 &&
                            !completeDeskripsi4 &&
                                !completeMateri1 &&
                                    !completeMateri2 &&
                                        !completeLokasi &&
                                            !completeTiket 
                    ){
                
                
                step = [8,9,10,11,12,13,14,15,16,17,18,19];                
                
                $this.blurIt(step);
                $this.lockTabs([1,2,3]);
                $this.backdrop(['view-venue-date','form-venue-date'])
                
                if($('.tooltip3').length > 0){
                    Component.create.jbox.tooltip('Opps..','Mohon mengisi tanggal pelaksanaan!',false,'.tooltip3');
                    $('.tooltip3').trigger('click');
                    Component.moveDomToCenter('.tooltip3');
                }
                
                //set percentage
                Events.onEdit.showProgress(3,function(){
                    $('#xbanner').trigger('click');
                });
                
                return;
            }
            
            if(completeBanner &&
                completeDeskripsi1 &&
                    completeDeskripsi2 &&
                        !completeDeskripsi3 &&
                            !completeDeskripsi4 &&
                                !completeMateri1 &&
                                    completeMateri2 &&
                                        !completeLokasi &&
                                            !completeTiket 
                    ){
                
                
                step = [8,9,10,11,12,13,14,15,16,17,18,19];                
                
                $this.blurIt(step);
                $this.lockTabs([1,2,3]);
                $this.backdrop(['view-venue-date','form-venue-date'])
                
                if($('.tooltip3').length > 0){
                    Component.create.jbox.tooltip('Opps..','Mohon mengisi tanggal pelaksanaan!',false,'.tooltip3');
                    $('.tooltip3').trigger('click');
                    Component.moveDomToCenter('.tooltip3');
                }
                
                //set percentage
                Events.onEdit.showProgress(3,function(){
                    $('#xbanner').trigger('click');
                });
                
                return;
            }
                        
            //blank panel pengaturan
            if(completeBanner &&
                completeDeskripsi1 &&
                    completeDeskripsi2 &&
                        completeDeskripsi3 &&
                            !completeDeskripsi4 &&
                                !completeMateri1 &&
                                    !completeMateri2 &&
                                        !completeLokasi &&
                                            !completeTiket 
                    ){
                                                                
                $this.blurIt([10,11,12,13,14,15,16,17,18,19]);
                $this.lockTabs([1,2,3]);
                $this.backdrop(['view-other-setting','form-other-setting'])
                
                if($('.tooltip4').length > 0){
                    Component.create.jbox.tooltip('Opps..','Mohon melakukan pengaturan lainnya!',false,'.tooltip4');
                    $('.tooltip4').trigger('click');
                    Component.moveDomToCenter('.tooltip4');
                }
                
                //set percentage
                                
                Events.onEdit.showProgress(4,function(){
                    $('#xbanner').trigger('click');
                });
                
                
                return;
            }
            
            if(completeBanner &&
                completeDeskripsi1 &&
                    completeDeskripsi2 &&
                        completeDeskripsi3 &&
                            !completeDeskripsi4 &&
                                !completeMateri1 &&
                                    completeMateri2 &&
                                        !completeLokasi &&
                                            !completeTiket 
                    ){
                                                                
                $this.blurIt([10,11,12,13,14,15,16,17,18,19]);
                $this.lockTabs([1,2,3]);
                $this.backdrop(['view-other-setting','form-other-setting'])
                
                if($('.tooltip4').length > 0){
                    Component.create.jbox.tooltip('Opps..','Mohon melakukan pengaturan lainnya!',false,'.tooltip4');
                    $('.tooltip4').trigger('click');
                    Component.moveDomToCenter('.tooltip4');
                }
                
                //set percentage
                                
                Events.onEdit.showProgress(4,function(){
                    $('#xbanner').trigger('click');
                });
                
                
                return;
            }
            
            //blank panel materi or content
            if(completeBanner &&
                completeDeskripsi1 &&
                    completeDeskripsi2 &&
                        completeDeskripsi3 &&
                            completeDeskripsi4 &&
                                !completeMateri1 &&
                                    !completeMateri2 &&
                                        !completeLokasi &&
                                            !completeTiket 
                    ){
                
                //auto click to next tab
                $('#js-tab-event-materi').trigger('click');
                                
                $this.blurIt([12,13,14,15,16,17,18,19]);
                $this.lockTabs([2,3]);
                $this.backdrop(['view-content-material','form-content-material'])
                                
                
                Component.moveDomToCenter('.tooltip5');
                
                if($('.tooltip5').length > 0){
                    var text="<h4>Materi Kelas</h4>";
                    text+="- Pengisian materi atau modul ditentukan oleh jumlah hari pelaksanaan.<br>";
                    text+="- Modul atau isi materi setidaknya terisi 1 modul";
                    
                    Component.create.jbox.tooltip('Opps..',text,false,'.tooltip5');

                    $('.tooltip5').trigger('click');                    
                                        
                }
                
                //set percentage
                Events.onEdit.showProgress(5,function(){
                    $('#xdeskripsi').trigger('click')
                });
                
                return;
            }
            
            if(completeBanner &&
                completeDeskripsi1 &&
                    completeDeskripsi2 &&
                        completeDeskripsi3 &&
                            completeDeskripsi4 &&
                                !completeMateri1 &&
                                    completeMateri2 &&
                                        !completeLokasi &&
                                            !completeTiket 
                    ){
                
                //auto click to next tab
                
                if(!onSubPanel){
                    $('#js-tab-event-materi').trigger('click');

                    $this.blurIt([12,13,14,15,16,17,18,19]);
                    $this.lockTabs([2,3]);
                    $this.backdrop(['view-content-material','form-content-material'])

                    Component.moveDomToCenter('.tooltip5');

                    if($('.tooltip5').length > 0){
                        var text="<h4>Materi Kelas</h4>";
                        text+="- Pengisian materi atau modul ditentukan oleh jumlah hari pelaksanaan.<br>";
                        text+="- Modul atau isi materi minimal terisi 1 modul";

                        Component.create.jbox.tooltip('Opps..',text,false,'.tooltip5');

                        $('.tooltip5').trigger('click');                    

                    }

                    //set percentage
                    Events.onEdit.showProgress(5,function(){
                        $('#xdeskripsi').trigger('click')
                    });
                }
                return;
            }
            
            if(completeBanner &&
                completeDeskripsi1 &&
                    completeDeskripsi2 &&
                        completeDeskripsi3 &&
                            completeDeskripsi4 &&
                                !completeMateri1 &&
                                    completeMateri2 &&
                                        completeLokasi &&
                                            !completeTiket 
                    ){
                
                //auto click to next tab
                if(!onSubPanel){
                    $('#js-tab-event-materi').trigger('click');

                    $this.blurIt([12,13,14,15,16,17,18,19]);
                    $this.lockTabs([2,3]);
                    $this.backdrop(['view-content-material','form-content-material'])

                    Component.moveDomToCenter('.tooltip5');

                    if($('.tooltip5').length > 0){
                        var text="<h4>Materi Kelas</h4>";
                        text+="- Pengisian materi atau modul ditentukan oleh jumlah hari pelaksanaan.<br>";
                        text+="- Modul atau isi materi minimal terisi 1 modul";

                        Component.create.jbox.tooltip('Opps..',text,false,'.tooltip5');

                        $('.tooltip5').trigger('click');                    

                    }

                    //set percentage
                    Events.onEdit.showProgress(5,function(){
                        $('#xdeskripsi').trigger('click')
                    });
                }
                return;
            }
            
            if(completeBanner &&
                completeDeskripsi1 &&
                    completeDeskripsi2 &&
                        completeDeskripsi3 &&
                            completeDeskripsi4 &&
                                !completeMateri1 &&
                                    completeMateri2 &&
                                        completeLokasi &&
                                            completeTiket 
                    ){
                
                //auto click to next tab
                if(!onSubPanel){
                    $('#js-tab-event-materi').trigger('click');

                    $this.blurIt([12,13,14,15,16,17,18,19]);
                    $this.lockTabs([2,3]);
                    $this.backdrop(['view-content-material','form-content-material'])

                    Component.moveDomToCenter('.tooltip5');

                    if($('.tooltip5').length > 0){
                        var text="<h4>Materi Kelas</h4>";
                        text+="- Pengisian materi atau modul ditentukan oleh jumlah hari pelaksanaan.<br>";
                        text+="- Modul atau isi materi minimal terisi 1 modul";

                        Component.create.jbox.tooltip('Opps..',text,false,'.tooltip5');

                        $('.tooltip5').trigger('click');                    

                    }

                    //set percentage
                    Events.onEdit.showProgress(5,function(){
                        $('#xdeskripsi').trigger('click')
                    });
                }
                return;
            }
            
            //blank panel faq
            if(completeBanner &&
                completeDeskripsi1 &&
                    completeDeskripsi2 &&
                        completeDeskripsi3 &&
                            completeDeskripsi4 &&
                                completeMateri1 &&
                                    !completeMateri2 &&
                                        !completeLokasi &&
                                            !completeTiket 
                    ){
                
                //auto click to next tab
                $('#js-tab-event-materi').trigger('click');
                Component.moveDomToCenter('.tooltip6');
                
                $this.blurIt([14,15,16,17,18,19]);                
                $this.lockTabs([2,3]);                                
                
                if($('.tooltip6').length > 0){
                    Component.create.jbox.tooltip('Opps..','Mohon mengisi FAQ!',false,'.tooltip6');
                    $('.tooltip6').trigger('click');                                                            
                }
                
                //set percentage
                Events.onEdit.showProgress(6,function(){
                    $('#xdeskripsi').trigger('click');
                });
                
                return;
            }
            
            //paq ada tapi other blank
            if(!completeBanner &&
                !completeDeskripsi1 &&
                    !completeDeskripsi2 &&
                        !completeDeskripsi3 &&
                            !completeDeskripsi4 &&
                                !completeMateri1 &&
                                    completeMateri2 &&
                                        !completeLokasi && 
                                            !completeTiket
                    ){
                step = [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];
                $this.blurIt(step);
                
                $this.lockTabs([0,1,2,3]);
                
                if($('.box-cover-events').length > 0){
                    
                    Component.create.jbox.tooltip('Opps..','Mohon unggah sampul cover sesuai ukuran!',false,'.box-cover-events');
                    $('.box-cover-events').trigger('click');
                    
                    Component.moveDomToCenter('.box-cover-events');
                    
                }

                //set percentage
                Events.onEdit.showProgress(0,function(){
                    
                    $('#xbanner').trigger('click');
                    
                });
                
                
                console.log("Panel blur on: "+step);

                return;
            }
            
            //blank panel lokasi
            if(completeBanner &&
                completeDeskripsi1 &&
                    completeDeskripsi2 &&
                        completeDeskripsi3 &&
                            completeDeskripsi4 &&
                                completeMateri1 &&
                                    completeMateri2 &&
                                        !completeLokasi &&
                                            !completeTiket 
                    ){
                
                //auto click to next tab
                $('#js-tab-event-alamat').trigger('click');
                //Component.moveDomToCenter('.tooltip7');
                                
                $this.blurIt([16,17,18,19]);                
                //$this.lockTabs([3]);
                $this.backdrop(['view-address-course','form-address-course'])
                
                if($('.tooltip7').length > 0){
                    Component.create.jbox.tooltip('Opps..','Mohon mengisi Lokasi!',false,'.tooltip7');
                    $('.tooltip7').trigger('click');                                                            
                }
                                
                //set percentage
                Events.onEdit.showProgress(7,function(){
                    $('#xmateri').trigger('click');
                });
                
                
                return;
            }
            
            //blank panel tiket
            if(completeBanner &&
                completeDeskripsi1 &&
                    completeDeskripsi2 &&
                        completeDeskripsi3 &&
                            completeDeskripsi4 &&
                                completeMateri1 &&
                                    completeMateri2 &&
                                        completeLokasi &&
                                            !completeTiket 
                    ){
                             
                
                $this.blurIt([]);
                $this.backdrop(['view-ticket']);
                $this.lockTabs([]);
                
                if($('.tooltip8').length > 0){
                    Component.create.jbox.tooltip('Opps..','Mohon mengisi tiket!',false,'.tooltip8');

                    $('.tooltip8').trigger('click');                       

                }
                
                //set percentage
                Events.onEdit.showProgress(8,function(){
                    $('#xlokasi').trigger('click');                    
                });
                
                
                return;
            }
                        
            //ALL COMPLETE
            if(completeBanner &&
                completeDeskripsi1 &&
                    completeDeskripsi2 &&
                        completeDeskripsi3 &&
                            completeDeskripsi4 &&
                                completeMateri1 && 
                                    completeMateri2 && 
                                        completeLokasi &&
                                            completeTiket
                    ){                                
                
                $this.blurIt([]);
                $this.lockTabs([]);
                
                if(Events.is_published==0){
                    
                    Component.create.jbox.tooltip('Opps..','Saat ini Anda sudah dapat mempublikasikan event anda!',false,'.tickets-button');
                    $('.tickets-button').trigger('click');   
                    
                }
                
                //set percentage
                Events.onEdit.showProgress(9,function(){
                    $('#xtiket').trigger('click');
                });
                                
                return;
            }
        },        
        default : function(){
                
            var $this = Events;
            var me  = $this.onEdit;
            
           
            if($this.toPublish==0){
            
                window.onbeforeunload = function () {
                    var a=1;
                    if (a) {
                        return "If you reload this page, your previous action will be repeated";
                    } else {
                        return "";
                    }
                }
                
            }
            
            var loc= window.location;
                                    
            $this.uri = loc.pathname;
            
            //set search text for google
            Map.bindSearch('js-txt-event-address');
            
            $(Global.getCookie('currentTab')).trigger('click');
            
            $('.js-div_cont_progress').hide();
            $('#js-what-venue-single').hide();
            $('#js-what-venue-multi').hide();
            
            Global.setEditorEvent();                        
            Events.onEdit.handler();
            $this.materi.fireEvent();
            $this.faq.fireEvent();
            $this.gallery.fireEvent();            
            Events.tabHandler('.js-tab-event');                                    
                                                                                   
            Request.do('GET',Request.Events.get.byId(Global.b64EncodeUnicode($this.selectedId),'json'),function(){
                
                $this.const(Request.response.data.events[0]);
                $this.data = Request.response.data;
                
                //set to client multidate
                Events.multidate.data=$this.data.multiday;                
                                
                $this.categories = Request.response.data.categories;
                $this.renderPanel(Request.response.data,false);                                
                                                
            });
            
        },        
        setPicker   :function(){
            
            var $this = this;
            var dateToday = new Date();
                        
            
            $('.js-txt-event-materi-date').datetimepicker({
                format: 'YYYY-MM-DD',
                showClose   :   true,
                ignoreReadonly: true,
                minDate: dateToday,
            });
            
            $('.js-txt-event-single-start-date').datetimepicker({
                format: 'YYYY-MM-DD',
                showClose   :   true,
                ignoreReadonly: true,
                useCurrent: true,
                minDate: dateToday,
            });
            
            $('.js-txt-event-single-end-date').datetimepicker({
                format: 'YYYY-MM-DD',
                showClose   :   true,
                ignoreReadonly: true,
                minDate: dateToday,
            });
            
            $('.js-txt-event-custom-start-date').datetimepicker({
                format: 'YYYY-MM-DD',
                showClose   :   true,
                ignoreReadonly: true,
                minDate: dateToday,
            });
            
            //linker
            /*
            $(".js-txt-event-single-start-date").on("dp.change", function (e) {
                console.log(e);  
                $('.js-txt-event-single-end-date').data("DateTimePicker").minDate(e.date);
            });
            
            $(".js-txt-event-single-end-date").on("dp.change", function (e) {
                                
                $('.js-txt-event-single-start-date').data("DateTimePicker").maxDate(e.date);
            });
            */
                                                
            $('.js-txt-event-publish-date').datetimepicker({
                format: 'YYYY-MM-DD',
                showClose   :   true,
                ignoreReadonly: true,
                minDate: dateToday,
            }); 
            
            //ticket
            $('.js-txt-start-date-earlybird').datetimepicker({
                format: 'YYYY-MM-DD',
                showClose   :   true,
                ignoreReadonly: true,
                useCurrent: true,
                minDate: dateToday,
            });
            
            $('.js-txt-end-date-earlybird').datetimepicker({
                format: 'YYYY-MM-DD',
                showClose   :   true,
                ignoreReadonly: true,
                minDate: dateToday,
            }); 
            
            //linker
            /*
            $(".js-txt-start-date-earlybird").on("dp.change", function (e) {
                console.log(e);  
                $('.js-txt-end-date-earlybird').data("DateTimePicker").minDate(e.date);
            });
            
            $(".js-txt-end-date-earlybird").on("dp.change", function (e) {
                                
                $('.js-txt-start-date-earlybird').data("DateTimePicker").maxDate(e.date);
            });
            */
            
        },
        showProgress    :   function(val,f){
            var $this = this;
            var y = parseFloat(val/Events.indicator)*100;                        
            
            if(val==0){
                y=2;
            }
            
            if(y==100){
                $('.div_edit_event_progress').hide();
            }else{
                $('.div_edit_event_progress').show(1000);
                $('.progress').show();
            }
            
            //progress bar percentage
            $('.js-progress-create').removeAttr('style').attr('style','width:'+parseInt(y)+'%');
            $('.js-txt-progress-create-event').text(parseInt(y));
            
            var contentText = '';

            // dataRoot : '/'
            var myMappedObject = [                  
                {
                    "id"      :   "xbanner",
                    "isSelected": "",
                    "taskTitle": "My Point 5",
                    "taskSubTitle": "July 9th, 2014",
                    "assignDate": "09/07/2014",
                    "taskShortDate": "Cover",
                    "taskDetails": contentText
                },                  
                {
                    "id"      :   "xdeskripsi",
                    "isSelected": "",
                    "taskTitle": "My Point 2",
                    "taskSubTitle": "February 28th, 2014",
                    "assignDate": "28/02/2014",
                    "taskShortDate": "Deskripsi",
                    "taskDetails": contentText
                },
                {
                    "id"      :   "xmateri",
                    "isSelected": "",
                    "taskTitle": "My Point 6",
                    "taskSubTitle": "August 30th, 2014",
                    "assignDate": "30/08/2014",
                    "taskShortDate": "Materi",
                    "taskDetails": contentText
                },
                {
                    "id"      :   "xlokasi",
                    "isSelected": "",
                    "taskTitle": "My Point 6",
                    "taskSubTitle": "August 30th, 2014",
                    "assignDate": "30/08/2014",
                    "taskShortDate": "Lokasi",
                    "taskDetails": contentText
                },
                {
                    "id"      :   "xtiket",
                    "isSelected": "",
                    "taskTitle": "My Point 6",
                    "taskSubTitle": "August 30th, 2014",
                    "assignDate": "30/08/2014",
                    "taskShortDate": "Tiket",
                    "taskDetails": contentText
                }
            ];

            var jtLine = $('.myjtline').jTLine({
                callType: 'jsonObject',
                structureObj: myMappedObject,
                map: {
                    "id"    :   "id",
                    "dataRoot": "/",
                    "title": "taskTitle",
                    "subTitle": "taskSubTitle",
                    "dateValue": "assignDate",
                    "pointCnt": "taskShortDate",
                    "bodyCnt": "taskDetails"
                },
                distanceMode: 'fixDistance', // 'fixDistance' 'auto' 'predefinedDistance'
                eventsMinDistance: 60,       // Consider It as Distance Unit "by Pixel"
                fixDistanceValue: 2,         // if eventsMinDistance = 60 & fixDistanceValue= 2 then the value is: (60*2) = 120 px
                firstPointMargin: 1          // First Point Margin from the left
            });
            
            f();
            
        },
        handler :function(){
            
            var $this = Events;
            
            Global.prepareUpload('file-avatar','fileholder-trainer',Profile.config,'avatar');
            Global.prepareUpload('file-upload-achievement-othertrainer','fileholder-achievement-othertrainer',Profile.config,'avatar');
            
            
            Media.init();
                        
            Global.iCheck();
            $this.onEdit.setPicker();
            
            
            //btn share
            $.each($('.js-btn-share'),function(i,e){
               $(e).off().on('click',function(){
                  var link =  'https://plus.google.com/share?url=edwin-warming-gunawan';
                  var el="<center>";
                        el+="<iframe src='"+link+"' frameborder='0'>";

                        el+="</iframe>";
                        
                    el+="</center>";
                  
                  $('#js-div-render-share').empty().html(el);
                  
               }); 
            });
            //btn publish
            $('.js-btn-start-publish').off().on('click',function(){
                
                $('.js-div_cont_progress').hide();  
                $('#js-div-cont-error-validation').hide();  
                                      
                
               $('#publishModal').modal({backdrop: 'static', keyboard: false}).on('shown.bs.modal', function(e) {
                   
                   
                   
               }).on('hidden.bs.modal', function(e) {
                   
                   Events.toPublish=0;
                   
               });
               
               return false;
            });
            
            //btn set draft
            $('.js-btn-save-draft').off().on('click',function(){
                                
                Global.param.code = Global.b64EncodeUnicode($this.selectedId);
                        
                Global.prepareBtnPost($('.js-btn-save-draft'));
                //post as draft
                Request.do('POST',Request.Events.setDraft(),function(){

                    if(Request.response.status=="1"){
                        Global.afterBtnPost($('.js-btn-save-draft'),'SIMPAN DRAFT');
                        Events.renderPanel(Request.response.data,false);

                    }
                });
                               
                return false;
                
            });
            
            // btn preview
            $('.js-btn-preview').off().on('click',function(){
                
                var ifWidth=parseFloat($('#largeModal').width())-200;
                var url = $(this).data('url');                                
                
                var el="<center>";
                        el+="<iframe src='"+url+"' frameborder='0' width='auto' height='auto' scrolling='yes' style='width:100%; height:100pc; position:absolute; left:0;'>";

                        el+="</iframe>";
                        
                    el+="</center>";
                                              
                
                $('#largeModal').modal({backdrop: 'static', keyboard: false}).on('shown.bs.modal', function(e) {
                    
                   $('#modal-content').empty().html(el);
                   
                   
                }).on('hidden.bs.modal', function(e) {
                   
                                      
                });
               
                return false;
                
            });
                        
            
            //title
            $('.js-action-title-course').click(function(){
                
                $('.view-title-course').hide();
                $('.form-title-course').show();                                
                
                return false;
            });
            
            $('.js-save-title-course').off().on('click',function(){
                var text = $(this).text();
                        
                var  o = $(this);
                                
                $('#js-form-event-title').parsley('validate');

                if($('#js-form-event-title').parsley('isValid')){
                    
                    Component.create.confirm.action(
                        {
                            //type    :   'question',
                            title   :   'Simpan Data',
                            content :   'Apakah Anda ingin menyimpan?'
                        },function(){

                            //Global._setBrowserActivity($this.activity+'_update_title',$this.selectedId);
                            Global.param.email = Global.getCookie('myEmail');
                            Global.param.fields = {
                                event_name      : Global.b64EncodeUnicode($('.js-txt-events-title').val()),
                                event_subname   : Global.b64EncodeUnicode($('.js-txt-events-subtitle').val()),                                
                            };
                            
                            $this.update('Tema Kelas');
                            $('.js-cancel-title-course').trigger('click');
                            
                            return false;
                                                                                   

                    });
                
                }
            
                return false;
                
            });
            
            $('.js-cancel-title-course').click(function(){
                
                $('.view-title-course').show();
                $('.form-title-course').hide();
                
                return false;
            });
            //end title
                        
            //summary description                         
            $('.js-action-summary-description').off().on('click',function(){
                
                $('.view-summary-description').hide();
                $('.form-summary-description').show();
                
                
                return false;
            });
            
            $('.js-submit-summary-description').off().on('click',function(){
               
                Global.param ={};  
                var text = $(this).text();
                        
                var  o = $(this);
                
                var description = Global.getEditorEventValue();
                
                if(description != ""){
                                                            
                    Component.create.confirm.action(
                        {
                            //type    :   'question',
                            title   :   'Simpan Data',
                            content :   'Apakah Anda ingin menyimpan?'
                        },function(){
                            
                            Global.prepareBtnPost(o);

                            //Global._setBrowserActivity($this.activity+"_update_description",$this.selectedId);
                            Global.param.email = Global.getCookie('myEmail');
                            Global.param.fields = {
                                event_description : Global.b64EncodeUnicode(description),
                            }                            

                            $this.update('Deskripsi Kelas');
                            
                            $('.js-cancel-summary-description').trigger('click');
                            
                            Global.afterBtnPost(o,text);
                            

                    });
                                        
                    
                }else{
                    
                    Component.create.jbox.notif('Opps..','Deskripsi harus diisi!',false);

                }
                
                return false;
                
            });                        
            
            $('.js-cancel-summary-description').off().on('click',function(){
                
                $('.view-summary-description').show();
                $('.form-summary-description').hide();
                
                return false;
            });
            
            //end summary description
            
            //category
            $('.js-opt-event-category').change(function(){
                
                var id = Global.b64EncodeUnicode($(this).find(":selected").val());
                                
                if(id!= ""){
                    
                    Events.category.items(id,function(){
                                                                        
                        var el="";
                        el+="<option value=''>-- Pilih Sub Kategori --</option>"

                        if(Request.response.data.length > 0){

                            $.each(Request.response.data,function(i,e){

                                el+="<option value="+e.code+">"+e.category+"</option>"

                            });

                            
                        }
                        
                        $('.js-opt-event-item-category').empty().html(el);
                    

                    });
                }
            });
            
            $('.js-action-course-category').click(function(){
                
                $('.view-course-category').hide();
                $('.form-course-category').show();                                
                
                return false;
            });
            
            $('.js-submit-course-category').off().on('click',function(){
                var text = $(this).text();
                        
                var  o = $(this);
                
                $('#js-form-course-category').parsley('validate');

                if($('#js-form-course-category').parsley('isValid')){
                    
                    Component.create.confirm.action(
                        {
                            //type    :   'question',
                            title   :   'Simpan Data',
                            content :   'Apakah Anda ingin menyimpan?'
                        },function(){
                            
                            Global.prepareBtnPost(o);

                            //Global._setBrowserActivity($this.activity+"_update_category",$this.selectedId);
                            Global.param.email = Global.getCookie('myEmail');                            
                            Global.param.fields = {                                
                                i_category      :   Global.b64EncodeUnicode($('.js-opt-event-category').find(":selected").val()),
                                i_subcategory   :   Global.b64EncodeUnicode($('.js-opt-event-item-category').find(":selected").val()),
                                event_tag       :   Global.b64EncodeUnicode($('#js-txt-event-tag').val())
                                
                            };

                            $this.update('Kategori Kelas');
                            
                            $('.js-cancel-course-category').trigger('click');

                            Global.afterBtnPost(o,text);

                    });
                }
                
                return false;
                
            });
                        
            $('.js-cancel-course-category').click(function(){
                
                $('.view-course-category').show();
                $('.form-course-category').hide();
                
                return false;
            });
            
            $('.action-sub-category').click(function(){
                
                $('.view-sub-category').hide();
                $('.form-sub-category').show();
                
                return false;
            });
            
            $('.cancel-sub-category').click(function(){
                
                $('.view-sub-category').show();
                $('.form-sub-category').hide();
                
                return false;
            });
            
            //end category
            
            //venue date
            $.each($('.js-action-venue-date'),function(i,e){
                $(e).off().on('click',function(){
                                        
                    $('.view-venue-date').hide();
                    $('.js-form-venue-date').show();
                                                            
                    if($this.is_multiday==1){ //multi session
                                                
                        $('.js-form-table-custom-date').empty();
                        
                        Render.events.form.loopMultidate('.js-form-table-custom-date',Events.multidate.data,function(){
                            Events.multidate.fireEvent();                            
                        });            
                        
                        $('.js-select-venue-date').val('customdate');
                        $('.js-form-customdate').show();
                        $('.js-form-single-date').hide();
                                                                        

                    }else if($this.is_multiday==0){   //single session     
                                                
                        $('.js-select-venue-date').val('singledate');

                        $('.js-txt-event-single-start-date').val($this.start_date);
                        
                        $('.js-form-single-date').show();
                        $('.js-form-customdate').hide();

                        console.log('type : single session');

                    }
                    
                    //Events.onEdit.handler();
                                        

                    return false;
                });
            });
            
            
            $('.js-submit-single-date').off().on('click',function(){
                
                var text = $(this).text();
                        
                var  o = $(this);
                
                $('#js-form-single-date').parsley('validate');

                if($('#js-form-single-date').parsley('isValid')){                                        
                        
                    Component.create.confirm.action(
                        {                            
                            title   :   'Simpan Data',
                            content :   'Perubahan tanggal akan mempengaruhi data Materi yang anda buat.<br>Apakah Anda ingin menyimpan?'
                        },function(){
                                                        

                            Global.prepareBtnPost($('.js-submit-single-date'));

                            //Global._setBrowserActivity($this.activity+"_update_date",$this.selectedId);
                            Global.param.email = Global.getCookie('myEmail');
                            Global.param.fields = {
                                start_date      : Global.b64EncodeUnicode($('.js-txt-event-single-start-date').val()),                                
                                start_hour      : '00',
                                start_minute    : '00',
                                start_time      : 'AM',
                                end_date        : Global.b64EncodeUnicode($('.js-txt-event-single-start-date').val()),                                
                                end_hour        : '00',
                                end_minute      : '00',
                                end_time        : 'AM',
                                is_multiday     : Global.b64EncodeUnicode(0),
                                days_count      : 1
                            };


                            $this.update('Tanggal');
                            $('.js-cancel-venue-date').trigger('click');

                            Global.afterBtnPost($('.js-submit-single-date'),text);

                            return false;
                    });
                                        
                }
                
                return false;
            });
            
            $('.js-submit-custom-date').off().on('click',function(){
                
                var o = $(this);
                var text= o.text();
                
                $('#js-form-custom').parsley('validate');

                if($('#js-form-custom').parsley('isValid')){
                                                                                                       
                    Component.create.confirm.action(
                        {                            
                            title   :   'Simpan Data',
                            content :   'Apakah Anda ingin menyimpan?'
                        },function(){
                                
                            Global.prepareBtnPost(o);
                            $this.multidate.refresh();                                                        

                            //Global._setBrowserActivity($this.activity+"_update_date",$this.selectedId);
                            Global.param.email = Global.getCookie('myEmail');
                            Global.param.fields = {                                
                                is_multiday :   Global.b64EncodeUnicode(1),
                            };

                            Global.param.fields_items = $this.multidate.data,

                            $this.update('Tanggal');
                                                                                    
                           

                        });
                                            
                }
                
                return false;
                
            });
            
                        
            $.each($('.js-btn-add-multidate'),function(i,e){
                            
                $(e).off().on('click',function(){                                                            
                    
                    if($this.onEdit.cekMultidateOnPush($('.js-txt-event-custom-start-date').last().val())){
                                                
                        $this.multidate.lastDate = $('.js-txt-event-custom-start-date').last().val();

                        $('.js-form-table-custom-date').append(Render.events.form.multidate($('.js-txt-event-custom-start-date').length+1));

                        Events.multidate.fireEvent();
                                                

                    }else{

                        Component.create.jbox.notif('Opps..','Tanggal tidak boleh kosong dan tidak lebih kecil dari sebelumnya!',false);
                        if($('.js-div-custom-date').length >1){
                            $('.js-div-custom-date').last().remove();
                        }
                    } 
                                    
                    return false;
                                
                });
            });                        
            
            $('.js-select-venue-date').change(function(){
                
                var val=$(this).find(":selected").val();
                                                
                if(val=="singledate"){
                                        
                    $('#js-what-venue-single').show();
                    $('#js-what-venue-multi').hide();
                    
                    Component.create.jbox.tooltip('Opps..',Render.tooltip.event('single-session'),false,'.js-panel-waktu',450);
                    $('.js-panel-waktu').trigger('click');
                    
                }else if(val=="customdate"){                                        
                    
                    $('#js-what-venue-single').hide();
                    $('#js-what-venue-multi').show();
                    
                    Component.create.jbox.tooltip('Opps..',Render.tooltip.event('multi-session'),false,'.js-panel-waktu',450);
                    $('.js-panel-waktu').trigger('click');
                    
                    //render to form                    
                    
                    if(Events.multidate.data.length > 0){
                        
                        $('.js-form-table-custom-date').empty();
                        Render.events.form.loopMultidate('.js-form-table-custom-date',Events.multidate.data,function(){
                            Events.multidate.fireEvent();
                        });
                        
                    }else{
                                                                                                
                        $('.js-form-table-custom-date').empty().append(Render.events.form.multidate(1));                        
                        Events.multidate.fireEvent();
                        
                    }
                                                            
                                        
                }else if(val==""){
                    
                    $('#js-what-venue-single').hide();
                    $('#js-what-venue-multi').hide();
                    
                }
            });
                        
            $('.js-cancel-venue-date').click(function(){
                
                $('.view-venue-date').show();
                
                $('.js-form-venue-date').hide();
                $('.js-form-customdate').hide();
                
                $('.js-select-venue-date').val('');                
                
                return false;
            });
            
            $('.js-cancel-custom-date').click(function(){
                
                $('.view-venue-date').show();
                $('.js-form-venue-date').hide();
                $('.js-form-customdate').hide();

                $('.js-select-venue-date').val('');                
                
                return false;
                
            });
            
            // Select Price
            $(".select-price").change(function(){
                $(this).find("option:selected").each(function(){
                    var optionValue = $(this).attr("value");
                    if(optionValue){
                        $(".box-price").not("." + optionValue).hide();
                        $("." + optionValue).show();
                    } else{
                        $(".box-price").hide();
                    }
                });
            }).change();

            $(".select-venue-date").change(function(){
                $(this).find("option:selected").each(function(){
                    var optionValue = $(this).attr("value");
                    if(optionValue){
                        $(".box-venue-date").not("." + optionValue).hide();
                        $("." + optionValue).show();
                    } else{
                        $(".box-venue-date").hide();
                    }
                });
            }).change();
            
            //end price
                                                
            $('#js-txt-event-tag').tagsinput({
                allowDuplicates: false
            });
            
            // end tag
                                    
            
            //setting
            $('.js-action-other-setting').click(function(){                                
                
                $('.view-other-setting').hide();
                $('.form-other-setting').show();                                
                
                return false;
            });
            
            $('.js-opt-event-type').change(function(){
               $this.type = $(this).find(":selected").val();               
            });
            
            $('.js-opt-event-level').change(function(){
               $this.level = $(this).find(":selected").val();               
            });
            
            $('.js-opt-event-certificate').change(function(){
               $this.certificated = $(this).find(":selected").val();               
            });
            
            $('.js-opt-event-language').change(function(){
               $this.language = $(this).find(":selected").val();               
            });
                        
            $('.js-submit-other-setting').off().on('click',function(){
                
                var text = $(this).text();
                        
                var  o = $(this);
                
                $('#js-form-other-setting').parsley('validate');

                if($('#js-form-other-setting').parsley('isValid')){
                    
                    var reminder_seats=$('.js-txt-event-setting-reminder').val();
                    var days_last_book=$('.js-txt-event-setting-lastbook').val();                                                                                                    
                                                            
                    Component.create.confirm.action(
                        {
                            //type    :   'question',
                            title   :   'Simpan Data',
                            content :   'Apakah Anda ingin menyimpan?'
                        },function(){
                            
                            Global.prepareBtnPost(o);
                            
                            //Global._setBrowserActivity($this.activity+"_update_setting",$this.selectedId);
                            Global.param.email = Global.getCookie('myEmail');
                            Global.param.fields = {                                                                
                                event_type      :   Global.b64EncodeUnicode($('.js-opt-event-type').find(":selected").val()),
                                i_level         :   Global.b64EncodeUnicode($('.js-opt-event-level').find(":selected").val()),
                                is_certificated :   Global.b64EncodeUnicode($('.js-opt-event-certificate').find(":selected").val()),
                                is_refundable   :   Global.b64EncodeUnicode($('.js-opt-event-refundable').find(":selected").val()),
                                i_language      :   Global.b64EncodeUnicode($('.js-opt-event-language').find(":selected").val()),
                                reminder_seats  :   Global.b64EncodeUnicode(reminder_seats),
                                days_last_book  :   Global.b64EncodeUnicode(days_last_book),
                                
                                
                            };
                                                                                    
                            $this.update('Setting');
                            $('.js-cancel-other-setting').trigger('click');
                            
                            Global.afterBtnPost(o,text);

                    });                    
                   
                }
                
                return false;
                
            });            
            
            $('.js-cancel-other-setting').click(function(){
                $('.view-other-setting').show();
                $('.form-other-setting').hide();
                return false;
            });
            //end setting
            
            
            
            //tab 2
                            
            $('.js-action-content-material').click(function(){
                
                $('.view-content-material').hide();
                $('.form-content-material').show();                                                                
                
                return false;
            });
                                    
                                    
            $('.js-save-content-material').off().on('click',function(){
                
                var o = $(this);
                var text= o.text();
                      
                $('#form-content-material').parsley('validate');
                                
                if($('#form-content-material').parsley('isValid')){                                                                                        

                    //Global._setBrowserActivity($this.activity+"_update_materi",$this.selectedId);
                        
                    Global.param.code = Global.b64EncodeUnicode($this.selectedId);
                    Global.param.i_materi = Global.b64EncodeUnicode($this.materi.selectedId);
                    Global.param.i_materi_item = Global.b64EncodeUnicode($this.i_materi_item);
                    Global.param.i_person = Global.b64EncodeUnicode($this.materi.selectedTrainer);
                    Global.param.i_user = Global.b64EncodeUnicode(Global.getCookie('myId'));
                                                            
                    Global.param.start_hour     = $('.js-opt-event-materi-start-hour').find(":selected").val();
                    Global.param.start_minute   = $('.js-opt-event-materi-start-minute').find(":selected").val();
                    Global.param.start_time     = $('.js-opt-event-materi-start-hour').find(":selected").data('time');
                    
                    Global.param.end_hour   = $('.js-opt-event-materi-end-hour').find(":selected").val();
                    Global.param.end_minute = $('.js-opt-event-materi-end-minute').find(":selected").val();
                    Global.param.end_time   = $('.js-opt-event-materi-end-hour').find(":selected").data('time');
                                        
                    Global.param.materi_session   = $('.js-txt-session-detail').val();
                    Global.param.materi_description   = $('.js-txt-session-description').val();                                        
                                                                                      
                    
                    Component.create.confirm.action({                            
                            title   :   'Simpan Data',
                            content :   'Apakah Anda ingin menyimpan?'
                        },function(){
                            
                            Global.prepareBtnPost(o);
                            
                            if(Events.materi.scope=='create'){
                                $this.materi.setMateri(function(){

                                    Global.afterBtnPost(o,'Simpan');

                                    $this.renderPanel(Request.response.data,false);
                                    $('.js-cancel-content-material').trigger('click')

                                });
                                
                            }else{
                                
                                $this.materi.updateMateriItem(function(){

                                    Global.afterBtnPost(o,'Simpan');

                                    $this.renderPanel(Request.response.data,false);
                                    $('.js-cancel-content-material').trigger('click')

                                });
                            }

                    });
                    
                                    
                }
                
                return false;
            });
            
            
            
            //faq
            $('.js-action-faq').click(function(){
                                                                
                $('.view-faq').hide();
                $('.form-faq').show();
                
                $('.js-txt-faq-title').val('');
                $('.js-txt-faq-description').val('');
                
                Events.faq.state="create";
                return false;
            });
            
            $('.js-btn-save-faq').click(function(){
                
                var o = $(this);
                var text= o.text();
                
                $('#js-form-events-faq').parsley('validate');

                if($('#js-form-events-faq').parsley('isValid')){
                    
                    Component.create.confirm.action(
                        {
                            //type    :   'question',
                            title   :   'Simpan Data',
                            content :   'Apakah Anda ingin menyimpan?'
                            
                        },function(){
                                                        
                            Global.prepareBtnPost(o);
                            //Global._setBrowserActivity($this.activity+"_update_faq",$this.selectedId);
                                                                           
                            
                            if(Events.faq.state=='create'){
                                
                                Global.param.code = Global.b64EncodeUnicode($this.selectedId);                                
                                Global.param.email = Global.b64EncodeUnicode(Global.getCookie('myEmail'));
                                Global.param.i_user = Global.b64EncodeUnicode(Global.getCookie('myId'));                            
                                Global.param.fields = [{
                                    i_event     :   Global.b64EncodeUnicode($this.code),
                                    title       :   Global.b64EncodeUnicode($('.js-txt-faq-title').val()),
                                    description :   Global.b64EncodeUnicode($('.js-txt-faq-description').val())
                                }];

                                Events.faq.setFaq(function(){

                                    //render faq
                                    Global.afterBtnPost(o,'Submit');
                                    $this.renderPanel(Request.response.data,false);

                                    $('.js-btn-cancel-faq').trigger('click');                                


                                });
                                
                            }else if(Events.faq.state=='edit'){
                                
                                Global.param.code = Global.b64EncodeUnicode($this.selectedId);
                                Global.param.faq_id = Global.b64EncodeUnicode(Events.faq.selectedId);
                                Global.param.email = Global.b64EncodeUnicode(Global.getCookie('myEmail'));
                                Global.param.i_user = Global.b64EncodeUnicode(Global.getCookie('myId'));                            
                                Global.param.fields = [{
                                    i_event     :   Global.b64EncodeUnicode($this.code),
                                    title       :   Global.b64EncodeUnicode($('.js-txt-faq-title').val()),
                                    description :   Global.b64EncodeUnicode($('.js-txt-faq-description').val())
                                }];
                                
                                Events.faq.updateFaq(function(){

                                    //render faq
                                    Global.afterBtnPost(o,'Submit');
                                    $this.renderPanel(Request.response.data,false);

                                    $('.js-btn-cancel-faq').trigger('click');                                


                                });
                            }
                            
                            
                    });
                }
                return false;
            });
            
            $('.js-btn-cancel-faq').click(function(){
                $('.view-faq').show();
                $('.form-faq').hide();
                return false;
            });
               
            //end faq
            
            //tab 3
            $('.js-action-address-course').click(function(){
                
                $('.view-address-course').hide();
                $('.form-address-course').show();
                
                Component.create.jbox.tooltip('Anda dapat memilih lokasi disekitarnya.',true,'#js-map');
                $('#js-map').trigger('click');                    
                
                Map.viewDefault('js-map',function(){});
                
                return false;
            });
            
            $.each($('.js-opt-venue-search'),function(i,e){

                $(e).off().on('ifChanged', function(event){
                    
                    /*
                    $this.onEdit.venueSearchModel=event.target.value;
                    
                    if($this.onEdit.venueSearchModel==1){
                        
                        $('.js-txt-event-venue').hide();
                        $('.js-txt-event-venue').val('');
                        $('.div-venues-near').remove();
                        
                    }else{
                        
                        $('#js-txt-event-venue').focus();
                        $('.js-txt-event-venue').show();
                        
                    }
                    */
                });

            });
            
            $('.js-btn-save-event-address').off().on('click',function(){
                
                var o=$(this);
                var text =o.text();
                
                $('#js-form-address').parsley('validate');

                    if($('#js-form-address').parsley('isValid')){
                
                        Component.create.confirm.action(
                                {                                    
                                    title   :   'Simpan Data',
                                    content :   'Apakah Anda ingin menyimpan?'
                                },function(){

                                    Global.prepareBtnPost(o);

                                    //Global._setBrowserActivity($this.activity+"_update_address",$this.selectedId);
                                    Global.param.email = Global.getCookie('myEmail');
                                    Global.param.fields = {
                                        venue_name : Global.b64EncodeUnicode($('.js-txt-event-venue').val()),
                                        event_place_id : Global.b64EncodeUnicode(Map.property.place_id),
                                        event_lat : Global.b64EncodeUnicode($('#js-txt-lat').val()),
                                        event_lang : Global.b64EncodeUnicode($('#js-txt-long').val()),
                                        event_position : Global.b64EncodeUnicode(Map.property.location),
                                        event_address : Global.b64EncodeUnicode($('.js-txt-event-address').val()),
                                        event_city : Global.b64EncodeUnicode(Map.property.city),
                                        event_state : Global.b64EncodeUnicode(Map.property.state),
                                        event_country :  Global.b64EncodeUnicode(Map.property.country),
                                        event_url_location :  Global.b64EncodeUnicode($('.js-txt-url-location').val()),
                                    };                                    

                                    //set to hiiden object
                                    $('#js-txt-lat').val(Map.property.lat);
                                    $('#js-txt-lang').val(Map.property.long);
                                    $('#js-txt-position').val(Map.property.location);

                                    $this.update('Lokasi');                                   
                                    Global.afterBtnPost(o,'Simpan');
                                    $('.js-btn-cancel-event-address').trigger('click');

                            });
                    }
                    
                return false;
                
            });
            
            $('.js-btn-cancel-event-address').click(function(){
                $('.view-address-course').show();
                $('.form-address-course').hide();
                
                $this.renderPanel($this.data,false);
                
                return false;
                
            });
            
            
            //TICKET SETTING
            
            $('.js-btn-modal-ticket').off().on('click',function(){                                
                
                //reset earlybird
                $this.tickets.earlybird.data=[];
                $this.tickets.mode="create";                
                Events.tickets.resetForm();
                $('.js-btn-earlybird-items').remove();
                
                $('#priceTicketsModal').modal({backdrop: 'static', keyboard: false}).on('shown.bs.modal', function(e) {
                    
                    
                    
                }).on('hidden.bs.modal',function(e){
                    
                });
            });
            
            $('.js-btn-add-ticket').off().on('click',function(){
                
                $this.tickets.reset();
                
            });
            
            $('.js-btn-close-ticket').off().on('click',function(){
                
               $('#priceTicketsModal').modal('hide'); 
               
               return false;
            });                        
            
            $('.js-opt-ticket-price-type').on('change',function(){
                                
                var a = $(this).val();
                
                Events.tickets.scope=a;
                Events.tickets.setProperty({scope:a});
                $('.js-txt-ticket-type').val($(this).val());
                
            });                        
            
                
            $('.js-btn-save-ticket-default').off().on('click',function(){

                $('#priceTicketsModal').modal('hide');

                return false;

            });
            
                                        
            $('.js-btn-save-ticket-free').off().on('click',function(){
                                
                var scope = 'free';
                var ticket_name = $('.js-txt-ticket-type').val();                    
                var price_type = $('.js-opt-ticket-price-type').val();
                
                
                if(price_type != "" && ticket_name != ""){
                    
                    Events.tickets.saveTicket(scope,ticket_name);

                }

                return false;

            });
                                                                            
            $('.js-btn-save-ticket-normal').off().on('click',function(){

                var scope = 'normal';
                var ticket_name = $('.js-txt-ticket-type').val();                    
                var price_type = $('.js-opt-ticket-price-type').val();

                if(price_type != "" && ticket_name != ""){

                    //refresh fix price discount
                    $('#btn-cal-disc').trigger('click');


                    Events.tickets.saveTicket(scope,ticket_name);

                }

                return false;

            });               
                                          
            $('.js-btn-save-ticket-discount').off().on('click',function(){

                var scope = 'discount';
                var ticket_name = $('.js-txt-ticket-type').val();                    
                var price_type = $('.js-opt-ticket-price-type').val();

                if(price_type != "" && ticket_name != ""){
                    
                    $('#btn-cal-disc').trigger('click');
                    
                    if(Events.tickets.allowedSave){
                        Events.tickets.saveTicket(scope,ticket_name);
                    }else{
                        Component.create.jbox.notif('Opps...','Angka yang anda input tidak dapat disimpan',false);
                    }
                    
                }

                return false;

            });               
                                                                    
                
            $('.js-btn-save-ticket-earlybird').off().on('click',function(){
                
                var a=$('.js-txt-ticket-earlybird-seats').val();
                var b=$('.js-txt-ticket-earlybird-maxperson').val();                                        
                
                $('#btn-cal-disc-early').trigger('click');
                
                if(parseInt(a) < parseInt(b) ){

                   $('.js-txt-ticket-earlybird-seats').focus();

                    Component.create.jbox.notif('Opps..','Jumlah Max.peserta melebihi Quota Tiket!',false);

                    return;

                }

                if($('.js-txt-start-date-earlybird').val() == ""){

                   $('.js-txt-start-date-earlybird').focus();

                    Component.create.jbox.notif('Opps..','Tanggal mulai Early bird belum tersedia!',false);

                    return;

                } 

                if($('.js-txt-end-date-earlybird').val() == ""){

                    $('.js-txt-end-date-earlybird').focus();

                    Component.create.jbox.notif('Opps..','Tanggal Akhir Early bird belum tersedia!',false);

                    return;                        

                }

                if($('.js-txt-start-date-earlybird').val()  > $('.js-txt-end-date-earlybird').val()){

                   $('.js-txt-start-date-earlybird').focus();

                    Component.create.jbox.notif('Opps..','Tanggal mulai tidak boleh lebih besar dari tanggal akhir!',false);

                    return;

                }
                
                if($('.js-txt-start-date-earlybird').val()  > Events.start_date){

                   $('.js-txt-start-date-earlybird').focus();

                    Component.create.jbox.notif('Opps..','Tanggal mulai tidak boleh lebih besar dari tanggal pelaksanaan!',false);

                    return;

                }
                
                if($('.js-txt-end-date-earlybird').val()  > Events.start_date){

                   $('.js-txt-end-date-earlybird').focus();

                    Component.create.jbox.notif('Opps..','Tanggal mulai tidak boleh lebih besar dari tanggal pelaksanaan!',false);

                    return;

                }
                                
                $('#js-form-earlybird-ticket').parsley('validate');

                if($('#js-form-earlybird-ticket').parsley('isValid')){
                    
                    var table="";
                    table+="<table class='table table-resposive'>";
                        table+="<tr>";
                            table+="<td>";
                                table+="Harga Normal";
                            table+="</td>";
                            table+="<td>";
                                table+=parseFloat($('.js-txt-ticket-earlybird-price').val()).formatMoney();
                            table+="</td>";
                        table+="</tr>";
                        
                        table+="<tr>";
                            table+="<td>";
                                table+="Total Tiket";
                            table+="</td>";
                            table+="<td>";
                                table+=$('.js-txt-ticket-earlybird-seats').val();
                            table+="</td>";
                        table+="</tr>";
                        
                        table+="<tr>";
                            table+="<td>";
                                table+="Diskon";
                            table+="</td>";
                            table+="<td>";
                                table+=parseFloat($('.js-txt-ticket-discount-earlybird-value').val())+" %";
                            table+="</td>";
                        table+="</tr>";
                        
                        table+="<tr>";
                            table+="<td>";
                                table+="Harga Early";
                            table+="</td>";
                            table+="<td>";
                                table+=parseFloat($('.js-txt-ticket-earlybird-rate').val()).formatMoney();
                            table+="</td>";
                        table+="</tr>";
                        
                        table+="<tr>";
                            table+="<td>";
                                table+="Durasi";
                            table+="</td>";
                            table+="<td>";
                                table+=Global.formatDateEngToIndo($('.js-txt-start-date-earlybird').val())+"<br>sampai<br>"+Global.formatDateEngToIndo($('.js-txt-end-date-earlybird').val());
                            table+="</td>";
                        table+="</tr>";                                                
                        
                    table+="</table>";
                                                            
                    Component.create.confirm.action(
                        {                                        
                            title   :   'Simpan Data',
                            content :   table+"Apakah Anda ingin menyimpan?"

                        },function(){                        
                            
                            Events.tickets.earlybird.data.push({
                                'i_event'       :   $this.selectedId,
                                'start_date'    :   $('.js-txt-start-date-earlybird').val(),
                                'end_date'      :   $('.js-txt-end-date-earlybird').val(),
                                'price'         :   $('.js-txt-ticket-earlybird-rate').val(),                    
                                'max_person'    :   $('.js-txt-ticket-earlybird-maxperson').val()                    
                            });

                            Global.param.earlybird = Events.tickets.earlybird.data;
                            
                            var description="Earlybird ";
                            if($('.js-txt-ticket-description-earlybird').val()==""){
                                
                                description+="Berlaku dari : "+$('.js-txt-start-date-earlybird').val()+" sampai "+$('.js-txt-end-date-earlybird').val()+" ";
                                description+=$('.js-txt-ticket-description-earlybird').val();
                                
                            }else{
                                
                                description+=$('.js-txt-ticket-description-earlybird').val();
                            }
                            
                            
                            Global.prepareBtnPost($('.js-btn-save-ticket-earlybird'));

                            //Global._setBrowserActivity('setup_ticket',$this.selectedId);
                            Global.param.email = Global.getCookie('myEmail');
                            
                            Global.param.fields = {
                                i_event             :   $this.code,
                                ticket_name         :   $('.js-txt-ticket-type').val(),
                                ticket_description  :   description,
                                ticket_currency     :   $('.js-opt-currency-earlybird').find(':selected').val(),
                                ticket_price        :   $('.js-txt-ticket-earlybird-price').val(),
                                ticket_fix_price    :   $('.js-txt-ticket-earlybird-rate').val(),
                                ticket_discount     :   $('.js-txt-ticket-discount-earlybird-value').val(),
                                ticket_seats        :   $('.js-txt-ticket-earlybird-seats').val(),
                                ticket_available    :   $('.js-txt-ticket-earlybird-maxperson').val(),
                                ticket_paid         :   0,
                                ticket_retur        :   0, 
                                is_free             :   1,
                                is_promo            :   0,
                                is_earlybird        :   1,
                            }
                            
                            var url=Events.tickets.mode=='create'?Request.Tickets.setEarlyBird():Request.Tickets.updateEarlyBird();
                            
                            if(Events.tickets.mode=='edit'){
                                Global.param.fields.i_ticket=Events.tickets.selectedId;
                            }

                            //commit to db
                            Request.do('POST',url,function(){
                                
                                Global.afterBtnPost($('.js-btn-save-ticket-earlybird'),'Simpan');
                                
                                if(Request.response.status==1){                                

                                    Events.renderPanel(Request.response.data,false);

                                    Events.tickets.resetForm();

                                    $('#priceTicketsModal').modal('hide');
                                    
                                    Component.create.jbox.notif('Ahaa..','Tiket '+$('.js-txt-ticket-type').val().ucwords()+' berhasil dibuat!',true);

                                }else{

                                    Component.create.jbox.notif('Opps..','Nama Tiket untuk event ini sudah dibuat!',false);

                                }
                                                                                                

                            });

                        });

                }               

               return false;
           }); 
            
                        
            
            //PUBLISH
            
            $('.js-btn-publish-now').off().on('click',function(){
                
                Events.toPublish=1;
                
                $('#js-btn-publish-now').parsley('validate');

                if($('#js-btn-publish-now').parsley('isValid')){
                    
                    var o=$(this);
                    var publish_date=$('.js-txt-event-publish-date').val();
                    
                    if($this.start_date > publish_date ){
                                                                                                                                                                     
                        Global.prepareBtnPost(o);
                        o.text('Processing...')

                        $this.validateEventToPublic(function(){

                        });
                    }else{
                        
                        Component.create.jbox.notif('Opps...','Tanggal yang dipilih tidak boleh lebih dari tanggal mulai event!',false);
                    }
                    
                };
                
                return false;
            })
                
            
        },
        idOtherTrainer  :   null,
        cekEarlyBirdOnPush  :function(id){
            
            var $this = Events;
            var r=true;
            

            $.each($this.tickets.earlybird.data,function(i,e){

               if(e.start_date==id){

                   r=false;
                   return true;                                                         

               }else{

                   r=true;
               } 

            });

            if(r){
                              
                $this.tickets.earlybird.data.push({
                    'i_event'       :   $this.selectedId,
                    'start_date'    :   $('.js-txt-start-date-earlybird').val(),
                    'end_date'      :   $('.js-txt-end-date-earlybird').val(),
                    'price'         :   $('.js-txt-ticket-earlybird-rate').val(),                    
                    'max_person'    :   $('.js-txt-ticket-earlybird-maxperson').val()                    
                });
                                
                Global.setCookie('earlybird',$this.tickets.earlybird);
                
                var a = JSON.stringify(Global.getCookie('earlybird'));
                
                console.log(JSON.parse(a));
                
            }else{

                Component.create.jbox.notif('Opps..','Anda menambahkan tanggal yang sama!',false);

            }

            return r;
                    
        },        
        cekMultidateOnPush  :function(val){
            
            var $this = Events;
            var r=true;                        
            var err;                                    
            
            if(val == ''){r=false;err='Tanggal tidak boleh kosong'};
            if(val == null){r=true};
            if(val > $this.multidate.lastDate){r=true};
            if(val < $this.multidate.lastDate){r=false;err='Tanggal tidak boleh lebih kecil dari tanggal terakhir'};            
            
            if(r){
                
                //refresh dulu                 
                $this.multidate.fireEvent();

            }else{

                Component.create.jbox.notif('Opps..',err,false);

            }
                        
            return r;
                    
        },        
        cekMateriOnPush  :function(id){
            
            var $this = Events;
            var r=true;
            var start=null;
            

            $.each($this.materi.data,function(i,e){
                
                start = e.start_hour;
                
               if(e.start_hour==id){// id=start hour jadi key untuk cek jam saja

                   r=false;
                   
                   return false;                                                         

               }else{
                   
                   if(parseInt(id) <= parseInt(start) ){
                       
                       Component.create.jbox.notif('Opps..','Jam lebih kecil dari jam sebelumnya!',false);
                       
                       r=false;
                       return false;
                   }

                   r=true;
               } 

            });

            if(r){

                $this.materi.data.push({                    
                    'i_person'          :   $this.materi.trainer,
                    'materi_session'        :   $('.js-txt-session-detail').val(),
                    'materi_description'    :   $('.js-txt-session-description').val(),                                                                                
                    'start_hour'    :   $('.js-opt-event-materi-start-hour').find(":selected").val(),
                    'start_time'    :   $('.js-opt-event-materi-start-hour').find(":selected").data('time'),
                    'start_minute'  :   $('.js-opt-event-materi-start-minute').find(":selected").val(),
                    'end_hour'      :   $('.js-opt-event-materi-end-hour').find(":selected").val(),
                    'end_minute'    :   $('.js-opt-event-materi-end-minute').find(":selected").val(),
                    'end_time'      :   $('.js-opt-event-materi-start-hour').find(":selected").data('time'),
                });
                
                console.table(Events.materi.data);
                
                Events.materi.render(Events.materi.data,'#js-div-table-item-materi');                                
                
                Events.materi.fireEvent();
                Global.setCookie('materi',Events.materi.data);
                
                var a = JSON.stringify(Global.getCookie('materi'));
                                

            }else{
                
                Component.create.jbox.tooltip('Opps..',Render.displayError('Jam tidak boleh sama atau lebih kecil!'),false,'.js-lbl-event-materi-start-hour');

                $('.js-lbl-event-materi-start-hour').trigger('click');

            }

            return r;
                    
        },        
        loadOtherPartner    :function(f){
            var obj = '.js-div-other-trainer';
            var $this = Events;
                        
            Component.show.FBLoader(obj);

            setTimeout(function(){

                Request.do('GET',Request.Person.mine(Global.b64EncodeUnicode(Global.getCookie('myId')),'json'),function(){

                    Render.person.boxOtherTrainer(Request.response.data,obj,function(){

                        Rating.init();
                                                
                                                

                    });
                    
                    f();

                });

            },'1000');
        },
        resetFormMateri :function(){
                        
            /*
            $('.js-opt-event-materi-start-hour').val('01'+$(this).data('time'));
            $('.js-opt-event-materi-start-minute').val('01');
            $('.js-opt-event-materi-end-hour').val('01');
            $('.js-opt-event-materi-end-minute').val('00');
            */            
                    
            $('.js-txt-session-detail').val('').focus();
            $('.js-txt-session-description').val('');
            
        }
    },
    onManage  :   {
        init    :   function(){
            var $this = Events.onManage;
            $this.handler();
        },
        handler :function(){
            $('.readOnly').raty({ readOnly: true, score: 3.5 });
            $('.actionStar').raty({ half: true }); // Default Course Review
        }        
    },
    onDetail : {
        default : function() {                                        
            
            $(Global.getCookie('currentTab')).trigger('click');
            
            Events.tabHandler('.js-tab-event');
            
            Map.viewDefault('map-view',function(){});
            
            $('*[role="event"]').each(function(index, elem) {
                var $this = $(elem);
                var eventId = $this.attr("id");                
                
                $this
                    .find(".js-action-like")
                    .first()
                    .like({
                        "id" : eventId, 
                        "type" : "events",
                        "counter" : $this.find('.js-value-like')
                    });
                    
                $this.on('click','.events-foto',function(e){
                    
                    $(".detail-zoom-gallery-modal").modal({backdrop:'static',keyboard:false}).on('shown.bs.modal', function(e) {            



                    }).on('hidden.bs.modal', function(e) {            
                        
                        

                    });
                    
                    return false;
                    
                });
                
                $this.on( 'click', '.js-action-wishlist', function (e) {
                    var $_this   = $(this);
                    var $counter = $this.find('.js-value-wishlist');

                    if (!Global.checkSession(true)) {
                        return;
                    }

                    Global.prepareBtnPost($_this);
                    Global._setBrowserActivity("wishlist_events", $this.selectedId);
                    Global.param.code = eventId;
                    Global.param.scope = 'event';
                    Global.param.url  = $(location).attr('href');

                    Request.do('POST', Request.Events.setWishlist(eventId), function() {
                        /** 
                         * 1 = Wishlist
                         * 0 = Un-Wishlist
                         */
                        if (typeof(Request.response.wishlist) !== undefined) {
                            if (Request.response.wishlist) {
                                Global.afterBtnPost($_this, 'Batal Wishlist');
                                $counter.incrementHtml();
                                Component.create.jbox.notif("Ahaa..", 'Anda berhasil menambahkan ke wishlist!', true);
                            } else {
                                Global.afterBtnPost($_this, 'Wishlist');
                                $counter.decrementHtml();
                                Component.create.jbox.notif("Opps..", 'Anda telah membatalkan wishlist!', false);
                            }
                        }
                    });
                });

                $this.find('#question-subject').on('change', function(e) {
                    var $ticket = $('#question-invoice');

                    if ($(this).val() == 'S01.CSL.1701.0000004') {
                        $ticket.attr('required', 'required');
                        $ticket.parent().removeClass('hidden');
                    } else {
                        $ticket.removeAttr('required');
                        $ticket.parent().addClass('hidden');
                    }
                });

                $this.find('#question-submit').on('click', function(e) {
                    e.stopPropagation();

                    var $this   = $(this);
                    var $btn    = $('#question-submit');
                    var btnText = $btn.text();
                    var session = Global.checkSession(true);

                    $('#ask-form').parsley('validate');

                    if ($('#ask-form').parsley('isValid') && session) {
                        Global.prepareBtnPost($btn);
                        Global._setBrowserActivity("ask_events", Global.b64DecodeUnicode(eventId));
                        Global.param.code    = eventId;
                        Global.param.subject = $('#question-subject').val();
                        Global.param.message = $('#question-message').val();
                        Global.param.invoice = $('#question-invoice').val();

                        Request.do('POST', Request.Events.setQuestion(eventId), function() {
                            Global.afterBtnPost($btn, btnText);

                            if (Request.response.success) {
                                $('#question-subject, #question-message').val('');
                                Component.create.jbox.notif("Ahaa..", "Pertanyaan berhasil terkirim!", true);
                            } else {
                                Component.create.jbox.notif("Opps..", "Pesan minimal 20 karakter",false);
                            }

                            $this.parsley('reset');
                        });
                    }

                    return false;
                });
            });
        },        
    },
    category    :   {
        all :   function(f){
            Request.do('GET',Request.Events.Category.get.All('json'),function(){
                f();
            });
        },
        items   :   function(id,f){

            Request.do("GET",Request.Events.Category.get.getItems(id),function(){

                f();

            });

        }
    },
    update  :   function(scope){
        var $this = Events;
        
        Global.param.code = Global.b64EncodeUnicode($this.selectedId);
        
        Request.do('POST',Request.Events.update(),function(){            
            
            if(Request.response.status=="1"){
                
                $this.const(Request.response.data.events[0]);
                $this.data = Request.response.data;
                
                //set to client multidate
                Events.multidate.data=$this.data.multiday;                
                                
                $this.categories = Request.response.data.categories;
                $this.renderPanel(Request.response.data,false);
                
                if(scope=='Tanggal'){
                    
                    $('.js-cancel-custom-date').trigger('click');
                    Global.afterBtnPost($('.js-submit-custom-date'),'Lanjut');
                }
                
            }else{

                Component.create.jbox.notif('Opps..','Judul tidak boleh sama!',false);
                
            }
            
            
            Global.param={};
        });
    },
    renderPanel :   function(data,onSubPanel){
        var $this = Events;
        
        //console.table(data);
        
        $this.onEdit.checkStepComplete(data,onSubPanel);
       
        if(data.events.length >0){ //events
            
            $.each(data.events,function(i,e){ //single record no worries in loop coy
                
                $this.i_category = e.i_category;
                
                //render option
                if(data.categories.length > 0){
                    var opt="";
                    var selected="";
                    
                    $.each(data.categories,function(a,b){
                        
                        if(e.i_category == $this.i_category){
                            
                            selected="selected";
                            
                        }
                        
                        opt+="<option value='"+b.code+"' "+selected+">"+b.category+"</option>";
                        
                    });
                    
                    $('.js-opt-event-category').empty().html(opt);                                
                    
                }
                
                //const
                $this.is_multiday=e.is_multiday;
                $this.start_date=e.start_date;
                $this.start_hour=e.start_hour;
                $this.start_minute=e.start_minute;
                
                $this.end_date=e.end_date;
                $this.end_hour=e.end_hour;
                $this.end_minute=e.end_minute;                                
                $this.is_published=e.is_published;
                
                
                //panel title
                $('.view-title-course-content').empty().html(
                    "<div class='left-box'><h1 js-view-title>"+e.event_name+"</h1><div class='sub-title js-view-subtitle'>"+e.event_subname+"</div></div>"
                );
        
                //panel deskripsi
                var noContent="<div class='alert alert-danger'>Ringkasan belum tersedia!</div>";
                var deskripsi = e.event_description==null?noContent:e.event_description;
                
                if(deskripsi=="Tidak tersedia!"){
                    
                    //Component.create.jbox.tooltip('Opps..',Render.displayTooltip('Deskripsi Kelas belum anda buat.'),false,'.panel');
                    //$('.panel').eq(1).trigger('click');
                    
                }
                                
                $('.view-summary-description-content').empty().html(
                    deskripsi
                );
        
                Global.setEditorEventValue(deskripsi);
        
                //panel address
                var noContent="<div class='alert alert-warning' ><center>Venue belum tersedia!</center></div>";
                var lokasi = e.event_lat==null?noContent:e.venue_name;
                var address = e.event_lat==null?noContent:e.event_address;
                
                
                if(e.event_lat!=null){
                    
                    $('#js-txt-lat').val(e.event_lat);
                    $('#js-txt-long').val(e.event_lang);
                    $('#js-txt-position').val(e.event_position);                                        
                    
                    $('.js-txt-event-venue').val(e.venue_name);
                    $('.js-txt-event-address').val(e.event_address);
                                        
                    Map.viewDefault('map-view',function(){});
                    
                    $('.view-address-course-content').empty().html(
                        lokasi+" : "+address
                    );
            
                }else if(e.event_lat == null){
                    
                    $('.view-address-course-content').empty().html(
                        lokasi
                    );
            
                }
        
                //panel date venue
                
                $('.js-action-venue-date').attr('data-multiday',e.is_multiday);
                $('.js-action-venue-date').attr('data-start',e.start_date);
                $('.js-action-venue-date').attr('data-end',e.end_date);
                    
                var table="";
                                
                if(e.start_date != null){
                                    
                    if(e.is_multiday=='0'){ //single session

                        table+="<div class='table-responsive'>";
                            table+="<table class='table'>";
                                
                                table+="<tbody>";
                                    table+="<tr>";
                                        table+="<td>";
                                            table+="Tanggal";
                                        table+="</td>";
                                        table+="<td>";
                                            table+=":";
                                        table+="</td>";
                                        table+="<td>";
                                            table+=Global.formatDateEngToIndo(e.start_date);
                                        table+="</td>";
                                        
                                    table+="</tr>";
                                                                        
                                table+="</tbody>";
                                
                            table+="</table>";
                        table+="</div>";


                    }else if(e.is_multiday=='1'){ //multi session

                        var n=1;

                        table+="<table class='table'>";
                            table+="<thead>";
                                table+="<tr>";
                                    table+="<th></th>";
                                    table+="<th></th>";                                    
                                table+="</tr>";
                            table+="</thead>";
                            table+="<tbody>";

                                //loop 
                                
                                $.each(Events.multidate.data,function(x,y){ //single record no worries in loop coy

                                    table+="<tr>";
                                        table+="<td>Hari ke "+n+"</td>";
                                        table+="<td>"+Global.formatDateEngToIndo(y.start_date)+"</td>";                                        
                                    table+="</tr>";
                                    
                                    //update param
                                    Events.multidate.lastDate=y.start_date;
                                    Events.multidate.minDate=y.start_date+1;
                                    
                                    n++;
                                });

                            table+="</tbody>";
                        table+="</table>";

                    }
                                    
                }else{
                    
                    table+="<div class='alert alert-danger'>Tanggal pelaksanaan belum tersedia!</div>";
                    
                }
                
                $('.view-venue-date-content').empty().html(table);
                
                $('.js-txt-event-single-start-date').val(e.start_date);
                $('.js-txt-event-single-end-date').val(e.end_date);
                
                //end venue date
                
                //panel category
                if(e.i_category != null){
                    
                    $('.js-txt-view-category').empty().html(e.category);
                    $('.js-txt-view-subcategory').empty().html(e.subcategory);
                    
                }else{
                    
                    $('.js-txt-view-category').empty().html("<div class='alert alert-danger'>Kategori belum tersedia!</div>");
                    $('.js-txt-view-subcategory').empty().html("<div class='alert alert-danger'>Sub Kategori belum tersedia!</div>");
                    
                }
        
                //panel tag
                var tags = "";
                var tag="";
                
                if(e.event_tag != null){
                    
                    tags=e.event_tag.split(",");
                    
                    if(tags.length > 0){
                        for(var i=0;i < tags.length;i++){
                            tag+="#"+tags[i];    
                        }
                        
                    }
                    
                    
                    $('.js-txt-view-hashtag').empty().html(tag);
                    
                }else{
                    
                    $('.js-txt-view-hashtag').empty().html("<div class='alert alert-danger'>Tag belum tersedia!</div>");
                    
                }
                
                //panel setting
                
                var certificated=e.is_certificated=='0'?"Tidak":'Ya';
                var refundable=e.is_refundable=='0'?"Tidak":e.is_refundable+" Hari sebelum acara";                
                                
                
                var def="Default: "+e.days_last_book;

                if(e.days_last_book != 2){

                    def=e.days_last_book;
                }

                
                $('.js-txt-view-class-type').empty().html(e.event_type != null ?e.event_type.ucwords():"<div class='alert alert-danger'>Jenis kelas belum dipilih!</div>");
                $('.js-txt-view-class-level').empty().html(e.level_name!= null?e.level_name.ucwords():"<div class='alert alert-danger'>Tingkatan kelas belum dipilih!</div>");
                $('.js-txt-view-certificated').empty().html(certificated);
                $('.js-txt-view-refundable').empty().html(refundable);
                $('.js-txt-view-class-language').empty().html(e.language != null? e.language:"<div class='alert alert-danger'>Bahasa belum dipilih!</div>");
                $('.js-txt-view-class-reminder').empty().html(e.reminder_seats);
                $('.js-txt-view-class-last-book').empty().html(def+" hari");
            });                        
        }
               
        //materi                                
        Render.events.materi(data.materi.content,'.view-content-materi');        
        $this.materi.fireEvent();
        
        //end materi    
        
        //faq                               
        
        Render.events.faq(data.faqs.content,'.view-faq-content');        
        $this.faq.fireEvent();        
        
        //end faq
                        
        Render.events.gallery(data.galleries.content,'.container-foto');        
        $this.gallery.fireEvent();
        //END GALLERY
        
        Render.tickets.setup('.js-div-ticket-setting',data.tickets,function(){
            Events.tickets.handler();
        });
        
        Render.tickets.setup('.js-div-render-ticket',data.tickets,function(){
            Events.tickets.handler();
        });                
        
    },       
    faq :   {
        state   :   'create',
        selectedId  :   null,
        fireEvent :   function(){
            var $this = Events;
            var me = $this.faq;
            
            $('.div-group-modify-btn-faq').hide();//default to hide
            
            $.each($('.container-box-faq'),function(i,e){
            
                $(e).off().on('mouseenter',function(){                                        

                    $('.div-group-modify-btn-faq').hide()
                    $('.div-group-modify-btn-faq').eq(i).show();

                }).on('mouseleave',function(){

                    $('.div-group-modify-btn-faq').hide()

                });

            });
        
            $.each($('.js-btn-edit-faq'),function(i,e){
                $(e).off().on('click',function(){

                    console.log($(e).data('code'));
                    
                    Events.faq.state = 'edit';
                    me.selectedId = $(e).data('code');
                    $('.js-txt-faq-title').val($(e).data('title'))
                    $('.js-txt-faq-description').val($(e).data('description'))

                    $('.view-faq').hide();                    
                    $('.form-faq').show();

                    return false;

                });
            });

            $.each($('.js-btn-remove-faq'),function(i,e){
                $(e).off().on('click',function(){
                    var o = $(e);
                    var text = $(e).text();
                    
                    Component.create.confirm.action(
                        {                            
                            title   :   'Hapus Data',
                            content :   'Apakah Anda ingin menghapus?'
                        },function(){
                            
                            me.state = 'delete';
                            //Global._setBrowserActivity($this.activity+'_delete_faq',$this.selectedId);
                            Global.param.code = Global.b64EncodeUnicode($this.selectedId);
                            Global.param.faq_id = Global.b64EncodeUnicode($(e).data('code'));

                            Events.faq.delFaq(function(){
                                
                                $this.renderPanel(Request.response.data);

                            });
                            
                            Global.afterBtnPost(o,text);
                            

                    });
                    
                    
                    return false;
                });
            });
                    
        },
        setFaq  :   function(f){
        
            var $this = Events;

            Request.do('POST',Request.Events.setFaq('json'),function(){
                
                f();

            });
        },
        updateFaq  :   function(f){
        
            var $this = Events;

            Request.do('POST',Request.Events.updateFaq('json'),function(){
                
                f();

            });
        },
        delFaq  :   function(f){
        
            var $this = Events;

            Request.do('POST',Request.Events.delFaq('json'),function(){
                
                f();

            });
        }
    },
    gallery :   {
        fireEvent :   function(){
            var $this = Events;
            var me = $this.gallery;
            
            $.each($('.js-delete-gallery-event'),function(i,e){
                $(e).off().on('click',function(){
                    
                    Component.create.confirm.action(
                        {
                            //type    :   'question',
                            title   :   'Simpan Data',
                            content :   'Apakah Anda ingin menyimpan?'
                            
                        },function(){
                            
                            me.state = 'delete';
                            //Global._setBrowserActivity($this.activity+'_delete_gallery',$this.selectedId);
                            Global.param.code = Global.b64EncodeUnicode($this.selectedId);
                            Global.param.gallery_id = Global.b64EncodeUnicode($(e).data('code'));

                            $this.gallery.delGallery(function(){

                              $this.renderPanel(Request.response.data); 

                           });
                            
                        }
                    );
            
                    
                   
                   return false;
                   
                });
            })
        },
        delGallery  :   function(f){
            var $this = Events;
            
            Request.do('POST',Request.Events.delGallery('json'),function(){                                
                                
                f();

            });
            
        }
    }
    
}