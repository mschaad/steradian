define([], function() {
   return {
        install: function(Sr) {
            /* jshint -W098 */
            
            //MASS
            var kilogram = Sr.unit({
                name: 'kilogram',
                type: 'mass',
                symbol: 'kg',
                scale: 1.0
            });

            var slug = Sr.unit({
                name: 'slug',
                symbol: 'slug',
                type: 'mass',
                scale: 0.0685218
            });
            
            //LENGTH
            var meter = Sr.unit({
                name: 'meter',
                type: 'length',
                symbol: 'm',
                scale: 1.0
            });

			var foot = Sr.unit({
				name: 'foot',
				type: 'length',
				symbol: 'ft',
				scale: 3.28084
			});

            //TIME
            var second = Sr.unit({
                name: 'second',
                type: 'time',
                symbol: 's',
                scale: 1
            });
            
            var minute = Sr.unit({
				name: 'minute',
				type: 'time',
				symbol: 'min',
				scale: 1/60
            });
            
            var Newton = Sr.derivedUnit({
                name: "Newton",
                symbol: "N",
                scale: 1,
                units: [
                    { unit: 'kilogram', power: 1 },
                    { unit: 'meter', power: 1 },
                    { unit: 'second', power: -2 }
                ]
            });

            //CURRENT
            var ampere = Sr.unit({
                name: "ampere",
                type: 'current',
                symbol: 'A',
                scale: 1
            });

            //ABSOLUTE TEMPERATURE
            var degreeKelvin = Sr.unit({
                name: 'degreeKelvin',
                type: 'temperature',
                symbol: '°K',
                scale: 1.0
            });
        
            //TEMPERATURE
            var degreeCelsius = Sr.unit({
                name: 'degreeCelsius',
                type: 'temperature',
                symbol: '°C',
                scale: 1.0
            });
        
            //LUMINOUS INTENSITY
            var candela = Sr.unit({
                name: 'candela',
                type: 'luminousIntensity',
                symbol: 'cd',
                scale: 1.0
            });

            //========DERIVED UNITS=========

            //ENERGY
            var joule = Sr.derivedUnit({
                name: 'joule',
                units: [
                    { unit: 'Newton', power: 1 },
                    { unit: 'meter', power: 1 }
                ],
                symbol: "J",
                scale: 1.0,
            });
       }
   };
});