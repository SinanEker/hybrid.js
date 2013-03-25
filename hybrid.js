/*
 * hybrid.js
 * @copyright: sinan eker, selsyourself@gmail.com
 * @description: This script composes mootools and jquery better together.
 * @required: Mootools, jQuery
 * @license:
 * * * Licensed under the Apache License, Version 2.0
 * * * http://www.apache.org/licenses/LICENSE-2.0
 */
var _ = (function () {
    var defaults = {
        __proto__: null,
        jQuery: window.jQuery
    },
    hybrid = new Class({}),
        store = {
            __proto__: null
        };
    Class.Mutators.setJquery = function (bool){
        if(bool){
            return this.prototype.setOptions({
                jQuery: defaults.jQuery
            });
        }
    };
    Class.Mutators.baseStore = function (arg) {
        return this.prototype.setOptions({
            baseStore: arg
        });
    };
    Class.Mutators.jQuery = function (name) {
        var self = this;
        defaults.jQuery.fn[name] = function (arg) {
            var args = Array.prototype.slice.call(arguments, 1);
            if (typeOf(arg) == 'string') {
                var instance = defaults.jQuery(this).data(name);
                if (instance) {
                    instance[arg].apply(instance, args);
                }
            } else {
                defaults.jQuery(this).data(name, new self(this.selector, defaults.jQuery.extend(self.prototype.options, arg)));
            }
        };
    };
    hybrid.AjaxCallbacks = new Class({
        options: {
            success: function (data) {
                return store['ajaxSuccessResponse'] = data;
            }
        },
        initialize: function () {
            return this.options;
        }
    });
    hybrid.Factory = new Class({
        Implements: [Options],
        baseStore: store,
        initialize: function (jquery) {
            this.last = '';
            this.res = [];
            return this;
        },
        store: function (t, k) {
            this.last = k;
            return this.res[k] = t;
        },
        clear: function () {
            this.res = undefined;
            this.res = [];
        },
        getLast: function () {
            return (this.res[this.last] !== undefined ? this.res[this.last] : {__proto__:null});
        },
        get: function (k) {
            return (this.res[k] !== undefined ? this.res[k] : {__proto__:null});
        }
    });
    hybrid.Maker = new Class({
        Extends: hybrid.Factory,
        initialize: function (jquery, options) {
            this.parent(jquery);
            var m = new hybrid.AjaxCallbacks();
            jquery.extend(m, options);
            this.store(jquery.ajax(m), 'Maker');
            return this;
        },
        lastRequest: function () {
            return this.res['Maker'];
        }
    });
    return new Class({
        Extends: hybrid.Factory,
        jQuery: 'hybrid', // with that you can access hybrid in jQuery via $.fn.hybrid
        options: {
            jq: defaults.jQuery
        },
        initialize: function (a, b, options) {
            a = a || undefined;
            b = b || undefined;
            this.setOptions(options);
            this.jQuery = this.options.jq;
            this.parent(this.jQuery);
            if (typeOf(b) == 'function') {
                var c = (a !== undefined ? this.jQuery(a) : undefined);
                return this.store(b.apply(this, [c, this.jQuery]), 'initialize');
            }
            return (a !== undefined && b !== undefined ? this.store(this.jQuery(a, b), 'initialize') : (!a ? this : this.store(this.jQuery(a), 'initialize')));
        },
        $: function (a) {
            return this.store((!a ? [] : this.jQuery(a)), '$');
        },
        ajax: function (a) {
            a = a || {};
            var r, maker = new hybrid.Maker(this.jQuery, a);
            r = maker.lastRequest();
            maker.clear();
            return r;
        }
    });
})();
window._ = _;
window.hybrid = window._;
