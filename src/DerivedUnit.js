define(['UnitType', 'Dimensions', 'Unit'], function(UnitType, Dimensions, Unit) {
	function DerivedUnit(terms) {
		this._terms = terms.slice(0);
	}

	DerivedUnit.prototype = Object.create(Unit.prototype);

	var functions = {
		getDimensions: function() {
			if (!this._dimensions) {
				var dim = [];
				for(var i = 0; i < this._terms.length; i++) {
					var term = this._terms[i];
					var typeIndex = UnitType[term.unit().name];
					
					var currentValue = dim[typeIndex] || 0;
					var updatedValue = currentValue + term.power;
					dim[typeIndex] = updatedValue;
				}
				this._dimensions = new Dimensions(dim);
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