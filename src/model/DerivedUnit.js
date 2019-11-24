define(['Guard', 'UnitType', 'Dimensions', 'Unit', 'UnitExpression'], 
function(Guard, UnitType, Dimensions, Unit, UnitExpression) {
	function DerivedUnit(name, symbol, scale, terms) {
		if (terms.length === 0) {
			throw new Error("terms list was empty");
		}
		Guard(terms, 'terms').isTruthy().isArray();
		var compositeScale = scale * getScaleOfTerms(terms);
		Unit.call(this, name, symbol, compositeScale);
		this._terms = Array.prototype.slice.call(terms, 0);
	}

	function getScaleOfTerms(terms) {
		return terms
		.map(function(term) {
			return Math.pow(term.unit().scale, term.power());
		})
		.reduce(
			function(acc, factor) {
				return acc * factor;
			}, 
			1
		)
	}

	DerivedUnit.prototype = Object.create(Unit.prototype);

	var functions = {
		getDimensions: function() {
			return this.expression().dimensions();
		},
		isBaseUnit: function() {
			return false;
		},
		expression: function() {
			var terms = [];
			for(var i = 0; i < this._terms.length; i++) {
				var up = this._terms[i];
				terms[i] = up;
			}
			return new UnitExpression(terms);
		},
		toString: function() {
			return this.symbol;
		}
	};

	Object.assign(DerivedUnit.prototype, functions);

	return DerivedUnit;
});