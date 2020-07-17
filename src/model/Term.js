define(['Guard'], function(Guard) {

	/**
	 * Represents a term in a UnitExpression.
	 * Consists of a reference to a Unit or a UnitExpression and a power.
	 * 
	 * For instance, in a UnitExpression that represents "meter per second squared,"
	 * there is one Term that represents "meter" (to the first power) and another
	 * Term that represents "second squared."
	 * 
	 * @class
	 * @alias Term
	 * @hideconstructor
	 * @param {Unit|UnitExpression} unit 
	 * @param {number} power 
	 */
	function Term(unit, power) {
		Guard(unit, "unit").isValue();		
		this._unit = unit;
		Guard(power, "power").isNumber();
		this._power = power;
		Object.freeze(this);
	}

	/**
	 * @lends Term#
	 */
	Term.prototype = {
		/**
		 * @method
		 * @type {Unit|UnitExpression}
		 */
		unit: function() {
			return this._unit;
		},
		/**
		 * The power (exponent) of the term.
		 * @method
		 * @type {number}
		 */
		power: function() {
			return this._power;
		},
		/**
		 * Returns a string representation of the Term.
		 * @method
		 * @type {string}
		 */
		toString: function() {
			return "Term:" + this._unit.toString() + "^" + this._power;
		}
	};

	Object.defineProperty(Term.prototype, 'constructor', {
		value: Term,
		enumerable: false,
		writable: true
	});
	
	return Term;
});