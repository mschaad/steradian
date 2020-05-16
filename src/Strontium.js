define(
	[
	'Guard', 'Test', 
	'System',
	'Quantity','UnitRegistry', 'Units',
	'Convert'
	], 
	function(
		Guard, Test, 
		System,
		Quantity,UnitRegistry, Units,
		Convert) {
		function Strontium() {
			var registry = new UnitRegistry();
			
			var SrInstance = {
				unit: function(idOrDef) {
					// getter
					if (Test.isString(idOrDef)) {
						var id = idOrDef;
						return registry.get(id);
					} 
					// setter
					else {
						return registry.register(idOrDef);	
					}
				},
				system: function(idOrDefOrSystem) {
					// getter
					if (Test.isString(idOrDefOrSystem)) {
						var id = idOrDefOrSystem;
						return registry.getSystem(id);
					} 
					// setter
					else {
						var defOrSystem = idOrDefOrSystem;
						return registry.registerSystem(defOrSystem);
					}
				},
				derivedUnit: function (def) {
					return registry.register(def);
				},
				quantity: function (unitExpression, value) {
					unitExpression = Convert.toUnitExpression(SrInstance, unitExpression);
					if (!SrInstance) {
						throw new Error("SrInstance was not an object");
					}
					var q = new Quantity(unitExpression, value, SrInstance);
					return q;
				},
				convert: function(q, targetUnitsOrSystem) {
					return Convert.convert(SrInstance, q, targetUnitsOrSystem);
				}
			};

			return SrInstance;
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
	}
);
