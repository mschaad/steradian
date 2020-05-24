define(['comparison/Comparator', 'Strings'], function(Comparator, Strings) {
    return Comparator.create(function(lhs, rhs) {
        if (!Strings.isString(lhs) || !Strings.isString(rhs)) {
            throw new Error("not a string");
        }

        if (lhs < rhs) {
            return -1;
        } else if (lhs > rhs) {
            return 1;
        } else if (lhs === rhs) {
            return 0;
        } else {
            throw new Error("strings were somehow equal, but not equal");
        }
    });
});