define(['mocha', 'chai', 'Strontium', 'Unit', 'DerivedUnit', 'test/StandardStrontiumFn'], 
function (mocha, chai, Strontium, Unit, DerivedUnit, StandardStrontiumFn) {
    var assert = chai.assert;
    
    var ok = assert.ok,
		deepEqual = assert.deepEqual,
        equal = assert.equal;
    
    var suite = mocha.suite, test = mocha.test;

	suite("DerivedUnit", function () {
        var Sr = StandardStrontiumFn();

        var metersPerSecond = Sr.defineDerivedUnit([
            { unit: "meter", power: 1 },
            { unit: "second", power: -1 }
        ]);

        test("module returns object", function() {
            ok(DerivedUnit);
        });

        test("instances have appropriate methods", function() {
            ok(metersPerSecond.getDimensions);
            ok(metersPerSecond.getTerms);
        });

        suite('toString', function() {
            var Sr = StandardStrontiumFn();

            test('m/s', function() {
                var meterPerSecond = Sr.defineDerivedUnit([
                    { unit: 'meter', power: 1 },
                    { unit: 'second', power: -1 }
                ]);
    
                equal('m/s', meterPerSecond.toString());
            });
            
            test("m/s^2", function() {
                var meterPerSecondSq = Sr.defineDerivedUnit([
                    { unit: 'meter', power: 1 },
                    { unit: 'second', power: -2 }
                ]);
    
                equal('m/s^2', meterPerSecondSq.toString());
            });

            test("m s", function() {
                var meterSecond = Sr.defineDerivedUnit([
                    { unit: 'meter', power: 1 },
                    { unit: 'second', power: 1 }
                ]);
    
                equal('m s', meterSecond.toString());
            });

            test("m^2", function() {
                var meterSquared = Sr.defineDerivedUnit([
                    { unit: 'meter', power: 2 }
                ]);
    
                equal('m^2', meterSquared.toString());
            });

            test("m^0", function() {
                var meterSquared = Sr.defineDerivedUnit([
                    { unit: 'meter', power: 0 }
                ]);
    
                equal('', meterSquared.toString());
            });
        });
    })
});