define([], function() {
    function SystemDefVisitor() {

    }

    SystemDefVisitor.prototype = {
        visit: function(systemDef, visitor) {
            visitor = new Visitor(visitor);
            visitor.name(systemDef.name);
            visitor.baseUnits(systemDef.base);
            Object.entries(systemDef.base)
                .forEach(function(entry) {
                    visitor.baseUnit(entry[0], entry[1]);
                });
            visitor.derivedUnits(systemDef.derived);
            Object.entries(systemDef.derived)
                .forEach(function(entry) {
                    var key = entry[0];
                    var value = entry[1];
                    if (value) {
                        visitor.derivedUnit(key, value);
                    }
                });
            var other = systemDef.other || [];
            visitor.otherUnits(other);
            other.forEach(function(unit) {
                visitor.otherUnit(unit);
            });
        }
    };

    function Visitor(desc) {
        if (desc.name) {
            this.name = desc.name;
        }

        if (desc.baseUnits) {
            this.baseUnits = desc.baseUnits;
        }

        if (desc.baseUnit) {
            this.baseUnit = desc.baseUnit;
        }

        if (desc.derivedUnits) {
            this.derivedUnits = desc.derivedUnits;
        }

        if (desc.derivedUnit) {
            this.derivedUnit = desc.derivedUnit;
        }

        if (desc.otherUnits) {
            this.otherUnits = desc.otherUnits;
        }

        if (desc.otherUnit) {
            this.otherUnit = desc.otherUnit;
        }
        Object.freeze(this);
    }

    Visitor.prototype = (function() {
        /* jshint -W098 */
        return {
            name: function(name) {  },
            baseUnits: function(unitMap) {},
            baseUnit: function(unitType, baseUnit) {},
            derivedUnits: function(derivedUnitMap) {},
            derivedUnit: function(unitType, derivedUnit) {},
            otherUnits: function(units) {},
            otherUnit: function(unit) {}
        };
    }());

    Object.assign(SystemDefVisitor, {
        Visitor: Visitor
    });

    return SystemDefVisitor;
});