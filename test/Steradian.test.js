define(['Mocha', 'Chai', 'steradian', 'test/StandardSteradianFn', 'model/systems/SI_def'], 
function (mocha, chai, Steradian, StandardSteradianFn, SI_def) {
	var assert = chai.assert;

	var ok = assert.ok,
		equal = assert.equal,
		closeTo = assert.closeTo;

	var suite = mocha.suite, test = mocha.test;

	function requireSI() {
		var Sr = Steradian();
		return Sr.system(SI_def);
	}
	
	suite("Steradian", function () {
		test('module returns object', function() {
			ok(Steradian);
		});

		test('module has standard systems installed', function() {
			ok(Steradian.system("SI"));
			ok(Steradian.system("Imperial"));
		});
		
		suite("quantity", function() {
			test('works with Unit object', function () {
				var Sr = Steradian();
				
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
				var Sr = Steradian();
				
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
				/* jshint -W098 */
				var Sr = Steradian();
				
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
				assert.equal("Newton", Newton.name());
			});
		});

		
		suite("derivedUnit", function() {
			test("happy path", function() {
				var Sr = StandardSteradianFn();

				var metersPerSecond = Sr.derivedUnit({
					name: "meterPerSecond",
					symbol: "mps",
					units: [
						{ unit: "meter", power: 1 },
						{ unit: "second", power: -1 }
					]
				});

				ok(metersPerSecond);
				equal(metersPerSecond.name(), "meterPerSecond");
				equal(metersPerSecond.symbol(), "mps");
				equal(metersPerSecond.expression().toString(), "m/s");
			});
		});

		suite('systems', function() {
			test('can register System', function() {
				var Sr = StandardSteradianFn();

				var SI = requireSI();

				Sr.system(SI);
			});

			test('can register System, by definition', function() {
				var Sr = Steradian();

				var system = Sr.system({
					name: "FakeSystem",
					base: {
						length: Sr.unit({
							name: 'meter',
							type: 'length',
							symbol: 'm',
							scale: 1.0
						}),
						mass: Sr.unit({
							name: 'kilogram',
							type: 'mass',
							symbol: 'kg',
							scale: 1.0
						}),
						time: Sr.unit({
							name: 'second',
							type: 'time',
							symbol: 's',
							scale: 1.0
						}),
						current: Sr.unit({
							name: 'ampere',
							type: 'current',
							symbol: 'A',
							scale: 1.0
						}),
						temperature: Sr.unit({
							name: 'degree celsius',
							type: 'temperature',
							symbol: '°C',
							scale: 1.0
						}),
						absoluteTemperature: Sr.unit({
							name: 'degree kelvin',
							type: 'absoluteTemperature',
							symbol: '°K',
							scale: 1.0
						}),
						//'amount'
						luminousIntensity: Sr.unit({
							name: 'candela',
							type: 'luminousIntensity',
							symbol: 'cd',
							scale: 1.0
						})
					},
					derived: {},
					other: []
				});

				ok(system);
				ok(system.name(), "FakeSystem");
				ok(system.length().name, "meter");
				ok(system.luminousIntensity().name(), "candela");
			});

			test('can retrieve system', function() {
				var Sr = StandardSteradianFn();

				var SI = requireSI();

				Sr.system(SI);

				var retrievedSI = Sr.system('SI');
				ok(retrievedSI);
			});
		});

		suite("convert", function() {
			suite('can convert from one base unit to another base unit', function () {
				var Sr = StandardSteradianFn();
				
				test('can convert meters to feet', function() {
					var q1 = Sr.quantity('meter', 2);
					var q2 = Sr.convert(q1, 'foot');
					
					equal(q2.units().toString(), 'ft');
					equal(q2.value(), 6.56168);
				});
				
				test('can convert feet to meters', function() {
					var q1 = Sr.quantity('foot', 6);
					var q2 = Sr.convert(q1, 'meter');
					
					equal(q2.units().toString(), 'm');
					closeTo(q2.value(), 1.8288, 1e-5);
				});
			});
			
			test('can convert from one derived unit to another derived unit', function () {
				var Sr = StandardSteradianFn();

				Sr.unit({
					name: 'decasecond',
					symbol: "das",
					scale: 10,
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

				Sr.unit({
					name: 'hectosecond',
					symbol: "hs",
					scale: 100,
					type: 'time'
				});
				
				var feetSquaredPerHectosecondSquared = Sr.derivedUnit({
					name: "feetSquaredPerHectosecondSquared",
					symbol: "ft^2/hs^2",
					units: [
						{ unit: 'foot', power: 2 },
						{ unit: 'hectosecond', power: -2 }
					]
				});
				
				var q1 = Sr.quantity(metersSquaredPerDecasecondSquared, 2000);
				var q2 = Sr.convert(q1, feetSquaredPerHectosecondSquared);
				
				equal(q2.units().toString(), 'ft^2/hs^2');
				closeTo(q2.value(), 215.278, 5e-4);
			});

			test('can convert from one complex derived unit to another complex derived unit', function () {
				var Sr = StandardSteradianFn();
					
				// 	//F = ma
				// 	//N = kg * m / s^2
					
				var Newton = Sr.unit('Newton');
					
				var qNewtons = Sr.quantity(Newton, 1);
				ok(qNewtons);

				// 	//F = ma
				// 	// lb = slug * (feet / s^2)
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
				assert.closeTo(qPounds.value(), 0.224809, 1e-7);
			});

			test('can convert units to a standard system', function() {
				var Sr = StandardSteradianFn();
				//F = ma
				//N = kg * m / s^2
				//lb = slug * (feet / s^2)
				var pound = Sr.derivedUnit({
					name: "pound",
					symbol: "lb",
					units: [
						{ unit: 'slug', power: 1 },
						{ unit: 'foot', power: 1 },
						{ unit: 'second', power: -2 }
					]
				});

				var SI = requireSI();
				SI = Sr.system(SI);

				var qPounds = Sr.quantity(pound, 1);

				var qNewtons = Sr.convert(qPounds, SI);
				
				//1 slug ft/s^2 = 4.44822162 newtons
				assert.closeTo(qNewtons.value(), 4.4482, 5e-5);
				equal(qNewtons.units().toString(), "N");
			});
		});
	});
});
