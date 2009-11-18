module("crazy");

test("Constructors", function() {
	expect(7);
	
	ok( jQuery({}), "$({})" );
	
	var name = 'Bob Smith'
	var obj = jQuery({name: name, age: 42});
	equals(obj.name, name, '$({key: value}) === value');
	equals(obj.size(), 2, '$({...}).size()');
	obj.race = 'Human';
	equals(obj.race, 'Human', 'Object extension');
	equals(obj.size(), 3, '$({...}).size()');
	
	var mappedValues = obj.map(function(v) { return (v + '').length; });
	equals(mappedValues.name, name.length, 'Mapped object values');
	equals(mappedValues.size(), 3, 'Number of mapped values')
});


test('Map', function() {
	expect(1);
	
	equals(1, jQuery.map({a:1}, function() { return this; }).length, 'map on Object');
});