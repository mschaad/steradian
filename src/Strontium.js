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
		
		// Decorate the Strontium function (the result of this module def)
		// with the members of a Strontium object.  This gives
		// the Strontium module the nice property of being both a
		// Strontium function (so you CAN manufacture your own Strontium object)
		// and a Strontium object (so you don't HAVE to manufacture your own 
		// Strontium object).
		var Sr = Strontium();
		copyProperties(Sr, Strontium);

		StandardSystems.systems().forEach(function(system) {
			Sr.system(system);
		});
		
		return Strontium;
	}
);
