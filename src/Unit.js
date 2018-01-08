define(['Guard', 'UnitType', 'Term', 'Dimensions'], 
	function(Guard, UnitType, Term, Dimensions) {
		function Unit(name, type, symbol, scale) {
			Guard(name, "name").isString().isTruthy();
			this.name = name;
			Guard(type, "type").isString().isTruthy();
			this.type = type;
			Guard(symbol, "symbol").isString().isTruthy();
			this.symbol = symbol;
			Guard(scale, "scale").isNumber().isNotZero();
			this.scale = scale;
		}
			
		Unit.prototype = {
			getDimensions: function() {
				if (!this._dimensions) {
					var dim = [];
					dim[UnitType[this.type]] = 1;
					this._dimensions = new Dimensions(dim);
				}
				return this._dimensions;
			},
			getTerms: function() {
				var terms = [new Term(this, 1)];
				return terms;
			}
		};

		Unit.isUnit = function(value) {
			return (value instanceof Unit);
		};

		return Unit;
	}
);