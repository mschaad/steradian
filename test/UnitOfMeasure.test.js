define(['src/UnitOfMeasure'], function (uom) {

	var ok = assert.ok,
		deepEqual = assert.deepEqual,
		equal = assert.equal;
	
	suite("basic sanity", function () {
		test('module returns object', function() {
			ok(uom);
		});
		
		test('quantity', function () {
			var meter = uom.defineBaseUnit({
				name: 'meter',
				type: 'length',
				symbol: 'm',
				scale: 1.0
			});
			
			var q1 = uom.quantity(meter, 2);
			ok(q1);
		});
		
		test('convertTo from one base unit to another base unit', function () {
			var meter = uom.defineBaseUnit({
				name: 'meter',
				type: 'length',
				symbol: 'm',
				scale: 1.0
			});
			
			var foot = uom.defineBaseUnit({
				name: 'foot',
				type: 'length',
				symbol: 'ft',
				scale: 3.28084
			});
			
			var q1 = uom.quantity(meter, 2);
			var q2 = q1.convertTo(foot);
			
			equal(q2.unit.name, 'foot');
			equal(q2.value, 6.56168);
		});
		
		test('convertTo from one derived unit to another derived unit', function () {
			var meter = uom.defineBaseUnit({
				name: 'meter',
				type: 'length',
				symbol: 'm',
				scale: 1.0
			});
			
			var second = uom.defineBaseUnit({
				name: 'second',
				type: 'time',
				symbol: 's',
				scale: 60.0
			});
			
			var minute = uom.defineBaseUnit({
				name: 'minute',
				type: 'time',
				symbol: 'min',
				scale: 1.0
			});
			
			var foot = uom.defineBaseUnit({
				name: 'foot',
				type: 'length',
				symbol: 'ft',
				scale: 3.28084
			});
			
			var metersPerSecond = uom.defineDerivedUnit([
				{ unit: meter, power: 1 },
				{ unit: second, power: -1 }
			]);
			
			var feetPerMinute = uom.defineDerivedUnit([
				{ unit: foot, power: 1 },
				{ unit: minute, power: -1 }
			]);
			
			var q1 = uom.quantity(metersPerSecond, 2);
			var q2 = q1.convertTo(feetPerMinute);
			
			//equal(q2.unit.name, 'foot');
			equal(q2.value, 393.7008);
		});
	});
});