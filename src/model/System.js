define(['Guard','Arrays','Unit','UnitType', 'DerivedUnitType','logic/SystemDefinitionFixer'], 
function(Guard, Arrays, Unit, UnitType, DerivedUnitType, SystemDefinitionFixer) {
     /**
      * @classdesc
      * A System of units of measure.
      * @class
      * @alias System
      * @param {SystemDefinition} def - the system definition.
      * @hideconstructor
      */
    function System(def) {
        Guard(def.name, "def.name").isTruthy().isString();
        
        var name = def.name;

        /** 
         * Returns the name of the System.
         * @method
         * @type {string}
         */
        this.name = function name() { return name; };

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

        /**
         * A list of all "other" (non-defining) Units in the System.
         * An example of this type of Unit would be the kilometer: it is
         * part of the SI System, but is not defining part of the System
         * as the meter is.
         * @member {Unit[]}
         * @alias System#other
         */
        that.other = Arrays.frozenClone(other);

        Object.freeze(allUnits);

        /** 
         * returns an array of all Unit types in the system.
         * @method 
         * @type {Unit[]}
         */
        this.allUnits = function() {
            return allUnits;
        };

        Object.freeze(this);
    }

    System.prototype = 
    /** @lends System# */
    {
        /**
         * returns the name of the System.
         * @method
         * @type {string}
         */
        toString: function() {
            return this.name();
        }
    };

    Object.defineProperty(System.prototype, 'constructor', {
        value: System,
        enumerable: false,
        writable: true
    });

    /**
     * @param {SystemDefinition} def 
     * @private
     */
    System.create = function(def) {
        return new System(def);
    };

    return System;
});