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

			function registerUnit(unit) {
				registry.register(unit);
			}

			function getUnit(name) {
				return registry.get(name);
			}

			function createUnit(def) {
				var unit = Units.createBaseUnit(def);
				registerUnit(unit);
				return unit;
			}

			function createDerivedUnit(def) {
				var unit = Units.createDerivedUnit(def, registry);
				registerUnit(unit);
				return unit;
			}

			function getSystem(name) {
				return registry.getSystem(name);
			}

			function registerSystem(defOrSystem) {
				var system;
				if (Test.instanceOf(defOrSystem, System)) {
					system = defOrSystem;
				}
				else if (Test.isObject(defOrSystem)) {
					var def = defOrSystem;
					system = System.create(def);	
				}
				registry.registerSystem(system);
				return system;
			}
			
			var SrInstance = {
				unit: function(idOrDef) {
					if (Test.isString(idOrDef)) {
						return getUnit(idOrDef);
					} else {
						return createUnit(idOrDef);	
					}
				},
				system: function(idOrDefOrSystem) {
					// getter
					if (Test.isString(idOrDefOrSystem)) {
						return getSystem(idOrDefOrSystem);
					} 
					// setter
					else {
						var defOrSystem = idOrDefOrSystem;
						return registerSystem(defOrSystem);
					}
				},
				derivedUnit: createDerivedUnit,
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
