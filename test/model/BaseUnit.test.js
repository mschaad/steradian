define(['Mocha', 'Chai', 'Strontium', 'test/StandardUnitDefinitions'], 
function (mocha, chai, Strontium, StandardUnitDefinitions) {
    var assert = chai.assert;

    var suite = mocha.suite, test = mocha.test;

	var ok = assert.ok,
		deepEqual = assert.deepEqual,
        equal = assert.equal;
        
    function newStrontium() {
        var Sr = Strontium();
        StandardUnitDefinitions.install(Sr);
        return Sr;
    }
	
	suite("BaseUnit", function () {
        suite("toString", function() {
            var Sr = newStrontium();
            var meter = Sr.unit("meter");
            
            test("m", function() {
               equal("m", meter.toString()); 
            });
        });

        test("isBaseUnit", function() {
            var Sr = newStrontium();
            var meter = Sr.unit("meter");
            equal(true, meter.isBaseUnit());
        });
    });
});