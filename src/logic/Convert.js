define([
    'Strings', 'Test', 'Guard',
    'Unit', 'UnitExpression', 'Term', 'System',
    'Units'
], 
function(Strings, Test, Guard,
    Unit, UnitExpression, Term, System,
    Units) {
    function coerceToUnitExpression(obj, registry) {
        if (Test.instanceOf(obj, UnitExpression)) {
            return obj;
        }
        var unit;
        if (Unit.isUnit(obj)) {
            unit = obj;
        }
        else if (Strings.isString(obj)) {
            var identifier = obj;
            unit = registry.get(identifier);
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
		quantity: function (q, targetUnitsOrSystem, registry) {
            var targetUnits;
            if (Test.instanceOf(targetUnitsOrSystem, System)) {
                var system = targetUnitsOrSystem;
                targetUnits = Convert.unitsToSystem(q.units(), system, registry);
            }
            else {
                targetUnits = targetUnitsOrSystem;
                targetUnits = coerceToUnitExpression(targetUnits, registry);
            }

            var originalDimensions = q.units().dimensions();
            targetUnits = coerceToUnitExpression(targetUnits, registry);
            var newDimensions = targetUnits.dimensions();
            if (!originalDimensions.equals(newDimensions)) {
                throw 'incompatible unit dimensions';
            }
            
            var oldTerms = q.units().terms();
            var newTerms = targetUnits.terms();
            
            var delta = Object.create(null);
            
            var unitTable = Object.create(null);
            
            var i, term, unit, currentValue, updatedValue;
            
            for(i = 0; i < newTerms.length; i++) {
                term = newTerms[i];
                unit = term.unit();
                unitTable[unit.name()] = unit;
                currentValue = delta[unit.name()] || 0;
                updatedValue = currentValue + term.power();
                delta[unit.name()] = updatedValue;
            }
            
            for(i = 0; i < oldTerms.length; i++) {
                term = oldTerms[i];
                unit = term.unit();
                unitTable[unit.name()] = unit;
                currentValue = delta[unit.name()] || 0;
                updatedValue = currentValue - term.power();
                delta[unit.name()] = updatedValue;
            }
            
            var scale = 1;
            var power;
            for(var unitName in delta) {
                power = delta[unitName];
                unit = unitTable[unitName];
                var absPower = Math.abs(power);
                if (power > 0) {
                    scale = scale * Math.pow(unit.scale(), absPower);
                }
                else if (power < 0) {
                    scale = scale / Math.pow(unit.scale(), absPower);
                }
                else { //-> power == 0
                    //that's interesting.  but still, do nothing.
                }
            }
            
            var newValue = q.value() * scale;
            
            return { units: targetUnits, value: newValue };
        },
        unitsToSystem: function(unitOrExpression, system, registry) {
            Guard(registry, "registry").isValue();
            Guard(system, "system").isValue();
            var unitExpression = Convert.toUnitExpression(unitOrExpression, registry);
            var mappedTerms = unitExpression.terms().map(mapTerm);
            
            return new UnitExpression(mappedTerms);
    
            function mapTerm(term) {
                return new Term(
                    mapUnit(term.unit()),
                    term.power()
                );
            }
        
            function mapUnit(unit /* : Unit */) /* : UnitExpression */ {
                if (Units.isDerivedUnit(unit)) {
                    var targetUnit = registry.tryGetUnitOfDimensions(unit.dimensions(), system);
                    
                    if (!targetUnit) {
                        return Convert.unitsToSystem(unit.expression(), system, registry);
                    }

                    return targetUnit;
                }
                else if (Units.isBaseUnit(unit)) {
                    var maybeTargetUnit = registry.tryGetUnitOfType(unit.type(), system);
                    if (!maybeTargetUnit) {
                        throw new Error('no unit of type ' + unit.type() + ' found for system ' + system.name());
                    }
                    return maybeTargetUnit;
                }
                else {
                    throw new Error('unit was neither a BaseUnit nor a DerivedUnit!');
                }
            }
        }
    };

    return Convert;
});
