define([
    'Mocha', 'Chai', 
    'UnitRegistry', 'UnitType', 'DerivedUnitType', 'Units',
    'test/StandardStrontiumFn','model/systems/SI', 'model/systems/Imperial'
], 
function (
    mocha, chai, 
    UnitRegistry, UnitType, DerivedUnitType, Units,
    StandardStrontiumFn, SI, Imperial
    ) {
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
            suite('register (Unit)', function() {
                var Sr = StandardStrontiumFn();
    
                var reg = new UnitRegistry();
                var meter = Sr.unit('meter');

                reg.register(meter);
        
                test('does nothing when known unit is re-registered', function() {
                    reg.register(meter);
                });

                test('does nothing when equivalent unit is re-registered', function() {
                    var duplicateMeter = Units.createBaseUnit({
                        name: 'meter',
                        type: 'length',
                        symbol: 'm',
                        scale: 1
                    });
                    reg.register(duplicateMeter);
                });
            });
        });
        suite('units and systems', function() {    
            var reg = new UnitRegistry();
            reg.registerSystem(SI);
            reg.registerSystem(Imperial);

            suite('tryGetUnitOfType', function() {
                test('happy path, UnitType', function() {
                    var maybeUnit = reg.tryGetUnitOfType(UnitType.length, 'SI');
                    ok(maybeUnit);
                    equal(maybeUnit.name(), "meter");
                });

                test('happy path, DerivedUnitType', function() {
                    var maybeUnit = reg.tryGetUnitOfType(DerivedUnitType.ENERGY, 'SI');
                    ok(maybeUnit);
                    equal(maybeUnit.name(), "joule");
                });

                test('happy path, string', function() {
                    var maybeUnit = reg.tryGetUnitOfType('length', 'SI');
                    ok(maybeUnit);
                    equal(maybeUnit.name(), "meter");
                });

                test('returns false when unit does not exist', function() {
                    var maybeUnit = reg.tryGetUnitOfType("FAKE", 'SI');
                    equal(maybeUnit, false);
                });
            });
            suite('tryGetUnitOfDimensions', function() {
                test('when unit exists: BaseUnit', function() {
                    var meter = SI.length();
                    var foot = reg.tryGetUnitOfDimensions(meter.dimensions(), 'Imperial');
                    equal(foot.name(), "foot");
                });

                test('when unit exists: DerivedUnit', function() {
                    var joule = SI.ENERGY();
                    var footPound = reg.tryGetUnitOfDimensions(joule.dimensions(), 'Imperial');
                    equal(footPound.name(), "foot-pound");
                });

                test('when unit does not exist', function() {
                    var jouleSquared = SI.ENERGY().expression().pow(2);
                    var result = reg.tryGetUnitOfDimensions(jouleSquared.dimensions(), 'SI');
                    equal(result, false);
                });
            });
        });
    });
});