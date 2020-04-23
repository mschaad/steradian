define(['Mocha', 'Chai', 'UnitRegistry', 'BaseUnit', 'test/StandardStrontiumFn'], 
function (mocha, chai, UnitRegistry, BaseUnit, StandardStrontiumFn) {
    var assert = chai.assert;
    
    var ok = assert.ok,
		deepEqual = assert.deepEqual,
        equal = assert.equal;
    
    var suite = mocha.suite, test = mocha.test;

    suite('UnitRegistry', function() {
        suite('get', function() {

            var Sr = StandardStrontiumFn();

            var reg = new UnitRegistry();

            reg.register(Sr.unit('meter'));
            reg.register(Sr.unit('Newton'));
    
            test('fails when unknown unit is requested', function() {
                assert.throws(function() {
                    reg.get('bogus');
                });
            });
    
            test('succeeds when known unit is requested', function() {
                ok(reg.get('meter'));
            });
    
            test('succeeds when known derived unit is requested', function() {
                ok(reg.get('Newton'));
            });
        });
    });
});