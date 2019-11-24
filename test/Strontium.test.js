define(['mocha', 'chai', 'Strontium', 'Unit', 'test/StandardStrontiumFn'], function (mocha, chai, Strontium, Unit, StandardStrontiumFn) {
	var assert = chai.assert;

	var ok = assert.ok,
		deepEqual = assert.deepEqual,
		equal = assert.equal;
	
	var suite = mocha.suite, test = mocha.test;
	
	suite("Strontium", function () {
		test('module returns object', function() {
			ok(Strontium);
		});
		
		suite("quantity", function() {
			test('works with Unit object', function () {
				var Sr = Strontium();
				
				var meter = Sr.unit({
					name: 'meter',
					type: 'length',
					symbol: 'm',
					scale: 1.0
				});
				
				var q1 = Sr.quantity(meter, 2);
				ok(q1);
			});
		});

		suite("unit(string)", function() {
			test('can get registered unit', function () {
				var Sr = Strontium();
				
				var meter = Sr.unit({
					name: 'meter',
					type: 'length',
					symbol: 'm',
					scale: 1.0
				});
				
				var actual = Sr.unit("meter");

				ok(actual);
				assert.equal(actual, meter);
			});

			test('can get registered derived unit', function () {
				var Sr = Strontium();
				
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
					scale: 1.0
				});

				var kilogram = Sr.unit({
					name: 'kilogram',
					type: 'mass',
					symbol: 'kg',
					scale: 1.0
				});

				var Newton = Sr.derivedUnit({
					name: "Newton",
					symbol: "N",
					units: [
						{ unit: "kilogram", power: 1 },
						{ unit: "meter", power: 1 },
						{ unit: "second", power: -2 }
					]
				});
				
				var actual = Sr.unit("Newton");

				ok(actual);
				assert.equal(actual, Newton);
				assert.equal("Newton", Newton.name);
			});
		});
		
		suite("derivedUnit", function() {
			test("happy path", function() {
				var Sr = StandardStrontiumFn();

				var metersPerSecond = Sr.derivedUnit({
					name: "meterPerSecond",
					symbol: "mps",
					units: [
						{ unit: "meter", power: 1 },
						{ unit: "second", power: -1 }
					]
				});

				ok(metersPerSecond);
				assert.isTrue(Unit.isUnit(metersPerSecond));
			});
		});

		suite("convert", function() {
			test('can convert from one base unit to another base unit', function () {
				var Sr = StandardStrontiumFn();
				
				var q1 = Sr.quantity('meter', 2);
				var q2 = Sr.convert(q1, 'foot');
				
				equal(q2.unitExpression().toString(), 'ft');
				equal(q2.value, 6.56168);
			});
			
			test('can convert from one derived unit to another derived unit', function () {
				var Sr = StandardStrontiumFn();

				var decaSecond = Sr.unit({
					name: 'decasecond',
					symbol: "das",
					scale: 1/10,
					type: 'time'
				});

				var metersSquaredPerDecasecondSquared = Sr.derivedUnit({
					name: "meterSquaredPerDecasecondSquared",
					symbol: "m^2/das^2",
					units: [
						{ unit: 'meter', power: 2 },
						{ unit: 'decasecond', power: -2 }
					]
				});

				var hectoSecond = Sr.unit({
					name: 'hectosecond',
					symbol: "hs",
					scale: 1/100,
					type: 'time'
				});
				
				var feetSquaredPerDecasecondSquared = Sr.derivedUnit({
					name: "feetSquaredPerHectosecondSquared",
					symbol: "ft^2/hs^2",
					units: [
						{ unit: 'foot', power: 2 },
						{ unit: 'hectosecond', power: -2 }
					]
				});
				
				var q1 = Sr.quantity(metersSquaredPerDecasecondSquared, 2);
				var q2 = Sr.convert(q1, feetSquaredPerDecasecondSquared);
				
				equal(q2.unitExpression().toString(), 'ft^2/hs^2');
				equal(q2.value, 21527822.211199996);
			});

			test('can convert from one complex derived unit to another complex derived unit', function () {
				var Sr = StandardStrontiumFn();
				
				//F = ma
				//N = kg * m / s^2
				
				var Newton = Sr.derivedUnit({
					name: "Newton",
					symbol: "N",
					units: [
						{ unit: 'kilogram', power: 1 },
						{ unit: 'meter', power: 1 },
						{ unit: 'second', power: -2 }
					]
				});
				
				var qNewtons = Sr.quantity(Newton, 1);
				ok(qNewtons);

				//F = ma
				// lb = slug * (feet / s^2)
				var pound = Sr.derivedUnit({
					name: "pound",
					symbol: "lb",
					units: [
						{ unit: 'slug', power: 1 },
						{ unit: 'foot', power: 1 },
						{ unit: 'second', power: -2 }
					]
				});

				var qPounds = Sr.convert(qNewtons, pound);
				
				//1 slug ft/s^2 = 4.44822162 newtons
				//1 N = 0.224808942 slug-ft/s^2
				assert.closeTo(qPounds.value, 0.224809, 1e-7);
			});
		});
	});
});