/*!
 * Like.js 0.1.0-dev
 * ©2017 Sababay Global Bali
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

    var Like = function (options) {
        var that = this;
        
        this.init = function(e) {
            this.each(function(index, elem) {
                /** Like id */
                var likeId = $(elem).attr('id');

                if (typeof(likeId) === undefined && !options.id) {
                    console.warn('Like element not defined');
                    return;
                }

                /* Check to see if we are re-initialising a like */
                var allSettings = Like.settings;
                for ( var i=0; i<allSettings.length; i++ ) {
                    var t = allSettings[i];
                    
                    /* Base check on like node */
                    if ( t.nLike == this || t.likeId == this.id ) {
                        console.warn('Cannot reinitialise Like');
                        return;
                    }                   
                }

                /* Create the settings object for this like and set some of the default parameters */
                var setting = $.extend( true, {}, Like.models.settings, {
                    "likeId" : options.id ? options.id : likeId,
                    "nCounter" : options.counter,
                    "type" : options.type,
                } );
                setting.nLike = this;
                allSettings.push( setting );

                /** Bind action to current node */
                _fnBindAction(this, setting, function(e) {

                });
            });
        },

        this.init();

        return this;
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
        $(n)
            .on( 'click', data, function (e) {
                e.stopPropagation();
                var $this   = $(this);

                if (!Global.checkSession(true)) {
                    return;
                }
                
                Global.prepareBtnPost($this);
                Global._setBrowserActivity("like_" + data.type, Global.b64DecodeUnicode(data.likeId));
                Global.param.code = data.likeId;

                Request.do('POST', Request.Like._set(), function() {
                    /** 
                     * 1 = Like
                     * 0 = Unlike
                     */
                    if (typeof(Request.response.like) !== undefined) {
                        if (Request.response.like) {
                            Global.afterBtnPost($this, 'Tidak Suka');

                            if (data.nCounter) 
                            	data.nCounter.incrementHtml();
                        } else {
                            Global.afterBtnPost($this, 'Suka');
                            if (data.nCounter) 
                            	data.nCounter.decrementHtml();
                        }
                    }

                    fn(e);
                });

                return false;
            } );
    }

    /**
     * Version string for plug-ins to check compatibility. Allowed format is
     * `a.b.c-d` where: a:int, b:int, c:int, d:string(dev|beta|alpha). `d` is used
     * only for non-release builds. See http://semver.org/ for more information.
     *  @member
     *  @type string
     *  @default Version number
     */
    Like.version = "0.1.0-dev";

    /**
     * Private data store, containing all of the settings objects that are
     * created for the likes on a given page.
     *
     *  @type array
     *  @default []
     *  @private
     */
    Like.settings = [];

    /**
     * Object models container, for the various models that Like has
     * available to it. These models define the objects that are used to hold
     * the active state and configuration of the like.
     *  @namespace
     */
    Like.models = {};

    /**
     * Like default settings object - this holds all the information needed for a
     * given like, including configuration and current application of the
     * like options.
     */
    Like.models.settings = {
        /**
         * Cache the like ID for quick access
         *  @type string
         *  @default null
         */
        "likeId": null,
    
        /**
         * The like node
         *  @type node
         *  @default null
         */
        "nLike": null,

        /**
         * The type type
         *  @type string
         *  @default null
         */
        "type" : null,

        /**
         * The like conuter node
         *  @type node
         *  @default null
         */
        "nCounter": null,
    };

    // jQuery access
    $.fn.like = Like;

    return $.fn.like;
}));