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

	Object.assign(DerivedUnit.prototype, functions);

	return DerivedUnit;
});