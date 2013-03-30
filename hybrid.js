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
    function fE(e){
        console.log(e);
        return false;
    }
    var d = {
        __proto__: null,
        jQuery: window.jQuery
    },
    hybrid = new Class({}),
        store = {
            __proto__: null
        };
    Class.Mutators.setJquery = function (b){
        if(b){
            return this.prototype.setOptions({
                jQuery: d.jQuery
            });
        }
    };
    Class.Mutators.baseStore = function (arg) {
        return this.prototype.setOptions({
            baseStore: arg
        });
    };
    Class.Mutators.jQuery = function (n) {
        var s = this;
        d.jQuery.fn[n] = function (arg) {
            var args = Array.prototype.slice.call(arguments, 1);
            if (typeOf(arg) == 'string') {
                var i = d.jQuery(this).data(n);
                if (i) {
                    i[arg].apply(i, args);
                }
            } else {
                d.jQuery(this).data(n, new s(this.selector, d.jQuery.extend(s.prototype.options, arg)));
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
        Implements: Options,
        baseStore: store,
        initialize: function () {
            this.last = '';
            this.res = [];
            return this;
        },
        store: function (t, k) {
            try {
                return this.res[this.last = k] = t;
            } catch (e) {
                return fE(e);
            }
        },
        clear: function () {
            this.res = [];
        },
        getLast: function () {
            return (this.res[this.last] !== undefined ? this.res[this.last] : {__proto__:null});
        },
        get: function (k) {
            try {
                return (this.res[k] !== undefined ? this.res[k] : {__proto__:null});
            } catch (e) {
                return fE(e);
            }
        }
    });
    hybrid.Maker = new Class({
        Extends: hybrid.Factory,
        initialize: function (jquery, options) {
            try {
                this.parent(jquery);
                var m = new hybrid.AjaxCallbacks();
                jquery.extend(m, options);
                this.store(jquery.ajax(m), 'Maker');
            } catch (e) {
                return fE(e);
            } finally {
                return this;
            }
        },
        lastRequest: function () {
            return this.res['Maker'];
        }
    });
    return new Class({
        Extends: hybrid.Factory,
        jQuery: 'hybrid', // with that you can access hybrid in jQuery via $.fn.hybrid
        options: {
            jq: d.jQuery
        },
        initialize: function (a, b, options) {
            a = a || undefined;
            b = b || undefined;
            this.setOptions(options);
            this.jQuery = this.options.jq;
            this.parent(this.jQuery);
            try {
                return (typeOf(b) == 'function' ? this.store(b.apply(this, [(a !== undefined ? this.jQuery(a) : undefined), this.jQuery]), 'initialize') : (a !== undefined && b !== undefined ? this.store(this.jQuery(a, b), 'initialize') : (!a ? this : this.store(this.jQuery(a), 'initialize'))));
            } catch (e) {
                return fE(e);
            }
        },
        $: function (a) {
            return this.store((!a ? [] : this.jQuery(a)), '$');
        },
        ajax: function (a) {
            a = a || {};
            try {
                var r, maker = new hybrid.Maker(this.jQuery, a);
                r = maker.lastRequest();
                maker.clear();
                return r;
            } catch (e) {
                return fE(e);
            }
        }
    });
})();
window._ = _;
window.hybrid = window._;
