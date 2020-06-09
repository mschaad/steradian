define(['Guard','Arrays','Unit','UnitType', 'DerivedUnitType','logic/SystemDefinitionFixer'], 
function(Guard, Arrays, Unit, UnitType, DerivedUnitType, SystemDefinitionFixer) {
    function System(def) {
        Guard(def.name, "def.name").isTruthy().isString();
        
        var name = def.name;
        this.name = function() { return name; };

        Guard(def.base, "def.base").isObject();

        def = SystemDefinitionFixer(def);

        var that = this;

        var allUnits = [];

        UnitType.values().forEach(function(unitType) {
            var unitTypeName = unitType.name();
            if (!def.base.hasOwnProperty(unitTypeName)) {
                throw new Error("System definition for '" + name + "' is missing base unit for " + unitTypeName);
            }
            
            var unit = def.base[unitTypeName];
            Guard(unit, "def.base." + unitTypeName).instanceOf(Unit);
            
            allUnits.push(unit);
            
            that[unitTypeName] = (function(v) {
                return function() { return v; };
            })(unit);
        });

        Guard(def.derived, "def.derived").isObject();
        
        DerivedUnitType.values().forEach(function(unitType) {
            var unitTypeName = unitType.name();
            var derivedUnit = def.derived[unitTypeName];

            if (!derivedUnit) {
                return;
            }
            allUnits.push(derivedUnit);

            that[unitTypeName] = (function(v) {
                return function() { return v; };
            })(derivedUnit);
        });

        var other = def.other || [];
        
        other.forEach(function(unit) {
            allUnits.push(unit);
        });

        that.other = Arrays.frozenClone(other);

        Object.freeze(allUnits);
        this.allUnits = function() {
            return allUnits;
        };

        Object.freeze(this);
    }

    System.create = function(def) {
        return new System(def);
    };

    return System;
});