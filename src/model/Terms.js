define(['Guard', 'comparison/Comparators'], function(Guard, Comparators) {
    var unitComparator = Comparators.byProperty('name');

	var termComparator = Comparators.composite([
		Comparators.byProperty('_unit', unitComparator),
		Comparators.byProperty('_power')
    ]);   

    var Terms = {
        COMPARATOR: termComparator,
		equal: function(lhs, rhs) {
			return termComparator.equal(lhs, rhs);
		}
    };   

    return Terms;
})