define(['Mocha', 'Chai', 'UnitRegistry', 'test/StandardStrontiumFn', 'model/systems/SI'], 
function (mocha, chai, UnitRegistry, StandardStrontiumFn, SI) {
    var assert = chai.assert;
    
    var ok = assert.ok,
		deepEqual = assert.deepEqual,
        equal = assert.equal;
    
    var suite = mocha.suite, test = mocha.test;

    suite('UnitRegistry', function() {
        suite('systems', function() {
            suite('getSystem', function() {

                var Sr = StandardStrontiumFn();
    
                var reg = new UnitRegistry();
    
                reg.registerSystem(SI);
        
                test('fails when unknown system is requested', function() {
                    assert.throws(function() {
                        reg.getSystem('bogus');
                    }, "no System found by the name 'bogus'");
                });
        
                test('succeeds when known system is requested', function() {
                    ok(reg.getSystem('SI'));
                });
            });
        });
        suite('units', function() {
            suite('get', function() {

                var Sr = StandardStrontiumFn();
    
                var reg = new UnitRegistry();
    
                reg.register(Sr.unit('meter'));
                reg.register(Sr.unit('Newton'));
        
                test('fails when unknown unit is requested', function() {
                    assert.throws(function() {
                        reg.get('bogus');
                    }, "no Unit found by the name 'bogus'");
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
});