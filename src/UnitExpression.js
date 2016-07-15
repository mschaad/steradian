define([], function() {
	function UnitExpression(terms) {
		this._terms = terms;
	}
		
	UnitExpression.prototype = {
		terms: function() {
			return this._terms();
		},
		mult: function(rhs) {
			throw 'not implemented';
		},
		div: function(rhs) {
			throw 'not implemented';
		},
		pow: function(power) {
			var exponentiatedTerms = this.terms().map(function(t) { return t.pow(power); });
			return new UnitExpression(exponentiatedTerms);
		},
		simplify: function() {
			var baseTerms = getEquivalentBaseTerms(this.terms());
			return new UnitExpression(baseTerms);
		},
	};
	
	return UnitExpression;
});