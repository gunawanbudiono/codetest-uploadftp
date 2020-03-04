/*!
 * Trainer.js 0.1.0-dev
 * ©2017 Sababay Global Bali
 *
 * Require: 
 * Like.js
 * Follow.js
 */

(function( factory ) {
	"use strict";

	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		module.exports = function (root, $) {
			if ( ! root ) {
                            // CommonJS environments without a window global must pass a
                            // root. This will give an error otherwise
                            root = window;
			}

			if ( ! $ ) {
                            $ = typeof window !== 'undefined' ? // jQuery's factory checks for a global window
                            require('jquery') :
                            require('jquery')( root );
			}

			return factory( $, root, root.document );
		};
	}
	else {
		// Browser
		factory( jQuery, window, document );
	}
} (function( $, window, document, undefined ) {
	"use strict";

	var Trainer = function (options) {                
		var that = this;
                this.selectedId = Global.b64DecodeUnicode($('.container-detail').attr('id'));                                
                this.rate= 0;
                this.parent=0;
                this.is_root=1;
                this.ReviewId=0;
		
		this.init = function(e) {
                                          
                    Map.viewDefault('map-view',function(){});//show trainer map location

                    that.handler();

                    this.each(function(index, elem) {
                            /** Trainer id */
                            var trainerId = $(elem).attr('id');

                            if (typeof(trainerId) === undefined) {
                                    console.warn('Trainer element not defined');
                                    return;
                            }

                            /* Check to see if we are re-initialising a trainer */
                            var allSettings = Trainer.settings;
                            for ( var i=0; i<allSettings.length; i++ ) {
                                    var t = allSettings[i];

                                    /* Base check on trainer node */
                                    if ( t.nTrainer == this || t.trainerId == this.id ) {
                                            console.warn('Cannot reinitialise Trainer');
                                            return;
                                    }					
                            }

                            /* Create the settings object for this trainer and set some of the default parameters */
                            var setting = $.extend( true, {}, Trainer.models.settings, {
                                    "trainerId": trainerId
                            } );
                            setting.nTrainer = this;
                            allSettings.push( setting );

                            /** Bind action to current node */
                            _fnBindAction(this, {id: trainerId}, function(e) {

                            });
                    });
		},                                        
                
                this.property   =   function(id,f){
                    
                    Request.do('GET',Request.Person.profile.id(id,'json'),function(){
                        
                        f();
                    });
                }
                
                this.render =   function(data){
                                        
                    var reviews = data.reviews;                    
                    
                    $('.js-reviews-count').text(reviews.length);
                    
                    //render reviews
                    $('.js-container-reviews').empty().html(Render.reviews.trainer(reviews));
                    that.handler();
                    
                }
                
                this.setParam   = function(){
                    
                    Global._setBrowserActivity('trainer_review',that.selectedId);
                    Global.param.code = Global.b64EncodeUnicode(that.selectedId);
                    Global.param.i_user = Global.getCookie('myId')==''?Global.myPublicId():Global.b64EncodeUnicode(Global.getCookie('myId'));
                    Global.param.is_root = that.is_root;
                    Global.param.i_parent = that.parent;
                    Global.param.title = Global.b64EncodeUnicode($('.js-txt-title-review').val());
                    Global.param.review = Global.b64EncodeUnicode($('.js-txt-description-review').val());                            
                    Global.param.rating = Global.ratyVal;
                    
                }
                
                this.handler  = function(){
                    /*
                    that.property(Global.b64EncodeUnicode(that.selectedId),function(){
                        
                        
                        
                    });
                    */
                                        
                    $('.js-txt-what-in-mind').off().on('click',function(){ //what is in your mind by session
                                                
                        Map.bindSearch('js-txt-event-address');
                        
                        $('#timelineModal').modal({backdrop: 'static', keyboard: false}).on('shown.bs.modal', function(e) {
                            
                            $('.js-txt-what-in-mind-modal').focus();
                            
                            
                        }).on('hidden.bs.modal', function(e) {



                        });
                        
                    });
                    
                    $('.js-btn-modal-review').off().on('click',function(){
                                                
                        $('.js-txt-title-review').val('');
                        $('.js-txt-description-review').val('');
                            
                        $("#postReviewModal").modal({backdrop:'static',keyboard:false}).on('shown.bs.modal', function(e) {
                            that.parent=0;
                            that.is_root=1;
                            Form.reset();

                        }).on('hidden.bs.modal', function(e) {                           

                        });            

                        return false; 

                    });
                                        
                    $('.js-btn-post-review').off().on('click',function(){

                        $('#js-form-review').parsley('validate');

                        if($('#js-form-review').parsley('isValid')){
                                                                                                                          
                                                        
                            if(Global.param.rating != 0){
                                
                                Global.prepareBtnPost($(this));
                                that.setParam();
                                
                                that.setReview(function(){

                                    Global.afterBtnPost($('.js-btn-post-review'),'Kirim');
                                    $("#postReviewModal").modal('hide');                                                                

                                    that.render(Request.response);                                

                                    Component.create.jbox.notif('Ahaa...','Terimakasih atas ulasan anda',true);
                                });
                                
                            }else{
                                
                                Component.create.jbox.notif('Opps...','Mohon berikan rating',false);
                                
                            }
                        }

                        return false; 

                    });
                    
                    
                    $.each($('.js-button-comment-like'),function(i,e){
                        
                        $(e).off().on('click',function(){
                           var code = $(e).data('code');
                                                                         
                           console.log('Post like for this reviews '+code);
                           
                           return false;
                           
                       }); 
                    });
                    
                    $.each($('.js-button-comment-review'),function(i,e){
                        
                        $(e).off().on('click',function(){
                            
                            var id = $(e).data('id');
                            var code = $(e).data('code');
                            
                            that.ReviewId = id;
                            that.is_root=0;
                            that.parent=code;
                                                                         
                            $('.js-btn-comment-review').empty();
                           
                            $('.js-btn-comment-review').eq(i).html(Render.reviews.formComment(code));
                            $('.js-txt-comment-review').eq(i).focus();
                           
                            Component.moveDomToCenter('.js-txt-comment-review')
                           
                            that.handler();
                           
                           return false;
                           
                        });
                        
                    });                                                                                  
                    
                    $.each($('.js-btn-post-comment-review'),function(i,e){
                        
                       $(e).off().on('click',function(){
                           
                           var i_parent = $(e).data('code');
                           var comment = $('.js-txt-comment-review').eq(i).val();
                                                                                 
                           if(comment != ""){
                               
                               // post comment now
                               that.setParam();
                               
                               Request.doWithLoading('POST',Request.Reviews.post(),function(){
                                   //after success
                                    $('.js-img-loader').hide('1000');
                                    $('.js-btn-comment-review').empty();//hide form comment

                                    $('.js-div-box-comment-'+that.ReviewId).append(Render.reviews.boxComment(comment));
                                   
                               });
                                                              
                               
                           }else{
                               
                               Component.create.jbox.tooltip('Opps..','Anda belum memberikan komentar!',false);
                               
                           }
                                                      
                           
                           return false;
                           
                       }); 
                    });
                }
                
                this.setReview  =   function(f){
                    
                    Request.do('POST',Request.Reviews.post(),function(){
                        
                        f(); 
                    });
                }
                
                
        
		this.init();

		return this;
	}

	/**
	 * Increment operation to selected node.
	 * This node will incrementing self value by text selector
	 * @param {element} n Element to increment operation
	 */
	$.fn._increment = function() {
		$(this).text(
			parseInt($(this).text(), 10) + 1
		);
	}

	/**
	 * Decrement operation to selected node.
	 * This node will decrementing self value by text selector
	 * @param {element} n Element to decrement operation
	 */
	$.fn._decrement = function() {
		$(this).text(
			parseInt($(this).text(), 10) - 1
		);
	}
	/**
	 * Bind an event handers to allow a click or return key to activate the callback.
	 * This is good for accessibility since a return on the keyboard will have the
	 * same effect as a click, if the element has focus.
	 *  @param {element} n Element to bind the action to
	 *  @param {object} data Data object to pass to the triggered function
	 *  @param {function} fn Callback function for when the event is triggered
	 */
	function _fnBindAction( n, data, fn ) {
		var $this = $(n);

		$this
			.find('.js-action-follow')
			.first() // fixed recall on nested container
			.follow({
				"id" : data.id, 
				"type" : "trainers",
				"counter" : $this.find('.js-value-follow'),
				"following" : {
					"wrapper" : $this.find('#sample-profile'),
					"avatar" : ".users-trainer",
					"name" : ".name-profile",
					"profession" : ".profesi-profile",
					"join" : ".join-date-profile",
					"follow_button" : ".js-action-follow",
				},
			});

		$this
			.find('.js-action-like')
			.first()
			.like({
				"id" : data.id, 
				"type" : "trainers",
				"counter" : $this.find('.js-value-like')
			});
                                        
	}

	/**
	 * Version string for plug-ins to check compatibility. Allowed format is
	 * `a.b.c-d` where: a:int, b:int, c:int, d:string(dev|beta|alpha). `d` is used
	 * only for non-release builds. See http://semver.org/ for more information.
	 *  @member
	 *  @type string
	 *  @default Version number
	 */
	Trainer.version = "0.1.0-dev";

	/**
	 * Private data store, containing all of the settings objects that are
	 * created for the trainers on a given page.
	 *
	 *  @type array
	 *  @default []
	 *  @private
	 */
	Trainer.settings = [];

	/**
	 * Object models container, for the various models that Trainer has
	 * available to it. These models define the objects that are used to hold
	 * the active state and configuration of the trainer.
	 *  @namespace
	 */
	Trainer.models = {};

	/**
	 * Trainer default settings object - this holds all the information needed for a
	 * given trainer, including configuration and current application of the
	 * trainer options.
	 */
	Trainer.models.settings = {
		/**
		 * Cache the trainer ID for quick access
		 *  @type string
		 *  @default null
		 */
		"trainerId": null,
	
		/**
		 * The trainer node
		 *  @type node
		 *  @default null
		 */
		"nTrainer": null,
	};

	// jQuery access
	$.fn.trainer = Trainer;        

	return $.fn.trainer;
}));