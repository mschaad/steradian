define(['Guard', 'UnitType', 'DerivedUnitType'], function(Guard, UnitType, DerivedUnitType) {
    function System(def) {
        Guard(def.name, "def.name").isTruthy().isString();
        
        var name = def.name;
        this.name = function() { return name; };

        Guard(def.base, "def.base").isObject();

        for(var unitTypeName in UnitType) {
            var unit = def.base[unitTypeName];
            this[unitTypeName] = (function(v) {
                return function() { return v; };
            })(unit);
        }

        Guard(def.derived, "def.derived").isObject();

        for(var unitTypeName in DerivedUnitType) {
            var derivedUnit = def.derived[unitTypeName];
            this[unitTypeName] = (function(v) {
                return function() { return v; };
            })(derivedUnit);
        }
        
        //TODO: other units

        Object.freeze(this);
    }

    System.create = function(def) {
        return new System(def);
    };

    return System;
});