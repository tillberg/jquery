module("crazy");

test("Constructors", function() {
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