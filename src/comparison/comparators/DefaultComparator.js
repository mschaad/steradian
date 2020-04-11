define(['comparison/Comparator'], function(Comparator) {
    function defaultComparison(lhs, rhs) {
        if (lhs < rhs) {
            return -1;
        } else if (lhs > rhs) {
            return 1;
        } else {
            //equivalent or incomparable
            return 0;
        }
    }

    return Comparator.create(defaultComparison);
});