define(['Guard', 'Term', 'Units'], function(Guard, Term, Units) {
	function UnitExpression(terms) {
		Guard(terms, "terms").isArrayOf(Term);
		this._terms = Array.prototype.slice.call(terms, 0);
	}
		
	UnitExpression.prototype = {
		terms: function() {
			return this._terms;
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
		if (Units.isBaseUnit(unit)) {
			return [ term ];
		}
		else {
			var subTermsExpr = new UnitExpression(unit.getTerms()).pow(term.power());
			return getEquivalentBaseTermsForList(subTermsExpr.terms());			
		}
	}
	
	return UnitExpression;
});