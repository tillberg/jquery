
// Douglas Crockford's object branching method
Object.create = function(o) {
  function F() { }
  F.prototype = o;
  return new F();
};

// Create a new prototype with the specified name, optionally deriving from an existing prototype
function PROTO(o) {
  var p = Object.create(o || {});
  p.is = function(s) {return s === p || (o && o.is(s)); };
  return p;
}

// Create a new object from proto, calling constructor
function NEW(p) {
  var o = Object.create(p);
  if (o.cons) { o.cons.apply(o, [].slice.call(arguments, 1)); }
  return o;
}


