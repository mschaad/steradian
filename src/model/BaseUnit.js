define(['Guard', 'Unit', 'UnitType', 'Dimensions', 'Term', 'UnitExpression'], 
function(Guard, Unit, UnitType, Dimensions, Term, UnitExpression) {
    function BaseUnit(name, type, symbol, scale) {
        Unit.call(this, name, symbol, scale);
        Guard(type, "type").isString().isTruthy();
        this.type = type;

        var that = this;
        var dimensions = null;
        this._dimensions = function() {
            if (dimensions === null) {
                dimensions = getDimensions.call(that);
            }
            return dimensions;
        }
        Object.freeze(this);
    }

    BaseUnit.prototype = Object.create(Unit.prototype);

    function getDimensions() {
        var dim = [];
        dim[UnitType[this.type]] = 1;
        return new Dimensions(dim);
    }

    Object.assign(
        BaseUnit.prototype,
        {
            dimensions: function() {
                return this._dimensions();
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