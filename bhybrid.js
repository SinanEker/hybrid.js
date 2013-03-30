/*
 * bhybrid.js
 * @copyright: sinan eker, selsyourself@gmail.com
 * @description: This script is a hybrid extension.
 * @required: MooTools, jQuery, hybrid.js, bootstrap.js
 * @compatible with Bootstrap version 2.3.1
 * @license:
 * * * Licensed under the Apache License, Version 2.0
 * * * http://www.apache.org/licenses/LICENSE-2.0
 */
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
