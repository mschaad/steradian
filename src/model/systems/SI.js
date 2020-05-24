define(['Units', 'System'], function(Units,System) {

    var unit = Units.createBaseUnit,
        derivedUnit = Units.createDerivedUnit;

    var meter = unit({
        name: 'meter',
        type: 'length',
        symbol: 'm',
        scale: 1.0
    });

    var kilogram = unit({
        name: 'kilogram',
        type: 'mass',
        symbol: 'kg',
        scale: 1.0
    });

    var second = unit({
        name: 'second',
        type: 'time',
        symbol: 's',
        scale: 1.0
    });

    var ampere = unit({
        name: 'ampere',
        type: 'current',
        symbol: 'A',
        scale: 1.0
    });

    var degreeKelvin = unit({
        name: 'degree kelvin',
        type: 'absoluteTemperature',
        symbol: '°K',
        scale: 1.0
    });

    var degreeCelsius = unit({
        name: 'degree celsius',
        type: 'temperature',
        symbol: '°C',
        scale: 1.0
    });

    var candela = unit({
        name: 'candela',
        type: 'luminousIntensity',
        symbol: 'cd',
        scale: 1.0
    });

    var newton = derivedUnit({
        name: 'newton',
        units: [
            { unit: kilogram, power: 1 },
            { unit: meter, power: 1 },
            { unit: second, power: -2 }
        ],
        symbol: "N",
        scale: 1.0,
    });

    var joule = derivedUnit({
        name: 'joule',
        units: [
            { unit: newton, power: 1 },
            { unit: meter, power: 1 }
        ],
        symbol: "J",
        scale: 1.0,
    });
    
    return System.create({
        name: "SI",
        base: {
            length: meter,
            mass: kilogram,
            time: second,
            current: ampere,
            temperature: degreeCelsius,
            absoluteTemperature: degreeKelvin,
            //'amount'
            luminousIntensity: candela
        },
        derived: {
            ENERGY: joule,
            //charge: coulomb
            FORCE: newton
        },
        other: [

        ]
    });
});