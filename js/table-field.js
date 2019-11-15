(function ($) {
    $.entwine('ss', function ($) {
        $.entwine('tablefield', function ($) {
            var me = this;

            $('.tablefield-input').entwine({
                onmatch: function () {
                    me.loadValues();
                    me.updateValue();
                }
            });

            $('.tablefield-input button[data-action="addrow"]').entwine({
                onclick: function () {
                    me.addRow();
                }
            });

            $('.tablefield-input button[data-action="addcol"]').entwine({
                onclick: function () {
                    me.addCol();
                }
            });


            $('.tablefield-input button[data-action="removerow"]').entwine({
                onclick: function () {
                    me.removeRow($(this));
                }
            });


            $('.tablefield-input button[data-action="removecol"]').entwine({
                onclick: function () {
                    me.removeCol($(this));
                }
            });

            $('.tablefield-input textarea').entwine({
                onchange: function () {
                    me.updateValue();
                }
            });

            /**
             * updates the row numeration
             */
            this.updateRowIndex = function () {
                var me = this,
                    $table = me.getTable(),
                    $dataRows = $table.find('tbody tr.data-row');

                $dataRows.each(function (index) {
                    $(this).find('td:first-child').find('.index').html(index + 1);
                });
            };

            /**
             * updates the col alphabetical numeration
             */
            this.updateColIndex = function () {
                var me = this,
                    $table = me.getTable(),
                    $headCols = $table.find('thead tr td:not(:first-child)');

                $headCols.each(function (index) {
                    $(this).attr('data-number', index + 1);
                    $(this).find('.index').html(me.numToChars(index + 1));
                });
            };

            /**
             * convert a number to a char (1 to A, ... 26 to Z)
             * @param num
             * @returns {string}
             */
            this.numToChars = function (num) {
                "use strict";
                var mod = num % 26,
                    pow = num / 26 | 0,
                    out = mod ? String.fromCharCode(64 + mod) : (--pow, 'Z');
                return pow ? toLetters(pow) + out : out;
            };

            /**
             * adds a new row to the table
             */
            this.addRow = function () {
                var me = this,
                    $table = me.getTable(),
                    $lastRow = $table.find('tbody tr.data-row:last'),
                    $newRow = $lastRow.clone();

                //clear content
                $newRow.find('td:first').find('.index').html('#');
                $newRow.find('textarea').each(function () {
                    $(this).val('');
                });

                $lastRow.after($newRow);

                me.updateRowIndex();
                me.updateValue();
            };

            /**
             * adds a new row to the table
             */
            this.removeRow = function (item) {
                var me = this,
                    $row = $(item).parents('tr').first();

                $row.remove();
                me.updateRowIndex();
                me.updateValue();
            };

            /**
             * ass a new columns to the table
             */
            this.addCol = function () {
                var me = this,
                    $table = me.getTable(),
                    $headerRows = $table.find('thead tr'),
                    $newHeaderCol = $table.find('thead tr td:nth-child(2)').clone(),
                    $dataRows = $table.find('tbody tr.data-row'),
                    $lastCols = $table.find('tr td:last'),
                    $newCol = $($lastCols[0]).clone();

                //update header
                $newHeaderCol.find('.index').html('#');
                $headerRows.each(function (index) {
                    $(this).append($newHeaderCol);
                });

                //update body
                $newCol.find(' textarea').val('');
                $dataRows.each(function (index) {
                    var $clone = $newCol.clone();
                    $(this).append($clone);
                });

                me.updateColIndex();
                me.updateValue();
            };

            /**
             * adds a new row to the table
             */
            this.removeCol = function (item) {
                var me = this,
                    $table = me.getTable(),
                    $col = $(item).parents('td').first(),
                    childToRemove = parseInt($col.attr('data-number')),
                    $rows = $table.find('tr');

                if (childToRemove === 0) {
                    return;
                }

                $rows.each(function (index) {
                    $(this).find('td:nth-child(' + (childToRemove + 1) + ')').remove();
                });

                me.updateColIndex();
                me.updateValue();
            };

            /**
             * returns the table
             * @returns {*|jQuery|HTMLElement}
             */
            this.getTable = function () {
                return $('.tablefield-input table');
            };

            /**
             * updates textarea field value from the current table data
             */
            this.updateValue = function () {
                var me = this,
                    $table = me.getTable(),
                    $dataRows = $table.find('tbody tr.data-row'),
                    result = [];

                $dataRows.each(function (index) {
                    result[index] = [];

                    $(this).find(' textarea').each(function () {
                        result[index].push($(this).val());
                    });
                });

                $('.tablefield-input input[data-value]').val(JSON.stringify(result));
            };

            /**
             * fills the table from the textarea field data
             */
            this.loadValues = function () {
                var me = this,
                    $table = me.getTable(),
                    data = $('.tablefield-input input[data-value]').val(),
                    tableData = JSON.parse(data),
                    rowCount = tableData.length,
                    colCount = rowCount > 0 ? tableData[0].length : 0;

                if (rowCount === 0 || colCount === 0) {
                    return;
                }

                for (var i = 0; i < colCount - 1; i++) {
                    me.addCol();
                }
                for (var i = 0; i < rowCount - 1; i++) {
                    me.addRow();
                }

                $.each(tableData, function (rowIndex, row) {
                    $.each(row, function (colIndex, value) {
                        $table.find('tbody tr.data-row:nth-child(' + (rowIndex + 1) + ') td:nth-child(' + (colIndex + 2) + ') textarea').val(value);
                    });
                });
            };

        });
    }); // ss namespace
}(jQuery));