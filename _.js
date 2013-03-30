/*
 * _.js
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
var _r = (function() {
  return new Class({
    Extends: _,
    jQuery:'rhybrid',
    setJquery: true,
    Implements: Options,
    source: "http://requirejs.org/docs/release/2.1.5/minified/require.js",
    options: {
        fail:function(){
           console.log('Unable to load require.js');
           return false;
        }
    },
    initialize: function(d,c,h,options){
      d = d || undefined;
      c = c || undefined;
      h = h || undefined;
      options = options || undefined;
      this.setOptions(options);
      this.parent(document);
      this.ready = true;
      try{
        throw require;
      }catch(e){
        if(typeOf(e) == 'object' && e.message == "require is not defined"){
          this.ready = false;
        }
      };
      return(!this.ready ? this.jQuery.getScript(this.source).fail(this.options.fail) : require.apply(this,[d,c,h]));
    }
  });
})();
window._r = _r;
window.rhybrid = window._r;
var _b = (function() {
  _.DatepickerInit = (function(){
    return new Class({
        source:"https://raw.github.com/eternicode/bootstrap-datepicker/master/js/bootstrap-datepicker.js",
        initialize: function(jQ){
            return (jQ == undefined ? [] : jQ.getScript(this.source).fail(function(){
                console.log('Unable to load the datepicker plugin.');
            }));
        }
    });
  })();
  _.StringValidation = (function() {
    return new Class({
      initialize: function(){
        return this;
      },
      stringCollection: function(array,arg){
        var validation = false;
        if(typeOf(array) !== 'array'){
          return false;
        }
        if(typeOf(arg) == 'string'){
          validation = array.map(function(item, index){ // ['toggle','show','hide']
            return item == arg;
          }).filter(function(item, index){
            return item == true;
          });
          if(validation[0] !== undefined){
            validation = true;
          }
        }else if(typeOf(arg) == 'object'){
          validation = array.map(function(item, index){ // ['backdrop','keyboard','show','remote']
            return arg[item] !== undefined;
          }).filter(function(item, index){
            return item == true;
          }).every(function(item, index){
            return item !== false;
          });
        }else{
          array = array.flatten();
          if(array == arg){
            validation = true;
          }
        }
        return validation;
      }
    });
  })();
  return new Class({
    Extends: _,
    jQuery: 'bhybrid',
    initialize: function (ele) {
      this.parent(ele);
      return this;
    },
    modal: function (arg) {
      arg = arg || undefined;
      var l = new _.StringValidation();
      return (arg == undefined ? this.store(this.get('initialize').modal(),'modal') : (l.stringCollection(['toggle','show','hide'],arg) || l.stringCollection(['backdrop','keyboard','show','remote'],arg) ? this.store(this.get('initialize').modal(arg),'modal') : []));
    },
    tooltip: function (arg) {
      arg = arg || undefined;
      var l = new _.StringValidation();
      return (arg == undefined ? this.store(this.get('initialize').tooltip(),'tooltip') : (l.stringCollection(['toggle','show','hide','destroy'],arg) || l.stringCollection(['animation','html','placement','selector','title','trigger','delay','container'],arg) ? this.store(this.get('initialize').tooltip(arg),'tooltip') : []))
    },
    popover: function (arg) {
      arg = arg || undefined;
      var l = new _.StringValidation();
      return (arg == undefined ? this.store(this.get('initialize').popover(),'popover') : (l.stringCollection(['toggle','show','hide','destroy'],arg) || l.stringCollection(['animation','html','placement','selector','trigger','title','content','delay','container'],arg) ? this.store(this.get('initialize').popover(arg),'popover') : []));
    },
    datepicker: function (arg,clb) { // not in bootstrap
      arg = arg || undefined;
      clb = clb || undefined;
      var e = this.get('initialize'),l = new _.StringValidation();
      return (this.jQuery.fn.datepicker == undefined ? new _.DatepickerInit(this.jQuery) : (typeOf(arg) == 'object' && arg.setValue !== undefined ? this.store(e.datepicker('setValue',arg.setValue),'datepicker') : (arg == undefined ? this.store(e.datepicker(),'datepicker') : (l.stringCollection(['show','hide','place'],arg) || l.stringCollection(['format','weekStart','viewMode','minViewMode'],arg) ? this.store(e.datepicker(arg),'datepicker') : []))));
    }
  });
})();
window._b = _b;
window.bhybrid = window._b;
