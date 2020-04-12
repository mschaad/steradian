define(['Strings', 'Test', 'Unit', 'UnitExpression', 'Term'], 
function(Strings, Test, Unit, UnitExpression, Term) {
    function coerceToUnitExpression(Sr, obj) {
        if (Test.instanceOf(obj, UnitExpression)) {
            return obj;
        }
        var unit;
        if (Unit.isUnit(obj)) {
            unit = obj;
        }
        else if (Strings.isString(obj)) {
            var identifier = obj;
            unit = Sr.unit(identifier);
            if (!unit) {
                throw new Error("Unit '" + identifier + "' not found");
            }
        }
        else {
            throw new Error("Expected: unit name or Unit or UnitExpression but found object of type '" +
                typeof(obj) + "'");
        }
        return new UnitExpression([new Term(unit, 1)]);
    }

    var Convert = {
        toUnitExpression: coerceToUnitExpression,
        convert: function (Sr, q, newUnits) {
            var originalDimensions = q.unitExpression().dimensions();
            newUnits = coerceToUnitExpression(Sr, newUnits);
            var newDimensions = newUnits.dimensions();
            if (!originalDimensions.equals(newDimensions)) {
                throw 'incompatible unit dimensions';
            }
            
            var oldTerms = q.unitExpression().terms();
            var newTerms = newUnits.terms();
            
            var delta = Object.create(null);
            
            var unitTable = Object.create(null);
            
            var i, term, unit, currentValue, updatedValue;
            
            for(i = 0; i < newTerms.length; i++) {
                term = newTerms[i];
                unit = term.unit();
                unitTable[unit.name] = unit;
                currentValue = delta[unit.name] || 0;
                updatedValue = currentValue + term.power();
                delta[unit.name] = updatedValue;
            }
            
            for(i = 0; i < oldTerms.length; i++) {
                term = oldTerms[i];
                unit = term.unit();
                unitTable[unit.name] = unit;
                currentValue = delta[unit.name] || 0;
                updatedValue = currentValue - term.power();
                delta[unit.name] = updatedValue;
            }
            
            var scale = 1;
            for(var unitName in delta) {
                power = delta[unitName];
                unit = unitTable[unitName];
                var absPower = Math.abs(power);
                if (power > 0) {
                    scale = scale * Math.pow(unit.scale, absPower);
                }
                else if (power < 0) {
                    scale = scale / Math.pow(unit.scale, absPower);
                }
                else { //-> power == 0
                    //that's interesting.  but still, do nothing.
                }
            }
            
            var newValue = q.value() * scale;
            
            return Sr.quantity(newUnits, newValue);
        }
    };

    return Convert;
})