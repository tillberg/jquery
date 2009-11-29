
function isdef(x) { return x !== undefined; }
function isstr(x) { return (("" + typeof x) == "string"); }
function isobj(x) { return (("" + typeof x) == "object"); }

function randStr(len) {
    var chars = "abcdefghijklmnopqrstuvwxyz";
    len = len || 12;
    var str = '';
    for (var i = 0; i < len; i++) {
        var n = Math.floor(Math.random() * 26);
        str += chars.substring(n, n + 1);
    }
    return str;
}

function intRound(x, n, modulus) {
    if (!modulus) { modulus = 0; }
    return Math.round((x - modulus) / n) * n + modulus;
}

function toInt(n) { return parseInt(n, 10); }

function f(x) { return (x === undefined || x === '' || x === null || isNaN(x)) ? undefined : parseFloat('' + x); }

Array.prototype.contains = function(obj) {
  var i = this.length;
  while (i--) {
    if (this[i] === obj) {
      return true;
    }
  }
  return false;
}

// Returns a copy of the array in reverse order (without modifying the original)
Array.prototype.reversed = function() {
  var a = this.slice();
  a.reverse();
  return a;
};

// Add a class to an element on hover.  Suitable as a replacement for using :hover in CSS, for greater cross-browser compatibility
$.fn.hoverClass = function(s, d) { return this.each(function() { s = s || 'hover'; var $t = $(this); $t.hover(function() { $t.addClass(s); }, function() { function f() { $t.removeClass(s); } if (d) { ex(f, d); } else { f(); } }) }); };

$.fn.updateCss = function(css) { this.css($.grepDiff(this.data('oldCss'), css)).data('oldCss', css); return this; };
// Case-insensitive string comparison
$.cmp = function(a, b) { return (a.toLowerCase() === b.toLowerCase()); };

$.swap = function(a, i, j) { var t = a[i]; a[i] = a[j]; a[j] = t; return a; };

$.time = function() { return new Date().getTime(); };

function ex(fn, time) { return setTimeout(fn, time || 0); }

// absPos does not seem to work correctly.  Not sure why, but findPosX and findPosY do work.  TODO: Fix absPos
$.fn.absPos = function() {
  var par = this.parent();
  var parpos = par.length > 0 ? par.absPos() : {left: 0, top: 0};
  var thispos = (par.length > 0) ? this.position() : {left: 0, top: 0};
  return {left: thispos.left + parpos.left, top: thispos.top + parpos.top};
};

$.fn.random = function() {
  return $(this[Math.floor(Math.random() * this.length)]);
};

  function findPosX(obj)
  {
    var curleft = 0;
    if(obj.offsetParent)
        while(1) 
        {
          curleft += obj.offsetLeft;
          if(!obj.offsetParent)
            break;
          obj = obj.offsetParent;
        }
    else if(obj.x)
        curleft += obj.x;
    return curleft;
  }

  function findPosY(obj)
  {
    var curtop = 0;
    if(obj.offsetParent)
        while(1)
        {
          curtop += obj.offsetTop;
          if(!obj.offsetParent)
            break;
          obj = obj.offsetParent;
        }
    else if(obj.y)
        curtop += obj.y;
    return curtop;
  }
