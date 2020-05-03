define(
	[
	'Guard', 'Test', 'Strings',
	'Term', 'Unit',
	'Quantity','UnitRegistry', 'Units',
	'Convert'
	], 
	function(
		Guard, Test, Strings,
		Term, Unit, 
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

			var SrInstance = {
				unit: function(idOrDef) {
					if (Test.isString(idOrDef)) {
						return getUnit(idOrDef);
					} else {
						return createUnit(idOrDef);	
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
				convert: function(q, newUnits) {
					return Convert.convert(SrInstance, q, newUnits);
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
