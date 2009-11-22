
jQuery.extend({

    // Create a new prototype with the specified name, optionally deriving from an existing prototype
    proto: function( par ) {
		
		// Adapted form of Douglas Crockford's Object.create
		function create( z ) {
			function F() { }
		  	F.prototype = z;
		  	return new F();
		}
		
		// Make a new prototype based on the specified parent prototype, if any
        var p = create( par || {} );
		
		// Recursively determine if the specified object is of the specified prototype
        p.is = function( s ) {
			return s === p || ( par && par.is( s ) ); 
		};
		
		p.new = function( ) {
  			var o = create( p );
			// Execute the top-most constructor, passing in the specified arguments
  			if ( p.cons ) {
				p.cons.apply( o, arguments ); 
			}
  			return o;
		};
		
        return p;
    }

});
