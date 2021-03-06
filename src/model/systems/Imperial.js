define(['Units', 'System'], function(Units,System) {

    var unit = Units.createBaseUnit;
    var derivedUnit = Units.createDerivedUnit;
    
    var foot = unit({
        name: 'foot',
        type: 'length',
        symbol: 'ft',
        scale: 3.28084
    });

    var slug = unit({
        name: 'slug',
        symbol: 'slug',
        type: 'mass',
        scale: 0.0685218
    });

    var second = unit({
        name: 'second',
        type: 'time',
        symbol: 's',
        scale: 1
    });

    var minute = unit({
        name: 'minute',
        type: 'time',
        symbol: 'min',
        scale: 1/60
    });

    var hour = unit({
        name: 'hour',
        type: 'time',
        symbol: 'hr',
        scale: 1/3600
    });

    var degreeRankine = unit({
        name: 'degreeRankine',
        type: 'absoluteTemperature',
        symbol: '°R',
        scale: 9/5
    });

    var degreeFahrenheit = unit({
        name: 'degreeFahrenheit',
        type: 'temperature',
        symbol: '°F',
        scale: 9/5
    });

    //TODO: probably not right
    var ampere = unit({
        name: 'ampere',
        type: 'current',
        symbol: 'A',
        scale: 1.0
    });
    
    //TODO: probably not right
    var candela = unit({
        name: 'candela',
        type: 'luminousIntensity',
        symbol: 'cd',
        scale: 1.0
    });

 	var pound = derivedUnit({
        name: "pound",
        symbol: "lb",
        units: [
            { unit: slug,   power: 1 },
            { unit: foot,   power: 1 },
            { unit: second, power: -2 }
        ]
    });

    var footPound = derivedUnit({
        name: "foot-pound",
        symbol: "ft⋅lb",
        units: [
            { unit: foot,  power: 1 },
            { unit: pound, power: 1 }
        ]
    });

    //TODO: yard, furlong, mile, league, fathom
    //TODO: acre, hectare
    //TODO: fl oz, pint, quart, gallon
    //TODO: ounce, ton, stone
    
    return System.create({
        name: "Imperial",
        base: {
            length : foot,
            mass : slug,
            time : second,
            current : ampere,
            temperature : degreeFahrenheit,
            absoluteTemperature : degreeRankine,
            //'amount'
            luminousIntensity: candela
        },
        derived: {
            energy: footPound,
            force: pound
        },
        other: [
            minute,
            hour
        ]
    });
});