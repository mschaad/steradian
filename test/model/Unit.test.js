define(['Mocha', 'Chai', 'Steradian', 'Unit', 'test/StandardUnitDefinitions'], 
function (mocha, chai, Steradian, Unit, StandardUnitDefinitions) {
    var assert = chai.assert;

    var suite = mocha.suite, test = mocha.test;
        
    function newSteradian() {
        var Sr = Steradian();
        StandardUnitDefinitions.install(Sr);
        return Sr;
    }
	
	suite("Unit", function () {
        suite("isUnit", function() {
            var Sr = newSteradian();
            var foo = Sr.unit({
                name: "Foo",
                type: "length",
                symbol: "foo",
                scale: 1.0
            });

            var bar = Sr.unit({
                name: "Bar",
                type: "time",
                symbol: "bar",
                scale: 1.0
            });

            var fooPerBar = Sr.derivedUnit({
                name: "fooPerBar",
                symbol: "fpb",
                units: [
                    { unit: foo, power: 1 },
                    { unit: bar, power: -1 }
                ]
            });

            test('returns true for Unit object', function() {                
                assert.isTrue(Unit.isUnit(foo));
            });

            test('returns false for {}', function() {
                assert.isFalse(Unit.isUnit({}));
            });

            test('returns true for DerivedUnit object', function() {
                assert.isTrue(Unit.isUnit(fooPerBar));
            });
        });
    });
});