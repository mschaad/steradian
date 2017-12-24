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
    })
});