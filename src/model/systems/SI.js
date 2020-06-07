define(['System'], function(System) {    
    return System.create({
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
            ENERGY: {
                name: 'joule',
                units: [
                    { unit: 'newton', power: 1 },
                    { unit: 'meter', power: 1 }
                ],
                symbol: "J",
                scale: 1.0,
            },
            //charge: coulomb
            FORCE: {
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
    });
});