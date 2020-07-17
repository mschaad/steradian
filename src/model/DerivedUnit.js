define([
	'Guard', 'Arrays',
	'Unit', 'UnitExpression'], 
function(Guard, Arrays, Unit, UnitExpression) {
	/**
	 * DerivedUnits are composed of a {UnitExpression} and a scale factor.
	 * The UnitExpression encapsulates the combination of other Units
	 * that composes this DerivedUnit, and the scale represents the
	 * scale factor.
	 * @class
	 * @extends {Unit}
	 * @alias DerivedUnit
	 * @param {string} name 
	 * @param {string} symbol 
	 * @param {number} scale 
	 * @param {Array<Term>} terms 
	 */
	function DerivedUnit(name, symbol, scale, terms) {
		Guard(terms, 'terms').isTruthy().isArray();
		if (terms.length === 0) {
			throw new Error("terms list was empty");
		}
		var compositeScale = scale * getScaleOfTerms(terms);
		this._terms = Arrays.frozenClone(terms);
		Unit.call(this, name, symbol, compositeScale);
		Object.freeze(this);
	}

	function getScaleOfTerms(terms) {
		return terms
		.map(function(term) {
			return Math.pow(term.unit().scale(), term.power());
		})
		.reduce(
			function(acc, factor) {
				return acc * factor;
			}, 
			1
		);
	}

	DerivedUnit.prototype = Object.create(Unit.prototype);
	Object.defineProperty(DerivedUnit.prototype, 'constructor', {
		value: DerivedUnit,
		enumerable: false,
		writable: true
	});

	var functions = 
	/**
	 * @lends DerivedUnit#
	 */
	{
		dimensions: function() {
			return this.expression().dimensions();
		},
		/**
		 * Always return true.
		 * @method
		 */
		isBaseUnit: function() {
			return false;
		},
		/**
		 * The UnitExpression that defines the DerivedUnit.
		 * For instance, the Joule is defined the Newton-meter per second squared.
		 * @method
		 */
		expression: function() {
			var terms = [];
			for(var i = 0; i < this._terms.length; i++) {
				var up = this._terms[i];
				terms[i] = up;
			}
			return new UnitExpression(terms);
		},
		/**
		 * Returns a string representation of this DerivedUnit,
		 * composed of its scale and the string representation of its
		 * expression().
		 * @method
		 */
		toString: function() {
			return this.symbol();
		}
	};

	Object.assign(DerivedUnit.prototype, functions);

	return DerivedUnit;
});