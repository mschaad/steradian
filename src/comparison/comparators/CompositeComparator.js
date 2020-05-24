define(['comparison/Comparator', 'Arrays'], function(Comparator, Arrays) {
    var CompositeComparator = {
        create: function(comparators) {
            var clonedComparators = Arrays.frozenClone(comparators);
            return Comparator.create(lexicographicComparison(clonedComparators));
        }
    };

    function lexicographicComparison(comparators) {
        return function(lhs, rhs) {
            var comparator;
            var comparison;
            for(var i = 0; i < comparators.length; i++) {
                comparator = comparators[i];
                comparison = comparator(lhs, rhs);

                if (comparison !== 0) {
                    return comparison;
                }
            }

            return 0;
        };
    }

    return CompositeComparator;
});