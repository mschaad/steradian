define(['Enum'], function(Enum) {

	/**
	 * Represents all of the base unit types in the SI system.  
	 * All BaseUnits must be defined in terms of these types, 
	 * and other Unit Systems must also be constructed in terms 
	 * of these primitive types.
	 * 
	 * @namespace UnitType
	 * @enum {UnitType}
	 * @property {UnitType} length
	 * @property {UnitType} mass
	 * @property {UnitType} time
	 * @property {UnitType} current
	 * @property {UnitType} temperature
	 * @property {UnitType} absoluteTemperature
	 * @property {UnitType} luminousIntensity
	 */
	return Enum.create(
	{
		name: 'UnitType',
		values:
		[
			'length',
			'mass',
			'time',
			'current',
			'temperature',
			'absoluteTemperature',
			//'amount'
			'luminousIntensity'
		]
	});
});