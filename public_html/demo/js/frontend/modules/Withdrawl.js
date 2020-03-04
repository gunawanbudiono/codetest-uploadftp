var Withdrawl={
    data    :   [],
    default :   function(){
        var $this = this;
        $('.form-withdrawl').hide();
        $('.view-withdrawl').show();
        
        var dateToday = new Date();

        $('#js-txt-date-withdrawl').datetimepicker({
            format: 'DD-MM-YYYY',
            showClose   :   true,
            ignoreReadonly: true,
            minDate: dateToday,
        });
    },
    init    :   function(){
        var $this = this;
        
        $this.default();
        $this.handler();
    },
    handler :function(){
        var $this = this;
        
        $('.js-action-withdrawl').off().on('click', function() {
            var id = $(this).data('id');

            Request.do('GET', Request.Withdrawl.get(id), function() {
                var response = Request.response;
                var $table   = $('#js-table-withdrawl');
                var $modal   = $('#invoice-item-modal');
                var $date    = $('#js-txt-date-withdrawl');
                var $note    = $('#js-txt-description-withdrawl');
                var $account = $('#js-txt-account-withdrawl');
                var $save    = $('.js-save-withdrawl');

                if (response.accounts.length == 0) {
                    Component.create.jbox.notif('Opps..', 'Mohon lengkapi data rekening Anda!', false);
                    return false;
                }

                $('#js-txt-event-withdrawl').val(response.event);

                $date.val('');
                $note.val('');
                $table.find('tbody').children().remove();
                $account.children().remove();

                $.each(response.accounts, function(index, account) {
                    $('<option/>', {
                        'html': account,
                        'value': index
                    }).appendTo($account);
                });

                $.each(response.invoices, function(index, column) {
                    var $lastRow = $('<tr/>').appendTo($table.find('tbody:last'));
                    var $detail     = $('<button/>', {
                        'html': 'Invoice',
                        'class': 'btn btn-xs btn-default',
                    });

                    $detail.on('click', function(e) {
                        $modal.find('tbody').children().remove();
                        $modal.find('.modal-title').text('');

                        $.each(column.items, function(index, item) {
                            $modalRow = $('<tr/>').appendTo($modal.find('tbody:last'));
                            $modalRow.append($('<td/>').text(item.item));
                            $modalRow.append($('<td/>').text(item.qty));
                            $modalRow.append($('<td/>').text(item.amount));
                        });

                        $modal.find('.modal-title').text(column.invoice);
                        $('#invoice-item-modal').modal('show');
                    });

                    $lastRow.append($('<td/>').text(column.invoice));
                    $lastRow.append($('<td/>').text(column.quantity));
                    $lastRow.append($('<td/>').text(column.amount));
                    $lastRow.append($('<td/>').text(column.status));
                    $lastRow.append($('<td/>').html($detail));
                });

                if (response.withdrawal) {
                    $date.val(response.withdrawal.date_request);
                    $note.val(response.withdrawal.note);
                    $account.val(response.withdrawal.account);
                    $save.text('Edit Pengajuan');
                    $save.show();

                    if (response.withdrawal.is_approved) {
                        $date.attr('disabled', 'disabled');
                        $note.attr('disabled', 'disabled');
                        $account.attr('disabled', 'disabled');
                        $save.hide();
                    }
                } else {
                    $date.removeAttr('disabled');
                    $note.removeAttr('disabled');
                    $save.text('Ajukan');
                    $save.show();
                }

                $save.off().on('click', function() {
                    var $this = $(this);

                    Global.prepareBtnPost($this);
                    Global._setBrowserActivity("withdrawl_request", Global.b64DecodeUnicode(id));
                    Global.param.date    = $('#js-txt-date-withdrawl').val();
                    Global.param.account = $('#js-txt-account-withdrawl').val();
                    Global.param.note    = $('#js-txt-description-withdrawl').val();

                    Request.do('POST', Request.Withdrawl.post(id), function() {
                        Global.afterBtnPost($this, 'Ajukan')

                        if (Request.response.success) {
                            Component.create.jbox.notif("Ahaa..", 'Withdrawal berhasil terkirim!', true);
                            $('.js-cancel-withdrawl').trigger('click');
                        } else {
                            Component.create.jbox.notif("Opps..", 'Terjadi kesalahan saat mengirim withdrawal!',false);
                        }
                    });
                });

                $('.form-withdrawl').show();
                $('.view-withdrawl').hide();
            });
        });
        
        $('.js-cancel-withdrawl').off().on('click',function(){
            $this.default();
            return false;
        });
    }
}