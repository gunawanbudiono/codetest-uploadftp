
var Component  =   {
    init    :   function(){
            
    },
    moveDomToCenter :   function(o){
        $('html, body').animate({
            scrollTop: ($(o).offset().top)-200
        }, 700);
    },
    _getBreadChrumb :function(s){
        
        var $this= this;
        var el="";
      
        el+="<ul class='breadcrumb-page'>";
            el+="<li>";
                el+="<a href='#'>Beranda</a>";
            el+="</li>";
            el+="<li>"+s.ucwords()+"</li>";
        el+="</ul>";

        $('.historycal-page').empty().html(el);
        
    },
    _getAlertContainer    :   function(t){
        var $this = this;
        
        var el="<div class='row' style='margin-top:3%;;'>";
                    
            el+="<div class='col-md-2'>";
                el+="<img src='"+Global.logo()+"' style='width:500px;'/>";
            el+="</div>";
            
            el+="<div class='col-md-8' style='font-size:12px;'>";
                el+="<strong>"+t+"</strong>";
            el+="</div>";
        el+="</div>";
            
        return el;
        
    },
    _getIcon    :   function(t){
        
        var $this=this;
        
        var icon;
                
        switch(t){

            case "danger":

                icon='fa fa-danger';

            break;

            case "warning":

                icon='fa fa-warning';

            break;

            case "success":

                icon='fa fa-check-circle';

            break;
            case "question":

                icon='fa fa-question-circle';

            break;

        }

        return icon;        
        
    },
    create  :   {
        jbox    :   {
            modal   :   function(t,c,o){
                new jBox('Modal', {
                    attach          : o,
                    width           : 350,
                    height          : 200,
                    blockScroll     : false,
                    animation       : 'zoomIn',
                    draggable       : 'title',
                    closeButton     : true,
                    title           : t,
                    content         : c,                    
                    overlay         : false,
                    reposition      : false,
                    repositionOnOpen: true
                  });
            },
            confirm :   function(t,c){
                new jBox('Confirm', {
                    content         : c,
                    cancelButton    : 'Tidak',
                    confirmButton   : 'Ya'
                });
            },
            tooltip :   function(t,c,s,o){
                                             
                new jBox('Tooltip', {
                    attach          : o,                    
                    theme           : 'TooltipBorder',
                    trigger         : 'click',                    
                    width           : 'auto',                    
                    height          : 'auto',
                    adjustTracker   : true,
                    closeOnClick    : 'body',
                    closeOnEsc      : true,
                    animation       : 'move',                    
                    closeButton     : true,
                    audio           : s?Global.BASE_ASSETS()+'lib/jbox/audio/bling2':Global.BASE_ASSETS()+'lib/jbox/audio/blop',
                    position: {
                        x: 'right',
                        y: 'center'
                    },
                    outside         : 'x',                    
                    content         : c,
                    onOpen          : function() {


                    },
                    onClose: function() {


                    }
              });
            },            
            notif  :   function(t,c,s){
                            
                new jBox('Notice', {
                    color           : s?"green":'red',
                    audio           : s?Global.BASE_ASSETS()+'lib/jbox/audio/bling2':Global.BASE_ASSETS()+'lib/jbox/audio/blop',                        
                    stack           : false,                        
                    animation       : {
                      open: 'slide',
                      close: 'zoomIn'
                    },
                    title           :   t,
                    content         :   c,                
                    delayOnHover    :   true,
                    showCountdown   :   true,
                    autoClose       :   '5000',
                    closeButton     :   true
                });
                                
            },
            withAction  :   function(c){
                                
                new jBox('Notice', {
                    animation       : 'flip',
                    color           : 'blue',
                    audio           : Global.BASE_ASSETS()+'lib/jbox/audio/bling2',
                    attributes: {
                        x: 'right',
                        y: 'top'
                    },                    
                    content         : c,
                    //autoClose       : false,
                    delayOnHover    : true,
                    showCountdown   : true,
                    closeButton     : true
                });
            },
            info    :   function(c,s){
                
                new jBox('Notice', {
                    theme: 'NoticeFancy',
                    attributes: {
                      x: 'left',
                      y: 'bottom'
                    },
                    color       : s?"green":'red',
                    content     : c,
                    audio       : Global.BASE_ASSETS()+'lib/jbox/audio/bling2',
                    volume      : 80,
                    animation   : {open: 'slide:bottom', close: 'slide:left'},
                    delayOnHover: true,
                    showCountdown: true,
                    closeButton: true
              });
  
            }
        },
        image   :   {
            notif   :   {
                success   :   function(){
                    return Global.BASE_URL()+"assets/img/icon-check.png";
                },
                error   :   function(){
                    return Global.BASE_URL()+"assets/img/icon-remove.png";
                }

            }
        },
        modal   :   function(p){
            
            var $this=this;
            var legend = p.legend!=undefined?p.legend:"";
            var title = p.legend!=undefined?p.title:p.title;
            var showLegend = p.showLegend!=undefined?p.showLegend:true;
                        
            if(title==undefined)title="";
            
            var el="";
            
            el+="<div class='modal fade' id='myModal' role='dialog' data-backdrop='static' data-keyboard='false'>";
                el+="<div class='modal-dialog'>";
                    el+="<div class='modal-content'>";
                        if(showLegend){
                            
                            el+="<div class='modal-header'>";
                                el+="<button type='button' class='close' data-dismiss='modal'>&times;</button>";
                                el+="<fieldset class='fieldset'>";
                                    el+="<div align='center'>";
                                        el+="<legend class='legend'>"+legend+"</legend>";
                                    el+="</div>";
                                el+="</fieldset>";
                            el+="</div>";
                        
                        }
                        el+="<div class='modal-body margin-modal-body container-message'>";
                            el+="<div class='row'>";
                                el+="<div class='col-sm-12'>";
                                    el+="<div class='modal-form'>";
                                        el+="<div class='title-modal'>";
                                            el+=title;
                                        el+="</div>";
                                    el+="</div>";
                                el+="</div>";
                            el+="</div>";

                            el+="<div id='modal-content'>";
                                el+=p.content;
                                                                                                
                            el+="</div>";
                            
                            el+="<div id='div_cont_progress'></div>";
                            el+="<div id='div_cont_error_validation'></div>";
                                
                            el+="<div align='center'>";
                                if(p.buttons!=undefined){
                                    if(p.buttons.length > 0){
                                        $.each(p.buttons,function(i,e){
                                            el+="<a href='#' id='"+e.id+"' class='btn btn-"+e.type+"'>"+e.label+"</a> "; 
                                        });
                                    }                                
                                }else{
                                    
                                    el+="<div class='close-modal' data-dismiss='modal'>CLOSE</div>";
                                }
                            el+="</div>";

                            el+="<div class='clearer'></div>";

                        el+="</div>";  
                    el+="</div>";
                el+="</div>";
            el+="</div>";

            
            $(el).appendTo('body');
            $('#myModal').modal('show');
            
            
        },
        notify  :   function(ti,te,err){
            var $this = this;
            
            $.notifier({                    
                "message"       :!err?"<span class='glyphicon glyphicon-ok'></span> "+ti+", "+te:"<span class='glyphicon glyphicon-remove'></span> "+ti+", "+te,
                "color1"        :"white",   //background color of the notification bar  
                "color2"        :"black",   //color of the text 
                "closeButton"   :"close",   //shows a textual close button rather than a cross sign button.                 
                //"delay":3   //when to show the notification from trigger point (in seconds) 
            }); 
                
        },
        popover :   function(o,t,c,f){
            $(o).popover({
                title       :   t,
                content     :   c,
                container   :   'body',
                placement   :   'right',
                html        :   true,                
                //template    :   tpl bikin dulu template popover nya
            });

            $(this).popover('show');
            f();
                        
        },
        progress    :   function(p,f){
            var $this=this;                                    
            var el="";
            
            $('#div_progressbar').remove();
            
            el+="<div id='div_progressbar'>";
                            
                el+="<div class='row'>";
                    el+="<div class='col-md-12'>";
                        
                        el+="<div class='alert alert-warning'>";
                            el+="<label id='lbl_pg_bar'>"+p.title+"</label>";

                            el+="<div class='progress'>";
                                el+="<div class='progress-bar progress-bar-striped' role='progressbar'  aria-valuenow='0' aria-valuemin='0' aria-valuemax='100' id='prg_bar'>";

                                el+="</div>";
                            el+="</div>";
                        el+="</div>";

                    el+="</div>";
                el+="</div>";

            el+="</div>";
            
            $(el).appendTo($(p.appendTo));
            
            $('#div_cont_progress').show();
            $('#js-div-cont-error-validation').show();
            
            f();
        },
        panel   :   function(p){
            var el="";                        
            
            el+="<div class='panel panel-"+p.type+" myPanel' >";
                el+="<div class='panel-heading'>";
                    el+=p.title;
                el+="</div>";
                el+="<div class='panel-body'>";
                    el+=p.content;
                el+="</div>";
            el+="</div>";
            return el;
        },
        notification  :   function(){
            
            var el="<div>";
            
                el+="<div id='myNotif' class='row' sytle='z-index:0;'>";
                    el+="<div class='col-md-4'>";
                        el+="DIMANA SAJA";
                    el+="</div>";
                    
                    el+="<div class='col-md-8'>";
                        el+="DIMANA SAJA";
                    el+="</div>";
                    
                el+="</div>";
            el+="</div>";
            
            $(el).appendTo('body');
                        
            $('#myNotif').show();
            
        },
        confirm :   {
            action  :   function(p,f){
                                
                $.confirm({
                    title       : p.title,
                    content     : p.content,
                    icon        : Component._getIcon(p.type),
                    animation   : 'none',
                    modal       :   true,                    
                    buttons: {                        
                        Ya: {
                            text    : typeof(p.confirmButton) == undefined ? 'Ya,Ubah data ini!' : p.confirmButton,
                            btnClass: 'btn-danger',
                            action: function () {
                                f();                            
                            }
                        },
                        batal: function (){
                            
                            
                        }
                    }
                });
            },
            draggable :   function(p,f){
                
                
                $.alert({
                    title           : p.title,
                    content         : p.content,
                    icon            : Component._getIcon(p.type),
                    type            : 'red',
                    animation       : 'scale',
                    draggable       : true,
                    dragWindowBorder: false,
                });

                f();
            },
            autoClose   :   function(p,f){                
                
                $.confirm({
                    title       : p.title,
                    content     : p.content,
                    icon        : Component._getIcon(p.type),
                    animation   : 'scale',
                    closeAnimation: 'zoom',
                    autoClose   : 'cancelAction|5000',
                    escapeKey   : 'cancelAction',
                    buttons: {
                        confirm: {
                            btnClass: 'btn-red',
                            text    : 'Hapus',
                            action: function () {
                                
                                f();
                                //$.alert('You deleted Ben\'s account!');
                            }
                        },
                        cancelAction: {
                            text: 'Batal',
                            action: function () {
                                //$.alert('Ben just got saved!');
                            }
                        }
                    }
                });
            }
            
        },
        iosOverlay  :function(){
            var opts = {
        		lines: 13, // The number of lines to draw
        		length: 11, // The length of each line
        		width: 5, // The line thickness
        		radius: 17, // The radius of the inner circle
        		corners: 1, // Corner roundness (0..1)
        		rotate: 0, // The rotation offset
        		color: '#FFF', // #rgb or #rrggbb
        		speed: 1, // Rounds per second
        		trail: 60, // Afterglow percentage
        		shadow: false, // Whether to render a shadow
        		hwaccel: false, // Whether to use hardware acceleration
        		className: 'spinner', // The CSS class to assign to the spinner
        		zIndex: 2e9, // The z-index (defaults to 2000000000)
        		top: 'auto', // Top position relative to parent in px
        		left: 'auto' // Left position relative to parent in px
            };
            
            var target = document.createElement("div");
            document.body.appendChild(target);
            var spinner = new Spinner(opts).spin(target);
            var overlay = iosOverlay({
                    text: "Loading",
                    spinner: spinner
            });

            window.setTimeout(function() {
                overlay.update({
                    icon: Global.BASE_ASSETS()+"images/check.png",
                    text: "Success"
                });
            }, '500');

            window.setTimeout(function() {
                overlay.hide();
            }, '500');
        }
    },
    show    :   {
        FBLoader    :   function(o){
            var el="";
            
            $('#FB-loader').remove();
            
            el+="<center id='FB-loader' >";
                el+="<img src='"+Global.BASE_ASSETS()+"images/fb-loader.gif' style='width:75px;height:50px;'/>";
            el+="</center>";
            
            $(o).append(el);
        }
    },
    kill    :   function(o){
        $(o).remove();
    }
}
