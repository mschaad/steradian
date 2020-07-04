define(['Guard', 'comparison/Comparators', 'Test', 'Unit', 'UnitExpression', 'Term'], function(Guard, Comparators, Test, Unit, UnitExpression, Term) {
    var unitComparator = Comparators.byProperty('name');

	var termComparator = Comparators.composite([
		Comparators.byProperty('_unit', unitComparator),
		Comparators.byProperty('_power')
    ]);   

    var Terms = {
        create: function(unit, power) {
            if (!Test.instanceOf(unit, Unit) &&
                !Test.instanceOf(unit, UnitExpression)
            ) {
                throw new Error("expected unit to be of type Unit or UnitExpression but instead got '" + unit + "' of type " + unit.constructor.name);
            }
            return new Term(unit, power);
        },
        COMPARATOR: termComparator,
		equal: function(lhs, rhs) {
			return termComparator.equal(lhs, rhs);
		}
    };   

    return Terms;
});