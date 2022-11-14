/**
 * Sirv JS modules switcher widget
 *
 * @author    Sirv Limited <support@sirv.com>
 * @copyright Copyright (c) 2018-2022 Sirv Limited <support@sirv.com>. All rights reserved
 * @license   https://sirv.com/
 * @link      https://sirv.com/integration/magento/
 */

define([
    'jquery'
], function ($) {
    'use strict';

    $.widget('sirv.jsModulesSwitcher', {

        options: {
            selector: ''
        },

        /** @inheritdoc */
        _create: function () {
            this.options.selector = '[name="' + this.element.attr('name') + '"]';
            this.element.on('change', $.proxy(this._changeEventHandler, this));
        },

        /**
         * Handle the event
         * @param {Object} e - event object
         */
        _changeEventHandler: function (e) {
            this._switchJsModules(this.element.attr('value'), this.element.prop('checked'));
        },

        /**
         * Switch disabled attribute
         * @param {String} value
         * @param {Bool} checked
         */
        _switchJsModules: function (value, checked) {
            var switchAll = (value == 'all'), checkedCounter = 0, v;
            $(this.options.selector).each(function (i, el) {
                v = $(el).attr('value');
                if (v == 'all') {
                    switchAll || $(el).prop('checked', false);
                } else {
                    if (switchAll) {
                        $(el).prop('checked', checked || (v == 'lazyimage'));
                    } else {
                        if ($(el).prop('checked')) {
                            checkedCounter++;
                        }
                    }
                }
            });
            if (!(switchAll || checkedCounter)) {
                $(this.element).prop('checked', true);
            }
        }
    });

    return $.sirv.jsModulesSwitcher;
});
