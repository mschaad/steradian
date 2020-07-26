define([], function() {
	/**
	 * @classdesc
	 * Represents a dimensive quantity.  
	 * Quantities have two parts:
	 * 	1. value, or magnitude
	 *  2. UnitExpression, which indicates the units attached to the value.
	 * @class
	 * @alias Quantity
	 * @hideconstructor
	 * @param {UnitExpression} unitExpression - the UnitExpression associated with Quantity, such as "m/s".
	 * @param {number} value - the numeric value of the Quantity, such as `4.0`.
	 * @param {Steradian} Sr - the instance of Steradian with which this Quantity should be associated.
	 */
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

	Quantity.prototype = 
	/**
	 * @lends Quantity#
	 */
	{
		/**
		 * Converts this Quantity to another Quantity in the given
		 * units or System.
		 * 
		 * `newUnits` may be the name of a defined Unit, the name of 
		 * a defined System, an instance of Unit, or an instance of
		 * System.
		 * 
		 * This method provides an OO-flavored API that directly 
		 * corresponds to the Functional-flavored `Sr.convert(quantity, targetUnitsOrSystem)`.
		 * @method
		 * @param {string|Unit|UnitExpression|System} newUnits 
		 * @type {Quantity}
		 */
		convertTo: function(newUnits) {
			return this.Sr.convert(this, newUnits);
		},
		/**
		 * Returns the UnitExpression associated with this Quantity.
		 * For example, given a Quantity representing "four meters per second",
		 * this method returns a UnitExpression representing "meters per second."
		 * @method
		 * @type {UnitExpression}
		 */
		units: function() {
			return this._unitExpression;
		},
		/**
		 * Returns the scalar value associated with this Quantity.
		 * For example, given a Quantity representing "four meters per second",
		 * this method returns the number 4.
		 * @method
		 * @type {number}
		 */
		value: function() {
			return this._value;
		},
		/**
		 * Adds another Quantity to this Quantity and returns
		 * the result as a new Quantity.
		 * 
		 * If the addend `rhs` is not expressed in the same units as this Quantity,
		 * `rhs` will be converted to the same units as this Quantity.
		 * 
		 * If `rhs` cannot be converted to the same units as this Quantity,
		 * (because, say, the Quantities are not dimensionally compatible)
		 * an Error is thrown.
		 * @param {Quantity} rhs - a dimensionally-compatible Quantity to add to this Quantity.
		 * @type {Quantity}
		 */
		plus: function(rhs) {
			return ArithmeticOps.add(this, rhs);
		},
		/**
		 * Subtracts another Quantity from this Quantity and returns
		 * the result as a new Quantity.
		 * 
		 * If the subtractend `rhs` is not expressed in the same units as this Quantity,
		 * `rhs` will be converted to the same units as this Quantity.
		 * 
		 * If `rhs` cannot be converted to the same units as this Quantity,
		 * (because, say, the Quantities are not dimensionally compatible)
		 * an Error is thrown.
		 * @param {Quantity} rhs - a dimensionally-compatible Quantity to subtract from this Quantity.
		 * @type {Quantity}
		 */
		minus: function(rhs) {
			return ArithmeticOps.subtract(this, rhs);
		},
		/**
		 * Multiplies this Quantity by another Quantity and returns
		 * the result as a new Quantity.
		 * 
		 * No unit conversion is performed on the multiplicand `rhs`.
		 * @param {Quantity} rhs - the Quantity by which to multiply this Quantity.  
		 * @type {Quantity}
		 */
		times: function(rhs) {
			return ArithmeticOps.multiply(this, rhs);
		},
		/**
		 * Divides this Quantity by another Quantity and returns
		 * the result as a new Quantity.
		 * 
		 * No unit conversion is performed on the divisor `rhs`.
		 * @param {Quantity} rhs - the Quantity by which to divide this Quantity.  
		 * @type {Quantity}
		 */
		dividedBy: function(rhs) {
			return ArithmeticOps.divide(this, rhs);
		},
		/**
		 * Returns a string representation of this Quantity,
		 * including the `value()` and the symbolic representation 
		 * of `expression()`.
		 * 
		 * For instance, a Quantity representing "four meters"
		 * will be rendered "4m".
		 */
		toString: function toString() {
			return this.value() + this.units().toString();
		}
	};

	Object.defineProperty(Quantity.prototype, 'constructor', {
		value: Quantity,
		enumerable: false,
		writable: true
	});

	function quantity(value, unitExpression, Sr) {
		return new Quantity(unitExpression, value, Sr);
	}

	return Quantity;
});