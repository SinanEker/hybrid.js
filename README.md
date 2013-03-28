hybrid.js
=========
**by sinan eker**


**hybrid.js** is a MooTools and jQuery composer. 
You can call jQuery function in interaction with MooTools OOP coding. 
Additionally there is a plugin for twitter's bootstrap and RequireJS. That means you can use a few libs handled from one MooTools Class.
Also it's possible to get the result of the last called action.
That is useful for AJAX requests oder DOM manipulation. There is a small datepicker migration for bootstrap. (For further information about datepicker: http://www.eyecon.ro/bootstrap-datepicker/) 

Some links:
* [Bootstrap](http://twitter.github.com/bootstrap/base)
* [RequireJS](http://requirejs.org/)

Usage
=====

**before you read on!**
***
To use hybrid.js you nee MooTools and jQuery included to your page.
* [MooTools download site](http://mootools.net/download)
* [jQuery site](https://jquery.com/)

***

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
***

###Main methods:

```javascript
_.$(a) // same as jQuery()

_.ajax(a) // executes a jQuery.ajax request

_.initialize(a, b, options) // initialize hybrid.js 

_.parent(jQuery) // Not so important.
```

Inherited from Options:
```javascript
_.setOptions(options) // sets the options
```

Inherited from hybrid.Factory:
```javascript
_.clear() // Clears the factory store

_.get(k) // Get a value by a key

_.getLast() // Get the last result of an function execution

_.store(t, k) // Stores a result of an function execution
```


###License:

   > Copyright 2013 sinan eker

   > Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

   > [http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

   > Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

