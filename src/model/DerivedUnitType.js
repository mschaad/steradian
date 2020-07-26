define(['Enum'], function(Enum) {
    /**
     * Represents all of the standard derived types in the SI system.
     * All Systems are constructed from base [UnitTypes]{@link UnitType} and these
     * [DerivedUnitTypes]{@link DerivedUnitType}.
     * DerivedUnits may also correspond to the types in this list.
     * @namespace DerivedUnitType
     * @property {UnitType} angle
     * @property {UnitType} solidAngle
     * @property {UnitType} frequency
     * @property {UnitType} pressure
     * @property {UnitType} power
     * @property {UnitType} electricCharge
     * @property {UnitType} electricPotentialDifference
     * @property {UnitType} capacitance
     * @property {UnitType} electricResistance
     * @property {UnitType} electricConductance
     * @property {UnitType} magneticFlux
     * @property {UnitType} magneticFluxDensity
     * @property {UnitType} inductance
     * @property {UnitType} luminousFlux
     * @property {UnitType} illuminance
     * @property {UnitType} radionuclideActivity
     * @property {UnitType} absorbedDose
     * @property {UnitType} doseEquivalent
     * @property {UnitType} catalyticActivity
     */
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