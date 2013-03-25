/*
 * bhybrid.js
 * @copyright: sinan eker, selsyourself@gmail.com
 * @description: This script is a hybrid extension.
 * @required: MooTools, jQuery, hybrid.js, bootstrap.js
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
      initialize:function(){
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
    initialize: function (element) {
      this.parent(element);
      return this;
    },
    modal: function (arg) {
      arg = arg || undefined;
      if(arg == undefined){
        return this.store(this.get('initialize').modal(),'modal');   
      }else{
        var l = new _.StringValidation();
        if(l.stringCollection(['toggle','show','hide'],arg) || l..stringCollection(['backdrop','keyboard','show','remote'],arg)){
          return this.store(this.get('initialize').modal(arg),'modal');    
        }else{
          return [];
        }
      }
    },
    tooltip: function (arg) {
      arg = arg || undefined;
      if(arg == undefined){
        return this.store(this.get('initialize').tooltip(),'tooltip');   
      }else{
        var l = new _.StringValidation();
        if(l.stringCollection(['toggle','show','hide','destroy'],arg) || l..stringCollection(['animation','html','placement','selector','title','trigger','delay','container'],arg)){
          return this.store(this.get('initialize').tooltip(arg),'tooltip');    
        }else{
          return [];
        }
      }
    },
    popover: function (arg) {
      arg = arg || undefined;
      if(arg == undefined){
        return this.store(this.get('initialize').popover(),'popover');   
      }else{
        var l = new _.StringValidation();
        if(l.stringCollection(['toggle','show','hide','destroy'],arg) || l..stringCollection(['animation','html','placement','selector','trigger','title','content','delay','container'],arg)){
          return this.store(this.get('initialize').popover(arg),'popover');    
        }else{
          return [];
        }
      }
    },
    datepicker: function (arg,clb) { // not in bootstrap
      arg = arg || undefined;
      clb = clb || undefined;
      var e = this.get('initialize');
      if(this.jQuery.fn.datepicker == undefined){
        return new _.DatepickerInit(this.jQuery);
      }else{
        var l = new _.StringValidation();
        if(typeOf(arg) == 'object' && arg.setValue !== undefined){
          return this.store(e.datepicker('setValue',arg.setValue),'datepicker');  
        }else{
          if(arg == undefined){
            return this.store(e.datepicker(),'datepicker');    
          }else{
            if(l.stringCollection(['show','hide','place'],arg) || l..stringCollection(['format','weekStart','viewMode','minViewMode'],arg)){
              return this.store(e.datepicker(arg),'datepicker');    
            }else{
              return [];
            }
          }
        }
      }
    }
  });
})();
window._b = _b;
window.bhybrid = window._b;
