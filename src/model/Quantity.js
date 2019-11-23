define([], function() {
	function Quantity(unitExpression, value, Sr) {
		this._unitExpression = unitExpression;
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
		unitExpression: function() {
			return this._unitExpression;
		},
		toString: toString
	};

	function toString(options) {
		return this.value + this._unitExpression.toString();
	}

	return Quantity;
});