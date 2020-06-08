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
            energy: {
                name: 'joule',
                units: [
                    { unit: 'newton', power: 1 },
                    { unit: 'meter', power: 1 }
                ],
                symbol: "J",
                scale: 1.0
            },
            force: {
                name: 'newton',
                units: [
                    { unit: 'kilogram', power: 1 },
                    { unit: 'meter', power: 1 },
                    { unit: 'second', power: -2 }
                ],
                symbol: "N",
                scale: 1.0
            },
            angle: {
                name: 'radian',
                units: [
                    { unit: 'meter', power: 1 },
                    { unit: 'meter', power: -1 }
                ],
                symbol: 'rad',
                scale: 1.0
            },
            solidAngle: {
                name: 'steradian',
                units: [
                    { unit: 'meter', power: 2 },
                    { unit: 'meter', power: -2 }
                ],
                symbol: 'sr',
                scale: 1.0
            },
            frequency: {
                name: 'hertz',
                units: [
                    { unit: 'second', power: -1 }
                ],
                symbol: 'Hz',
                scale: 1.0
            },
            pressure: {
                name: 'pascal',
                units: [
                    { unit: 'newton', power: 1 },
                    { unit: 'meter', power: -2 }
                ],
                symbol: 'Pa',
                scale: 1.0
            },
            power: {
                name: 'watt',
                units: [
                    { unit: 'joule', power: 1 },
                    { unit: 'second', power: -1 }
                ],
                symbol: 'W',
                scale: 1.0
            },
            electricCharge: {
                name: 'coulomb',
                units: [
                    { unit: 'ampere', power: 1 },
                    { unit: 'second', power: 1 }
                ],
                symbol: 'C',
                scale: 1.0
            },
            electricPotentialDifference: {
                name: 'volt',
                units: [
                    { unit: 'watt', power: 1 },
                    { unit: 'ampere', power: -1 }
                ],
                symbol: 'V',
                scale: 1.0
            },
            capacitance: {
                name: 'farad',
                units: [
                    { unit: 'coulomb', power: 1 },
                    { unit: 'volt', power: -1 }
                ],
                symbol: 'F',
                scale: 1.0
            },
            electricResistance: {
                name: 'ohm',
                units: [
                    { unit: 'volt', power: 1 },
                    { unit: 'ampere', power: -1 }
                ],
                symbol: 'Ω',
                scale: 1.0
            },
            electricConductance: {
                name: 'siemens',
                units: [
                    { unit: 'ampere', power: 1 },
                    { unit: 'volt', power: -1 }
                ],
                symbol: 'S',
                scale: 1.0
            },
            magneticFlux: {
                name: 'weber',
                units: [
                    { unit: 'volt', power: 1 },
                    { unit: 'second', power: 1 }
                ],
                symbol: 'Wb',
                scale: 1.0
            },
            magneticFluxDensity: {
                name: 'tesla',
                units: [
                    { unit: 'weber', power: 1 },
                    { unit: 'meter', power: -2 }
                ],
                symbol: 'T',
                scale: 1.0
            },
            inductance: {
                name: 'henry',
                units: [
                    { unit: 'weber', power: 1 },
                    { unit: 'ampere', power: -1 }
                ],
                symbol: 'H',
                scale: 1.0
            },
            luminousFlux: {
                name: 'lumen',
                units: [
                    { unit: 'candela', power: 1 },
                    { unit: 'steradian', power: 1 }
                ],
                symbol: 'lm',
                scale: 1.0
            },
            illuminance: {
                name: 'lux',
                units: [
                    { unit: 'lumen', power: 1 },
                    { unit: 'meter', power: -2 }
                ],
                symbol: 'lx',
                scale: 1.0
            },
            radionuclideActivity: {
                name: 'becquerel',
                units: [
                    { unit: 'second', power: -1 }
                ],
                symbol: 'Bq',
                scale: 1.0
            },
            absorbedDose: {
                name: 'gray',
                units: [
                    { unit: 'joule', power: 1 },
                    { unit: 'kilogram', power: -1 }
                ],
                symbol: 'Gy',
                scale: 1.0
            },
            doseEquivalent: {
                name: 'sievert',
                units: [
                    { unit: 'joule', power: 1 },
                    { unit: 'kilogram', power: -1 }
                ],
                symbol: 'Sv',
                scale: 1.0
            },
            catalyticActivity: {
                name: 'katal',
                units: [
                    { unit: 'second', power: -1 }
                ],
                symbol: 'kat',
                scale: 6.022E23
            }
        },
        other: [
        ]
    });
});