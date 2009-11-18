module("crazy");

test("Constructors", function() {
	expect(6);
	
	ok( jQuery({}), "$({})" );
	
	var obj = jQuery({name: 'Bob', age: 42});
	equals(obj.name, 'Bob', '$({key: value}) === value');
	equals(obj.size(), 2, '$({...}).size()');
	obj.race = 'Human';
	equals(obj.race, 'Human', 'Object extension');
	equals(obj.size(), 3, '$({...}).size()');
	equals(obj.map(function(v) { return v.length; }).name, 3, 'Mapped object values')
});


test('Map', function() {
	expect(1);
	
	equals(1, jQuery.map({a:1}, function() { return this; }).length, 'map on Object');
});