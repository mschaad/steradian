define(['UnitType', 'Dimensions', 'Unit'], function(UnitType, Dimensions, Unit) {
	function DerivedUnit(terms) {
		this._terms = terms.slice(0);
	}

	DerivedUnit.prototype = Object.create(Unit.prototype);

	var functions = {
		getDimensions: function() {
			if (!this._dimensions) {
				var dim = this._terms
					.map(function(t) {
						return t.unit().getDimensions();
					})
					.reduce(function(acc, item) {
						return acc.add(item);
					}, Dimensions.empty());
				
				this._dimensions = dim;
			}
			return this._dimensions;
		},
		getTerms: function() {
			var terms = [];
			for(var i = 0; i < this._terms.length; i++) {
				var up = this._terms[i];
				terms[i] = up;
			}
			return terms;
		}
	};

	Object.assign(DerivedUnit.prototype, functions);

	return DerivedUnit;
});