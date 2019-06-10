<div class="tablefield-input">
    <input $AttributesHTML />

    <div class="table-wrapper">
        <table>
            <thead>
            <tr>
                <td></td>
                <td data-number="1">
                    <span class="index">A</span>
                    <button class="remove-col" data-action="removecol"><span
                            class="ui-button-icon-primary ui-icon btn-icon-cross-circle_disabled"></span></button>
                </td>
            </tr>
            </thead>
            <tbody>
            <tr class="data-row">
                <td>
                    <span class="index">1</span>
                    <button class="remove-row" data-action="removerow"><span
                            class="ui-button-icon-primary ui-icon btn-icon-cross-circle_disabled"></span></button>
                </td>
                <td>
                    <div class="input-wrapper">
                        <textarea></textarea>
                    </div>
                </td>
            </tr>
            </tbody>
        </table>
        <button class="add-row" data-action="addrow"><span class="ui-button-icon-primary ui-icon btn-icon-add"></span>
        </button>
        <button class="add-col" data-action="addcol"><span class="ui-button-icon-primary ui-icon btn-icon-add"></span>
        </button>
    </div>
</div>