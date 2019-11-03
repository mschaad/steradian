define(['mocha', 'chai', 'Strontium', 'Unit', 'BaseUnit', 'test/StandardUnitDefinitions'], 
function (mocha, chai, Strontium, Unit, BaseUnit, StandardUnitDefinitions) {
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
            var meter = Sr.getUnit("meter");
            
            test("m", function() {
               equal("m", meter.toString()); 
            });
        });
    });
});