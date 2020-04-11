define([
    'comparison/comparators/DefaultComparator', 
    'comparison/Comparator'
], 
function(DefaultComparator, Comparator) {
    var ArrayComparator = {
        create: function(itemComparator) {
            return Comparator.create(byItems(itemComparator || DefaultComparator));
        }
    };

    function byItems(comparator) {
        return function (lhs, rhs) {
            for(var i = 0; i < lhs.length; i++) {
                var comparison = comparator(lhs[i], rhs[i]);
                if (comparison !== 0) { 
                    return comparison;
                }
            }
            return 0;
        };
    }

    return ArrayComparator;
})