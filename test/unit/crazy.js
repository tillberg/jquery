module('crazy');

test( 'Object Constructor', function() {
	expect( 4 );
	
	ok( jQuery( {} ), '$({})' );
	ok( jQuery.isObjectLiteral( jQuery({}).o ), '$({}).o is object literal' );
	
	var name = 'Bob Smith';
	var obj = jQuery( { name: name, age: 42 } );
	equals( obj.o.name, name, '$({key: value}).o.key === value' );
	
	// This test is kind of silly but demonstrates how it can be used
	obj.o.race = 'Human';
	equals( obj.o.race, 'Human', '$obj.o.key = value' );
	
});

test( 'Array Constructor', function() {
	expect( 3 );
	
	var arr = [ 1, 2, 3, 5, 7, 11 ];

	ok( jQuery( [] ), '$( [] )');
	ok( jQuery( arr ), '$( [ ... ] )');
	
	var $arr = jQuery( arr );
	equals( $arr[ 3 ], arr[ 3 ], 'Index into jQuery Array');
	
});

test( 'size', function() {
	expect( 6 );
	
	equals( jQuery( {} ).size(), 0, '$( {} ).size()');
	
	var obj = jQuery( { name: name, age: 42 } );
	equals( obj.size(), 2, '$({...}).size()' );
	obj.o.race = 'Human';
	equals( obj.size(), 3, '$({...}).size() after ad hoc object extension' );
	delete obj.o.name;
	equals( obj.size(), 2, '$({...}).size() after ad hoc delete' );
	
	equals( jQuery( [] ).size(), 0, '$( [] ).size()' );
	equals( jQuery( [ 1, 2, 3 ] ).size(), 3, '$( [...] ).size()' );
	
});

test( 'join', function() {
	expect( 6 );
	
	equals( jQuery( [] ).join(), '', 'jQuery( [] ).join()' );
	equals( jQuery( [ 1, 2, 3 ] ).join(), '1,2,3', 'jQuery( [ ... ] ).join()' );
	equals( jQuery( [ 1, 2, 3 ] ).join( 'abc' ), '1abc2abc3', 'jQuery( [ ... ] ).join( "..." )' );
	
	equals( jQuery( {} ).join(), '', 'jQuery( {} ).join()');
	equals( jQuery( { a: 1, b: 2, c: 3 } ).join(), '1,2,3', 'jQuery( { ... } ).join()' );
	equals( jQuery( { a: 1, b: 2, c: 3 } ).join( 'abc' ), '1abc2abc3', 'jQuery( { ... } ).join( "..." )' );
});

test( 'raw', function() {
	expect( 2 );
	
	equals( jQuery( [ 3, 5, 7 ] ).raw()[ 1 ], 5, 'raw() of array' );
	equals( jQuery( { a: 1, b: 2, c: 3 } ).raw().b, 2, 'raw() of object' );
});

test( 'toJson', function() {
	expect( 2 );
	
	var obj = { a: 3, b: 'seven', c: 'ate' };
	equals( JSON.stringify( obj ), jQuery( obj ).toJson(), '$({...}).toJson()' );
	var arr = [ 1, 2, 3, 5, 7, 11 ];
	equals( JSON.stringify( arr ), jQuery( arr ).toJson(), 'Array to Json' );
	
});

test( 'map', function() {
	expect( 4 );
	
	equals( jQuery.map( { a:3 }, function( v ) { return 2 * v; } ).a, 6, '$.map({...})' );
	equals( jQuery.map( { a:3, b:7 }, function( v ) { return v; } ).b, 7, 'Value from map on Object' );
	
	var name = 'Bob Smith'
	var obj = jQuery( { name: name, age: 42 } );
	obj.o.race = 'Human';
	
	var mappedValues = obj.map( function( v ) { return ( v + '' ).length; } );
	equals( mappedValues.o.name, name.length, 'Mapped object values' );
	equals( mappedValues.size(), 3, 'Number of mapped values' );
	
	/*
	var obj = {}, $obj = jQuery( obj );
	jQuery.range(100).each(function(k,v) { obj[v] = v; });
	function mapper1() { jQuery.map(obj, function(v) { return v; }); }
	function mapper2() { $obj.map(function(v) { return v; }); }
	
	function benchmark(fn, times){
	    var t=new Date;
	    while(times--) { fn(); }
	    return new Date-t;
    }
    
    // Using prototypal inheritance and attaching keys directly to the jQuery object:
    // empty obj: about 20-30X slower, 100 elements: about 10X slower.
    // After changing to .o style:
    // empty obj: about 2X slower, 100 elements: ~1.7X slower
	// After moving jQuery( obj ) outside of mapper2, it was only about 1.2-1.5X slower
	// After switching to using jQuery.fromObj() internally, it was less than 10% slower.
	// After swapping .isObjectLiteral for .isLikeArray in $.map, this was 25% faster for both.
    alert('traditional: ' + benchmark(mapper1, 3000) + ', new: ' + benchmark(mapper2, 3000));
    */
});

