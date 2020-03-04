var Profile = {
    scope       :   "profile",
    i_education :   null,
    i_experience :   null,
    i_achievement :   null,
    activity    :   'update_profile',
    code        :   Global.getCookie('myProfile'),
    country     :   [],
    region      :   [],
    subregion   :   [],
    mode        :   'create',    
    type        :   "1",
    gender      :   "1",
    dob         :   '2017-01-01',
    triggerIn   :   0,    
    property    :   null,
    events      :   [],    
    const   :   {
        profile :   function(data){
            
            this.code = data.code;
            this.i_region = data.i_region;
            this.i_subregion = data.i_subregion;
            this.firstname = data.firstname;            
            this.lastname = data.lastname;
            this.dob = data.dob;            
            this.email = data.email;
            this.company = data.company;
            this.address = data.address;
            this.person_type = data.person_type;
            this.identity_type = data.identity_type;
            this.identity = data.identity_number;            
            this.phone = data.phone;
            this.description = data.description;
            this.gender = data.gender;            
        },
        education :   function(data){
                                    
            this.code = data.code;
            this.i_person = data.i_person;
            this.i_file = data.i_file;    
            
            this.s_year = data.s_year;
            this.e_year = data.e_year;
            this.institution = data.institution;
            this.major = data.major;
            this.degree = data.degree;
            
            
        },
        experience :   {
            resetForm   :   function(){
                $('.txtCompanyExperience').val('');
                $('.txtPosition').val('');
                
                $('.js-div-end-year').show();
                $('.js-chk-now').removeAttr('checked');
                
                Form.reset();
                $('#form-work-experience').parsley().destroy();
                
            },
            endYear :   Global.getYear()
        },
        achievement :   function(data){
            
        },
        
    },    
    avatar  :   function(){
        
        return Global.BASE_ASSETS()+"images/icon-avatar.png";
    },    
    config  :   {
        config_act :   'set_',
        background  :   {
            config_name    :   'size_image_bg_event_group'
        },
        logo    :   {
            config_name    :   'size_image_logo_event_group'
        },
        avatar    :   {
            config_name    :   'size_image_profile_avatar'
        },
        validateSize    :   false
    },
    add :   function(){
        Profile.scope='add-trainer';
        
        Profile.handler();
        
    },
    init    :   function(){
        
        var $this=this; 
        $this.scope='profile';                                
                
        $this.calendar();        
        
        Global.prepareUpload('file-upload-profile','fileholder-profile',Profile.config,'avatar');
        Global.prepareUpload('file-upload-achievement','fileholder-achievement',Profile.config,'avatar');
        Map.bindSearch('js-txt-address','view-map1');
        
        $this.refresh();        
                
    },
    refresh :   function(){
        var $this = this;                
        
        Person.profile.get.usr(Global.b64EncodeUnicode($('.js-txt-id').val()),function(){                                                            
            
            //UPGRADE PROFILE TO TRAINER
            if(Global.getCookie('myGroup')=='S01.USG.1701.0000013'){

                Component.create.jbox.withAction("Untuk menjadi Trainer, silahkan mengisi biodata Anda <a href='#' id='js-upgrade-group'>disini!.</a>");

                $('#js-upgrade-group').off().on('click',function(){

                    Agreement.scope ='profile';
                    Agreement.beAPartner();

                });
            }   
            
            $this.renderPanel(Request.response);
            
            $this.handler();
            
        });
        
    },
    renderPanel :   function(data){
        var $this=this;        
        Global.param={}
        
        console.table(data);
                
        if(Global.getCookie('myGroup') == 'S01.USG.1701.0000014'){
            
            if(!Global.onForm){
                
                Profile.checkStepComplete(data);
                
            }
            
            
        }             
                
        //event
        $this.events= data.events;
        var text = data.events.length==0?1:data.events.length;                
        
        $('.js-count-event').text(Global.format.text.step[text]);
        //person
        
        $this.property = new Profile.const.profile(data.profile[0]);                                        
        $this.country= data.country;
        $this.region= data.region;
        $this.subregion= data.subregion;
        $this.gender = $this.property.gender;                
        $this.person_type = $this.property.person_type;                
        
             
        var dob = $this.property.dob==null?$this.dob:$this.property.dob;
        
        Global.setDate('.js-opt-date-birth',Global.extractDate(dob)['tanggal']);
        Global.setMonth('.js-opt-month-birth',Global.extractDate(dob)['bulan']);
        Global.setYear1('.js-opt-year-birth',Global.extractDate(dob)['tahun']);
        
        //country
        //skip 
        if($this.country.length > 0){
            
           $.each($this.country,function(i,e){
               
           }); 
        }
        
        //region        
        if($this.region.length > 0){
            
            var region = "";            
            var id = $this.property.i_region;
            
            region+="<option value=''>Pilih Propinsi</option>";
            
            $.each($this.region,function(i,e){
                
                var selected=e.code == id?"selected":"";
                
                region+="<option value='"+e.code+"' "+selected+">"+e.n_region+"</option>";
                
            }); 
           
            $('.js-opt-region').empty().html(region);
            
        }
        
        //subregion        
        if($this.subregion.length > 0){
            
            var subregion = "";            
            var id = $this.property.i_subregion;
            
            subregion+="<option value=''>Pilih Kota</option>";
            
            $.each($this.subregion,function(i,e){
                
                var selected=e.code == id?"selected":"";
                
                subregion+="<option value='"+e.code+"' "+selected+">"+e.n_region+"</option>";
                
            }); 
           
            $('.js-opt-subregion').empty().html(subregion);
            
        }
        
        //profile
        if(data.profile.length > 0){
            
            var el="",img="",description="",address="",profesional="";
            var avatar=Global.BASE_URL()+"assets/images/icon-avatar.png";                        
                        
            $.each(data.profile,function(i,e){
                                
                
                if(e.avatar !=  null){
                    
                    avatar=Global.BASE_URL()+e.avatar;                                        
                    
               
                }
                
                img+="<img class='js-img-avatar' src='"+avatar+"' style='width: 100%;'>";

                //end avatar handler
                                
                if(e.description !=  null){
                    
                    description+=e.description;                                        
                    
                }else{
                    
                    description+=Render.renderNoContent();
                }                                
               
               //end description handler               
                if(e.person_lat != null){
                                        
                    $('#js-txt-lat').val(e.person_lat);
                    $('#js-txt-long').val(e.person_long);
                    $('#js-txt-position').val(e.person_position);
                    $('#js-txt-url-location').val(e.person_url_location);
                    
                    Map.viewDefault('view-map',function(){});
                    
                }
                
                if(e.person_type ==  '2'){//institusi
                    
                    $('.m-box-gender').hide();
                    
                }
                
                if(e.address !=  null){
                    
                    address+=e.address;
                    
                }else{
                                        
                    address+=Render.renderNoContent();
                }                                
               
                //end description handler
                
                if(e.profesional_in !=  null){
                    
                    profesional+=e.profesional_in
                    
                }else{
                                        
                    profesional+=Render.renderNoContent();
                }                     
                
                $('.js-view-firstname').empty().html(e.firstname);
                $('.js-view-email').empty().html(e.email);
                
                var propinsi = e.propinsi==null?"-":e.propinsi;
                var kota = e.kota==null?"-":e.kota;
                
                
                $('.js-view-propinsi').empty().html(propinsi);
                $('.js-view-kota').empty().html(kota);
                
                
                $('.js-div-avatar').empty().html(img);
                $('.js-view-description').empty().html(description);            
                $('.js-view-address').empty().html(address);
                $('.js-txt-address').val(e.address !=  null?address:"");
                $('.js-view-industry').empty().html(profesional);
            
            });
                        
            
                        
            
        }
        
        //REKENING
            Render.person.rekening($('.view-rekening-content'),data.rekening);
        //END REKENING
        
        //EDUCATION                
            Render.person.education($('.view-education-content'),data.education);
        //$('.view-education-content').empty().html(edu);
        
        //end education
        
        var exp="";
        var nExp=1;
        
        if(data.experience.length > 0){
            
            $.each(data.experience,function(i,e){
                
                exp+="<div class='container-box-profile'>";
                    
                    exp+="<div class='row'>";                        
                        
                        exp+="<div class='col-md-10'>";
                    
                            exp+="<a href='#'>";
                                exp+="<div class='box-profile'>";
                                    exp+="<div class='left-box-profile'>";
                                        exp+="Nama Perusahaan <span>:</span>";
                                    exp+="</div>";
                                    exp+="<div class='right-box-profile'>";
                                        exp+=e.company.ucwords();
                                    exp+="</div>";
                                    exp+="<div class='clearer'></div>";
                                exp+="</div>";

                                exp+="<div class='box-profile'>";
                                    exp+="<div class='left-box-profile'>";
                                        exp+="Jabatan <span>:</span>";
                                    exp+="</div>";
                                    exp+="<div class='right-box-profile'>";
                                        exp+=e.position.ucwords();
                                    exp+="</div>";
                                    exp+="<div class='clearer'></div>";
                                exp+="</div>";
                                exp+="<div class='box-profile'>";
                                    exp+="<div class='left-box-profile'>";
                                        exp+="Tahun <span>:</span>";
                                    exp+="</div>";
                                    exp+="<div class='right-box-profile'>";
                                        exp+=e.s_year+" - "+e.e_year;
                                    exp+="</div>";
                                    exp+="<div class='clearer'></div>";
                                exp+="</div>";
                            exp+="</a>";
                        exp+="</div>";
                        
                        exp+="<div class='col-md-2'>";
                            exp+="<div class='div-cover-btn' style='min-height:30px;' align='right'>";
                                exp+="<div class='button-margin div-group-modify-btn'>";

                                    exp+="<a href='#' class='js-btn-edit-experience' data-code='"+e.code+"' data-company='"+e.company+"' data-position='"+e.position+"' data-syear='"+e.s_year+"' data-eyear='"+e.e_year+"' data-scope='persons' data-model='experience' data-trigger='update'>";
                                        exp+="<span class='fa fa-pencil'></span> ";
                                    exp+="</a> &nbsp;";

                                    exp+="<a href='#' class='js-btn-remove-experience' data-code='"+e.code+"' data-scope='persons' data-model='experience' data-trigger='delete'>";
                                        exp+="<span class='fa fa-trash'></span> ";
                                    exp+="</a> ";

                                exp+="</div>";
                            exp+="</div>";
                        exp+="</div>";                    
                    exp+="</div>";                    
                exp+="</div>"; // end container box profile  
                
                if(data.experience.length > 1 && (data.experience.length) != nExp){
                    
                    exp+="<hr>";
                    
                }
                
                nExp++;
                
            });
                        
            
        }else{                        
            
            exp+=Render.renderNoContent();
            
        }
        
        $('.view-work-experience-content').empty().html(exp);
        
        var ach ="";
        var nAch=1;
        
        if(data.achievement.length > 0){
            
            $.each(data.achievement,function(i,e){
                
                var avatar = e.avatar==null?"assets/images/instagram.png":e.avatar;
                var from = e.from==null?"not defined":e.from.ucwords();
                var year = e.year==null?"not defined":e.year;
                
                ach+="<div class='container-box-profile'>";
                
                    ach+="<div class='row'>";                        
                        
                        ach+="<div class='col-md-10'>";
                      
                            ach+="<a href='#'>";
                                ach+="<div class='row'>";
                                    ach+="<div class='col-md-3'>";
                                        if(e.avatar==null){
                                            ach+="<center>";
                                                ach+="<img src='"+Global.BASE_URL()+"assets/images/instagram.png' />";
                                            ach+="</center>";

                                        }else{

                                            ach+="<center>";
                                                ach+="<img class='js-img-achievement' src='"+Global.BASE_URL()+avatar+"' style='width: 100%;'>";
                                            ach+="</center>";
                                        }

                                    ach+="</div>";
                                    ach+="<div class='col-md-9'>";

                                        ach+="<div class='box-profile'>";
                                            ach+="<div class='left-box-profile'>";
                                                ach+="Penghargaan <span>:</span>";
                                            ach+="</div>";
                                            ach+="<div class='right-box-profile'>";
                                                ach+=e.achievement;
                                            ach+="</div>";
                                            ach+="<div class='clearer'></div>";
                                        ach+="</div>";

                                        ach+="<div class='box-profile'>";
                                            ach+="<div class='left-box-profile'>";
                                                ach+="Dari <span>:</span>";
                                            ach+="</div>";
                                            ach+="<div class='right-box-profile'>";
                                                ach+=from;
                                            ach+="</div>";
                                            ach+="<div class='clearer'></div>";
                                        ach+="</div>";

                                        ach+="<div class='box-profile'>";
                                            ach+="<div class='left-box-profile'>";
                                                ach+="Tahun <span>:</span>";
                                            ach+="</div>";
                                            ach+="<div class='right-box-profile'>";
                                                ach+=e.year;
                                            ach+="</div>";
                                            ach+="<div class='clearer'></div>";
                                        ach+="</div>";

                                    ach+="</div>";
                                ach+="</div>";
                            ach+="</a>";
                        ach+="</div>";
                        
                        ach+="<div class='col-md-2'>";
                
                            ach+="<div class='div-cover-btn' style='min-height:30px;' align='right'>";
                                ach+="<div class='button-margin div-group-modify-btn'>";

                                    ach+="<a href='#' class='js-btn-edit-achievement' data-code='"+e.code+"' data-achievement='"+e.achievement+"' data-achievementBy='"+e.from+"' data-achievementYear='"+e.year+"' data-file='"+avatar+"' data-scope='persons' data-model='achievement' data-trigger='update'>";
                                        ach+="<span class='fa fa-pencil'></span> ";
                                    ach+="</a> &nbsp;";

                                    ach+="<a href='#' class='js-btn-remove-achievement' data-code='"+e.code+"' data-achievement='"+e.achievement+"' data-scope='persons' data-model='achievement' data-trigger='delete'>";
                                        ach+="<span class='fa fa-trash'></span> ";
                                    ach+="</a> ";

                                ach+="</div>";
                            ach+="</div>";
                        ach+="</div>";
                    ach+="</div>";
                    
                    if(data.achievement.length > 1 && (data.achievement.length) != nAch){
                    
                        ach+="<hr>";

                    }

                    nAch++;
                    
                ach+="</div>";
                              
            
            });
                
            
        }else{
            
            ach+=Render.renderNoContent();
        }          
        
        $('.view-achievement-content').empty().html(ach);
        //end achievement
                        
        $this.handler();
        
    },
    getGuideContent :   function(s){
        var content="";
        
        switch(s){
            case    "profile":
                content+="<h4>Profile Anda belum lengkap!</h4>";
                content+="Setelah anda melengkapi data profile , <br>maka Anda akan diminta untuk melengkapi data pendidikan.<br>";
                content+="Mohon ikuti petunjuk pengisian selanjutnya.<br>Terimakasih.";
                
            break;
            case    "education":
                content+="<h4>Data Pendidikan Anda belum ada!</h4>";
                content+="Setelah anda melengkapi data pendidikan , <br>maka Anda akan diminta untuk melengkapi data pengalaman.<br>";
                content+="Mohon ikuti petunjuk pengisian selanjutnya.<br>Terimakasih.";
                
            break;
            case    "experience":
                content+="<h4>Data Pengalaman Anda belum ada!</h4>";
                content+="Setelah anda melengkapi data pengalaman , <br>maka Anda akan diminta untuk melengkapi data penghargaan.<br>";
                content+="Mohon ikuti petunjuk pengisian selanjutnya.<br>Terimakasih.";
                
            break;
            case    "achievement":
                content+="<h4>Data Penghargaan Anda belum ada!</h4>";
                content+="Setelah anda melengkapi data penghargaan , <br>silahkan meng-update Jenis bidang keahlian anda di panel berikutnya.<br>";
                content+="Mohon ikuti petunjuk pengisian selanjutnya.<br>Terimakasih.";
                content+=" <a href='#' class='js-btn-skip-tip-achievement'>Skip >></a>";
                
            break;
            
        }
        
        return content;
    },
    checkStepComplete    :   function(data){
        var step=[];
        var $this = this;
        var completeProfile=false;
        var completeEducation=false;
        var completeExperience=false;
        var completeAchievement=false;
        
        //cek profile
        if(data.profile.length > 0){
                       
            $.each(data.profile,function(i,e){
                                                
                if(e.i_file !=  null || e.avatar !=  null){
                    completeProfile=true;                    
                }else{
                    completeProfile=false;                    
                }
                
                if(e.description !=  null){
                    completeProfile=true;                    
                }else{
                    completeProfile=false;
                }
               
                if(e.address !=  null){                                        
                    completeProfile=true;                                        
                }else{                  
                    completeProfile=false;                    
                }                                
                               
            });
               
        }
        
        //end cek profile
        
        //cek education        
        //if($this.person_type=="1"){
            
            if(data.education.length > 0){                          
                completeEducation=true;
            }else{
                completeEducation=false;
            }
        //}else{
          //  completeEducation=true;
        //}
        //end education
                
        //cek experience
        //if($this.person_type=="1"){
            if(data.experience.length > 0){                          
                completeExperience=true;
            }else{
                completeExperience=false;
            }
        //}else{
            //completeExperience=true;
        //}
        //end experience
        
        //cek achievement
        if(data.achievement.length > 0){                          
            completeAchievement=true;            
        }else{
            completeAchievement=false;            
        }
        //end achievement
        
        console.log("Education : "+completeEducation);
        console.log("Experience : "+completeEducation);
        console.log("Achievement : "+completeEducation);
                
         
        if(!completeProfile &&
            !completeEducation &&
                !completeExperience &&
                    !completeAchievement
                ){
            step = [4,5,6,7,8,9];                   
            Profile.blurIt(step);
            
            if($('.badge1').length > 0){
                Component.create.jbox.tooltip('Opps..',Profile.getGuideContent('profile'),false,'.badge1');
                $('.badge1').trigger('click');
            }
            
            console.log("Panel blur on: "+step);
            
            return;
        }
        
        //education case
        if(completeProfile &&
            !completeEducation &&
                !completeExperience &&
                    !completeAchievement
                ){
            step = [6,7,8,9];
            Profile.blurIt(step);
            
            if($('.badge2').length > 0){
                Component.create.jbox.tooltip('Opps..',Profile.getGuideContent('education'),false,'.badge2');        
                $('.badge2').trigger('click');
                
                //autoscroll
                Component.moveDomToCenter('.badge2');
                
            }
            
            console.log("Panel blur on: "+step);
            
            return;
        }
        
        if(completeProfile &&
            !completeEducation &&
                completeExperience &&
                    completeAchievement
                ){
            step = [6,7,8,9];                   
            Profile.blurIt(step);
            
            if($('.badge2').length > 0){
                Component.create.jbox.tooltip('Opps..',Profile.getGuideContent('education'),false,'.badge2');        
                $('.badge2').trigger('click');
                
                Component.moveDomToCenter('.badge2');
            }
            
            console.log("Panel blur on: "+step);
            
            return;
        }
        
        if(completeProfile &&
            !completeEducation &&
                !completeExperience &&
                    completeAchievement
                ){
            step = [6,7,8,9];
            Profile.blurIt(step);
            
            if($('.badge2').length > 0){
                Component.create.jbox.tooltip('Opps..',Profile.getGuideContent('education'),false,'.badge2');        
                $('.badge2').trigger('click');
                
                Component.moveDomToCenter('.badge2');
            }
            
            console.log("Panel blur on: "+step);
            
            return;
        }
        
        if(completeProfile &&
            !completeEducation &&
                completeExperience &&
                    !completeAchievement
                ){
            step = [6,7,8,9];
            Profile.blurIt(step);
            
            if($('.badge2').length > 0){
                Component.create.jbox.tooltip('Opps..',Profile.getGuideContent('education'),false,'.badge2');        
                $('.badge2').trigger('click');
                
                Component.moveDomToCenter('.badge2');
            }
            
            console.log("Panel blur on: "+step);
            
            return;
        }
        
        //end education
        
        
        //experience handler
        
        if(completeProfile &&
            completeEducation &&
                !completeExperience &&
                    !completeAchievement
                ){
            step = [8,9];                   
            Profile.blurIt(step);
                        
            if($('.badge3').length > 0){
                Component.create.jbox.tooltip('Opps..',Profile.getGuideContent('experience'),false,'.badge3');        
                $('.badge3').trigger('click');
                
                Component.moveDomToCenter('.badge3');
            }
            
            console.log("Panel blur on: "+step);
                        
            return;
        }
        
        if(completeProfile &&
            completeEducation &&
                !completeExperience &&
                    completeAchievement
                ){
            step = [8,9];                   
            Profile.blurIt(step);
            
            if($('.badge3').length > 0){
                Component.create.jbox.tooltip('Opps..',Profile.getGuideContent('experience'),false,'.badge3');        
                $('.badge3').trigger('click');
                
                Component.moveDomToCenter('.badge3');
            }
            
            console.log("Panel blur on: "+step);
            
            return;
        }                
        
        //end experience
        
        if(completeProfile &&
            completeEducation &&
                completeExperience &&
                    !completeAchievement
                ){
            step = [];//AUTO SKIP BLUR ACHIEVEMENT KARENA TIDAK REQUIRED                  
            Profile.blurIt(step);
            
            if($('.badge4').length > 0){
                                
                if(Global.getCookie('skipAchievement-'+Global.getCookie('myProfile'))!='1'){
                    
                    Component.create.jbox.tooltip('Opps..',Profile.getGuideContent('achievement'),false,'.badge4');        
                    $('.badge4').trigger('click');
                    
                }
                
                Component.moveDomToCenter('.badge4');
                                
                if(Global.getCookie('trainer-'+Global.getCookie('myProfile'))== null){
                
                    $("#successProfile").modal({backdrop:'static',keyboard:false}).on('shown.bs.modal', function(e) {            



                    }).on('hidden.bs.modal', function(e) {            
                        
                        Global.setCookie('trainer-'+Global.getCookie('myProfile'),1);

                    });
                    
                }
                
                
            }
            console.log("Panel blur on: "+step);
            return;
        }
                
        if(completeProfile &&
            completeEducation &&
                completeExperience && 
                    completeAchievement 
                ){
            step = [];                   
            Profile.blurIt(step);
            console.log("Panel blur on: "+step);
            return;
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
    setDefaultValue :   function(data){
        
        var $this = this;                
        
        var profile = new Profile.const.profile(data);
                       
        
                                     
        
        $('.js-txt-firstname').val(profile.firstname);
        $('.js-txt-lastname').val(profile.lastname);
        $('.js-txt-email').val(profile.email);
        $('.js-txt-company').val(profile.company);
        $('.js-txt-address').val(profile.address);
        $('.js-txt-identity').val(profile.identity);
        $('.js-txt-phone').val(profile.phone);
                        
                
        //if($this.scope=="profile")Global.setEditorValue(profile.description);
                
        //get jenis dokumen
        var dokumen = Global.config.Modules.Master.dokumen;            
        Global.config.Modules.Master.renderOpt(dokumen,'.js-opt-identity-type',profile.identity_type)
                        
        $this.dob = profile.dob;
         
                            
    },    
    handler :   function(){
        
        var $this=this;                        
        
        /*
         * ADD PROFILE OTHER TRAINER page name:manage.trainer
         */
                
        $('.js-btn-add-trainer').off().on('click',function(){
            
            $(this).hide();
            $('.js-action-profile-add').trigger('click');
            $('.js-cancel-profile-add').show();
            
            Global.prepareUpload('file-upload-profile','fileholder-profile',Profile.config,'avatar');
            Global.prepareUpload('file-upload-achievement','fileholder-achievement',Profile.config,'avatar');                   
            
        });
        
        $('.js-action-profile-add').off().on('click',function(){
            
            $('.js-form-add-trainer').show();
            $('.js-cancel-profile-add').show();
            
            
        });
        
        $('.js-cancel-profile-add').off().on('click',function(){
            
            $('.js-form-add-trainer').hide();
            $('.js-btn-add-trainer').show();
            
        });
        
        
        /*
         * END OTHER PROFILE TRAINER
         */
        
        Global.iCheck();        
        Media.init();                                                       
                
        //*TAB PROFILE*//
        
        $('.div-group-modify-btn').hide();//default to hide
        
        $('.js-btn-skip-tip-achievement').off().on('click',function(){
            $('.jBox-closeButton').trigger('click');
            Global.setCookie('skipAchievement-'+Global.getCookie('myProfile'),1);
            
            return false;
        });
        
        $.each($('.container-box-profile'),function(i,e){
            
            $(e).off().on('mouseenter',function(){                                
                
                $('.div-group-modify-btn').hide()
                $('.div-group-modify-btn').eq(i).show();
                
            }).on('mouseleave',function(){
                
                $('.div-group-modify-btn').hide()
                
            });
                        
        });
        
        $('.js-action-profile').off().on('click',function(){ //post profile
                    
            $(this).hide();
            $('.btn-cancel').trigger('click');//reset and close all form active
            
            $('.js-action-profile').hide();
            $('.js-cancel-top-icon').show();
            
            $('.view-profile').hide();
            $('.form-profile').show();
            
            $this.mode = "edit";
            Global.setEditor();            
            Global.setEditorValue($(this).data('description'));
                                                
            return false;
            
        });
        
        $.each($('.js-rdo-group-user'),function(i,e){
            
            if($(e).val()==$this.person_type){
                
                $(e).attr('checked','checked');
                
            }                        

            $(e).off().on('ifChanged', function(event){
                                                
                $this.type= event.target.value;                

            });

        });
        
        $.each($('.js-opt-gender'),function(i,e){
            if($(e).val()==$this.gender){
                
                $(e).attr('checked','checked');
                
            }                        

            $(e).off().on('ifChanged', function(event){
                                
                $this.gender= event.target.value;                

            });

        });
                
        $('.js-opt-region').off().change(function(){
                       
            var code = $(this).find(":selected").val(); 
            
            console.log("Selected region: "+code);
            
            Region.getById(Global.b64EncodeUnicode(code),function(){

                Region.render('.js-opt-subregion',null,function(){
                    
                    
                    
                });

            });


        });
                
        
        $('.js-save-profile').off().on('click',function(){ //post to profile
            
            $('#js-form-profile').parsley('validate');

            if($('#js-form-profile').parsley('isValid')){
                
                var text = $(this).text();

                var  o = $(this);                                
                                                
                Global._setBrowserActivity('profile_update',Global.getCookie('myProfile'));
                                
                Global.param.mode = $this.mode;
                Global.param.code = $this.scope=='profile'?Global.b64EncodeUnicode(Global.getCookie('myProfile')):null;
                                                
                Global.param.i_user = Global.b64EncodeUnicode($('#myId').val());
                Global.param.i_country = Global.b64EncodeUnicode($('.js-opt-country').find(":selected").val());
                Global.param.i_region = Global.b64EncodeUnicode($('.js-opt-region').find(":selected").val());
                Global.param.i_subregion = Global.b64EncodeUnicode($('.js-opt-subregion').find(":selected").val());                                
                Global.param.firstname = Global.b64EncodeUnicode($('.js-txt-firstname').val());
                Global.param.lastname = Global.b64EncodeUnicode($('.js-txt-lastname').val());
                                
                if($this.scope=='profile'){
                    
                    Global.param.description = Global.b64EncodeUnicode(Global.getEditorValue());
                    
                }else if($this.scope=='event'){
                    
                    Global.param.description = Global.b64EncodeUnicode($('#editor1').val());
                }
                
                
                Global.param.company                = Global.b64EncodeUnicode($('.js-txt-company').val());                
                Global.param.address                = Global.b64EncodeUnicode($('.js-txt-address').val());
                Global.param.person_lat             = Global.b64EncodeUnicode($('#js-txt-lat').val());
                Global.param.person_long            = Global.b64EncodeUnicode($('#js-txt-long').val());
                Global.param.person_position        = Global.b64EncodeUnicode($('#js-txt-position').val());
                Global.param.person_url_location    = Global.b64EncodeUnicode($('#js-txt-url-location').val());            
                Global.param.email                  = Global.b64EncodeUnicode($('.js-txt-email').val());                
                Global.param.identity_type          = Global.b64EncodeUnicode($('.js-opt-identity-type').val());
                Global.param.identity_number        = Global.b64EncodeUnicode($('.js-txt-identity').val());                
                Global.param.area_code              = Global.b64EncodeUnicode($('.js-txt-areacode').val());
                Global.param.phone                  = Global.b64EncodeUnicode($('.js-txt-phone').val());
                Global.param.gender                 = Global.b64EncodeUnicode($this.gender);                
                
                                                            
                var lahir = $('.js-opt-year-birth').find(":selected").val();
                lahir = lahir +"-"+ $('.js-opt-month-birth').find(":selected").val();
                lahir = lahir +"-"+ $('.js-opt-date-birth').find(":selected").val();
                                
                Global.param.dob = Global.b64EncodeUnicode(lahir);                                                                
                
                if($this.type==""|| $this.gender==""){
                    
                    Component.create.jbox.notif('Opps..','Pilih jenis kelamin!',false);
                    return false;
                    
                }else if(Global.getEditorValue().length < 50){
                    
                    Component.create.jbox.notif('Opps..','Deskripsi minimal 50 karakter!',false);
                    return false;
                }else if($('.js-txt-address').val().length < 10){
                    
                    Component.create.jbox.notif('Opps..','Alamat lengkap minimal 10 karakter!',false);
                    return false;                
                }else{
                    
                    Component.create.confirm.action({                            
                            title   :   'Simpan Data',
                            content :   'Apakah Anda ingin menyimpan?'
                        },function(){
                                                        
                            Global.prepareBtnPost(o);
                            
                            if($this.scope=='profile'){
                
                                Request.do('POST',Request.Person.profile.update,function(){
                                    
                                    Global.onForm=false;
                                    Global.afterBtnPost(o,text);        
                                    
                                    $this.renderPanel(Request.response); //reset
                                    
                                    $('.js-cancel-profile').trigger('click');                                    

                                });

                            }else if($this.scope=='event'){

                                if(typeof Global.param.images_blob != 'undefined'){

                                Request.do('POST',Request.Person.profile.set,function(){

                                    Global.afterBtnPost(o,text);

                                    if(Request.response.status=="1"){
                                        
                                        $('.js-action-profile').hide();
                                        $('.js-action-education').show();
                                        $('.js-action-work-experience').show();
                                        $('.js-action-achievement').show();

                                        Global.param={}; //reset

                                        Events.onEdit.idOtherTrainer = Request.response.data[0].code;

                                        Render.person.profile('.js-div-render-profile',Request.response.data);

                                        Component.create.jbox.notif('Ahaa..','Profil Anda sudah diperbaharui!',true);

                                        $('.js-cancel-profile').trigger('click');                            


                                    }else{                        

                                        Component.create.jbox.notif('Opps..','Email tidak tersedia!',false);

                                    }


                                });

                                }else{

                                    Component.create.jbox.notif('Opps..','Foto avatar Anda belum diunggah!',false);
                                }
                            }
                                                                                        
                        });                                        
                    
                }
            }
            
            
            return false;
            
        });
        
        $('.js-cancel-profile').off().on('click',function(){
            
            if(Profile.scope!='add-trainer'){
                
                $('.view-profile').show();
                $('.form-profile').hide();
                $('.js-action-profile').show();

                $('.js-action-profile-top').show();            

                $('.js-cancel-profile').show();
                $('.js-cancel-top-icon').hide();
                
                Profile.renderPanel(Request.response);
            }
            
            return false;
        });
        
        //*END TAB PROFILE*//
        
        
        //*TAB REKENING*//
        $('.js-action-rekening').off().on('click',function(){
            
            $this.mode = "create";                                                            
            
            $('.js-txt-member-bank').val('');
            $('.js-txt-member-bankno').val('');
            $('.js-txt-member-bankcc').val('');
                        
            $('.view-rekening').hide();
            $('.form-rekening').show();                        
            
            return false;
            
        });
        
        $('.js-cancel-rekening').off().on('click',function(){
            
            $('.view-rekening').show();
            $('.form-rekening').hide();
            
            return false;
            
        });        
        $('.js-save-rekening').off().on('click',function(){
            
            var text = $(this).text();
            var  o = $(this);
                
            $('#form-rekening').parsley('validate');

            if($('#form-rekening').parsley('isValid')){                                
                                
                Global._setBrowserActivity('rekening_update',Global.getCookie('myProfile'));
                
                Global.param.mode = $this.mode;   
                Global.param.i_rekening = Global.b64EncodeUnicode($this.i_rekening);
                
                Global.param.i_person = $this.scope=='profile'?Global.b64EncodeUnicode(Global.getCookie('myProfile')):Global.b64EncodeUnicode(Events.onEdit.idOtherTrainer);
                Global.param.i_user = $this.scope=='profile'?Global.b64EncodeUnicode($('#myId').val()):Global.b64EncodeUnicode(Events.onEdit.idOtherTrainer);                
                Global.param.bank = Global.b64EncodeUnicode($('.js-txt-member-bank').val());
                Global.param.bankno = Global.b64EncodeUnicode($('.js-txt-member-bankno').val());
                Global.param.bankcc = Global.b64EncodeUnicode($('.js-txt-member-bankcc').val());
                  
                Component.create.confirm.action({                            
                        title   :   'Simpan Data',
                        content :   'Apakah Anda ingin menyimpan?'
                    },function(){

                        Global.prepareBtnPost(o);

                        Request.do('POST',Request.Person.rekening.set,function(){                                                    

                            Global.onForm=false;
                            Global.afterBtnPost(o,text);
                            Profile.renderPanel(Request.response);                               

                            $('.js-cancel-rekening').trigger('click');                                                                      

                        });

                    });                                                    
                
            }
                        
            return false;
            
        });
        
        
        $.each($('.js-btn-edit-rekening'),function(x,y){
           $(y).off().on('click',function(){
                
                $this.mode = "edit";                                
                var i_rekening = $(y).data('code');                
                var bank = $(y).data('bank');
                var bankno = $(y).data('bankno');
                var bankcc = $(y).data('bankcc');
                                
                $this.i_rekening = i_rekening;
                                                                             
                $('.js-txt-member-bank').val(bank);
                $('.js-txt-member-bankno').val(bankno);
                $('.js-txt-member-bankcc').val(bankcc);
               
                $('.view-rekening').hide();
                $('.form-rekening').show();
                                             
               return false;
               
           }); 
        });
        
        $.each($('.js-btn-remove-rekening'),function(x1,y1){
           $(y1).off().on('click',function(){
               
               Global.param.i_person = Global.b64EncodeUnicode(Global.getCookie('myProfile'));
               Global.param.i_rekening = Global.b64EncodeUnicode($(y1).data('code'));
                              
               Component.create.confirm.action({                            
                        title   :   'Hapus Data',
                        content :   'Apakah Anda ingin menghapus?'
                    },function(){

                        Request.do('POST',Request.Person.rekening.delete,function(){

                            $this.renderPanel(Request.response);

                        });

                    });       
               
               return false;
               
           }); 
        });
        
        
        //*END TAB REKENING*//
        
        //*TAB EDUCATION*//
        $('.js-action-education').off().on('click',function(){
            
            $this.mode = "create";                        
                        
            
            $('.optDegree').val('');
            $('.optYearEducation').val('');
            
            $('.txtUniversity').val('');
            $('.txtMajor').val('');
                        
            $('.view-education').hide();
            $('.form-education').show();
                        
            
            Global.setYear('.optYearEducation',Global.extractDate(Profile.dob)['tahun']);
                        
            //Form.reset();
            
            return false;
            
        });
        
        $('.js-cancel-education').off().on('click',function(){
            
            $('.view-education').show();
            $('.form-education').hide();
            
            return false;
            
        });        
        $('.js-save-education').off().on('click',function(){
            
            var text = $(this).text();
            var  o = $(this);
                
            $('#form-education').parsley('validate');

            if($('#form-education').parsley('isValid')){                                
                                
                Global._setBrowserActivity('education_update',Global.getCookie('myProfile'));
                
                Global.param.mode = $this.mode;   
                Global.param.i_education = Global.b64EncodeUnicode($this.i_education);
                
                Global.param.i_person = $this.scope=='profile'?Global.b64EncodeUnicode(Global.getCookie('myProfile')):Global.b64EncodeUnicode(Events.onEdit.idOtherTrainer);
                Global.param.i_user = $this.scope=='profile'?Global.b64EncodeUnicode($('#myId').val()):Global.b64EncodeUnicode(Events.onEdit.idOtherTrainer);
                Global.param.degree = Global.b64EncodeUnicode($('.optDegree').find(":selected").val());                
                Global.param.e_year = Global.b64EncodeUnicode($('.optYearEducation').find(":selected").val());
                Global.param.institution = Global.b64EncodeUnicode($('.txtUniversity').val());
                Global.param.major = Global.b64EncodeUnicode($('.txtMajor').val());                                                  
                  
                Component.create.confirm.action({
                            //type    :   'question',
                            title   :   'Simpan Data',
                            content :   $this.mode=='create'?'Anda akan menambahkan data pendidikan?':'Apakah Anda ingin menyimpan?'
                        },function(){
                                                        
                            Global.prepareBtnPost(o);
                            
                            Request.do('POST',Request.Person.education.set,function(){                                                    
                                
                                Global.onForm=false;
                                Global.afterBtnPost(o,text);
                                Profile.renderPanel(Request.response);

                                if($this.scope=='event'){

                                    Render.person.education('.js-div-render-education',Request.response.education);
                                }

                                $('.js-cancel-education').trigger('click');                                      
                                

                            });
                                                                                        
                        });                                                    
                
            }
                        
            return false;
            
        });
        
        
        $.each($('.js-btn-edit-education'),function(x,y){
           $(y).off().on('click',function(){
                
                $this.mode = "edit";
                $('.btn-cancel').trigger('click');
                
                var i_education = $(y).data('code');
                var institusi = $(y).data('institution');
                var degree = $(y).data('degree');
                var major = $(y).data('major');               
                var lulus = $(y).data('eyear');
                                
                $this.i_education = i_education;
                                                             
                $('.optDegree').val(degree);
                Global.setYear('.optYearEducation',lulus);
                
            
                $('.txtUniversity').val(institusi);
                $('.txtMajor').val(major);
               
                $('.view-education').hide();
                $('.form-education').show();
                              
               
               return false;
               
           }); 
        });
        
        $.each($('.js-btn-remove-education'),function(x1,y1){
           $(y1).off().on('click',function(){
               
               Global.param.i_person = Global.b64EncodeUnicode(Global.getCookie('myProfile'));
               Global.param.i_education = Global.b64EncodeUnicode($(y1).data('code'));
                              
               Component.create.confirm.action({
                            //type    :   'question',
                            title   :   'Hapus Data',
                            content :   'Apakah Anda ingin menghapus?'
                        },function(){
                                                        
                            Request.do('POST',Request.Person.education.delete,function(){
                   
                                $this.renderPanel(Request.response);

                            });
                                                                                        
                        });       
               
               return false;
               
           }); 
        });
        
        
        //*END TAB EDUCATION*//
        
        //*TAB WORK EXPERIENCE*//
        $('.js-action-work-experience').off().on('click',function(){
            
            $this.mode='create';            
            
            Profile.const.experience.resetForm();
            
            $('.btn-cancel').trigger('click');//reset and close all form active
            $('.view-work-experience').hide();
            $('.form-work-experience').show();                        
                        
            Global.setYear('.optStartYearExpericence',Global.extractDate(Profile.dob)['tahun']);
            Global.setYear('.optEndYearExpericence',Global.extractDate(Profile.dob)['tahun']);
                        
            return false;
            
        });
        
        $('.js-cancel-work-experience').off().on('click',function(){
            
            $('.view-work-experience').show();
            $('.form-work-experience').hide();
            
            return false;
            
        });
        
        $('.js-save-work-experience').off().on('click',function(){
            
            $('#form-work-experience').parsley('validate');

            if($('#form-work-experience').parsley('isValid')){
                                
                var text = $(this).text();
                var  o = $(this);         
                                
                
                Global._setBrowserActivity('experience_update',Global.getCookie('myProfile'));
                
                Global.param.mode = $this.mode,
                Global.param.i_experience = Global.b64EncodeUnicode($this.i_experience);
                
                Global.param.i_person = $this.scope=='profile'?Global.b64EncodeUnicode(Global.getCookie('myProfile')):Global.b64EncodeUnicode(Events.onEdit.idOtherTrainer);
                Global.param.i_user = $this.scope=='profile'?Global.b64EncodeUnicode($('#myId').val()):Global.b64EncodeUnicode(Events.onEdit.idOtherTrainer);
                Global.param.company = Global.b64EncodeUnicode($('.txtCompanyExperience').val());                
                Global.param.position = Global.b64EncodeUnicode($('.txtPosition').val());        
                Global.param.s_year = Global.b64EncodeUnicode($('.optStartYearExpericence').val());
                
                if($this.mode=='edit'){
                    
                    Global.param.e_year = Global.b64EncodeUnicode($('.optEndYearExpericence').val());
                    
                }else if($this.mode=='create'){
                    
                    Global.param.e_year = Global.b64EncodeUnicode(Profile.const.experience.e_year);
                    
                }
                
                            
                if(Global.param.s_year > Global.param.e_year){
                    
                    Component.create.jbox.notif('Opps..','Tahun awal tidak boleh lebih dari tahun akhir!',false);
                                                                
                    return false;
                    
                }                                
                
                Component.create.confirm.action({                            
                        title   :   'Simpan Data',
                        content :   $this.mode=='create'?'Anda akan menambahkan data pengalaman?':'Apakah Anda ingin menyimpan?'
                    },function(){


                        Global.prepareBtnPost(o);

                        Request.do('POST',Request.Person.experience.set,function(){

                            Global.onForm=false;
                            Global.afterBtnPost(o,text);

                            if($this.scope=='event'){
                                Render.person.experience('.js-div-render-experience',Request.response.data);
                            }

                            Profile.renderPanel(Request.response);

                            $('.js-cancel-work-experience').trigger('click');                            
                            //Component.create.jbox.notif('Ahaa','Profile anda sudah diperbaharui!',true);

                        });  

                    });                                               
                
            }
            
            
            return false;
            
        });
        
        $.each($('.js-btn-edit-experience'),function(a,b){
           $(b).off().on('click',function(){
               
                $this.mode = "edit";
                
                $('.btn-cancel').trigger('click');
                
                Profile.const.experience.resetForm();
                
                var i_experience = $(b).data('code');
                var company = $(b).data('company');
                var position = $(b).data('position');
                var s_year = $(b).data('syear');               
                var e_year = $(b).data('eyear');
                                
                $this.i_experience= i_experience;                                
                              
                               
                Global.setYear('.optStartYearExpericence',s_year);
                Global.setYear('.optEndYearExpericence',e_year);
                                
                $('.txtCompanyExperience').val(company);
                $('.txtPosition').val(position);
               
                $('.view-work-experience').hide();
                $('.form-work-experience').show();
                              
               
               return false;
               
           }); 
        });
        
        $.each($('.js-btn-remove-experience'),function(a1,b1){
           $(b1).off().on('click',function(){
               
               Global.param.i_person = Global.b64EncodeUnicode(Global.getCookie('myProfile'));
               Global.param.i_experience = Global.b64EncodeUnicode($(b1).data('code'));
                              
               Component.create.confirm.action({
                            //type    :   'question',
                            title   :   'Hapus Data',
                            content :   'Apakah Anda ingin menghapus?'
                        },function(){
                                                        
                            Request.do('POST',Request.Person.experience.delete,function(){
                   
                                $this.renderPanel(Request.response);

                            });
                                                                                        
                        });       
               
             
            return false;
               
           }); 
        });
        $('.optEndYearExpericence').change(function(){
            
            Profile.const.experience.endYear = $(this).find(':selected').val();
            
        });
        
        $($('.js-chk-now')).off().on('ifChanged', function(event){

            if(event.target.checked){        
                
                $('.js-div-end-year').hide();
                Profile.const.experience.e_year=Global.getYear();
                
            }else{

                $('.js-div-end-year').show();
                
            }
            
            

        });
        
        $('.js-btn-success-profile').off().on('click',function(){
            
            $('#successProfile').modal('hide');
            
            $('#createEventModal').modal({backdrop: 'static', keyboard: false}).on('shown.bs.modal', function(e) {                

                Events.onCreate.default();                                        

            }).on('hidden.bs.modal', function(e) {



            });
        });
        //*END TAB WORK EXPERIENCE*//
        
        
        //*TAB WORK ACHIEVEMENT*//
        $('.js-action-achievement').off().on('click',function(){
            
            $this.mode='create';
            Form.reset();
            
            $('.btn-cancel').trigger('click');//reset and close all form active
            
            $('.view-achievement').hide();
            $('.form-achievement').fadeIn('slow');
            $('.txtAchievement').val('');
            $('.txtAchievementBy').val('');
            
            $('.js-img-result').attr('src',Global.BASE_URL()+'assets/images/instagram.png');            
            $('.js-img-achievement').attr('src',Global.BASE_URL()+'assets/images/instagram.png');            
            
            
            Global.setYear('.optYearAchievement',Global.extractDate(Profile.dob)['tahun']);
            
            return false;
            
        });
        
        $('.js-cancel-achievement').off().on('click',function(){
            
            Global.onForm=true;
            
            $this.refresh();
            
            $('.view-achievement').show();
            $('.form-achievement').hide();
            
            return false;
        });
        
        $('.js-save-achievement').off().on('click',function(){
            
            $('#form-achievement').parsley('validate');

            if($('#form-achievement').parsley('isValid')){
                
                var text = $(this).text();

                var  o = $(this);                
                
                Global.param.mode = $this.mode;
                Global.param.i_achievement = Global.b64EncodeUnicode($this.i_achievement);
                
                Global._setBrowserActivity('achievement_update',Global.getCookie('myProfile'));
                
                Global.param.i_user = $this.scope=='profile'?Global.b64EncodeUnicode($('#myId').val()):Global.b64EncodeUnicode(Events.onEdit.idOtherTrainer);
                Global.param.i_person = $this.scope=='profile'?Global.b64EncodeUnicode(Global.getCookie('myProfile')):Global.b64EncodeUnicode(Events.onEdit.idOtherTrainer);
                Global.param.achievement = Global.b64EncodeUnicode($('.txtAchievement').val());
                Global.param.achievementBy = Global.b64EncodeUnicode($('.txtAchievementBy').val());
                Global.param.achievementYear = Global.b64EncodeUnicode($('.optYearAchievement').find(":selected").val());
                
                Component.create.confirm.action({
                            //type    :   'question',
                            title   :   'Simpan Data',
                            content :   $this.mode=='create'?'Anda akan menambahkan data penghargaan?':'Apakah Anda ingin menyimpan?'
                        },function(){
                                                  
                            Global.onForm=false;
                            Global.prepareBtnPost(o);
                            
                            Request.do('POST',Request.Person.achievement.set,function(){
                                                            
                                Global.afterBtnPost(o,text);

                                if($this.scope=='event'){
                                    
                                    Render.person.experience('.js-div-render-experience',Request.response.data);
                                    
                                }                                                                
                                
                                Profile.renderPanel(Request.response);

                                $('.js-cancel-achievement').trigger('click');                            
                                //Component.create.jbox.notif('Ahaa','Anda sudah berhasil menambahkan Data Penghargaan!',true);

                            });  
                                                                                        
                        });                                               
                
            }
            
            return false;
            
        });
        
        $.each($('.js-btn-edit-achievement'),function(c,d){
           $(d).off().on('click',function(){
                
                $this.mode = "edit";
                $('.btn-cancel').trigger('click');
                
                var i_achievement = $(d).data('code');
                var achievement = $(d).data('achievement');
                var from = $(d).data('achievementby');
                var year = $(d).data('achievementyear');
                var file = $(d).data('file');
                           
                $this.i_achievement= i_achievement;                                
                              
                $('.view-achievement').hide();
                $('.form-achievement').fadeIn('slow');
                $('.txtAchievement').val(achievement);
                $('.txtAchievementBy').val(from);
                
                $('.js-img-result').eq(c).attr('src',Global.BASE_URL()+file);                
                $('.js-img-result').attr('src',Global.BASE_URL()+file);                
                $('.js-img-achievement').attr('src',Global.BASE_URL()+file);
                

                Global.setYear('.optYearAchievement',year);                              
               
               return false;
               
           }); 
        });
        
        $.each($('.js-btn-remove-achievement'),function(c1,d1){
           $(d1).off().on('click',function(){
               
                var text = $(this).text();

                var  o = $(this);
                
                Global.param.i_person = Global.b64EncodeUnicode(Global.getCookie('myProfile'));
                Global.param.i_achievement = Global.b64EncodeUnicode($(d1).data('code'));
                              
                Component.create.confirm.action({
                            //type    :   'question',
                            title   :   'Hapus Data',
                            content :   'Apakah Anda ingin menghapus?'
                        },function(){
                                                        
                            Request.do('POST',Request.Person.achievement.delete,function(){
                   
                                $this.renderPanel(Request.response);

                            });
                                                                                        
                        });
                
                return false;
                
               
           }); 
        });
        //*END TAB WORK ACHIEVEMENT*//
        
        //*TAB WORK INDUSTRY*//
        $('.js-action-industry').off().on('click',function(){
            
            $('.view-industry').hide();
            $('.form-industry').show();
            
            $('.js-txt-profesional-in').val($('.js-view-industry').text());
            
                        
            return false;
            
        });        
        
        $('.js-save-industry').off().on('click',function(){
            
            $('#form-industry').parsley('validate');

            if($('#form-industry').parsley('isValid')){
                
                var text = $(this).text();

                var  o = $(this);                
                               
                Global._setBrowserActivity('profile_update',Global.getCookie('myProfile'));
                
                Global.param.mode = $this.scope=='profile'?$('#txtMode').val():"create",
                Global.param.i_user = $this.scope=='profile'?Global.b64EncodeUnicode($('#myId').val()):Global.b64EncodeUnicode(Events.onEdit.idOtherTrainer);
                
                Global.param.table=Global.b64EncodeUnicode('tr_persons');
                Global.param.key=Global.b64EncodeUnicode('code');
                Global.param.val=$this.scope=='profile'?Global.b64EncodeUnicode(Global.getCookie('myProfile')):Global.b64EncodeUnicode(Events.onEdit.idOtherTrainer);                
                               
                Global.param.fields={
                    profesional_in : $('.js-txt-profesional-in').val()
                },
                
                Component.create.confirm.action({
                            //type    :   'question',
                            title   :   'Simpan Data',
                            content :   'Apakah Anda ingin menyimpan?'
                        },function(){
                            
                            Global.onForm=false;                                                        
                            Global.prepareBtnPost(o);
                            
                            Request.do('POST',Request.Common._updateField(),function(){
                    
                                Global.afterBtnPost(o,text);
                                
                                    if($this.scope=='event'){

                                        Render.person.achievement('.js-div-render-industry',Request.response.data);

                                    }

                                    $this.renderPanel(Request.response);
                                    $('.js-cancel-industry').trigger('click');                                    
                                
                            }); 
                                                                                        
                        });                              
                
            }
                        
            return false;
            
        });
        
        $('.js-cancel-industry').off().on('click',function(){
            $('.view-industry').show();
            $('.form-industry').hide();
            
            return false;
        });
        
        //*END TAB WORK INDUSTRY*//
        
        
        //*TAB WORK SKILLS*//
        $('.js-action-skills').off().on('click',function(){
            
            $('.view-skills').hide();
            $('.form-skills').fadeIn('slow');             
            
            return false;
            
        });
        $('.js-cancel-skills').off().on('click',function(){
            
            
            return false;
        });
        
        $('.js-save-skills').off().on('click',function(){
            
            $('#form-skills').parsley('validate');

            if($('#form-skills').parsley('isValid')){
                
                
            }
            
            return false;
            
        });
        
        //*END TAB WORK SKILLS*//
        
        //*TAB CHANGE PASSWORD*//
        $('.js-action-change-password').off().on('click',function(){
                                    
            $('.view-change-password').hide();
            $('.form-change-password').show();
            
            return false;
            
        });
        $('.js-cancel-change-password').off().on('click',function(){
            
            $('.view-change-password').show();
            $('.form-change-password').hide();
                        
            return false;
            
        });
        
        $('.js-save-change-password').off().on('click',function(){
            
            $('#form-change-password').parsley('validate');

            if($('#form-change-password').parsley('isValid')){
                
                if($('.js-txt-new-password').val()!=$('.js-txt-new-password-confirm').val()){
                    
                    Component.create.jbox.notif('Opps..','Kata sandi yang baru harus sama!')
                    
                }else{
                    
                    //do request
                    Global._setBrowserActivity('change_password');
                    
                    Global.param.email=Global.b64EncodeUnicode(Global.getCookie('myEmail'));
                    Global.param.password=Global.b64EncodeUnicode($('.js-txt-current-password').val());
                    Global.param.new=Global.b64EncodeUnicode($('.js-txt-new-password-confirm').val());
                                        
                    Request.do('POST',Request.User.changePassword,function(){
                                                
                        
                        if(Request.response.status==1){
                                                        
                            $('.js-cancel-change-password').trigger('click');
                            
                            $('.js-txt-current-password').val('');
                            $('.js-txt-new-password').val('');
                            $('.js-txt-new-password-confirm').val('');
                            
                            Component.create.jbox.notif('Opps..','Kata sandi sudah berubah!',true);
                            
                        }else{
                            
                            Component.create.jbox.notif('Opps..','Kata sandi Anda salah!',false);
                            
                        }
                        
                        $('#form-change-password').parsley('reset');
                        
                    });
                }
                
            }
            
            return false;
            
        });
        
        //*END TAB CHANGE PASSWORD*//
    
    
    },
    calendar    :function(){
        
        var $this = Profile;
        
        $('a[data-toggle="pill"]').on('shown.bs.tab', function (e) {

            var todayDate = moment().startOf('day');
                    var YM = todayDate.format('YYYY-MM');
                    var YESTERDAY = todayDate.clone().subtract(1, 'day').format('YYYY-MM-DD');
                    var TODAY = todayDate.format('YYYY-MM-DD');
                    var TOMORROW = todayDate.clone().add(1, 'day').format('YYYY-MM-DD');

            
            
            $('.calendar').fullCalendar({
                    header: {
                        left    : 'prev,next today',
                        center  : 'title',
                        right   : 'month,agendaWeek,agendaDay,listWeek'
                    },
                    defaultDate : '2017-08-01',
                    editable    : true,
                    eventLimit  : true, // allow "more" link when too many events
                    navLinks    : true,
                    showTime        : true,
                    allDayDefault   : false,
                    selectable      : true,
                    selectHelper    : true,
                    height          : 500,
                    select          : function(start, end, allDay){                        
                        $('#eventStart').datepicker("setDate", new Date(start));
                        $('#eventEnd').datepicker("setDate", new Date(end));
                        $('#calEventDialog').dialog('open');
                        
                    },
                    eventSources: Global.BASE_URL()+"mySchedule/"+Global.getCookie('myId'),
                    events: [
                        {
                                title: 'All Day Event',
                                start: YM + '-01'
                        },
                        {
                                title: 'Long Event',
                                start: YM + '-07',
                                end: YM + '-10'
                        },
                        {
                                id: 999,
                                title: 'Repeating Event',
                                start: YM + '-09T16:00:00'
                        },
                        {
                                id: 999,
                                title: 'Repeating Event',
                                start: YM + '-16T16:00:00'
                        },
                        {
                                title: 'Conference',
                                start: YESTERDAY,
                                end: TOMORROW
                        },
                        {
                                title: 'Meeting',
                                start: TODAY + 'T10:30:00',
                                end: TODAY + 'T12:30:00'
                        },
                        {
                                title: 'Lunch',
                                start: TODAY + 'T12:00:00'
                        },
                        {
                                title: 'Meeting',
                                start: TODAY + 'T14:30:00'
                        },
                        {
                                title: 'Happy Hour',
                                start: TODAY + 'T17:30:00'
                        },
                        {
                                title: 'Dinner',
                                start: TODAY + 'T20:00:00'
                        },
                        {
                                title: 'Birthday Party',
                                start: TOMORROW + 'T07:00:00'
                        },
                        {
                                title: 'Click for Google',
                                url: 'http://google.com/',
                                start: YM + '-28'
                        }
                    ],
                    //this is when the event is dragged and dropped somewhere else 
                    eventDrop: function(event,dayDelta,minuteDelta,allDay,revertFunc) 
                    {
                        
                        Component.create.jbox.notif('Opps..','Sedang dalam proses perbaikan!',false);
                        
                    },

                    //this is when event is resized in day/week view
                    eventResize: function(event,dayDelta,minuteDelta,revertFunc) 
                    {
                        
                    },

                    eventClick: function(calEvent, jsEvent, view) 
                    {                                  
                        $('#eventEnd').datepicker("setDate", new Date(calEvent.end));
                        $('#calEventDialog #eventTitle').val(calEvent.title);
                        $('#calEventDialog #allday').val([calEvent.className == "gbcs-halfday-event" ? "1" : "2"]).prop('checked', true);
                        $("#calEventDialog").dialog("option", "buttons", [
                            {
                            text: "Save",
                            click: function() {
                                $(this).dialog("close");
                            }},
                        {
                            text: "Delete",
                            click: function() {
                                $(this).dialog("close");
                            }},
                        {
                            text: "Cancel",
                            click: function() {
                                $(this).dialog("close");
                            }}
                        ]);
                        $("#calEventDialog").dialog("option", "title", "Edit Event");
                        $('#calEventDialog').dialog('open');
                    },

                    eventRender: function( event, element, view ) 
                    { 
                        //redo the title to include the description
                        element.find(".fc-event-title").html(event.title + ": <span>" + event.description + "</span>");
                    },
                    loading: function(bool) 
                    {
                        if (bool)
                        {
                            $("#loading").show();
                        }
                        else 
                        {
                            $('#loading').hide();
                        }
                    }
                });
                
                $('.fc-today-button').trigger('click');
        
                
                //other param
                
                var title = $('#eventTitle');
                var start = $('#eventStart');
                var end = $('#eventEnd');
                var eventClass, color;
                
                $('#calEventDialog').dialog({
                    resizable: false,
                    autoOpen: false,
                    title: 'Add Event',
                    width: 400,
                    buttons: {
                        Save: function() {
                            
                            if ($('input:radio[name=allday]:checked').val() == "1"){
                                
                                eventClass = "gbcs-halfday-event";
                                color = "#9E6320";
                                end.val(start.val());
                                
                            }else {
                                
                                eventClass = "gbcs-allday-event";
                                color = "#875DA8";
                                
                            }
                            
                            if (title.val() !== '') {
                                $('.calendar').fullCalendar('renderEvent', {
                                    title: title.val(),
                                    start: start.val(),
                                    end: end.val(),
                                    allDay: true,
                                    className: eventClass,
                                    color: color
                                }, true // make the event "stick"
                                );
                            }
                            
                            $('.calendar').fullCalendar('unselect');
                            $(this).dialog('close');
                        },
                        Cancel: function() {
                            $(this).dialog('close');
                        }
                    }
                });
            });                
    },
}