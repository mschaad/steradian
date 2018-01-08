define([], function() {
	function UnitExpression(terms) {
		this._terms = terms;
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
		simplify: function() {
			var baseTerms = getEquivalentBaseTerms(this.terms());
			return new UnitExpression(baseTerms);
		},
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
		terms = groupBy(terms, unitProperty);
		terms = terms.map(function(group) {
			return new Term(group.key, sumPowersOf(group.items));
		});
		return terms;
	}
	
	function invert(term) {
		return new Term(term.unit(), -term.power());
	}
	
	function flatten(arrays) {
		var flattened = [];
		flattened.length = arrays.reduce(function(acc, arr) { return acc + arr.length; }, 0);
		arrays.forEach(function(a) { 
			Array.prototype.push.apply(flattened, a);
		});
		return flattened;
	}
	
	function groupBy(arr, keySelector) {
		var groups = {};
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
		var sum = terms.reduce(function(acc, t) { acc + t.power() }, 0);
		return sum;
	}
		
	function getEquivalentBaseTerms(term) {
		var unit = term.unit();
		if (u.isBase()) {
			return u.terms();
		}
		else {
			var terms;
			terms = u.terms();
			terms = flatten(terms.map(getEquivalentBaseTerms));
			terms = terms.map(function(innerTerm) {
				return new Term(innerTerm.unit(), innerTerm.power() * term.power());
			});
			terms = combineLikeTerms(terms);
			return terms;
		}
	}
	
	return UnitExpression;
});