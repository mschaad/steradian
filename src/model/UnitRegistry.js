define(['Guard'], function(Guard) {
    function UnitRegistry() {
        var table = Object.create(null);
        this.register = function(unit) {
            table[unit.name] = unit;
        };
        this.get = function(name) {
            return table[name];
        };
    }

    return UnitRegistry;
})