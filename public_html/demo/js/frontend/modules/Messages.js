/*!
 * Message.js 0.1.0-dev
 * ©2017 Sababay Global Bali
 */
var Messages = {
    activeModel: null,
    
    /**
     * Initialize
     * @return void
     */
	init: function() {
		var $message = $('#messages');

        $(".reply").click(function(){
            $(".box-action-messages").hide();
            $(".box-form-action-messages").show();
        });

        $(".delete-form-messages").click(function(){
            $(".box-action-messages").show();
            $(".box-form-action-messages").hide();
        }); 

		Messages._fnBindAction($message, function(e) {

        });
	},

	/**
     * Bind an event handers to allow a click or return key to activate the callback.
     * This is good for accessibility since a return on the keyboard will have the
     * same effect as a click, if the element has focus.
     *  @param {element} n Element to bind the action to
     *  @param {function} fn Callback function for when the event is triggered
     */
    _fnBindAction: function( n, fn ) {
        var $navPanel  = n.find('.view-centred-pills');
        var $navDetail = n.find('.view-menu-top-messages');
        var $navBack   = n.find('.back-to');
        var $navDelete = n.find('.delete-all');
        var $detail    = n.find('.view-detail-wrapper');
        var $active    = n.find('.messages-active-wrapper');
        var $item      = n.find('.view-box-messages');
        var rootCode   = null;

        n
            .on( 'click', '.view-box-messages', function (e) {
				var $this       = $(this);
				var messageRoot = $(this).attr('id');

                if (!Global.checkSession(true)) {
                    return;
                }

                $navPanel.hide();
                $navDetail.show();
                $detail.show();
        		$item.hide();

                // navigation back
                $navBack
                	.on('click', function(e) {
                		$navPanel.show();
                		$navDetail.hide();
                		$detail.hide();
                		$item.show();
                	});

                Global.showFbLoader();

                var $title  = $detail.find('.m-title-detail-box-messages');
                var $destinationName = $detail.find('.destination-name');

                // Reset
                Global.param = {};
                $title.text('');
                $destinationName.text('');
                $active.hide();
                $detail
                    .find('.collapse-wrapper')
                    .children()
                    .not('#template-messages-collapsed')
                    .remove();

                Request.do('POST', Request.Messages.get.byId(messageRoot), function() {
                    var response = Request.response;
                    $title.text(response.subject);
                    $destinationName.text(response.destination_name);
                    rootCode = response.root;

                    // delete conversation
                    $navDelete
                        .on('click', function(e) {
                            Global._setBrowserActivity("message_delete", rootCode);

                            Request.do('POST', Request.Messages.delete(rootCode, true), function() {
                                if (Request.response.success) {
                                    $navBack.trigger('click');
                                    location.reload();
                                }
                            });
                        });

                    $('.box-form-messages').attr('action', $('.box-form-messages').attr('action') + "/" + rootCode);

                    $.each(response.data, function(i, v) {
                        if (v.collapsed) {
                            $detail
                                .find('.collapse-wrapper')
                                .collapsed(v);
                        } else {
                            Messages.activeModel = v;
                            $active.active(v);
                        }            
                    });

                	Global.hideFbLoader();
                    fn(response);
                });
            })
            .on( 'submit', '.box-form-messages', function(e) {
                e.preventDefault();

                var $this   = $(this);
                var $btn    = $('#js-action-reply');
                var btnText = $btn.text();

                $this.parsley('validate');

                if ($this.parsley('isValid')) {
                    Global.prepareBtnPost($btn);
                    Global._setBrowserActivity("message_reply", rootCode);
                    Global.param.code    = rootCode;
                    Global.param.message = $('#reply-message').val();

                    Request.do('POST', Request.Messages.reply(rootCode), function() {
                        Global.afterBtnPost($btn, btnText);

                        if (Request.response.success) {
                            $detail
                                .find('.collapse-wrapper')
                                .collapsed(Messages.activeModel);
                            $active
                                .active(Request.response.data);

                            Messages.activeModel = Request.response.data;

                            $('#reply-message').val('');
                            Component.create.jbox.notif("Ahaa..", 'Pesan berhasil terkirim!', true);
                        } else {
                            Component.create.jbox.notif("Opps..","Terjadi kesalahan saat mengirim pesan!",false);
                        }

                        $this.parsley('reset');
                    });

                    return false;
                } else {
                }

                return false;
            });
    }
}

/**
 * Generating collapsed message
 * @param object message
 */
$.fn.collapsed = function(obj) {
    var $message = $('#template-messages-collapsed').clone();

    $message
        .data('code', obj.code)
        .removeAttr('id')
        .removeClass('hidden')
        .find('.m-box-user-messages')
        .append($('<img>', {
            'src': obj.avatar
        }));

    $message
        .find('.m-users-messages')
        .text(obj.fullname);

    $message
        .find('.m-box-date-messages')
        .find('span')
        .text(obj.timestamp);

    $message
        .find('.m-email-destination')
        .find('span')
        .text(obj.destination);

    $message
        .find('.m-detail-content-messages')
        .text(obj.preview);

    $message
        .find('.m-full-content-messages')
        .text(obj.message);

    $message
        .find('.js-action-delete')
        .on('click', function() {
            var $parent = $(this).closest('.m-box-messages');
            Global._setBrowserActivity("message_delete", obj.code);

            Request.do('POST', Request.Messages.delete($parent.data('code'), false), function() {
                if (Request.response.success) {
                    $parent.remove();
                }
            });

            return false;
        });

    $message
        .on('click', function() {
            $(this).find(".m-full-content-messages, .m-detail-content-messages, .m-email-destination").toggle();
        });

    $(this).append($message);
};

/**
 * Generating active message
 * @param object message
 */
$.fn.active = function(obj) {
    var $this = $(this);

    $this
        .find('.m-box-user-messages')
        .append($('<img>', {
            'src': obj.avatar
        }));

    $this
        .find('.m-users-messages')
        .text(obj.fullname);

    $this
        .find('.m-box-date-messages')
        .find('span')
        .text(obj.timestamp);

    $this
        .find('.m-email-destination-root')
        .text(obj.destination);

    $this
        .show()
        .find('.m-full-content-messages-root')
        .text(obj.message);
}