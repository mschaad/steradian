define(['Guard', 'Test', 'Unit'], function(Guard, Test, Unit) {
    function UnitRegistry() {
        var table = Object.create(null);

        this.register = function(unit) {
            Guard(unit, 'unit').isValue().instanceOf(Unit);
            var name = unit.name();
            Guard(name, 'unit.name').isString();
            if (this.hasUnit(name)) {
                throw Error("duplicate unit registered: " + name);
            }
            table[name] = unit;
            if (!this.tryGet(name)) {
                throw new Error('self-test failed registering ' + name);
            }
        };

        this.tryGet = function(name) {
            Guard(name, 'name').isString();
            var unit = table[name];
            return unit;
        };
    }

    UnitRegistry.prototype = {
        get: function(name) {
            var unit = this.tryGet(name);
            if (!Test.isValue(unit)) {
                throw new Error("no unit found by the name '" + name + "'");
            }
            return unit;
        },
        hasUnit: function(name) {
            return !!this.tryGet(name);
        }
    };

    return UnitRegistry;
})