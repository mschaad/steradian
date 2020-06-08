define(['Enum'], function(Enum) {
    return Enum.create({
        name: 'DerivedUnitType',
        values: [
            'energy',
            'force',
            'angle',
            'solidAngle',
            'frequency',
            'pressure',
            'power',
            'electricCharge',
            'electricPotentialDifference',
            'capacitance',
            'electricResistance',
            'electricConductance',
            'magneticFlux',
            'magneticFluxDensity',
            'inductance',
            'luminousFlux',
            'illuminance',
            'radionuclideActivity',
            'absorbedDose',
            'doseEquivalent',
            'catalyticActivity'
        ]
    });
});