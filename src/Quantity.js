define([], function() {
	function Quantity(unit, value, Sr) {
		this.unit = unit;
		this.value = value;
		if (!Sr) {
			throw new Error("Sr was not an object.");
		}
		this.Sr = Sr;
	}
		
	Quantity.prototype = {
		convertTo: function(newUnits) {
			return this.Sr.convert(this, newUnits);
		},
		toString: toString
	};

	function toString(options) {
		return this.value + this.unit.symbol;
	}

	return Quantity;
});