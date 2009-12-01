

jQuery.fn.extend({
	
	// Is a given value a DOM element?
	isElement: function( obj ) {
		return !!(obj && obj.nodeType == 1);
	},

	// Is a given variable defined?
	isDefined: function( obj ) {
		return typeof obj != 'undefined';
	},
	
    // Return true if the specified key is a user property defined on this object
	// e.g. ok($({name: 'Bob'}).isUserKey('name'), ...)
	isUserKey: function(k) {
		return this.o && (this.o[k] !== undefined);
	},
	
	grep: function( a, b ) {
		return jQuery( jQuery.grep( this.o || this, a, b, this.o ) );
	},
	
	mapToObj: function( cb ) {
		return jQuery( jQuery.mapToObj( this.o || this, cb ) );
	},
	
	peek: function() {
		return this[ this.length - 1 ];
	},
	
	keys: function() {
		var ret = [ ];
		for ( var k in this.raw() ) {
			ret.push( k );
		}
		return jQuery( ret );
	},
	
	vals: function() {
		var ret = [], raw = this.raw();
		
		// This would speed up calls of this function when holding an array
		//if ( !this.o ) { return raw; }
		
		for ( var k in raw ) {
			ret.push( raw[ k ] );
		}
		return jQuery( ret );
	},
	
	join: function( sep ) {
		// Join the values of either the object or array with the specified separator
		return [].join.call( this.o ? this.vals() : this, sep );
	},

	raw: function() {
		return this.o || this.toArray();
	},
	
	toJson: function() {
		return JSON.stringify( this.raw() );
	},
	
	reverse: function() {
		[].reverse.call( this );
		return this;
	},
	
	reversed: function() {
		return jQuery( this ).reverse();
	},
	
	// Filters the array, reducing it down to one random element from the list
	random: function() {
		return this.eq( jQuery.randInt( this.length ) );
	},
	
	// Chainable version of $().push
	// jQuery.fn.push === [].push, which is not chainable.  In fact, its return
	// value is kind of lame.  We should rewrite jQuery to use something else in
	// place of that, perhaps, if possible.
	pushForReal: function( x ) {
		[].push.call( this, x );
		return this;
	},

	pop: [].pop
});

// Find the nth value in a.  If y, then return the nth key instead.
// If n is negative, return the last key/value for objects, or the
// mod-indexed key/value for arrays.
// Callbacks not supported for now in reverse searches.  Will give 
// incorrect results.
function nth( a, n, cb, y ) {
	var l = a.length, v;
	if ( l !== undefined && !cb ) { 
		if ( n < 0 ) { n = (n + l) % l; }
		// Some parentheses would be nice here... but they cost bytes
		return y ? l > 0 ? n : undefined : a[ n ];
	}
	
	$.each(a, function( k, x ) {
		if ( !cb( x, k ) ) {
			 // "continue" - don't count this iteration as it fails the callback
			return;
		}
		if ( n-- === 0 ) {
			v = y ? k : x;
			return false;
		} // Stop iteration
	});
	return v;
}

jQuery.extend({
	
	// Filter b, returning k/v pairs that are different from those in a
	grepDiff: function( a, b ) {
		var c = {};
		jQuery.each(b, function( k, v ) {
			if ( !a || a[ k ] !== v ) { c[ k ] = v; }
		});
		return c;
	},

	mapToObj: function( o, cb ) {
		var r = {};
		jQuery.each( o, function( k, v ) {
			var x = cb( v, k );
			if ( jQuery.isArray( x ) ) {
				// Return value was of form [ k, v ]
				r[ x[ 0 ] ] = x[ 1 ];
			} else {
				// Return value was of form { k1: v1, ... }
				jQuery.extend( r, x );
			}
		});
		return r;
	},
	
	front: function( a, cb ) {
		return nth( a, 0, cb );
	},
	
	frontKey: function( a, cb ) {
		return nth( a, 0, cb, 1 );
	},
	
	// Callbacks not supported for now
	back: function( a ) {
		return nth( a, -1, undefined );
	},
	
	// Callbacks not supported for now
	backKey: function( a ) {
		return nth( a, -1, undefined, 1 );
	},
	
	// Return an array of integers from 0 to m - 1, or m to n - 1 if n is specified.
    range: function( m, n ) {
    	if (n === undefined) { n = m; m = 0; }
      	var r = [];
      	for ( var i = m; i < n; i++ ) { r.push( i ); }
      	return jQuery( r );
    },
    
	// Return a filtered copy of o, including only the keys in fields
	filterByKey: function( o, fields ) {
		var r = {};
	  	jQuery.each( fields, function( i, f ) {
	    	r[ f ] = o[ f ];
	    });
		return r;
	},
	
	// The number of elements contained in the matched element set
	// If cb is specified it is used as a test function
	size: function( o, cb ) {
		// If this is a normal jQuery object, return the array length
		if ( !cb && o.length !== undefined ) { return o.length; }
		
		// If this holds an object literal, count the number of keys
		var n = 0;
		jQuery.each( o, function( k, v ) {
			if ( !cb || cb( v, k ) ) { n++; }
		});
		return n;
	},
	
	// Reduce o into res using cb
	reduce: function( o, res, cb, isObj ) {
		isObj = isObj || o.length === undefined;
		// If this is just an array and JS 1.8 reduce is available, use it (untested)
		if (!isObj && o.reduce) return o.reduce( cb, res );
		jQuery.each( o, function( v, k ) {
			res = cb( res, v, k );
		});
		return res;
	},
	
	// Slices the array, returning all elements after the 1, or i-th, if specified (and i > 0)
	rest: function( a, i ) {
		return [].slice.call( a, i || 1 );
	},
	
	// Generate a random number from 0 to l or l to h, exclusive.
	randInt: function( l, h ) {
		if ( h === undefined ) {
			h = l;
			l = 0;
		}
		return Math.floor( Math.random() * (h - l) ) + l;
	}
	
});

// Attach inline versions of simple object/array methods to jQuery.fn
// This is more compact than defining them inline above
// size will actually overwrite the default jQuery version
jQuery.map( 'front,frontKey,back,backKey,filterByKey,size,grepDiff'.split( ',' ), function( x ) {
	jQuery.fn[ x ] = function( a ) { 
		return jQuery[ x ]( this.o || this, a );
	};
});
