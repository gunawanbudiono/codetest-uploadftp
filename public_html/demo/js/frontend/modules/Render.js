var Render={
    dashboard   :   {
        boxPanel   :   function(scope){
            
        }
    },
    tooltip :   {
        event :   function(s){
            var content="";

            switch(s){
                case    "single-session":
                    content+="<h4>Apa itu Single Day</h4>";
                    content+="Ketika anda memilih Single Session artinya acara yang dilaksanakan hanya berlaku satu hari.<br>";
                    content+="Mohon ikuti petunjuk pengisian selanjutnya.<br>Terimakasih.";

                break;
                case    "multi-session":
                    content+="<h4>Apa itu Multi Day</h4>";
                    content+="Ketika anda memilih Multi Session artinya acara yang dilaksanakan lebih dari satu hari.";
                    content+="Anda diharapkan mengisi lebih dari satu tanggal.<br>Mohon ikuti petunjuk pengisian selanjutnya.<br>Terimakasih.";

                break;            
            }

            return content;
        },
        profile :   function(s){
            var content="";

            switch(s){
                case    "personal":
                    content+="<h4>Apa itu Personal Profile</h4>";
                    content+="Profile Anda merupakan bersifat personal atau individu dan tidak terkait dengan isntitusi manapun.<br>";                    

                break;
                case    "institusi":
                    content+="<h4>Apa itu Institusi Profile</h4>";
                    content+="Profile Anda merupakan bersifat institusi atau organisasi yang mana Akun ini memiliki nama perusahaan beserta informasi detailnya.<br>";                    

                break;            
            }

            return content;
        }
    },
    events  :   {
        materi  :function(data,o){
            var $this = this;
            
            var no=1;
            var materi="";
            
            if(data.length > 0){
                
                $.each(data,function(i,e){
                
                    materi+="<div class='box-content-material-root'>";
                        
                        materi+="<div class='div-cover-btn' style='min-height:30px;' align='right'>";
                            materi+="<div class='button-margin div-group-modify-btn-materi-root'>";
                                /*
                                materi+="<a href='#' class='js-btn-edit-view-materi' data-code='"+e[i].code+"'  data-scope='materi' data-model='session' data-trigger='update'>";
                                    materi+="<span class='fa fa-pencil'></span> ";
                                materi+="</a> &nbsp;";
                                */
                                
                                materi+="<a href='#' class='js-btn-remove-view-materi' data-code='"+e[i].code+"' data-scope='persons' data-model='education' data-trigger='delete'>";
                                    materi+="<span class='fa fa-trash'></span> ";
                                materi+="</a> ";

                            materi+="</div>";
                        materi+="</div>";
                        

                        materi+="<p>";

                        materi+="<div class='content-material-info'>";
                            materi+="<div class='title'>";
                                materi+="Hari <span>: "+Global.format.text.step[no].ucwords()+"</span>";
                            materi+="</div>";                            
                            materi+="<div class='clearer'></div>";

                            materi+="<div class='title'>";
                                materi+="Tanggal<span>: "+Global.formatDateEngToIndo(e[i].start_date)+"</span>";
                            materi+="</div>";                            
                            materi+="<div class='clearer'></div>";
                        materi+="</div>";

                    materi+="<p>";

                    materi+="<div class='js-div-edit-"+no+"'></div>";

                        materi+="<div class='js-div-edit-table-materi-"+no+"'>";
                            materi+="<div class='table-responsive'>";          
                                materi+="<table class='table table-silabus table-bordered'>";          
                                    materi+="<thead>";          
                                        materi+="<tr>";          
                                            materi+="<th>Jam</th>";          
                                            materi+="<th>Sesi</th>";          
                                            materi+="<th>Deskripsi</th>";                                                      
                                            materi+="<th>Trainer</th>";                                                      
                                        materi+="</tr>";
                                    materi+="</thead>";          
                                    materi+="<tbody>";
                                        if(e.items.materi.length > 0){                                            
                                            
                                            $.each(e.items.materi,function(a,b){
                                                                                                
                                                var avatar = b[a].avatar==null?'assets/images/icon-avatar.png':b[a].avatar;

                                                materi+="<tr class='row-"+a+"' data-code='"+b[a].code+"' data-start_hour='"+b[a].start_hour+"' data-start_minute='"+b[a].start_minute+"' data-end_hour='"+b[a].end_hour+"' data-end_minute='"+b[a].end_minute+"' data-title="+b[a].materi_session+" data-description="+b[a].materi_description+" title='Double klik untuk meng-edit' data-toggle='tooltip' data-placement='top'>";                                                    
                                                    materi+="<td class='time'>"+b[a].start_hour+":"+b[a].start_minute+":"+b[a].start_time+" - "+b[a].end_hour+":"+b[a].end_minute+":"+b[a].end_time+"</td>";
                                                    materi+="<td class='session'>"+b[a].materi_session+"</td>";          
                                                    materi+="<td class='session-description' >";          
                                                        materi+=b[a].materi_description;                                                        
                                                    materi+="</td>"; 
                                                    
                                                    materi+="<td class='session-trainer'>";                                                                                                            
                                                        
                                                        materi+="<div class='box-session-trainer'>";          
                                                            materi+="<div class='images-trainer' style='background-image: url("+Global.BASE_URL()+avatar+");'>";

                                                            materi+="</div>";          
                                                            materi+="<div class='name'>";          
                                                                materi+=b[a].firstname.ucwords();
                                                            materi+="</div>";          

                                                            //materi+="<small>Rating: <button class='info-rating-other'>0</button></small>";
                                                            materi+="<div class='readOnly'></div>";          

                                                            materi+="<div class='view-profile'>";          
                                                                materi+="<a href='"+Global.BASE_URL()+"trainer/"+b[a].firstname+"-"+b[a].person_id+"'>View Profile</a>";          
                                                            materi+="</div>";          
                                                        materi+="</div>";          
                                                        
                                                        materi+="<div class='div-cover-btn' style='min-height:30px;' align='right'>";
                                                            materi+="<div class='button-margin div-group-modify-btn-materi'>";

                                                                materi+="<a href='#' class='js-btn-edit-view-materi' data-code='"+b[a].code+"'  data-scope='materi' data-model='session' data-trigger='update'>";
                                                                    materi+="<span class='fa fa-pencil'></span> ";
                                                                materi+="</a> &nbsp;";

                                                                materi+="<a href='#' class='js-btn-remove-item-materi' data-code='"+b[a].code+"' data-scope='session' data-model='session' data-trigger='delete'>";
                                                                    materi+="<span class='fa fa-trash'></span> ";
                                                                materi+="</a> ";

                                                            materi+="</div>";
                                                        materi+="</div>";
                                                        
                                                    materi+="</td>";          
                                                    
                                                materi+="</tr>";
                                                
                                            });
                                        }else{
                                            materi+="<tr>";
                                                materi+="<td colspan=4>";
                                                    materi+="<div class='alert alert-warning' >";
                                                        materi+="<center>";
                                                            materi+="Belum ada materi.";
                                                        materi+="</center>";
                                                    materi+="</div>";
                                                materi+="</td>";
                                            materi+="<tr>";
                                        }
                                    materi+="</tbody>";          
                                materi+="</table>";          
                            materi+="</div>";
                        materi+="</div>";
                    materi+="</div>";

                    materi+="<div class='row'>";
                        materi+="<div class='col-sm-12'>";

                            materi+="<center>";
                                materi+="<a href='#' class='js-btn-show-form-materi' data-code='"+e[i].code+"' data-scope='materi' data-date='"+e[i].start_date+"' data-trigger='js-btn-add-multidate' style='color:#fff' data-toggle='tooltip' data-placement='top' >";
                                    materi+="<span class='fa fa-plus'> Tambah Materi</span>";
                                materi+="</a>";                                                                                    
                            materi+="</center>";

                        materi+="</div>";
                    materi+="</div>";

                    materi+="<hr>";
                
                                
                    no++;
                
                });        
                
            }else{
                materi+="<div class='alert alert-warning'>";
                    materi+="<center>";
                        materi+="Materi belum tersedia!";
                    materi+="</center>";
                materi+="</div>";
            }
            
            $(o).empty().html(materi)
        },
        faq :   function(data,o){
            var n=1;
            var faq="";
            
            if(data.length > 0){  
            
                faq+="<div class='panel-group' id='accordion'>";
                    //loop
                    $.each(data,function(i,e){                        
                        
                        var active=n==1?"in":"";

                        faq+="<div class='container-box-faq'>";
                            faq+="<div class='panel'>";
                                faq+="<div class='panel-heading'>";
                                    faq+="<h4 class='panel-title'>";
                                        faq+="<a data-toggle='collapse' data-parent='#accordion' href='#collapse"+n+"'>";
                                            faq+="<span class='fa fa-play'></span> "+e.title;
                                        faq+="</a>";

                                        faq+="<span style='float:right;'>";

                                            faq+="<div class='div-group-modify-btn-faq'>";

                                                faq+="<a href='#' class='js-btn-edit-faq' data-code='"+e.code+"' data-title='"+e.title+"' data-description='"+e.description+"'>";
                                                    faq+="<span class='fa fa-pencil'></span>";
                                                faq+="</a> ";

                                                faq+="<a href='#' class='js-btn-remove-faq js-cancel-top-icon' data-code='"+e.code+"'>";
                                                    faq+="<span class='fa fa-trash'></span>";
                                                faq+="</a> ";                                           

                                            faq+="</div> ";

                                        faq+="</span>";

                                    faq+="</h4>";

                                faq+="</div>";
                                faq+="<div id='collapse"+n+"' class='panel-collapse collapse "+active+"'>";
                                    faq+="<div class='panel-body'>";
                                        if(e.description=='null'){
                                            faq+="<div class='alert alert-warning'>";
                                                faq+="<center>";
                                                    faq+="Belum tersedia!";
                                                faq+="</center>";
                                            faq+="</div>";
                                        }else{
                                            faq+=e.description;
                                        }
                                        
                                    faq+="</div>";
                                faq+="</div>";
                            faq+="</div>";
                        faq+="</div>";

                        n++;

                    });

                faq+="</div>";
        
            }else{
                
                faq+="<div class='alert alert-warning'>";
                    faq+="<center>";
                        faq+="FAQ belum tersedia!";
                    faq+="</center>";
                faq+="</div>";
            }

            $(o).empty().html(faq);
        
        },
        gallery :function(data,o){
            
            var noContent="<div class='alert alert-warning' ><center>Galeri foto belum tersedia!</center></div>";
            var gallery="";
            if(data.length > 0){

                $.each(data,function(i,e){


                    gallery+="<div class='box-foto'>";
                        gallery+="<a href='#'>";
                            gallery+="<div class='events-foto' style='background-image: url("+Global.BASE_URL()+e.file_path+");'>";

                            gallery+="</div>";
                            gallery+="<div class='title-box-foto'>"+e.title+"</div>";
                        gallery+="</a>";

                        gallery+="<div class='box-action-dropdown'>";
                            gallery+="<div class='btn-group'>";
                                gallery+="<div class='dropdown-toggle' data-toggle='dropdown'>";
                                    gallery+="<span class='glyphicon glyphicon-option-vertical'></span>";
                                gallery+="</div>";
                                gallery+="<ul class='dropdown-menu dropdown-menu-alt' role='menu'>";
                                    gallery+="<li><a href='#' class='js-delete-gallery-event' data-code='"+e.code+"' data-title=''>Hapus</a></li>";
                                gallery+="</ul>";
                            gallery+="</div>";
                        gallery+="</div>";
                    gallery+="</div>";


                });

                gallery+="<div class='clearer'></div>";

            }else{

                gallery+=noContent;

            }

            $(o).empty().html(gallery);
        
        },
        location    :   function(data,o){
            var $this = this;
            
            var el="";
            
            if(data.length > 0){
               
                $.each(data,function(i,e){                                        
                    
                    var min_price = e.min_price==null?0:parseInt(e.min_price);
                    var max_price = e.max_price==null?0:parseInt(e.max_price);
                    var tag="";
                    
                    var price=0;
                    if(min_price == max_price){
                        
                        price =e.currency+" "+min_price.formatMoney();
                        
                    }else{
                        
                        price =e.currency+" "+min_price.formatMoney()+" - "+max_price.formatMoney();
                        
                    }
                    
                    var tags=e.event_tag.split(",");
                    
                    if(tags.length > 0){
                        for(var i=0;i < tags.length;i++){
                            tag+="#"+tags[i];    
                        }
                        
                    }
                    
                    el+="<a href='"+Global.BASE_URL()+"class/"+e.event_name+"-"+e.id+"'>";
                        el+="<div class='box'>";
                            el+="<div class='cover-events' style='background-image: url("+Global.BASE_URL()+e.file_path+");'>";
                                el+="<div class='label-img'>";
                                    el+=e.subcategory;
                                el+="</div>";
                                el+="<div class='label-bottom'>";
                                    el+="<div class='idr'>"+price+"</div>";
                                    el+="<div class='date'>"+Global.formatDateEngToIndo(e.start_date)+"</div>";
                                el+="</div>";
                            el+="</div>";
                            el+="<div class='info-events'>";
                                    el+="<h1>"+e.event_name.ucwords()+"</h1>";
                                    el+="<div class='box-small'>";
                                        el+=e.event_address;
                                    el+="</div>";
                                    el+="<div class='box-small'>";
                                        el+="<div class='middle'>";
                                            el+="<div class='row'>";
                                                el+="<div class='col-md-6 col-sm-6 col-xs-6'>";
                                                    //el+="<small>Rating: <button class='info-rating'>0</button></small>";
                                                    el+="<div class='readOnly'></div>";
                                                el+="</div>";
                                                el+="<div class='col-md-6 col-sm-6 col-xs-6'>";
                                                    el+="<div class='blink-red'>Sisa "+e.sisa_ticket+" Kursi</div>";
                                                el+="</div>";
                                            el+="</div>";
                                        el+="</div>";
                                    el+="</div>";
                                    el+="<div class='box-small'>";
                                        el+="<div class='bottom'>";
                                            el+="<div class='row'>";
                                                el+="<div class='col-md-6'>";
                                                    el+=tag;
                                                el+="</div>";
                                                el+="<div class='col-md-6'>";
                                                el+="</div>";
                                            el+="</div>";
                                        el+="</div>";
                                    el+="</div>";
                                el+="</div>";
                        el+="</div>";
                    el+="</a>";
                    
                    
                });
                
            }else{
                
                el+="<div class='alert alert-warning'>";
                    el+="Maaf , Kami tidak menemukan Lokasi Event yang anda cari...";
                el+="</div>";
                
            }
            
            
            $(o).empty().html(el);
            $('.readOnly').raty({ readOnly: true, score: 0 });
            $('.actionStar').raty({ half: true });
            
        },
        category    :   function(data,o,f){
            var $this = Render;
            var me = this;
            var el="";
                        
            if(data.length > 0){
                
                $.each(data,function(i,e){
                    
                    el+="<div class='all-box-category-interest'>";
                        el+="<label class='btn1 btn-primary1'>";
                        
                        if(e.file_path != null){
                            
                            el+="<img  src='"+Global.BASE_URL()+e.file_path+"'  class='img-check' style='width: 100%;' data-code='"+e.code+"'>";
                            
                        }else{
                            el+="<img  src='"+Global.BASE_ASSETS()+"images/category1.jpg'  class='img-check' style='width: 100%' data-code='"+e.code+"'>";
                        }
                            el+="<input type='checkbox' name='cek'  value='' class='hidden' autocomplete='off'>";
                        el+="</label>";
                        el+="<div class='title-category-interest'>";
                            el+=e.category.ucwords();
                        el+="</div>";
                    el+="</div>";
                    
                })
                
            }else{
                
                el+=$this.renderNoContent();
                
            }
                        
            $this.renderHtml(o,el,function(){
                f();
            })
            
        },                
        form    :   {
            multidate   :   function(i){
                                
                var el="";
                
                el+="<div class='js-div-custom-date'>";
                    el+="<div class='row'>";
                        el+="<div class='col-sm-8'>";
                            el+="<div class='text-label'>Hari "+i+"</div>";                            
                        el+="</div>";
                        el+="<div class='col-sm-4'>";
                            el+="<div align='right'>";
                                el+="<a href='#' class='js-btn-remove-multidate' data-scope='custom-date' data-trigger='js-btn-remove-multidate' style='color:#fff' data-toggle='tooltip' data-placement='top' >";
                                    el+="<span class='fa fa-trash'></span>";
                                el+="</a>";
                            el+="</div>";
                        el+="</div>";
                    el+="</div>";

                    el+="<input type='text' class='text-default js-txt-event-custom-start-date'  name='js-txt-event-custom-start-date' value='2017-01-01' required>";

                el+="</div>";
                
                return el;
            },
            loopMultidate   :   function(o,data,f){
                
                var el="";
                
                if(data.length > 0){
                    
                    $.each(data,function(i,e){
                        var hari=i+1;
                        
                        el+="<div class='js-div-custom-date'>";
                            el+="<div class='row'>";
                                el+="<div class='col-sm-8'>";
                                    el+="<div class='text-label'>Hari "+hari+"</div>";                            
                                el+="</div>";
                                el+="<div class='col-sm-4'>";
                                    el+="<div align='right'>";
                                        el+="<a href='#' class='js-btn-remove-multidate' data-scope='custom-date' data-trigger='js-btn-remove-multidate' style='color:#fff' data-toggle='tooltip' data-placement='top' >";
                                            el+="<span class='fa fa-trash'></span>";
                                        el+="</a>";
                                    el+="</div>";
                                el+="</div>";
                            el+="</div>";

                            el+="<input type='text' class='text-default js-txt-event-custom-start-date'  name='js-txt-event-custom-start-date' value='"+e.start_date+"' required>";

                        el+="</div>";
                    });                                    
                    
                                    
                    $(o).empty().html(el);
                }
                
                f();             
            }
            
        }
    },
    tickets :   {
        setup   :   function(o,data,f){
            
            var $this = Render;
            var me = this;
            var el="";                                    
            
            el+="<div class='box-tickets'>";
                el+="<div class='box-detail-tickets'>";
                    if(data.length > 0){

                        $.each(data,function(i,e){

                            var price;
                            var scope;                            

                            if(e.is_promo==1){
                                
                                price = "<del>"+e.ticket_currency+" "+parseInt(e.ticket_price).formatMoney()+"</del> <br><span style='color:red;'>Disc. ("+e.ticket_discount+"%)</span> "+e.ticket_currency+" "+parseFloat(e.ticket_fix_price).formatMoney();
                                scope='discount';

                            }else if(e.is_earlybird==1){
                                
                                price = "<del>"+e.ticket_currency+" "+parseInt(e.ticket_price).formatMoney()+"</del> <br><span style='color:red;'>Disc. ("+e.ticket_discount+"%)</span> "+e.ticket_currency+" "+parseFloat(e.ticket_fix_price).formatMoney();                                
                                scope='earlybird';
                                
                            }else if(e.is_free==1){

                                price = "<i>Gratis</i>";                    
                                scope='free';
                                
                            }else{

                                price = e.ticket_currency+" "+parseInt(e.ticket_fix_price).formatMoney();;
                                scope='normal';
                            }
                            

                            el+="<div class='tickets'>";
                                el+="<div class='tickets-type'>"; 

                                    el+=e.ticket_name.toUpperCase();

                                el+="</div>";

                                el+="<div class='idr'>";
                                
                                    el+=price;
                                    
                                el+="</div>";                                                                


                                el+="<div class='info'>Sisa Tiket "+parseInt(e.ticket_available).formatMoney()+"</div>";
                                el+="<div class='info'>";
                                    el+="<div class='alert alert-info'>";
                                        el+=e.ticket_description;
                                    el+="</div>";
                                el+="</div>";

                                el+="<div class='div-cover-btn' style='min-height:30px;' align='right'>";
                                    el+="<div class='button-margin div-group-modify-btn-ticket'>";

                                        el+="<a href='#' class='js-btn-edit-ticket' \n\
                                                data-code='"+e.code+"'  \n\
                                                data-scope='"+scope+"' \n\
                                                data-ticket='"+e.ticket_name+"' \n\
                                                data-currency='"+e.ticket_currency+"' \n\
                                                data-discount='"+e.ticket_discount+"' \n\
                                                data-price_normal='"+e.ticket_price+"' \n\
                                                data-seats='"+e.ticket_seats+"' \n\
                                                data-description='"+e.ticket_description+"' \n\
                                                data-is_free='"+e.is_free+"' \n\
                                                data-is_promo='"+e.is_promo+"' \n\
                                                data-is_earlybird='"+e.is_earlybird+"' \n\
                                                data-price='"+e.ticket_fix_price+"' data-trigger='update'>";
                                            el+="<span class='fa fa-pencil'></span> ";
                                        el+="</a> &nbsp;";

                                        el+="<a href='#' class='js-btn-remove-ticket' \n\
                                                data-code='"+e.code+"' \n\
                                                data-is_free='"+e.is_free+"' \n\
                                                data-is_promo='"+e.is_promo+"' \n\
                                                data-is_earlybird='"+e.is_earlybird+" \n\
                                                data-trigger='delete'>";
                                            el+="<span class='fa fa-trash'></span> ";
                                        el+="</a> ";

                                    el+="</div>";
                                el+="</div>";                               

                                el+="<div class='clearer'></div>";
                            el+="</div>";

                        });


                    }else{

                        el+="<center>";
                            el+="<div class='alert alert-warning'>";
                                el+="Tiket Belum di setup";
                            el+="</div>";
                        el+="</center>";

                    }
                el+="</div>";
            el+="</div>";
                        
            $this.renderHtml(o,el,function(){
                f();
            })
            
        }
    },
    booking :  { 
        formTicket    :   function(o,count,f){
            
            var $this = Render;
            var me = this;
            var el="";
                        
            if(count > 0){
                for(var i=0; i < count;i++){

                    el+="<div class='col-sm-4'>";
                        el+="<div class='text-label'>Nama Lengkap</div>";
                        el+="<input type='text' name='js-txt-fullname-itembooking' class='text-default js-txt-fullname-itembooking'>"; 
                    el+="</div>";
                    el+="<div class='col-sm-4'>";
                        el+="<div class='text-label'>Email</div>";
                        el+="<input type='text' name='js-txt-fullname-itembooking' class='text-default js-txt-email-itembooking'> ";
                    el+="</div>";
                    el+="<div class='col-sm-4'>";
                        el+="<div class='text-label'>Tiket</div>";
                        el+="<span class='select-option'>";
                            el+="<select  name='js-opt-ticket-itembooking' class='js-opt-ticket-itembooking' required>";
                                el+="<option value=''>Pilih Ticket</option>";
                            el+="</select>";
                        el+="</span>";
                    el+="</div>";
                }
                
                $this.renderHtml(o,el,function(){
                    f();
                });
            }            

        }
        
    },
    gallery :   {        
        list :   function(data,o,t,f){
        
            var $this = Render;
            var me = this;
            var title = "Gallery Anda";
            var no=1;
            var el="";               

            if(data.length > 0){

                switch(t){

                    case   "option":

                        $.each(data,function(i,e){

                            el+="<option value='"+e.code+"'>"+e.gallery_title+"</option>"; 

                        });

                    break;

                    case    "gallery":

                        $.each(data,function(i,e){
                            
                            var cover=e.i_file==null?Global.BASE_ASSETS()+"images/cover-default.jpg":Global.BASE_URL()+e.file_path;

                            el+="<div class='box-list-foto'>";
                                el+="<a href='#' class='js-trigger-view-events-list-foto'>";
                                    el+="<div class='events-list-foto' style='background-image: url("+cover+"');'>";

                                    el+="</div>";
                                    el+="<div class='title-box-list-foto'>"+e.gallery_title+"</div>";
                                el+="</a>";
                                el+="<div class='box-action-dropdown'>";
                                
                                    el+="<div class='btn-group'>";
                                        el+="<div class='dropdown-toggle' data-toggle='dropdown'>";
                                            el+="<span class='glyphicon glyphicon-option-vertical'></span>";
                                        el+="</div>";
                                        el+="<ul class='dropdown-menu dropdown-menu-alt' role='menu'>";                                            
                                            el+="<li><a href='#' class='detail-album js-add-album' data-code='"+e.code+"' data-title='"+e.gallery_title+"'>Tambah</a></li>";
                                            if(Media.scope=="events_add_gallery"){
                                                
                                                el+="<li>";
                                                    el+="<a href='#' class='detail-album js-change-events-gallery' data-code='"+e.code+"' data-file='"+e.i_file+"' data-title='"+e.gallery_title+"'  data-selected='"+Events.selectedId+"'>Tambah ke Gallery</a>";
                                                el+="</li>";
                                                
                                            }
                                            el+="<li><a href='#' class='detail-album js-detail-album' data-code='"+e.code+"' data-title='"+e.gallery_title+"'>Lihat</a></li>";                                            
                                            el+="<li><a href='#' class='js-delete-album' data-code='"+e.code+"' data-title='"+e.gallery_title+"'>Hapus</a></li>";
                                        el+="</ul>";
                                    el+="</div> ";
                                    
                                el+="</div>";
                            el+="</div>"; 

                        });

                    break;                   

                    case   "table":

                        el+="<div class='table-responsive'>";          
                            el+="<table class='table'>";          
                                el+="<thead>";          
                                    el+="<tr>";          
                                        el+="<th>#</th>";          
                                        el+="<th>Album</th>";          
                                        el+="<th>Created Date</th>";          
                                        //el+="<th></th>";          
                                    el+="</tr>";          
                                el+="</thead>";          
                                el+="<tbody>";

                                $.each(data,function(i,e){

                                    el+="<tr>";          
                                        el+="<td>"+no+"</td>";          
                                        el+="<td>"+e.gallery_title+"</td>";          
                                        el+="<td>"+Global.formatDateEngToIndo(e.created_at)+"</td>";          
                                        /*
                                        el+="<td>";          
                                            el+="<a href='#'  class='icon-action-process detail-album' data-toggle='tooltip' data-placement='top' title='View' data-code='"+e.code+"'>";
                                                el+="<span class='glyphicon glyphicon-eye-open'></span>";          
                                            el+="</a>";                                                                
                                            el+="<a href='#'  class='icon-action-process js-delete-album' data-toggle='tooltip' data-placement='top' title='Delete' data-code='"+e.code+"'>";          
                                                el+="<span class='glyphicon glyphicon-trash'></span>";
                                            el+="</a>";          
                                        el+="</td>";          
                                    */
                                    el+="</tr>";

                                    no++;

                                });

                                el+="</tbody>";          
                            el+="</table>";          
                        el+="</div>";


                    break;
                }           

            }else{

                el+="<div class='alert alert-danger'>";
                    el+="<b>Opps..</b>  <b>"+title+" masih kosong!</b>";
                el+="</div>";

            }

            $this.renderHtml(o,el,function(){
                f();
            })
        },    
        items :   function(data,o,t,f){                        
        
            var $this = Render;
            var me = this;
            var title = "Galeri Foto";
            var no=1;
            var el="";               

            if(data.length > 0){

                switch(t){

                    case   "option":

                        $.each(data,function(i,e){

                            el+="<option value='"+e.code+"'>"+e.gallery_title+"</option>"; 

                        });

                    break;

                    case    "gallery":

                        $.each(data,function(i,e){
                            
                            el+="<div class='box-list-foto'>";
                                el+="<a href='#'>";
                                    el+="<div class='events-list-foto' style='background-image: url("+Global.BASE_URL()+e.file_path+"');'>";

                                    el+="</div>";
                                    el+="<div class='title-box-list-foto'>"+e.title+"</div>";
                                el+="</a>";
                                
                                /*
                                el+="<label class='btn1 btn-primary1'>";
                                    el+="<img src='"+Global.BASE_URL()+e.file_path+"'  class='js-img-check-single' style='width: 100%' data-code='"+e.code+"'>";
                                    el+="<input type='checkbox' name='cek'  value='' class='hidden' autocomplete='off'>";
                                el+="</label>";
                                el+="<div class='title-box-list-foto'>";
                                    el+=e.title;
                                el+="</div>";
                                */
                               
                                el+="<div class='box-action-dropdown'>";
                                    el+="<div class='btn-group'>";
                                        el+="<div class='dropdown-toggle' data-toggle='dropdown'>";
                                            el+="<span class='glyphicon glyphicon-option-vertical'></span>";
                                        el+="</div>";
                                        el+="<ul class='dropdown-menu dropdown-menu-alt' role='menu'>";
                                            el+="<li>";
                                                el+="<a href='#' class='detail-album js-change-avatar' data-code='"+e.code+"' data-file='"+e.i_file+"' data-path='"+Global.BASE_URL()+e.file_path+"' data-title='"+e.title+"' data-profile='"+Global.getCookie('myProfile')+"'>Jadikan Avatar</a>";
                                            el+="</li>";
                                            
                                            if(Media.scope=="events_banner"){
                                                
                                                el+="<li>";
                                                    el+="<a href='#' class='detail-album js-change-events-banner' data-code='"+e.code+"' data-file='"+e.i_file+"' data-path='"+Global.BASE_URL()+e.file_path+"' data-title='"+e.title+"' data-profile='"+Global.getCookie('myProfile')+"' data-selected='"+Events.selectedId+"'>Jadikan Sampul Cover</a>";
                                                el+="</li>";
                                                
                                            }
                                            
                                            el+="<li>";
                                                el+="<a href='"+Global.BASE_URL()+e.file_path+"' data-fancybox data-caption='"+e.title+"' class='detail-album js-detail-album-items' data-code='"+e.code+"' data-file='"+e.i_file+"'>Lihat</a>";
                                            el+="</li>";                                            
                                            el+="<li><a href='#' class='js-delete-album-items' data-code='"+e.code+"' data-title='"+e.title+"' data-file='"+e.i_file+"'>Hapus</a></li>";
                                        el+="</ul>";
                                    el+="</div> ";
                                el+="</div>";
                                
                            el+="</div>";
                                               
                        });

                    break;                   

                    case   "table":

                        el+="<div class='table-responsive'>";          
                            el+="<table class='table'>";          
                                el+="<thead>";          
                                    el+="<tr>";          
                                        el+="<th>#</th>";          
                                        el+="<th>Album</th>";          
                                        el+="<th>Dibuat tanggal</th>";          
                                        el+="<th></th>";          
                                    el+="</tr>";          
                                el+="</thead>";          
                                el+="<tbody>";

                                $.each(data,function(i,e){

                                    el+="<tr>";          
                                        el+="<td>"+no+"</td>";          
                                        el+="<td>"+e.gallery_title+"</td>";          
                                        el+="<td>"+e.created_at+"</td>";          
                                        el+="<td>";          
                                            el+="<a href='#'  class='icon-action-process detail-album' data-toggle='tooltip' data-placement='top' title='View' data-code='"+e.code+"'>";
                                                el+="<span class='glyphicon glyphicon-eye-open'></span>";          
                                            el+="</a>";          
                                            el+="<a href='#'  class='icon-action-process js-edit-album' data-toggle='tooltip' data-placement='top' title='Edit' data-code='"+e.code+"'>";          
                                                el+="<span class='glyphicon glyphicon-pencil'></span>";          
                                            el+="</a>";          
                                            el+="<a href='#'  class='icon-action-process js-delete-album' data-toggle='tooltip' data-placement='top' title='Delete' data-code='"+e.code+"'>";          
                                                el+="<span class='glyphicon glyphicon-trash'></span>";
                                            el+="</a>";          
                                        el+="</td>";          
                                    el+="</tr>";

                                    no++;

                                });

                                el+="</tbody>";          
                            el+="</table>";          
                        el+="</div>";


                    break;
                }           

            }else{

                el+="<div class='alert alert-danger'>";
                    el+="<b>Opps.. "+title+" masih kosong!</b>";
                el+="</div>";

            }

            $this.renderHtml(o,el,function(){
                f();
            })
        },
    },    
    person  :   {
        property    :   function(){
            var el="";
            el+="<div class='panel panel-default'>";
                el+="<div class='panel-heading'>";
                    el+="<span >Saya</span>";        
                el+="</div>";
                el+="<div class='panel-body'>";

                    el+="<table class='table table-responsive'>";
                        el+="<tr>";
                            el+="<td>";
                                el+="Point";
                            el+="</td>";
                            el+="<td>";
                                el+="56";
                            el+="</td>";
                        el+="</tr>";
                        el+="<tr>";
                            el+="<td>";
                                el+="Grade";
                            el+="</td>";
                            el+="<td>";
                                el+="Captain";
                            el+="</td>";
                        el+="</tr>";
                    el+="</table>";

                el+="</div>";
            el+="</div>";
                
          
          return el;
          
        },
        boxOtherTrainer   :   function(data,o,f){
            var el="";
            
            if(data.length > 0){
                
                $.each(data,function(i,e){
                    
                    el+="<div class='box-partner-profile bgWhite '>";                        
                        el+="<div class='left-profile' style=''>";
                            if(e.i_file != 'null'){
                                                                
                                el+="<div class='users-trainer img-check' style='background-image: url("+Global.BASE_URL()+e.avatar+")'></div>";
                           
                                
                            }else{
                                                                
                                el+="<div class='users-trainer img-check' style='background-image: url('"+Global.BASE_ASSETS()+"images/user2.jpg');'></div>";
                            }
                            
                            
                        el+="</div>";
                        el+="<div class='right-profile'>";                            
                            el+="<div class='name-profile'>"+e.firstname+"</div>";
                            el+="<div class='profesi-profile'>"+e.profesional_in+"</div>";
                            el+="<div class='rating-profile'>";
                                //el+="<small>Rating: <button class='info-rating'>4.5</button></small>";
                                el+="<div class='readOnly'></div>";
                            el+="</div>";
                        el+="</div>";
                        el+="<div class='clearer'></div>";
                        el+="<input type='checkbox' class='js-chk-other-trainer' data-code='"+e.code+"' name='js-chk-other-trainer'  value='"+e.code+"' >";
                    el+="</div>";
                    

                });
                
            }else{
                
                el+=Global.renderEmptyRecord('Opps..','Anda belum memiliki Trainer yang lain!');
            }
            
            $(o).empty().html(el);
            
            f();
            
        },
        profile   :   function(o,data){
            var el="";
            var $this = Render;
            
            if(data.length > 0){
                
                $.each(data,function(i,e){
                    
                    el+="<div class='row'>";
                        el+="<div class='col-md-2'>";
                            el+="<div class='text-label'>Avatar</div>";

                                el+="<img class='js-img-avatar' src='"+Global.BASE_URL()+e.avatar+"' style='width: 100%;'>";

                            el+="<br /><br />";
                        el+="</div>";
                        
                        el+="<div class='col-md-10'>";
                            el+="<div class='text-label'>Tentang Saya</div>";

                            el+="<div class='well js-view-description'>";
                                el+=e.description
                            el+="</div>";

                            el+="<div class='text-label'>Alamat Lengkap</div>";
                            el+="<div class='well js-view-address'>";
                                el+=e.address
                            el+="</div>";

                        el+="</div>";
                    el+="</div>";
                    
                });
                
            }else{
                el+=$this.renderNoContent();
            }
            
            
            $this.renderHtml(o,el,function(){
                
            });
        },
        rekening    :   function(o,data){
            var $this = Render;
            var rek="";        
            var nRek=1;
            
            if(data.length > 0){                                                  
            
                $.each(data,function(i,e){

                    rek+="<div class='container-box-profile'>";

                        rek+="<div class='row'>";                                            

                            rek+="<div class='col-md-10'>";
                                rek+="<a href='#'>";
                                    rek+="<div class='box-profile'>";
                                        rek+="<div class='left-box-profile'>";
                                            rek+="Nama Bank <span>:</span>";
                                        rek+="</div>";
                                        rek+="<div class='right-box-profile'>";
                                            rek+=e.account_bank;
                                        rek+="</div>";
                                        rek+="<div class='clearer'></div>";
                                    rek+="</div>";

                                    rek+="<div class='box-profile'>";
                                        rek+="<div class='left-box-profile'>";
                                            rek+="No.Rekening <span>:</span>";
                                        rek+="</div>";
                                        rek+="<div class='right-box-profile'>";
                                            rek+=e.account_no;
                                        rek+="</div>";
                                        rek+="<div class='clearer'></div>";
                                    rek+="</div>";

                                    rek+="<div class='box-profile'>";
                                        rek+="<div class='left-box-profile'>";
                                            rek+="Atas Nama <span>:</span>";
                                        rek+="</div>";
                                        rek+="<div class='right-box-profile'>";
                                            rek+=e.account_name;
                                        rek+="</div>";
                                        rek+="<div class='clearer'></div>";
                                    rek+="</div>";                                                   

                                rek+="</a>";
                            rek+="</div>";

                            rek+="<div class='col-md-2'>";
                                rek+="<div class='div-cover-btn' style='min-height:30px;' align='right'>";
                                    rek+="<div class='button-margin div-group-modify-btn'>";

                                        rek+="<a href='#' class='action-rekening js-btn-edit-rekening' data-code='"+e.code+"' data-bank='"+e.account_bank+"' data-bankno='"+e.account_no+"' data-bankcc='"+e.account_name+"' data-scope='persons' data-model='rekening' data-trigger='update'>";
                                            rek+="<span class='fa fa-pencil'></span> ";
                                        rek+="</a> &nbsp;";

                                        rek+="<a href='#' class='js-btn-remove-rekening' data-code='"+e.code+"' data-scope='persons' data-model='rekening' data-trigger='delete'>";
                                            rek+="<span class='fa fa-trash'></span> ";
                                        rek+="</a> ";

                                    rek+="</div>";
                                rek+="</div>";
                            rek+="</div>";

                        rek+="</div>";//end row

                    rek+="</div>";

                    if(data.length > 1 && (data.length) != nRek){

                        rek+="<hr>";

                    }

                    nRek++;
                });                        

            }else{                        

                rek+=Render.renderNoContent();
            }
            
            $this.renderHtml(o,rek,function(){
                
            });
        },
        education   :   function(o,data){
            var el="";
            var $this = Render;
            var edu="";        
            var nEdu=1;
                        
            if(data.length > 0){                                                  
            
                $.each(data,function(i,e){

                    edu+="<div class='container-box-profile'>";

                        edu+="<div class='row'>";                                            

                            edu+="<div class='col-md-10'>";
                                edu+="<a href='#'>";
                                    edu+="<div class='box-profile'>";
                                        edu+="<div class='left-box-profile'>";
                                            edu+="Jenjang Pendidikan <span>:</span>";
                                        edu+="</div>";
                                        edu+="<div class='right-box-profile'>";
                                            edu+=e.degree;
                                        edu+="</div>";
                                        edu+="<div class='clearer'></div>";
                                    edu+="</div>";

                                    edu+="<div class='box-profile'>";
                                        edu+="<div class='left-box-profile'>";
                                            edu+="Nama Sekolah <span>:</span>";
                                        edu+="</div>";
                                        edu+="<div class='right-box-profile'>";
                                            edu+=e.institution.ucwords();
                                        edu+="</div>";
                                        edu+="<div class='clearer'></div>";
                                    edu+="</div>";

                                    edu+="<div class='box-profile'>";
                                        edu+="<div class='left-box-profile'>";
                                            edu+="Jurusan <span>:</span>";
                                        edu+="</div>";
                                        edu+="<div class='right-box-profile'>";
                                            edu+=e.major.ucwords();
                                        edu+="</div>";
                                        edu+="<div class='clearer'></div>";
                                    edu+="</div>";

                                    edu+="<div class='box-profile'>";
                                        edu+="<div class='left-box-profile'>";
                                            edu+="Tahun Lulus<span>:</span>";
                                        edu+="</div>";
                                        edu+="<div class='right-box-profile'>";
                                            edu+=e.e_year;
                                        edu+="</div>";
                                        edu+="<div class='clearer'></div>";
                                    edu+="</div>";                        

                                edu+="</a>";
                            edu+="</div>";

                            edu+="<div class='col-md-2'>";
                                edu+="<div class='div-cover-btn' style='min-height:30px;' align='right'>";
                                    edu+="<div class='button-margin div-group-modify-btn'>";

                                        edu+="<a href='#' class='action-education js-btn-edit-education' data-code='"+e.code+"' data-institution='"+e.institution+"' data-degree='"+e.degree+"' data-major='"+e.major+"' data-eyear='"+e.e_year+"' data-scope='persons' data-model='education' data-trigger='update'>";
                                            edu+="<span class='fa fa-pencil'></span> ";
                                        edu+="</a> &nbsp;";

                                        edu+="<a href='#' class='js-btn-remove-education' data-code='"+e.code+"' data-scope='persons' data-model='education' data-trigger='delete'>";
                                            edu+="<span class='fa fa-trash'></span> ";
                                        edu+="</a> ";

                                    edu+="</div>";
                                edu+="</div>";
                            edu+="</div>";

                        edu+="</div>";//end row

                    edu+="</div>";

                    if(data.length > 1 && (data.length) != nEdu){

                        edu+="<hr>";

                    }

                    nEdu++;
                });                        

            }else{                        

                edu+=Render.renderNoContent();
            }
            
            
            $this.renderHtml(o,edu,function(){
                
            });
        },
        experience   :   function(o,data){
            var el="";
            var $this = Render;
            
            if(data.length > 0){
                
                $.each(data,function(i,e){
                    
                    el+="<div class='well'>";
                        el+="<div class='container-box-profile'>";

                            el+="<div class='box-profile'>";
                                el+="<div class='left-box-profile'>";
                                    el+="Nama Perusahaan<span>:</span>";
                                el+="</div>";
                                el+="<div class='right-box-profile'>";
                                    el+=e.company;
                                el+="</div>";
                                el+="<div class='clearer'></div>";
                            el+="</div>";

                            el+="<div class='box-profile'>";
                                el+="<div class='left-box-profile'>";
                                    el+="Jabatan<span>:</span>";
                                el+="</div>";
                                el+="<div class='right-box-profile'>";
                                    el+=e.position;
                                el+="</div>";
                                el+="<div class='clearer'></div>";
                            el+="</div>";
                            el+="<div class='box-profile'>";
                                el+="<div class='left-box-profile'>";
                                    el+="Tahun<span>:</span>";
                                el+="</div>";
                                el+="<div class='right-box-profile'>";
                                    el+=e.s_year+"-"+e.e_year
                                el+="</div>";
                                el+="<div class='clearer'></div>";
                            el+="</div>";
                        el+="</div>";
                        el+="<div class='button-margin'>";
                            //el+="<button class='button-small ' data-code='{{$exp->code}}' data-company='{{$exp->company}}' data-position='{{$exp->position}}' data-syear='{{$exp->s_year}}' data-eyear='{{$exp->e_year}}' data-scope='persons' data-model='experience' data-trigger='update'>Update</button>";
                            //el+="<button class='button-small' data-code='{{$exp->code}}' data-scope='persons' data-model='experience'  data-trigger='delete'>Delete</button>";
                        el+="</div>";
                    el+="</div>";
                    
                });
                
            }else{
                el+=$this.renderNoContent();
            }
            
            
            $this.renderHtml(o,el,function(){
                
            });
        },
        achievement   :   function(o,data){
            var el="";
            var $this = Render;
            
            if(data.length > 0){
                
                $.each(data,function(i,e){
                    
                    el+=e.profesional
                    
                });
                
            }else{
                
                el+=$this.renderNoContent();
            }
            
            
            $this.renderHtml(o,el,function(){
                
            });
        },
        industry    :function(o,data){
            
            var el="";
            var $this = Render;
            
            if(data.length > 0){
                
                $.each(data,function(i,e){
                    
                    el+="<div class='well'>";
                        el+="<div class='row'>";
                            el+="<div class='col-md-4'>";
                                el+="<img src='"+Global.BASE_ASSETS()+"images/category1.jpg' style='width: 100%;'>";
                            el+="</div>";
                            el+="<div class='col-md-8'>";
                                el+=e.achievement
                            el+="</div>";
                        el+="</div>";

                        el+="<div class='button-margin'>";
                            el+="<div align='left'>";
                                //el+="<button class='button-small action-achievement' data-code='{{$ach->code}}' data-field='{{$ach->achievement}}' data-scope='persons' data-model='achievement' data-trigger='update'>Update</button>";
                                //el+="<button class='button-small' data-code='{{$ach->code}}' data-field='{{$ach->achievement}}' data-scope='persons' data-model='achievement' data-trigger='delete'>Delete</button>";
                            el+="</div>";
                        el+="</div>";
                    el+="</div>";
                    
                });
                
            }else{
                
                el+=Render.renderNoContent();
                        
            }
            
            
            $this.renderHtml(o,el,function(){
                
            });
            
        }
        
    },
    timelines   :   {
        boxComment  :   function(){
            var el="";
            el+="<div class='box-comment-time-line js-box-comment'>";

                el+="<div class='left-users-comment-time-line'>";
                    el+="<div class='users-comment' style='background-image: url('{{URL('/')}}/assets/images/user2.jpg');'>";

                    el+="</div>";

                el+="</div>";
                el+="<div class='right-users-comment-time-line'>";

                    el+="<textarea class='textarea-timeline' placeholder='Tulis Komentar...'></textarea>";

                    el+="<div class='button-margin' align='right' style='margin-top:2%;'>";
                        el+="<a href='#' class='button-default js-send-timeline'>";
                            el+="Kirim";
                        el+="</a>";
                    el+="</div>";
                el+="</div>";

                el+="<div class='clearer'></div>";

            el+="</div>";
            
            return el;
        }
    },
    reviews :   {
        trainer :function(data){
            var el="";
            var totRating=0;
                        
            if(data.length > 0){
                
                $.each(data,function(i,e){
                    
                    var tgl=e.data.created_at.split(' ');                                        
                    totRating+=parseFloat(e.data.rating);
                    var creator=e.data.creator==null?"Public":e.data.creator;
                    var avatar=e.data.avatar==null?"assets/images/icon-avatar.png":e.data.avatar;
                    
                    el+="<div class='container-comments-left'>";
                        el+="<div class='images-user-review' style='background-image: url("+Global.BASE_URL()+avatar+")'>";

                        el+="</div>";
                    el+="</div>";
                    el+="<div class='container-comments-right'>";
                        el+="<div class='row'>";
                            el+="<div class='col-md-6 col-sm-6 col-xs-12'>";
                                el+="<div class='first-user'>"+creator.ucwords()+"</div>";
                                el+="<div class='readOnly position-read-only margin-right-read-only'></div>";
                                el+="<button class='info-rating-other margin-rating-order'>"+parseFloat(Math.round(e.data.rating * 100) / 100).toFixed(2)+"</button>"; 

                            el+="</div>";
                            el+="<div class='col-md-6 col-sm-6 col-xs-12'>";
                                el+="<div class='date-comments'>";
                                el+=Global.formatDateEngToIndo(tgl[0])+" "+tgl[1];
                                el+="</div>";
                            el+="</div>";
                        el+="</div>";
                        el+="<div class='title'>";
                            el+=e.data.title.ucwords();
                        el+="</div>";
                        el+="<div class='description'>";
                            el+=e.data.review;
                        el+="</div>";
                        
                        
                        //el+="<a href='#' class='button-comment js-button-comment-like' data-id='"+e.data.id+"' data-code='"+e.data.code+"'>Suka</a> ";
                        el+="<a href='#' class='button-comment js-button-comment-review' data-id='"+e.data.id+"' data-code='"+e.data.code+"'>Komentari </a> ";
                        
                        
                        el+="<div class='line-border'></div>";
                        
                        el+="<div class='js-div-box-comment-"+e.data.id+"'>"
                        //if(e.items.length > 0){
                        
                            //loop box comment
                            
                        //}
                        el+="</div>";
                        el+="<p>";
                        
                        el+="<div class='js-btn-comment-review comment-"+e.data.code+"' data-id='"+e.data.id+"' data-code='"+e.data.code+"'>";
                        
                            
                        el+="</div>";

                    el+="</div>";
                    el+="<div class='clearer'></div>";                    
                });
                            
            }else{
                el+="<div class='alert alert-danger' >";
                    el+="Tidak ada Ulasan";
                el+="</div>";
            }
            
            //update blade
                        
            
            $('.info-rating-other').text(parseFloat(Math.round(totRating * 100) / 100).toFixed(2));
            
            return el;
        },
        formComment :   function(index){
            var el="";
                
                el+="<form id='form-comment-"+index+"'>";
                    el+="<center class='js-img-loader displaynone'>";
                        el+="<img src='"+Global.BASE_URL()+"assets/images/fb-loader.gif'  style='width:50px;height:30px;'>";
                    el+="</center>";
                    
                    el+="<textarea class='textarea-default js-txt-comment-review' placeholder='Tulis komentar kamu' required></textarea>";
                el+="</form>";                
                el+="<div align='right'>";
                    el+="<a href='#' class='button-default js-btn-post-comment-review' data-code='"+index+"'>Kirim</a>";
                el+="</div>";
                el+="<p>";
                
            return el;
        },
        boxComment  :function(comment){
            
            var avatar  = Global.getCookie('myAvatar')==""?"assets/images/icon-avatar.png":Global.getCookie('myAvatar');
            
            var el="";
                el+="<div class='box-container-comments'>";                            
                    el+="<div class='sub-container-comments'>";
                        el+="<div class='sub-container-comments-left'>";
                            el+="<div class='sub-images-user-review' style='background-image: url("+Global.BASE_URL()+avatar+");'>";

                            el+="</div>";
                        el+="</div>";
                        el+="<div class='sub-container-comments-right'>";
                            el+="<div class='row'>";
                                el+="<div class='col-md-6 col-sm-6 col-xs-12'>";
                                    el+="<div class='sub-title-comment'>"+Global.getCookie('myFirstName').ucwords()+"</div>";
                                el+="</div>";
                                el+="<div class='col-md-6 col-sm-6 col-xs-12'>";
                                    el+="<div class='sub-date-comment'>";
                                    el+=Global.getNow();
                                    el+="</div>";
                                el+="</div>";
                            el+="</div>";
                            el+="<div class='sub-description'>";
                            el+=comment;
                            el+="</div>";
                        el+="</div>";
                        el+="<div class='clearer'></div>";
                    el+="</div>";


                el+="</div>";

                el+="<div class='clearer'></div>";
                            
            return el;
            
        }
    },
    Map :   function(){
      //code  
    },
    displayError    :   function(xy){
        var el="";
        el+="<h4>Opps.. terjadi kesalahan!</h4>";
        el+=xy;
        return el
    },
    displayTooltip    :   function(xy){
        
        var el="";
        
        if(Global.getCookie('myId') !=null ){
            el+="<h4>Halo.."+Global.getCookie('myFirstName').ucwords()+"</h4>";
        }else{
            el+="<h4>Halo..</h4>";
        }
        
        el+=xy;
        return el
    },
    renderNoContent   :   function(){
      
      var el="";
        el+="<div class='alert alert-warning'>";
            el+="<center>Tidak tersedia!</center>";
        el+="</div>";

      return el;
    },
    renderHtml  :   function(o,el,f){

        $(o).empty().html(el);
        f();

    },
}
