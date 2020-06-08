define(['Mocha', 'Chai', 'logic/SystemDefinitionFixer'], 
function(mocha, chai, SystemDefinitionFixer) {
    var suite = mocha.suite,
        test = mocha.test,
        assert = chai.assert,
        ok = assert.ok,
        equal = assert.equal;

    var siDef = getSIDefinition();

    suite('SystemDefinitionFixer', function() {
        test('happy path', function() {
            var fixedDef = SystemDefinitionFixer(siDef);

            var meter = fixedDef.base.length;
            ok(meter);
            
            var joule = fixedDef.derived.energy;
            ok(joule);
            equal("joule", joule.name());
            equal("N m", joule.expression().toString());

            var newton = fixedDef.derived.force;
            ok(newton);
            equal('newton', newton.name());
            equal("kg m/s^2", newton.expression().toString());
        });

        test('can cope with partial system definition', function() {
            var mangledSIDef = getSIDefinition();
            mangledSIDef.derived.energy = null;
            var fixedDef = SystemDefinitionFixer(siDef);
            ok(fixedDef);
        });
    });

    function getSIDefinition() {
        return {
            name: "SI",
            base: {
                length: {
                    name: 'meter',
                    type: 'length',
                    symbol: 'm',
                    scale: 1.0
                },
                mass: {
                    name: 'kilogram',
                    type: 'mass',
                    symbol: 'kg',
                    scale: 1.0
                },
                time: {
                    name: 'second',
                    type: 'time',
                    symbol: 's',
                    scale: 1.0
                },
                current: {
                    name: 'ampere',
                    type: 'current',
                    symbol: 'A',
                    scale: 1.0
                },
                temperature: {
                    name: 'degree celsius',
                    type: 'temperature',
                    symbol: '°C',
                    scale: 1.0
                },
                absoluteTemperature: {
                    name: 'degree kelvin',
                    type: 'absoluteTemperature',
                    symbol: '°K',
                    scale: 1.0
                },
                //'amount'
                luminousIntensity: {
                    name: 'candela',
                    type: 'luminousIntensity',
                    symbol: 'cd',
                    scale: 1.0
                }
            },
            derived: {
                energy: {
                    name: 'joule',
                    units: [
                        { unit: 'newton', power: 1 },
                        { unit: 'meter', power: 1 }
                    ],
                    symbol: "J",
                    scale: 1.0,
                },
                //charge: coulomb
                force: {
                    name: 'newton',
                    units: [
                        { unit: 'kilogram', power: 1 },
                        { unit: 'meter', power: 1 },
                        { unit: 'second', power: -2 }
                    ],
                    symbol: "N",
                    scale: 1.0,
                }
            },
            other: [

            ]
        };
    }
});