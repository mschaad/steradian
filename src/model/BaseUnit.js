define(['Guard', 'Unit', 'UnitType', 'Dimensions', 'Term', 'UnitExpression'], 
function(Guard, Unit, UnitType, Dimensions, Term, UnitExpression) {
    function BaseUnit(name, type, symbol, scale) {
        Unit.call(this, name, symbol, scale);
        Guard(type, "type").isString().isTruthy();
        this.type = type;
    }

    BaseUnit.prototype = Object.create(Unit.prototype);

    Object.assign(
        BaseUnit.prototype,
        {
            getDimensions: function() {
				if (!this._dimensions) {
					var dim = [];
					dim[UnitType[this.type]] = 1;
					this._dimensions = new Dimensions(dim);
				}
				return this._dimensions;
            },
            isBaseUnit: function() {
                return true;
            },
            expression: function() {
				var terms = [new Term(this, 1)];
				return new UnitExpression(terms);
            }
        }
    )

    return BaseUnit;
});