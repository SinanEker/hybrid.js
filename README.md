hybrid.js
=========

hybrid.js is a jQuery and MooTools composer. You can call jQuery function in interaction with MooTools OOP coding. Additionally there is a plugin for twitter's bootstrap. Also it's possible to get the result of the last called action. That is useful for AJAX requests oder DOM manipulation. There is a small datepicker migration for bootstrap. (For further information about datepicker: http://www.eyecon.ro/bootstrap-datepicker/) 

A code example: 
```javascript
var app = new _('body',function(t,$){
  $(t).text('Hello World!');  
});
```

And with an ajax request:
```javascript
var res = app.ajax({
    url: '/echo/json/',
    dataType: 'json',
    type:'POST',
    data: {
        json: JSON.encode({
            text: 'some text',
            array: [1, 2, 'three'],
            object: {
                par1: 'another text',
                par2: [3, 2, 'one'],
                par3: {}
            }
        })
    },
    cache:false,
    beforeSend: function () {
        new _('#state', function (t, $) {
            $(t).text('start');
        });
    },
    complete: function (state) {
        new _('#state', function (t, $) {
            $(t).text(state.status+" "+state.statusText+"\n");
            $('#response').text("Response: \n"+state.responseText);
        });
    }
});
```

jQuery MooTools Mutator:

```javascript
new Class({
  jQuery:'the_name', // this class is now in jQuery.fn.the_name
  someFunction:function(){
    return this;
  }
});
```

