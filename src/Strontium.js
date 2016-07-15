define(
	['src/UnitType', 'src/Term', 'src/Unit', 'src/DerivedUnit', 'src/Quantity'], 
	function(UnitType, Term, Unit, DerivedUnit, Quantity) {
		
		function Strontium() {
			var unitTable = {};
			
			function toTerm(desc) {
				return new Term(desc.unit, desc.power);
			}
						
			return {
				unit: function(def) {
					var unit = new Unit(def.name, def.type, def.symbol, def.scale);
					unitTable[def.name] = unit;
					return unit;
				},
				defineDerivedUnit: function(termDescriptors) {
					var terms = termDescriptors.map(toTerm);
					var unit = new DerivedUnit(terms);
					return unit;
				},
				quantity: function(unit, value) {
					var q = new Quantity(unit, value);
					return q;
				}
			};
		}
		
		function copyProperties(src, dest) {
			for(var key in src) {
				if (src.hasOwnProperty(key)) {
					dest[key] = src[key];
				}
			}
		}
		
		var Sr = Strontium();
		copyProperties(Sr, Strontium);
		
		return Strontium;
});
