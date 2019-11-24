define(
	[
	'Guard', 'Test', 'Strings',
	'UnitType', 'Term', 'Unit', 'BaseUnit',
	'UnitExpression','DerivedUnit', 'Quantity',
	'Convert'
	], 
	function(
		Guard, Test, Strings,
		UnitType, Term, Unit, BaseUnit, 
		UnitExpression,DerivedUnit, Quantity,
		Convert) {
		function Strontium() {
			var unitTable = {};

			function registerUnit(unit) {
				unitTable[unit.name] = unit;
			}

			function createUnit(def) {
				var unit = new BaseUnit(def.name, def.type, def.symbol, def.scale);
				registerUnit(unit);
				return unit;
			}

			function createDerivedUnit(def) {
				Guard(def.units, 'def.units').isTruthy().isArray();
				var terms = def.units.map(toTerm);
				var scale = def.scale || 1;
				var unit = new DerivedUnit(def.name, def.symbol, scale, terms);
				registerUnit(unit);
				return unit;
			}

			function getUnit(name) {
				var unit = unitTable[name];
				if (!unit) {
					throw new Error("no unit found by the name '" + name + "'");
				}
				return unit;
			}
			
			function toUnit(identifierOrUnit) {
				var unit;
				if (Unit.isUnit(identifierOrUnit)) {
					unit = identifierOrUnit;
				}
				else if (Strings.isString(identifierOrUnit)) {
					var identifier = identifierOrUnit;
					unit = unitTable[identifier];
					if (!unit) {
						throw new Error("Unit '" + identifier + "' not found");
					}
				}
				else {
					throw new Error("Expected: unit name or Unit but found object of type '" +
						typeof(identifierOrUnit) + "'");
				}
				return unit;
			}

			function toTerm(desc) {
				return new Term(
					toUnit(desc.unit), 
					desc.power
				);
			}

			function coerceToUnitExpression(Sr, obj) {
				if (Test.instanceOf(obj, UnitExpression)) {
					return obj;
				}
				var unit;
				if (Unit.isUnit(obj)) {
					unit = obj;
				}
				else if (Strings.isString(obj)) {
					var identifier = obj;
					unit = Sr.unit(identifier);
					if (!unit) {
						throw new Error("Unit '" + identifier + "' not found");
					}
				}
				else {
					throw new Error("Expected: unit name or Unit or UnitExpression but found object of type '" +
						typeof(obj) + "'");
				}
				return new UnitExpression([new Term(unit, 1)]);
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
					unitExpression = coerceToUnitExpression(SrInstance, unitExpression);
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
