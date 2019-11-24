define([], function() {
   return {
        install: function(Sr) {
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
       }
   };
});