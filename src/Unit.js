define(['src/UnitType', 'src/Term', 'src/Dimensions'], 
	function(UnitType, Term, Dimensions) {
		function Unit(name, type, symbol, scale) {
			this.name = name;
			this.type = type;
			this.symbol = symbol;
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
		return Unit;
	}
);