test( 'each', function() {
	expect( 4 );
	
	var obj = { a:2, b: 5, c: 7 };
	var str = '', correctStr = 'a=2,b=5,c=7,';
	function kvStrApp( k, v ) { str += k + '=' + v + ','; }
	jQuery( obj ).each( kvStrApp );
	equals( str, correctStr, '$({...}).each(cb)' );
	str = '';
	jQuery.each( obj, kvStrApp );
	equals( str, correctStr, '$.each({...}, cb)' );
	
	var arr = [ 'alice', 'bob', 'charlie' ];
	str = '', correctStr = 'alice,bob,charlie,';
	function vStrApp( k, v ) { str += v + ','; }
	jQuery( arr ).each( vStrApp );
	equals( str, correctStr, '$([...]).each(cb)' );
	str = '';
	jQuery.each( arr, vStrApp );
	equals( str, correctStr, '$.each([...], cb)' );
});

test( 'Chaining', function() {
	expect( 2 );
	function nodify( v, k ) { return '<' + k + '>' + v + '</' + k + '>'; }
	var html = jQuery( { div:3, span: 5, code: 7 } ).map( nodify ).join( '' );
	equals( html, '<div>3</div><span>5</span><code>7</code>', 'Chain map & join' );
	equals( jQuery( html ).filter( 'div' ).text(), '3', 'Fun stuff after the chain.  Not all that useful, though.' );
});

test( 'Prototyping', function() {
	expect( 1 );
	
	var Thing = jQuery.proto();
	var Creature = jQuery.proto( Thing );
	var Person = jQuery.proto( Creature );
	
	var bob = Person.make();
	ok( bob.is( Thing ), 'Proto.is' );
});

test( 'grep', function() {
	expect(5);
	
	equals( jQuery.grep( [ 1, 2, 3, 4, 5, 6 ], function(v, k) { return v % 2 === 0; } )[ 1 ], 4, '$.grep( [ ... ], cb )');
	equals( jQuery( [ 1, 2, 3, 4, 5, 6 ] ).grep( function(v, k) { return v % 2 === 0; } ).size(), 3, '$( [ ... ] ).grep( cb )');
	
	equals( jQuery.grep( { a: 3, b: 7, c: 5 }, function(v, k) { return k !== 'a'; } ).a, undefined, '$.grep( [ ... ], cb ).key undefined');
	equals( jQuery.grep( { a: 3, b: 7, c: 5 }, function(v, k) { return k !== 'a'; } ).b, 7, '$.grep( [ ... ], cb ).key exists');
	equals( jQuery( { a: 3, b: 7, c: 5 } ).grep( function(v, k) { return k !== 'a'; } ).size(), 2, '$( [ ... ] ).grep( cb ).size()');
	
});

// Note: I use "front" instead of "first" because first is already
// defined for jQuery objects, and maps from a many-element array
// to a single-element array, which is not what we want here.
test( 'front & frontKey', function() {
	expect( 16 );
	
	equals( jQuery.front( [] ), undefined, '$.front( [] )');
	equals( jQuery.frontKey( [] ), undefined, '$.frontKey( [] )');
	
	equals( jQuery.front( [ 4, 5, 6 ] ), 4, '$.front( [ ... ] )');
	equals( jQuery.frontKey( [ 4, 5, 6 ] ), 0, '$.frontKey( [ ... ] )');
	
	equals( jQuery.front( {} ), undefined, '$.front( {} )');
	equals( jQuery.frontKey( {} ), undefined, '$.frontKey( {} )');
	
	equals( jQuery.front( { a: 7, b: 9, c: 11 } ), 7, '$.front( { ... } )');
	equals( jQuery.frontKey( { a: 7, b: 9, c: 11 } ), 'a', '$.frontKey( { ... } )');
	
	equals( jQuery( [] ).front(), undefined, '$( [] ).front()');
	equals( jQuery( [] ).frontKey(), undefined, '$( [] ).frontKey()');
	
	equals( jQuery( [ 4, 5, 6 ] ).front(), 4, '$( [ ... ] ).front()');
	equals( jQuery( [ 4, 5, 6 ] ).frontKey(), 0, '$( [ ... ] ).frontKey()');
	
	equals( jQuery( {} ).front(), undefined, '$( {} ).front()');
	equals( jQuery( {} ).frontKey(), undefined, '$( {} ).frontKey()');
	
	equals( jQuery( { a: 7, b: 9, c: 11 } ).front(), 7, '$( { ... } ).front()');
	equals( jQuery( { a: 7, b: 9, c: 11 } ).frontKey(), 'a', '$( { ... } ).frontKey()');
});

