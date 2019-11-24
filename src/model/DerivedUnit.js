define([
	'Guard', 'Arrays',
	'Unit', 'UnitExpression'], 
function(Guard, Arrays, Unit, UnitExpression) {
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
		dimensions: function() {
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