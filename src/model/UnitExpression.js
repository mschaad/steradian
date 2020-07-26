define(['Guard', 'Arrays', 'Term', 'Dimensions'], function(Guard, Arrays, Term, Dimensions) {
	/**
	 * @classdesc
	 * Represents an expression made of composed Units.
	 * This structure is the basis of DerivedUnit definitions.
	 * 
	 * Logically, a UnitExpression represents a list of Terms multiplied
	 * together.  Each Term has a base "unit" and a power.
	 * 
	 * For instance, a UnitExpression that represents "meter per second squared,"
	 * would consist of one Term that represents "meter" (to the first power) and another
	 * Term that represents "second squared."
	 * @class
	 * @alias UnitExpression
	 * @hideconstructor
	 * @param {array<Term>}} terms 
	 */
	function UnitExpression(terms) {
		Guard(terms, "terms").isArrayOf(Term);
		this._terms = Arrays.frozenClone(terms);
		var that = this;
		var dimensions = null;
		this._dimensions = function() {
			if (dimensions === null) {
				dimensions = getDimensions.call(that);
			}
			return dimensions;
		};
		Object.freeze(this);
	}

	function getDimensions() {
		var dim = this._terms
			.map(function(t) {
				return t.unit()
					.dimensions()
					.mult(t.power());
			})
			.reduce(function(acc, item) {
				return acc.add(item);
			}, Dimensions.empty());
		return dim;
	}

	UnitExpression.prototype = 
	/** @lends UnitExpression# */
	{
		/**
		 * Returns an immutable array of Terms that make up the UnitExpression.
		 * @method
		 * @type {array<Term>}
		 */
		terms: function() {
			return this._terms;
		},
		/**
		 * Returns a Dimensions object that represents the unit dimensions of
		 * this UnitExpression.
		 * @method
		 * @type {Dimensions}
		 */
		dimensions: function() {
			return this._dimensions();
		},
		/**
		 * Multiplies this UnitExpression by another UnitExpression
		 * and returns the result as another UnitExpression.
		 * 
		 * Logically, this operation is implemented by concatenating
		 * all of the terms together and combining like bases.
		 * @method
		 * @param {UnitExpression} rhs
		 * @type {UnitExpression}
		 */
		mult: function(rhs) {
			var terms = flatten([this.terms(), rhs.terms()]);
			terms = combineLikeTerms(terms);
			return new UnitExpression(terms);
		},
		/**
		 * Divides this UnitExpression by another UnitExpression
		 * and returns the result as another UnitExpression.
		 * 
		 * Logically, this operation is implemented by inverting the
		 * divisor `rhs` and performing a multiplication operation.
		 * @method
		 * @param {UnitExpression} rhs 
		 * @type {UnitExpression}
		 */
		div: function(rhs) {
			var inverseRhs = new UnitExpression(rhs.terms().map(invert));
			return this.mult(inverseRhs);
		},
		/**
		 * Exponentiates this UnitExpression by the given
		 * power and returns the result as another UnitExpression.
		 * @method
		 * @param {number} power
		 * @type {UnitExpression}
		 */
		pow: function(power) {
			var exponentiatedTerms = this.terms().map(termExponent(power));
			return new UnitExpression(exponentiatedTerms);
		},
		/**
		 * Recursively breaks down this UnitExpression into its constituent
		 * Terms and each Term into its constituent BaseUnits,
		 * until only BaseUnits are left.
		 * @method
		 * @type {UnitExpression}
		 */
		toBaseUnits: function() {
			var baseTerms = getEquivalentBaseTermsForList(this.terms());
			return new UnitExpression(baseTerms);
		},
		/**
		 * Simplifies the UnitExpression by combining like Terms.
		 * @method
		 * @type {UnitExpression}
		 */
		simplify: function() {
			return new UnitExpression(combineLikeTerms(this.terms()));
		},
		/**
		 * Projects this UnitExpression onto an equivalent map,
		 * where each unit type becomes a key, and the value
		 * is the sum of all the powers of the Terms of that type.
		 * @method
		 * @type {object}
		 */
		toMap: function() {
			var terms = combineLikeTerms(this.terms());

			return terms.reduce(
				function(map, term) {
					map[term.unit().name()] = term.power();
					return map;
				}, 
				Object.create(null)
			);
		},
		/**
		 * Returns a string representation of the given UnitExpression.
		 * 
		 * For example, the string representation of a UnitExpression 
		 * that represents "meters per second squared" will be "m/s^2".
		 * @method
		 * @type {string}
		 */
		toString: function() {
			var terms = this._terms;
			 var reduced = terms
			 	.map(function(term) {
					var unitString = term.unit().toString();
					var opString = getOperatorString(term);
					var powerString = getPowerString(term);
					if (term.power() === 0) {
						return "";
					}
					return opString + unitString + powerString;
				})
				.reduce(function(acc, termString) {
					if (acc === "") {
						if (termString.startsWith(" ")) {
							termString = termString.substring(1);
						}
					}
					return acc + termString;
				}, "");

			return reduced;
		}
	};

	Object.defineProperty(UnitExpression.prototype, 'constructor', {
		value: UnitExpression,
		enumerable: false,
		writable: true
	});
	
	function termExponent(power) {
		return function(t) {
			return new Term(t.unit(), t.power() * power); 	
		};
	}
	
	function unitProperty(term) {
		return term.unit();
	}
	
	function combineLikeTerms(terms) {
		Guard(terms, "terms").isArrayOf(Term);
		var groupedTerms = groupBy(terms, unitProperty);
		var outputTerms = Object.keys(groupedTerms)
			.map(function(groupName) {
				var group = groupedTerms[groupName];
				return new Term(group.key, sumPowersOf(group.items));
			});
		return outputTerms;
	}
	
	function invert(term) {
		return new Term(term.unit(), -term.power());
	}
	
	function flatten(arrays) {
		var flattened = [];
		arrays.forEach(function(a) { 
			Array.prototype.push.apply(flattened, a);
		});
		return flattened;
	}
	
	function groupBy(arr, keySelector) {
		var groups = Object.create(null);
		for (var i = 0; i < arr.length; i++) {
			var item = arr[i];
			var key = keySelector(item);
			var group = groups[key] || { key: key, items: [] };
			group.items.push(item);
			groups[key] = group;
		}
		return groups;
	}
	
	function sumPowersOf(terms) {
		var sum = terms.reduce(function(acc, t) { return acc + t.power(); }, 0);
		return sum;
	}
	
	function emptyUnitExpression() {
		return new UnitExpression([]);
	}

	/**
	 * Given an array of Terms (which could be in any type of units), returns an
	 * array of equivalent BaseUnit terms.
	 * @param {Term[]} terms 
	 */
	function getEquivalentBaseTermsForList(terms) {
		return terms.map(function(term) {
			return new UnitExpression(getEquivalentBaseTerms(term));
		}).reduce(function(acc, expr) {
			return acc.mult(expr);
		}, emptyUnitExpression()
		).terms();
	}

	/**
	 * Given a Term (which could be in any Units) returns an equivalent array of 
	 * Terms expressed in BaseUnits.
	 * @param {Term} term 
	 */
	function getEquivalentBaseTerms(term) {
		Guard(term, "term").instanceOf(Term);
		var unit = term.unit();
		if (unit.isBaseUnit()) {
			return [ term ];
		}
		else {
			var subTermsExpr = unit.expression().pow(term.power());
			return getEquivalentBaseTermsForList(subTermsExpr.terms());			
		}
	}

	function getOperatorString(term) {
		var power = term.power();
		if (power === 0) {
			return "";
		}
		else if (power < 0) {
			return "/";
		}
		else if (power > 0) {
			return " ";
		}
		else {
			throw new Error("'power' had the unexpected value '" + power + "'.");
		}
	}

	function getPowerString(term) {
		var power = term.power();
		var absPower = Math.abs(power);
		if (absPower === 0 || absPower === 1) {
			return "";
		}
		return "^" + absPower;
	}
	
	return UnitExpression;
});