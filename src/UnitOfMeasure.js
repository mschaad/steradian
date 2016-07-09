define([], function() {
	var unitTable = {};

	var UnitType = {
		length: 0,
		mass: 1,
		time: 2,
		current: 3,
		temperature: 4,
		//'amount'
		luminousIntensity: 5,
	};

	function Unit(name, type, symbol, scale) {
		this.name = name;
		this.type = type;
		this.symbol = symbol;
		this.scale = scale;
	}
	
	function UnitPower(unit, power) {
		this.unit = function() { return unit; };
		this.power = function() { return power; };
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
		getUnitPowers: function() {
			var unitPowers = [new UnitPower(this, 1)];
			return unitPowers;
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
	
	function DerivedUnit(unitPowers) {
		this._unitPowers = unitPowers.slice(0);
	}
	
	DerivedUnit.prototype = {
		getDimensions: function() {
			if (!this._dimensions) {
				var dim = [];
				for(var i = 0; i < this._unitPowers.length; i++) {
					var unitPower = this._unitPowers[i];
					var typeIndex = UnitType[unitPower.unit.name];
					
					var currentValue = dim[typeIndex] || 0;
					var updatedValue = currentValue + unitPower.power;
					dim[typeIndex] = updatedValue;
				}
				this._dimensions = new Dimensions(dim);
			}
			return this._dimensions;
		},
		getUnitPowers: function() {
			var unitPowers = [];
			for(var i = 0; i < this._unitPowers.length; i++) {
				var up = this._unitPowers[i];
				unitPowers[i] = up;
			}
			return unitPowers;	
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
			
			var oldUnitPowers = this.unit.getUnitPowers();
			var newUnitPowers = newUnits.getUnitPowers();
			
			var delta = {};
			
			var i, unitPower, unit, currentValue, updatedValue;
			
			for(i = 0; i < newUnitPowers.length; i++) {
				unitPower = newUnitPowers[i];
				unit = unitPower.unit();
				currentValue = delta[unit.name] || 0;
				updatedValue = currentValue + unitPower.power();
				delta[unit.name] = updatedValue;
			}
			
			for(i = 0; i < oldUnitPowers.length; i++) {
				unitPower = oldUnitPowers[i];
				unit = unitPower.unit();
				currentValue = delta[unit] || 0;
				updatedValue = currentValue - unitPower.power();
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
	
	function toUnitPower(desc) {
		return new UnitPower(desc.unit, desc.power);
	}
				
	return {
		defineBaseUnit: function(def) {
			var unit = new Unit(def.name, def.type, def.symbol, def.scale);
			unitTable[def.name] = unit;
			return unit;
		},
		defineDerivedUnit: function(unitPowerDescriptors) {
			var unitPowers = unitPowerDescriptors.map(toUnitPower);
			var unit = new DerivedUnit(unitPowers);
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
});
