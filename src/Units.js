define(
    [
        'Guard',
        'Unit', 'BaseUnit', 'DerivedUnit'
    ], 
    function(
        Guard,
        Unit, BaseUnit, DerivedUnit) {
        return {
            isUnit: Unit.isUnit,
            isBaseUnit: function(unit) {
              Guard(unit, "unit").instanceOf(Unit);
              return unit instanceof BaseUnit;
            }
        }
    }
)