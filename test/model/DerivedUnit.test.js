define([
    'Mocha', 'Chai', 
    'Strontium', 'Unit', 'DerivedUnit', 'UnitType',
    'test/StandardStrontiumFn'], 
function (
    mocha, chai, 
    Strontium, Unit, DerivedUnit, UnitType,
    StandardStrontiumFn
) {
    var assert = chai.assert;
    
    var ok = assert.ok,
		deepEqual = assert.deepEqual,
        equal = assert.equal;
    
    var suite = mocha.suite, test = mocha.test;

	suite("DerivedUnit", function () {
        test("module returns object", function() {
            ok(DerivedUnit);
        });
        
        var Sr = StandardStrontiumFn();

        var Millisecond = Sr.unit({
            name: 'millisecond', 
            symbol: 'ms', 
            type: 'time', 
            scale: 0.001
        });

        var Newton = Sr.unit('Newton');

        var slug = Sr.unit('slug');
        var foot = Sr.unit('foot');

        suite('constructor', function() {
            var FakeForce = Sr.derivedUnit({
                name: "FakeForce",
                symbol: "ff",
                scale: 2.0,
                units: [
                    { unit: "slug", power: 1 },
                    { unit: "foot", power: 1 },
                    { unit: "millisecond", power: -2 }
                ]
            });

            test("scale has default value of 1.0", function() {
                var FakeForce2 = Sr.derivedUnit({
                    name: "FakeForce2",
                    symbol: "ff2",
                    units: [
                        { unit: "slug", power: 1 },
                        { unit: "foot", power: 1 },
                        { unit: "millisecond", power: -2 }
                    ]
                });

                var expected = 1.0 * slug.scale * foot.scale / Math.pow(Millisecond.scale, 2);

                equal(expected, FakeForce2.scale);
            });

            test("scale calculation", function() {
                var expected = 2.0 * slug.scale * foot.scale / Math.pow(Millisecond.scale, 2);
                equal(expected, FakeForce.scale);
            });
        })

        suite('dimensions', function() {
            var dim = Newton.dimensions();
            equal(3, dim.size());
            equal(1, dim.get(UnitType.mass));
            equal(1, dim.get(UnitType.length));
            equal(-2, dim.get(UnitType.time));
        });

        suite('toString', function() {
            var Sr = StandardStrontiumFn();

            test("Newton", function() {
                equal("N", Newton.toString());
            });
        });

        test("isBaseUnit", function() {
            equal(false, Newton.isBaseUnit());
        });
    })
});