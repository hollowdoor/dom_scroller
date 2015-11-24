dom-scroller
============

Install
-------

`npm install --save dom-scroller`

Usage
-----

The javascript is inline, but you might be using something like browserify. If so just think of the javascript as external.

```html
<!DOCTYPE html>
<html>
<head>
    <title>Dom list test</title>
    <style>
    #list-container{
        background-color: green;
        cursor: default;
        /*The important styles are overflow, and height.*/
        overflow-y: auto;
        height: 100px;
        padding: 10px;
    }
    #list{
        padding: 10px;
        margin: 10px;
    }
    #container2{
        background-color: red;
        cursor: default;
        /*The important styles are overflow, and width.*/
        overflow-x: auto;
        width: 250px;
        padding: 20px;
        white-space: nowrap;
    }
    #hlist{
        padding: 10px;
        margin: 10px;

    }
    #hlist li{
        display: inline;
    }

    </style>
    </head>
<body>
    <button id="up1">up</button>
    <button id="down1">down</button>
    <div id="list-container">
        <ol id="list" type="1">
            <li>zero</li>
            <li>one</li>
            <li>two</li>
            <li>three</li>
            <li>four</li>
            <li>five</li>
            <li>six</li>
            <li>seven</li>
            <li>eight</li>
            <li>nine</li>
            <li>ten</li>
            <li>eleven</li>
            <li>twelve</li>
            <li>thirteen</li>
            <li>fourteen</li>
            <li>fifteen</li>
        </ol>
    </div>
    <button id="right">Scroll Right</button>
    <div id="container2">
        <ol id="hlist">
            <li>zero</li>
            <li>one</li>
            <li>two</li>
            <li>three</li>
            <li>four</li>
            <li>five</li>
            <li>six</li>
            <li>seven</li>
            <li>eight</li>
            <li>nine</li>
            <li>ten</li>
            <li>11</li>
            <li>12</li>
            <li>13</li>
            <li>14</li>
            <li>15</li>
        </ol>
    </div>

    <script>
    var createScroller = require('dom-scroller');


    var scroller = createScroller(document.querySelector('#list-container'), {
        edges: 'same'
    });

    document.querySelector('#down1').addEventListener('click', function(e){
        scroller.jumpTo(document.querySelector('#list').children[11]);
    }, false);

    document.querySelector('#up1').addEventListener('click', function(e){
        scroller.jumpTo(document.querySelector('#list').children[3]);
    }, false);

    var scroller2 = createScroller(document.querySelector('#container2'), {
        edges: 'split'
    });

    document.querySelector('#right').addEventListener('click', function(){
        scroller2.jumpTo(document.querySelector('#hlist').children[9]);
    }, false);
    </script>
</body>
</html>

```

The Scroller API
----------------

### createScroller(element, options) -> instance

Give an element that you want to scroll to the scroller.

#### options.edges = String

The `edges` option gives you the ability to control where to scroll when calling the `jumpTo` method.

If `edges` is set to `split` if the child is below the containing element then it will scroll to just above the bottom of the containing element.

If `edges` is set to `same` then children will always scroll to the top of the container element.

The default for `edges` is `split`.

### options.direction = String

`direction` should be `vertical`, `horizontal`, or `both`. The default is `both`.

You can constrain the scrolling direction with this option.

### options.duration

The default duration for a scroll when you call any of the scrolling methods on the `scroller` instance.

### options.easing = Function

Set an easing function. The default is linear.

Scroller Static Methods
-----------------------

### createScroller.Easing

Access to easing functions.

These functions are the same as found in [tween.js](https://www.npmjs.com/package/tween.js).

Look at the [documentation](https://github.com/tweenjs/tween.js/blob/master/docs/user_guide.md) for tween.js to learn more.

Scroller Methods
----------------

The `duration` parameter for all methods is optional.

### tween() -> tween

This creates a tween. The tween object returned is the same as a [tween.js](https://www.npmjs.com/package/tween.js) object.

### tweenScroll(side, distance, duration) -> tween

Tween the scrollbar of the element.

`side` should be a string equal to `Left`, or `Top`. This corresponds to `scrollTop`, and `scrollLeft`.

`distance` should be a negative, or positive integer representing how many pixels you want to scroll.

`duration` is the duration in milliseconds for the tween to take place.

### scrollV(distance, duration) -> tween

Start a vertical scroll automatically.

The same as tweenScroll, but without a side argument.

### scrollH(distance, duration) -> tween

Start a horizontal scroll automatically.

The same as tweenScroll, but without a side argument.

### jumpTo(element, duration) -> tween

Make the container element scroll to an child element's position.

`jumpTo` is dependent on the `edges` option of the constructor.

Scroller Properties
-------------------

### scrollTop = Integer

The same as `element.scrollTop`.

### scrollLeft = Integer

The same as `element.scrollLeft`.

### scrollingV = Boolean

Is the element in the act of scrolling vertically?

### scrollingH = Boolean

Is the element in the act of scrolling horizontally?

**There are other properties, but for the most part you should ignore those.**
