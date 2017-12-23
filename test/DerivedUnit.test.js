define(['src/Strontium', 'src/Unit', 'src/DerivedUnit', 'test/StandardStrontiumFn'], 
function (Strontium, Unit, DerivedUnit, StandardStrontiumFn) {
	var ok = assert.ok,
		deepEqual = assert.deepEqual,
        equal = assert.equal;
	
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