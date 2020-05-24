define(['comparison/Comparator', 'Test'], function(Comparator, Test) {
    function defaultComparison(lhs, rhs) {
        // are either or both of these values nullish? If so, we will sort to the top.
        if (Test.isValue(lhs) && !Test.isValue(rhs)) {
            return 1; //nullish rhs comes first
        } else if (!Test.isValue(lhs) && Test.isValue(rhs)) {
            return -1; //nullish lhs comes first
        } else if (!Test.isValue(lhs) && !Test.isValue(rhs)) {
            return 0;
        }
        // lhs and rhs are both values: use default javascript comparison rules
        else if (lhs < rhs) {
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