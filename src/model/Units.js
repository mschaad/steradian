define(
    [
        'Guard',
        'Unit', 'BaseUnit', 'DerivedUnit'
    ], 
    function(
        Guard,
        Unit, BaseUnit, DerivedUnit) {
        return {
            isUnit: Unit.isUnit
        }
    }
)