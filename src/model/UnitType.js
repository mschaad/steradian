define(['Enum'], function(Enum) {
	return Enum.create({
		name: 'UnitType',
		values: [
			'length',
			'mass',
			'time',
			'current',
			'temperature',
			//'amount'
			'luminousIntensity'
		]
	});
});