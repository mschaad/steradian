define(
    [
        'Guard',
        'Unit', 'BaseUnit', 'DerivedUnit',
        'comparison/Comparators'
    ], 
    function(
        Guard,
        Unit, BaseUnit, DerivedUnit,
        Comparators) {

        var COMPARATOR = Comparators.byProperty("name");

        return {
            isUnit: Unit.isUnit,
            COMPARATOR: COMPARATOR,
            equal: function(lhs, rhs) {
                return COMPARATOR(lhs, rhs) === 0;
            }
        }
    }
)