module('core');

test('units', function() {
	ok(UnitTypes.distance);
	ok(UnitTypes.speed);
	ok(UnitTypes.area);
	ok(UnitTypes.time);
	ok(UnitTypes.acceleration);
	ok(!('foo' in UnitTypes));
});

test('times', function() {
	var actual = SI.meters(5).times(SI.seconds(2));
	var expected = new Quantity(10, {meters: 1, seconds: 1});
	quantityEqual(actual, expected);
});

test('times: check precision', function() {
	var _5m = new Quantity(5.0, { meters: 1 }, 2);
	var _2s = new Quantity(2.0, { seconds: 1 }, 1);
	var actual = _5m.times(_2s);
	
	var expected = new Quantity(10, { meters: 1, seconds: 1}, 1);
	quantityEqual(actual, expected);
});

test('divide', function() {
	var actual = SI.meters(5).dividedBy(SI.seconds(2));
	var expected = new Quantity(2.5, {meters: 1, seconds: -1});
	quantityEqual(actual, expected);
});

function quantityEqual(q1, q2) {
	equal(q1.value(), q2.value());
	unitsEqual(q1.units(), q2.units());
	equal(q1.precision(), q2.precision());
}

function unitsEqual(u1, u2) {
	deepEqual(u1, u2);
}