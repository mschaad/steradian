define(['Guard', 'Term', 'Dimensions'], function(Guard, Term, Dimensions) {
	function UnitExpression(terms) {
		Guard(terms, "terms").isArrayOf(Term);
		this._terms = Array.prototype.slice.call(terms, 0);
		var that = this;
		var dimensions = null;
		this._dimensions = function() {
			if (dimensions === null) {
				dimensions = getDimensions.call(that);
			}
			return dimensions;
		}
		Object.freeze(this);
	}

	function getDimensions() {
		var dim = this._terms
			.map(function(t) {
				return t.unit()
					.getDimensions()
					.mult(t.power());
			})
			.reduce(function(acc, item) {
				return acc.add(item);
			}, Dimensions.empty());
		return dim;
	}

	UnitExpression.prototype = {
		terms: function() {
			return Array.prototype.slice.call(this._terms, 0);
		},
		dimensions: function() {
			return this._dimensions();
		},
		mult: function(rhs) {
			var terms = flatten([this.terms(), rhs.terms()])
			terms = combineLikeTerms(terms);
			return new UnitExpression(terms);
		},
		div: function(rhs) {
			var inverseRhs = new UnitExpression(rhs.terms().map(invert));
			return this.mult(inverseRhs);
		},
		pow: function(power) {
			var exponentiatedTerms = this.terms().map(termExponent(power));
			return new UnitExpression(exponentiatedTerms);
		},
		toBaseUnits: function() {
			var baseTerms = getEquivalentBaseTermsForList(this.terms());
			return new UnitExpression(baseTerms);
		},
		/**
		 * Simplifies the UnitExpression by combining like Terms.
		 */
		simplify: function() {
			return new UnitExpression(combineLikeTerms(this.terms()));
		},
		toMap: function() {
			var terms = combineLikeTerms(this.terms());

			return terms.reduce(
				function(map, term) {
					map[term.unit().name] = term.power();
					return map;
				}, 
				Object.create(null)
			);
		},
		toString: function() {
			var terms = this._terms.slice(0);
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
	
	function termExponent(power) {
		return function(t) {
			return new Term(t.unit(), t.power() * power); 	
		}
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
		var sum = terms.reduce(function(acc, t) { return acc + t.power() }, 0);
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