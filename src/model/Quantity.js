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

	var ArithmeticOps = {
		add: function add(lhs, rhs) {
			var lhsUnits = lhs.units();
			var convertedRhs = rhs.convertTo(lhsUnits);
			var resultValue = lhs.value() + convertedRhs.value();
			var resultQuantity = quantity(resultValue, lhsUnits, lhs.Sr); 
			return resultQuantity;
		},
		subtract: function add(lhs, rhs) {
			var lhsUnits = lhs.units();
			var convertedRhs = rhs.convertTo(lhsUnits);
			var resultValue = lhs.value() - convertedRhs.value();
			var resultQuantity = quantity(resultValue, lhsUnits, lhs.Sr); 
			return resultQuantity;
		},
		multiply: function(lhs, rhs) { 
			var resultUnits = lhs.units().mult(rhs.units());
			var resultValue = lhs.value() * rhs.value();
			var resultQuantity = quantity(resultValue, resultUnits, lhs.Sr);
			return resultQuantity;
		},
		divide: function(lhs, rhs) { 
			var resultUnits = lhs.units().div(rhs.units());
			var resultValue = lhs.value() / rhs.value();
			var resultQuantity = quantity(resultValue, resultUnits, lhs.Sr);
			return resultQuantity;
		}
	};

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
		plus: function(rhs) {
			return ArithmeticOps.add(this, rhs);
		},
		minus: function(rhs) {
			return ArithmeticOps.subtract(this, rhs);
		},
		times: function(rhs) {
			return ArithmeticOps.multiply(this, rhs);
		},
		dividedBy: function(rhs) {
			return ArithmeticOps.divide(this, rhs);
		},
		toString: function toString(options) {
			return this.value() + this.units().toString();
		}
	};

	function quantity(value, unitExpression, Sr) {
		return new Quantity(unitExpression, value, Sr);
	}

	return Quantity;
});