test( 'back & backKey', function() {
	expect( 16 );
	
	equals( jQuery.back( [] ), undefined, '$.back( [] )');
	equals( jQuery.backKey( [] ), undefined, '$.backKey( [] )');
	
	equals( jQuery.back( [ 4, 5, 6 ] ), 6, '$.back( [ ... ] )');
	equals( jQuery.backKey( [ 4, 5, 6 ] ), 2, '$.backKey( [ ... ] )');
	
	equals( jQuery.back( {} ), undefined, '$.back( {} )');
	equals( jQuery.backKey( {} ), undefined, '$.backKey( {} )');
	
	equals( jQuery.back( { a: 7, b: 9, c: 11 } ), 11, '$.back( { ... } )');
	equals( jQuery.backKey( { a: 7, b: 9, c: 11 } ), 'c', '$.backKey( { ... } )');
	
	equals( jQuery( [] ).back(), undefined, '$( [] ).back()');
	equals( jQuery( [] ).backKey(), undefined, '$( [] ).backKey()');
	
	equals( jQuery( [ 4, 5, 6 ] ).back(), 6, '$( [ ... ] ).back()');
	equals( jQuery( [ 4, 5, 6 ] ).backKey(), 2, '$( [ ... ] ).backKey()');
	
	equals( jQuery( {} ).back(), undefined, '$( {} ).back()');
	equals( jQuery( {} ).backKey(), undefined, '$( {} ).backKey()');
	
	equals( jQuery( { a: 7, b: 9, c: 11 } ).back(), 11, '$( { ... } ).back()');
	equals( jQuery( { a: 7, b: 9, c: 11 } ).backKey(), 'c', '$( { ... } ).backKey()');
});

test( 'pop, peek', function() {
	expect( 4 );
	
	var $o = jQuery( [7, 6, 5] );
	equals( $o.peek(), 5, '$( [ ... ].peek() )');
	equals( $o.pop(), 5, '$( [ ... ] ).pop() return value');
	equals( $o.size(), 2, '$( [ ... ] ).pop() removes element');
	
	equals( jQuery( [] ).pop(), undefined, '$( [] ).pop()')
	
});

test( 'mapToObj', function() {
	expect( 3 );
	
	var str = 'a=4,b=7,c=9';
	var obj = jQuery.mapToObj( str.split( ',' ), function( v ) { var a = v.split( '=' ); var d = {}; d[ a[ 0 ] ] = a[ 1 ]; return d; } );
	equals( obj.b, 7, '$.mapToObj with object callback return' );
	var obj2 = jQuery.mapToObj( str.split( ',' ), function( v ) { var a = v.split( '=' ); return [ a[ 0 ], a[ 1 ] ]; } );
	equals( obj2.c, 9, '$.mapToObj with array callback return' );

	var obj3 = jQuery( str.split( ',' ) ).mapToObj( function( v ) { var a = v.split( '=' ); return [ a[ 0 ], a[ 1 ] ]; } );
	equals( obj3.o.a, 4, '$.mapToObj inline' );

});

test( 'splice', function() {
	expect( 3 );
	
	var obj = { a: 3, b: 5, c: 7, d: 9, e: 11 };
	var fields = [ 'a', 'd' ];
	equals( jQuery.splice( obj, fields ).a, 3, '$.splice( { ... }, [ ... ] ).includedKey' );
	equals( jQuery.splice( obj, fields ).b, undefined, '$.splice( { ... }, [ ... ] ).excludedKey' );

	equals( jQuery( obj ).splice( fields ).d, 9, '$.splice( { ... }, [ ... ] ).includedKey' );
	
});

test( 'size', function() {
	expect( 6 );
	
	equals( jQuery.size( [] ), 0, 'jQuery.size( [] )');
	equals( jQuery.size( {} ), 0, 'jQuery.size( {} )');

	equals( jQuery( [] ).size(), 0, 'jQuery( [] ).size()');
	equals( jQuery( {} ).size(), 0, 'jQuery( {} ).size()');
	
	equals( jQuery( [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ] ).size( function( v ) { return v % 2 == 0; } ), 4, 'jQuery( [ ... ] ).size( cb )');
	equals( jQuery( { a: 3, b: 5, c: 7, d: 9, e: 11 } ).size( function( v ) { return v % 3 == 0; } ), 2, 'jQuery( { ... } ).size( cb )');
});

