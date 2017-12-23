define(['src/Strontium', 'src/Unit', 'test/StandardUnitDefinitions'], 
function (Strontium, Unit, StandardUnitDefinitions) {

	var ok = assert.ok,
		deepEqual = assert.deepEqual,
        equal = assert.equal;
        
    function newStrontium() {
        var Sr = Strontium();
        StandardUnitDefinitions.install(Sr);
        return Sr;
    }
	
	suite("Unit", function () {
        suite("isUnit", function() {
            var Sr = newStrontium();
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

            var fooPerBar = Sr.defineDerivedUnit([
                { unit: foo, power: 1 },
                { unit: bar, power: -1 }
            ]);

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