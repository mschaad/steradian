define(['Guard','Unit','UnitType', 'DerivedUnitType'], function(Guard, Unit, UnitType, DerivedUnitType) {
    function System(def) {
        Guard(def.name, "def.name").isTruthy().isString();
        
        var name = def.name;
        this.name = function() { return name; };

        Guard(def.base, "def.base").isObject();

        var that = this;

        UnitType.values().forEach(function(unitType) {
            var unitTypeName = unitType.name();
            if (!def.base.hasOwnProperty(unitTypeName)) {
                throw new Error("System definition for '" + name + "' is missing base unit for " + unitTypeName);
            }
            
            var unit = def.base[unitTypeName];
            Guard(unit, "def.base." + unitTypeName).instanceOf(Unit);
            that[unitTypeName] = (function(v) {
                return function() { return v; };
            })(unit);
        });

        Guard(def.derived, "def.derived").isObject();
        
        DerivedUnitType.values().forEach(function(unitType) {
            var unitTypeName = unitType.name();
            var derivedUnit = def.derived[unitTypeName];
            that[unitTypeName] = (function(v) {
                return function() { return v; };
            })(derivedUnit);
        });
        
        //TODO: other units

        Object.freeze(this);
    }

    System.create = function(def) {
        return new System(def);
    };

    return System;
});