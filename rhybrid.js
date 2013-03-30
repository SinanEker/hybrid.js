/*
 * bhybrid.js
 * @copyright: sinan eker, selsyourself@gmail.com
 * @description: This script is a hybrid extension.
 * @required: MooTools, jQuery, hybrid.js, require.js
 * @license:
 * * * Licensed under the Apache License, Version 2.0
 * * * http://www.apache.org/licenses/LICENSE-2.0
 */
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
