ondefine(['Guard', 'Arrays'], function(Guard, Arrays) {

	/**
	 * @classdesc
	 * Represents a dimensional magnitude vector
	 * related to some Quantity or UnitExpression.
	 * 
	 * The magnitude of each dimension is its power.
	 * 
	 * For instance, the Dimensions of the UnitExpression
	 * representing "kilometers per second squared" would be:
	 * 	* displacement: 1
	 *  * time: -2
	 * 
	 * This data structure is extremely useful for determining if
	 * different Quantities or UnitExpressions are dimensionally
	 * compatible.
	 * @class
	 * @alias Dimensions
	 * @hideconstructor
	 * @param {array<number>} dim
	 */
	function Dimensions(dim) {
		Guard(dim, "dim").isValue().isArray();
		this._values = Arrays.frozenClone(dim);
		Object.freeze(this);
	}

	/**
	 * @lends Dimensions#
	 */
	Dimensions.prototype = {
		/**
		 * Returns the magnitude (power) of
		 * the dimension in slot `i`.
		 * @method
		 * @param {number} i 
		 * @type {number}
		 */
		get: function(i) {
			Guard(i, 'i').isNumber();
			return this._values[i];
		},
		/**
		 * Returns the size of the vector.
		 * @method
		 * @type {number}
		 */
		size: function() {
			return this._values.length;
		},
		/**
		 * Returns true if the Dimensions `rhs` is equivalent to
		 * this Dimensions object; false otherwise.
		 * @method
		 * @param {Dimensions} rhs 
		 * @type {boolean}
		 */
		equals: function(rhs) {
			var lhs = this;
			if (lhs.size() !== rhs.size()) {
				return false;
			}
			for(var i = 0; i < lhs.size(); i++) {
				if (lhs.get(i) !== rhs.get(i)) {
					return false;
				}
			}
			return true;
		},
		/**
		 * Adds another Dimensions instance to this instance and
		 * returns a new Dimensions.
		 * 
		 * This method is an implementation of vector addition.
		 * 
		 * This operation is useful for Quantity multiplication.
		 * @method
		 * @param {Dimensions} rhs 
		 * @type {Dimensions}
		 */
		add: function(rhs) {
			var lhs = this;
			var lhs_i, rhs_i;
			var newDimensions = [];
			var i;
			for(i = 0; i < lhs.size(); i++) {
				lhs_i = lhs.get(i) || 0;
				newDimensions[i] = lhs_i;
			}
			var i_max = Math.max(lhs.size(), rhs.size());
			for(i = 0; i < i_max; i++) {
				rhs_i = rhs.get(i) || 0;
				lhs_i = lhs.get(i) || 0;
				newDimensions[i] = lhs_i + rhs_i;
			}
			return new Dimensions(newDimensions);
		},
		/**
		 * Multiplies this Dimensions by a scalar and returns a new Dimensions.
		 * 
		 * This method is an implementation of scalar vector multiplication.
		 * 
		 * This operation is useful for Quantity exponentiation.
		 * @method
		 * @param {number} scalar - the scalar by which to multiply these Dimensions.
		 */
		mult: function(scalar) {
			var lhs = this;
			var newDimensions = [];
			var i;
			newDimensions.length = lhs.size();
			for(i = 0; i < lhs.size(); i++) {
				var value = lhs.get(i) || 0;
				newDimensions[i] = value * scalar;
			}
			return new Dimensions(newDimensions);
		}
	};

	Object.defineProperty(Dimensions.prototype, 'constructor', {
		value: Dimensions,
		enumerable: false,
		writable: true
	});

	var empty = new Dimensions([]);

	/**
	 * Static method of the Dimensions constructor
	 * that returns a value that represents the "zero"
	 * of the Dimensions type.
	 * @method
	 * @type {Dimensions}
	 */
	Dimensions.empty = function() {
		return empty;
	};

	return Dimensions;
});