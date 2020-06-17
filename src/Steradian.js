define(
	[
	'Guard', 'Test', 
	'Quantity','UnitRegistry', 
	'model/systems/StandardSystems',
	'Convert'
	], 
	function(
		Guard, Test, 
		Quantity,UnitRegistry, 
		StandardSystems,
		Convert) {
		function Steradian() {
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
					unitExpression = Convert.toUnitExpression(unitExpression, registry);
					if (!SrInstance) {
						throw new Error("SrInstance was not an object");
					}
					var q = new Quantity(unitExpression, value, SrInstance);
					return q;
				},
				convert: function(q, targetUnitsOrSystem) {
					var protoQuantity = Convert.quantity(q, targetUnitsOrSystem, registry);
					return SrInstance.quantity(protoQuantity.units, protoQuantity.value);
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
		
		// Decorate the Steradian function (the result of this module def)
		// with the members of a Steradian object.  This gives
		// the Steradian module the nice property of being both a
		// Steradian function (so you CAN manufacture your own Steradian object)
		// and a Steradian object (so you don't HAVE to manufacture your own 
		// Steradian object).
		var Sr = Steradian();
		copyProperties(Sr, Steradian);

		StandardSystems.systems().forEach(function(system) {
			Sr.system(system);
		});
		
		return Steradian;
	}
);
