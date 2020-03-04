/*!
 * Follow.js 0.1.0-dev
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

    var Follow = function (options) {
        var that = this;
        
        this.init = function(e) {
            this.each(function(index, elem) {
                /** Follow id */
                var followId = $(elem).attr('id');

                if (typeof(followId) === undefined && !options.id) {
                    console.warn('Follow element not defined');
                    return;
                }

                /* Check to see if we are re-initialising a follow */
                var allSettings = Follow.settings;
                for ( var i=0; i<allSettings.length; i++ ) {
                    var t = allSettings[i];
                    
                    /* Base check on follow node */
                    if ( t.nFollow == this || t.followId == this.id ) {
                        console.warn('Cannot reinitialise Follow');
                        return;
                    }                   
                }

                /* Create the settings object for this follow and set some of the default parameters */
                var setting = $.extend( true, {}, Follow.models.settings, {
                    "followId" : options.id ? options.id : followId,
                    "nCounter" : options.counter,
                    "following" : options.following,
                    "type" : options.type,
                } );
                setting.nFollow = this;
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
                Global._setBrowserActivity("follow_" + data.type, Global.b64DecodeUnicode(data.followId));
                Global.param.code = data.followId;

                Request.do('POST', Request.Follow._set(data.followId), function() {
                    var response  = Request.response;
                    var following = data.following;

                    /** 
                     * 1 = Follow
                     * 0 = Unfollow
                     */
                    if (typeof(response.follow) !== undefined) {
                        if (response.follow) {
                            Global.afterBtnPost($this, 'Unfollow');
                            
                            if(data.nCounter) {
                                data.nCounter.incrementHtml();
                            }

                            if(following && typeof(following.wrapper) !== undefined) {
                                var $clone = following
                                    .wrapper
                                    .clone()
                                    .attr("id", response.id);
                                $clone
                                    .find(following.avatar)
                                    .css('background-image', 'url(' + response.avatar + ')');
                                $clone
                                    .find(following.join)
                                    .text(response.joined);
                                $clone
                                    .find(following.name)
                                    .text(response.display_name);
                                $clone
                                    .find(following.profession)
                                    .text(response.profession);

                                if (!response.action_button) {
                                    $clone
                                        .find(following.follow_button)
                                        .removeClass('js-action-follow')
                                        .text('Following');
                                } else {
                                    $clone
                                        .find(following.follow_button)
                                        .text(response.follow ? 'Unfollow' : 'Follow');
                                }

                                following.wrapper.parent().prepend($clone);
                                $clone.show();
                            }
                        } else {
                            Global.afterBtnPost($this, 'Follow');

                            if(data.nCounter) {
                                data.nCounter.decrementHtml();
                            }

                            if(following && typeof(following.wrapper) !== undefined) {
                                // https://api.jquery.com/category/selectors/
                                // JQuery not support css selector with special character 
                                var $follow = following
                                    .wrapper
                                    .parent()
                                    .find($(document.getElementById(response.id)))
                                    .remove();
                            }
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
    Follow.version = "0.1.0-dev";

    /**
     * Private data store, containing all of the settings objects that are
     * created for the follows on a given page.
     *
     *  @type array
     *  @default []
     *  @private
     */
    Follow.settings = [];

    /**
     * Object models container, for the various models that Follow has
     * available to it. These models define the objects that are used to hold
     * the active state and configuration of the follow.
     *  @namespace
     */
    Follow.models = {};

    /**
     * Follow default settings object - this holds all the information needed for a
     * given follow, including configuration and current application of the
     * follow options.
     */
    Follow.models.settings = {
        /**
         * Cache the follow ID for quick access
         *  @type string
         *  @default null
         */
        "followId": null,
    
        /**
         * The follow node
         *  @type node
         *  @default null
         */
        "nFollow": null,

        /**
         * The type type
         *  @type string
         *  @default null
         */
        "type" : null,

        /**
         * The follow counter node
         *  @type node
         *  @default null
         */
        "nCounter": null,

        /**
         * The list of followings profile assets
         *  @type object
         *  @default null
         */
        "following": null,
    };

    // jQuery access
    $.fn.follow = Follow;

    return $.fn.follow;
}));