define(['Mocha', 'Chai', 'Steradian', 'test/StandardUnitDefinitions'], 
function (mocha, chai, Steradian, StandardUnitDefinitions) {
    var assert = chai.assert;

    var suite = mocha.suite, test = mocha.test;

	var equal = assert.equal;
        
    function newSteradian() {
        var Sr = Steradian();
        StandardUnitDefinitions.install(Sr);
        return Sr;
    }
	
	suite("BaseUnit", function () {
        test("type is BaseUnit", function() {
            var Sr = newSteradian();
            var meter = Sr.unit("meter");
            equal(meter.constructor.name, "BaseUnit");
        });

        suite("toString", function() {
            var Sr = newSteradian();
            var meter = Sr.unit("meter");
            
            test("m", function() {
               equal("m", meter.toString()); 
            });
        });

        test("isBaseUnit", function() {
            var Sr = newSteradian();
            var meter = Sr.unit("meter");
            equal(true, meter.isBaseUnit());
        });
    });
});