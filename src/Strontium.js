define([], function() {
	
	function createEnum(values) {
		var e = {};
		for(var i = 0; i < values.length; i++) {
			var name = values[i];
			e[name] = i;
		}
		return e;
	}
	
	function Strontium() {
		var unitTable = {};

		var UnitType = createEnum([
			'length',
			'mass',
			'time',
			'current',
			'temperature',
			//'amount'
			'luminousIntensity'
		]);

		function Unit(name, type, symbol, scale) {
			this.name = name;
			this.type = type;
			this.symbol = symbol;
			this.scale = scale;
		}
		
		function Term(unit, power) {
			this.unit = function() { return unit; };
			this.power = function() { return power; };
		}
		
		function cloneArray(a) {
			return a.slice(0);
		}
		
		Unit.prototype = {
			getDimensions: function() {
				if (!this._dimensions) {
					var dim = [];
					dim[UnitType[this.type]] = 1;
					this._dimensions = new Dimensions(dim);
				}
				return this._dimensions;
			},
			getTerms: function() {
				var terms = [new Term(this, 1)];
				return terms;
			}
		};
		
		function Dimensions(dim) {
			var _values = [];
			for(var i = 0; i < dim.length; i++) {
				_values[i] = dim[i];
			}
			
			this.get = function(i) {
				return _values[i];
			};
			
			this.equals = function(other) {
				var size = _values.length;
				for(var i = 0; i < size; i++) {
					if (this.get(i) !== other.get(i)) {
						return false;
					}
				}
				return true;
			};
		}
		
		//TODO: Dimensions.create = function(...) {...}
		
		function DerivedUnit(terms) {
			this._terms = terms.slice(0);
		}
		
		DerivedUnit.prototype = {
			getDimensions: function() {
				if (!this._dimensions) {
					var dim = [];
					for(var i = 0; i < this._terms.length; i++) {
						var term = this._terms[i];
						var typeIndex = UnitType[term.unit().name];
						
						var currentValue = dim[typeIndex] || 0;
						var updatedValue = currentValue + term.power;
						dim[typeIndex] = updatedValue;
					}
					this._dimensions = new Dimensions(dim);
				}
				return this._dimensions;
			},
			getTerms: function() {
				var terms = [];
				for(var i = 0; i < this._terms.length; i++) {
					var up = this._terms[i];
					terms[i] = up;
				}
				return terms;	
			}
		}
		
		function Quantity(unit, value) {
			this.unit = unit;
			this.value = value;
		}
		
		Quantity.prototype = {
			convertTo: function(newUnits) {
				var originalDimensions = this.unit.getDimensions();
				var newDimensions = newUnits.getDimensions();
				if (!originalDimensions.equals(newDimensions)) {
					throw 'incompatible unit dimensions';
				}
				
				var oldTerms = this.unit.getTerms();
				var newTerms = newUnits.getTerms();
				
				var delta = {};
				
				var i, term, unit, currentValue, updatedValue;
				
				for(i = 0; i < newTerms.length; i++) {
					term = newTerms[i];
					unit = term.unit();
					currentValue = delta[unit.name] || 0;
					updatedValue = currentValue + term.power();
					delta[unit.name] = updatedValue;
				}
				
				for(i = 0; i < oldTerms.length; i++) {
					term = oldTerms[i];
					unit = term.unit();
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
				
				var newValue = this.value * scale;
				
				return new Quantity(newUnits, newValue);
			}
		};
		
		//var meter = new Unit('meter', 'length', 'm', 1.0);
		
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
				// var unit = unitTable[unitName];
				// if (!unit) {
					// throw 'unit type not found';
				// }
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
