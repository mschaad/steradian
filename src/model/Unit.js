define(['Guard'], 
	function(Guard) {
		
		/**
		 * @classdesc
		 * Abstract base class of [BaseUnit]{@link BaseUnit} and [DerivedUnit]{@link DerivedUnit}.
		 * @class
		 * @alias Unit
		 * @see BaseUnit
		 * @see DerivedUnit
		 * @hideconstructor
		 * @param {string} name - full name of the unit, such as 'meter'
		 * @param {string} symbol - symbolic name of the unit such as "m" for meter, used in toString() representations.
		 * @param {number} scale - scale of the unit.
		 */
		function Unit(name, symbol, scale) {
			Guard(name, "name").isString().isTruthy();
			/**
			 * @method
			 * @type {string}
			 */
			this.name = asProperty(name);
			
			Guard(symbol, "symbol").isString().isTruthy();
			/**
			 * @method
			 * @type {string}
			 */
			this.symbol = asProperty(symbol);
			
			Guard(scale, "scale").isNumber().isNotZero();
			/**
			 * @method
			 * @type {number}
			 */
			this.scale = asProperty(scale);
		}

		function asProperty(value) {
			return function() { return value; };
		}

		Unit.prototype = 
		/**
		 * @lends Unit#
		 */
		{
			/** 
			 * @method
			 * @type {Dimensions}
			 * @abstract
			 */
			dimensions: function() {
				throw new Error("the dimensions method must be overridden.");
			},
			/** 
			 * @method 
			 * @type {UnitExpression}
			 * @abstract
			 */
			expression: function() {
				throw new Error("the expression method must be overridden.");
			},
			/** 
			 * Returns true if this object is an instance of BaseUnit,
			 * or false if it is an instance of DerivedUnit.
			 * @method 
			 * @type {boolean}
			 * @abstract
			 */
			isBaseUnit: function() {
				throw new Error("the isBaseUnit method must be overridden.");
			},
			/** 
			 * Returns the string representation of the Unit
			 * (which is typically its symbol).
			 * @method 
			 * @type {string}
			 */
			toString: function() {
				return this.symbol();
			}
		};

		/**
		 * Returns true if `value` is an instance of Unit; false otherwise.
		 * @method
		 * @param {*} value - the value to be checked
		 */
		Unit.isUnit = function(value) {
			return (value instanceof Unit);
		};

		return Unit;
	}
);