var //Emitter = require('more-events').Emitter,
    //pointer = require('pointer-point'),
    TWEEN = require('tween.js'),
    r = /([0-9]+)px/;
/*
git remote add origin https://github.com/hollowdoor/dom_scroller.git
git push -u origin master
*/

animate();

function animate() {
    requestAnimationFrame(animate);
    // [...]
    TWEEN.update();
    // [...]
}

function ScrollerFactory(element, options){
    return new Scroller(element, options);
}

function Scroller(element, options){
    var self = this;

    options = options || {};
    this.scrollingTop = false;
    this.scrollingLeft = false;
    this.direction = 'both';
    this.edges = 'split';
    this.root = element;
    this.easing = options.easing || TWEEN.Easing.Linear.None;
    //this.point = pointer([element]);

    Object.defineProperties(this, {
        scrollTop: {
            get: function(){ return element.scrollTop; },
            set: function(v){ element.scrollTop = v; }
        },
        scrollLeft: {
            get: function(){ return element.scrollLeft; },
            set: function(v){ element.scrollLeft = v; }
        },
        scrollingV: {
            get: function(){ return self.scrollingTop; }
        },
        scrollingH: {
            get: function(){ return self.scrollingLeft; }
        },
        overflowX: {
            get: function(){ return element.style.overflowX; },
            set: function(v){ element.style.overflowX = v; }
        },
        overflowY: {
            get: function(){ return element.style.overflowY; },
            set: function(v){ element.style.overflowY = v; }
        }
    });

    if(['both', 'vertical', 'horizontal'].indexOf(options.direction) !== -1){
        this.direction = options.direction;
    }

    if(['split', 'same'].indexOf(options.edges) !== -1){
        this.edges = options.edges;
    }

    if(!isNaN(options.duration)){
        this.duration = options.duration;
    }

    var styles = window.getComputedStyle(element),
        props = ['overflowX', 'overflowY'];

    for(var i=0; i<props.length; i++){
        this[props[i]] = styles[props[i]];
    }

    function getPixels(el, prop){
        var px = el.style[prop].match(r);
        //if(!px)return null;
        return parseInt(px[1]);
    }

}

Scroller.prototype = {
    constructor: Scroller,
    tween: function(){
        return new TWEEN.Tween(this);
    },
    tweenScroll: function(side, distance, duration){
        this['scrolling'+side] = true;
        var to = {}, rect, animate = this;

        //Works when the overflow is set to hidden, auto, or scroll.
        to['scroll'+side] = this['scroll'+side] + distance;

        var tween = new TWEEN.Tween(this)
        .easing(this.easing)
        .to(to, duration || this.duration)
        .onComplete(function(){
            this['scrolling'+side] = false;
        });
        return tween;
    },
    scrollV: function(distance, duration){
        var tween = this.tweenScroll('Top', distance * -1, duration || this.duration);
        return tween.start();
    },
    scrollH: function(distance, duration){
        var tween = this.tweenScroll('Left', distance * -1, duration || this.duration);
        return tween.start();
    },
    jumpTo: function(element, duration){

        var crect = element.getBoundingClientRect(),
            prect = this.root.getBoundingClientRect(),
            distance = null;

        if(this.direction === 'vertical' || this.direction === 'both'){
            if(crect.top <= prect.top){
                distance = prect.top-crect.top;
            }else if(this.edges === 'split' && crect.bottom >= prect.bottom){
                distance = -(crect.bottom-prect.bottom);
            }else if(this.edges === 'same' && crect.top > prect.top){
                distance = -(crect.bottom-prect.bottom+prect.height);
            }

            if(distance)
                return this.scrollV(distance, duration);
        }

        if(this.direction === 'horizontal' || this.direction === 'both'){
            if(crect.left <= prect.left){
                distance = prect.left-crect.left;
            }else if(this.edges === 'split' && crect.right >= prect.right){
                distance = -(crect.right-prect.right);
            }else if(this.edges === 'same' && crect.left > prect.left){
                distance = -(crect.right-prect.right+prect.width);
            }

            if(distance)
                return this.scrollH(distance, duration);
        }

    }
};

ScrollerFactory.Easing = TWEEN.Easing;


module.exports = ScrollerFactory;
