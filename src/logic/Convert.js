define(['Unit', 'Strings'], 
function(Unit, Strings) {
    function toUnit(Sr, identifierOrUnit) {
        var unit;
        if (Unit.isUnit(identifierOrUnit)) {
            unit = identifierOrUnit;
        }
        else if (Strings.isString(identifierOrUnit)) {
            var identifier = identifierOrUnit;
            unit = Sr.unit(identifier);
            if (!unit) {
                throw new Error("Unit '" + identifier + "' not found");
            }
        }
        else {
            throw new Error("Expected: unit name or Unit but found object of type '" +
                typeof(identifierOrUnit) + "'");
        }
        return unit;
    }

    var Convert = {
        convert: function (Sr, q, newUnits) {
            var originalDimensions = q.unit.getDimensions();
            newUnits = toUnit(Sr, newUnits);
            var newDimensions = newUnits.getDimensions();
            if (!originalDimensions.equals(newDimensions)) {
                throw 'incompatible unit dimensions';
            }
            
            var oldTerms = q.unit.expression().terms();
            var newTerms = newUnits.expression().terms();
            
            var delta = {};
            
            var unitTable = {};
            
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
                if (delta.hasOwnProperty(unitName)) {
                    power = delta[unitName];
                    unit = unitTable[unitName];
                    if (power > 0) {
                        scale = scale * Math.pow(unit.scale, power);
                    }
                    else if (power < 0) {
                        scale = scale / Math.pow(unit.scale, power);
                    }
                    else { //-> power == 0
                        //that's interesting.  but still, do nothing.
                    }
                }
            }
            
            var newValue = q.value * scale;
            
            return Sr.quantity(newUnits, newValue);
        }
    };

    return Convert;
})