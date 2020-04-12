define([], function() {
	function Quantity(unitExpression, value, Sr) {
		this._unitExpression = unitExpression;
		this._value = value;
		if (!Sr) {
			throw new Error("Sr was not an object.");
		}
		this.Sr = Sr;
		Object.freeze(this);
	}

	Quantity.prototype = {
		convertTo: function(newUnits) {
			return this.Sr.convert(this, newUnits);
		},
		units: function() {
			return this._unitExpression;
		},
		value: function() {
			return this._value;
		},
		toString: function toString(options) {
			return this.value() + this.units().toString();
		}
	};
	
	return Quantity;
});