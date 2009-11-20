module("crazy");

test("Object Constructors", function() {
	expect(6);
	
	ok( jQuery({}), "$({})" );
	
	var name = 'Bob Smith'
	var obj = jQuery({name: name, age: 42});
	equals(obj.name, name, '$({key: value}) === value');
	equals(obj.size(), 2, '$({...}).size()');
	obj.race = 'Human';
	equals(obj.race, 'Human', 'Object extension');
	equals(obj.size(), 3, '$({...}).size()');
	
	delete obj.name;
	equals(obj.size(), 2, 'Object size after delete');
	
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
	
	equals(1, jQuery.map({a:3}, function(v) { return v; }).size(), 'Size of map on Object');
	equals(7, jQuery.map({a:3, b:7}, function(v) { return v; }).b, 'Value from map on Object');
	
	var name = 'Bob Smith'
	var obj = jQuery({name: name, age: 42});
	obj.race = 'Human';
	
	var mappedValues = obj.map(function(v) { return (v + '').length; });
	equals(mappedValues.name, name.length, 'Mapped object values');
	equals(mappedValues.size(), 3, 'Number of mapped values');
	
});

test('Each', function() {
	expect(0);
	
	
});

test('Chaining', function() {
	expect(2);
	function nodify(v, k) { return '<' + k + '>' + v + '</' + k + '>'; }
	var html = jQuery({div:3, span: 5, code: 7}).map(nodify).join('');
	equals(html, '<div>3</div><span>5</span><code>7</code>', 'Chain map & join');
	equals(jQuery(html).filter('div').text(), '3', 'Fun stuff after the chain.  Not all the useful, though.')
});

