module("crazy");

test("Object Constructors", function() {
	expect(4);
	
	ok( jQuery({}), "$({})" );
	ok( jQuery.isObjectLiteral( jQuery({}).o ), "$({}).o is object literal" );
	
	var name = 'Bob Smith'
	var obj = jQuery({name: name, age: 42});
	equals(obj.o.name, name, '$({key: value}).o.key === value');
	
	// This test is kind of silly but demonstrates how it can be used
	obj.o.race = 'Human';
	equals(obj.o.race, 'Human', '$obj.o.key = value');
	
});

test('Size', function() {
	expect(3);
	
	var obj = jQuery({name: name, age: 42});
	equals(obj.size(), 2, '$({...}).size()');
	
	obj.o.race = 'Human';
	equals(obj.size(), 3, '$({...}).size() after ad hoc object extension');
	
	delete obj.o.name;
	equals(obj.size(), 2, '$({...}).size() after ad hoc delete');
	
});

test('Array Constructors', function() {
	expect(3);
	
	var arr = [1, 2, 3, 5, 7, 11];
	var $arr = jQuery(arr);
	equals(5, $arr[3], 'Index into jQuery Array');
	equals(JSON.stringify(arr), $arr.toJson(), 'Array to Json');
	equals(arr.length, $arr.size(), "Array size");
	
});

test('Utility', function() {
	expect(2);
	
	var obj = {a: 3, b: 'seven', c: 'ate'};
	equals(JSON.stringify(obj), jQuery(obj).toJson(), '$({...}).toJson()');
	
	equals(JSON.stringify(obj), JSON.stringify(jQuery(obj).raw()), 'Object Literal Extraction');
	
});

test('Map', function() {
	expect(4);
	
	equals(jQuery.map({a:3}, function(v) { return 2 * v; }).a, 6, '$.map({...})');
	equals(jQuery.map({a:3, b:7}, function(v) { return v; }).b, 7, 'Value from map on Object');
	
	var name = 'Bob Smith'
	var obj = jQuery({name: name, age: 42});
	obj.o.race = 'Human';
	
	var mappedValues = obj.map(function(v) { return (v + '').length; });
	equals(mappedValues.o.name, name.length, 'Mapped object values');
	equals(mappedValues.size(), 3, 'Number of mapped values');
	
	/*
	var obj = {};
	jQuery.range(100).each(function(k,v) { obj[v] = v; });
	function mapper1() { jQuery.map(obj, function(v) { return v; }); }
	function mapper2() { jQuery(obj).map(function(v) { return v; }); }
	
	function benchmark(fn, times){
	    var t=new Date;
	    while(times--) { fn(); }
	    return new Date-t;
    }
    
    // Using prototypal inheritance and attaching keys directly to the jQuery object:
    // empty obj: about 20-30X slower, 100 elements: about 10X slower.
    // After changing to .o style:
    // empty obj: about 2X slower, 100 elements: ~1.7X slower
    alert('traditional: ' + benchmark(mapper1, 3000) + ', new: ' + benchmark(mapper2, 3000));
    */
});

test('Each', function() {
	expect(4);
	
	var obj = {a:2, b: 5, c: 7};
	var str = '', correctStr = 'a=2,b=5,c=7,';
	function kvStrApp(k,v) { str += k + '=' + v + ','; }
	jQuery(obj).each(kvStrApp);
	equals(str, correctStr, '$({...}).each(cb)');
	str = '';
	jQuery.each(obj, kvStrApp);
	equals(str, correctStr, '$.each({...}, cb)');
	
	var arr = ['alice', 'bob', 'charlie'];
	str = '', correctStr = 'alice,bob,charlie,';
	function vStrApp(k,v) { str += v + ','; }
	jQuery(arr).each(vStrApp);
	equals(str, correctStr, '$([...]).each(cb)');
	str = '';
	jQuery.each(arr, vStrApp);
	equals(str, correctStr, '$.each([...], cb)');
});

test('Chaining', function() {
	expect(2);
	function nodify(v, k) { return '<' + k + '>' + v + '</' + k + '>'; }
	var html = jQuery({div:3, span: 5, code: 7}).map(nodify).join('');
	equals(html, '<div>3</div><span>5</span><code>7</code>', 'Chain map & join');
	equals(jQuery(html).filter('div').text(), '3', 'Fun stuff after the chain.  Not all the useful, though.')
});

test('Prototyping', function() {
	expect(1);
	
	var Thing = jQuery.proto();
	var Creature = jQuery.proto(Thing);
	var Person = jQuery.proto(Creature);
	
	var bob = Person.make();
	ok(bob.is(Thing), 'Proto.is');
});
