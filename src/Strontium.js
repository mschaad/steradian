define(
	['UnitType', 'Term', 'Unit', 'DerivedUnit', 'Quantity',
		'Strings'
	], 
	function(UnitType, Term, Unit, DerivedUnit, Quantity, Strings) {
		function Strontium() {
			var unitTable = {};
			
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

			function quantity(unit, value) {
				unit = toUnit(unit);
				if (!SrInstance) {
					throw new Error("SrInstance was not an object");
				}
				var q = new Quantity(unit, value, SrInstance);
				return q;
			}

			function convert(q, newUnits) {
				var originalDimensions = q.unit.getDimensions();
				newUnits = toUnit(newUnits);
				var newDimensions = newUnits.getDimensions();
				if (!originalDimensions.equals(newDimensions)) {
					throw 'incompatible unit dimensions';
				}
				
				var oldTerms = q.unit.getTerms();
				var newTerms = newUnits.getTerms();
				
				var delta = {};
				
				var unitTable = {};
				
				var i, term, unit, currentValue, updatedValue;
				
				for(i = 0; i < newTerms.length; i++) {
					term = newTerms[i];
					unit = term.unit();
					unitTable[unit.name] = unit;
					currentValue = delta[unit.name] || 0;
					updatedValue = currentValue + term.power();
					delta[unit.name] = updatedValue;
				}
				
				for(i = 0; i < oldTerms.length; i++) {
					term = oldTerms[i];
					unit = term.unit();
					unitTable[unit.name] = unit;
					currentValue = delta[unit.name] || 0;
					updatedValue = currentValue - term.power();
					delta[unit.name] = updatedValue;
				}
				
				var scale = 1;
				for(var unitName in delta) {
					if (delta.hasOwnProperty(unitName)) {
						power = delta[unitName];
						unit = unitTable[unitName];
						if (power > 0) {
							scale = scale * Math.pow(unit.scale, power);
						}
						else if (power < 0) {
							scale = scale / Math.pow(unit.scale, power);
						}
						else { //-> power == 0
							//that's interesting.  but still, do nothing.
						}
					}
				}
				
				var newValue = q.value * scale;
				
				return quantity(newUnits, newValue);
			}

			var SrInstance = {
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
				quantity: quantity,
				getUnit: function(name) {
					var unit = unitTable[name];
					if (!unit) {
						throw new Error("no unit found by the name '" + name + "'");
					}
					return unit;
				},
				convert: convert
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
