module("crazy");

test("Constructors", function() {
	expect(5);
	
	ok( jQuery({}), "$({})" );
	
	var obj = jQuery({name: 'Bob', age: 42});
	equals(obj.name, 'Bob', '$({key: value}) === value');
	obj.race = 'Human';
	equals(obj.race, 'Human', 'Object extension');
	equals(obj.count(), 3, '$({}).count()');
	equals(obj.map(function(v) { return v.length; }).name, 3, 'Mapped object values')
});


test('Map', function() {
	expect(1);
	
	equals(1, jQuery.map({a:1}, function() { return this; }).length, 'map on Object');
});