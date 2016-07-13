define(['src/Strontium'], function (Sr) {

	var ok = assert.ok,
		deepEqual = assert.deepEqual,
		equal = assert.equal;
	
	suite("basic sanity", function () {
		test('module returns object', function() {
			ok(Sr);
		});
		
		test('quantity', function () {
			var meter = Sr.unit({
				name: 'meter',
				type: 'length',
				symbol: 'm',
				scale: 1.0
			});
			
			var q1 = Sr.quantity(meter, 2);
			ok(q1);
		});
		
		test('convertTo from one base unit to another base unit', function () {
			var meter = Sr.unit({
				name: 'meter',
				type: 'length',
				symbol: 'm',
				scale: 1.0
			});
			
			var foot = Sr.unit({
				name: 'foot',
				type: 'length',
				symbol: 'ft',
				scale: 3.28084
			});
			
			var q1 = Sr.quantity(meter, 2);
			var q2 = q1.convertTo(foot);
			
			equal(q2.unit.name, 'foot');
			equal(q2.value, 6.56168);
		});
		
		test('convertTo from one derived unit to another derived unit', function () {
			var meter = Sr.unit({
				name: 'meter',
				type: 'length',
				symbol: 'm',
				scale: 1.0
			});
			
			var second = Sr.unit({
				name: 'second',
				type: 'time',
				symbol: 's',
				scale: 60.0
			});
			
			var minute = Sr.unit({
				name: 'minute',
				type: 'time',
				symbol: 'min',
				scale: 1.0
			});
			
			var foot = Sr.unit({
				name: 'foot',
				type: 'length',
				symbol: 'ft',
				scale: 3.28084
			});
			
			var metersPerSecond = Sr.defineDerivedUnit([
				{ unit: meter, power: 1 },
				{ unit: second, power: -1 }
			]);
			
			var feetPerMinute = Sr.defineDerivedUnit([
				{ unit: foot, power: 1 },
				{ unit: minute, power: -1 }
			]);
			
			var q1 = Sr.quantity(metersPerSecond, 2);
			var q2 = q1.convertTo(feetPerMinute);
			
			//equal(q2.unit.name, 'foot');
			equal(q2.value, 393.7008);
		});
	});
});