define(['comparison/comparators/DefaultComparator', 'comparison/Comparator'], function(DefaultComparator, Comparator, Strings) {
    
    var ProjectionComparator = {
        create: function(projection, comparator) {
            var c = comparator || DefaultComparator;
            return Comparator.create(compareByProjection(projection, c));
        },
        ofProperties(name, comparator) {
            return ProjectionComparator.create(byProperty(name), comparator);
        }
    };

    function compareByProjection(projection, comparator) {
        return function(lhs, rhs) {
            return comparator(projection(lhs), projection(rhs));
        };
    }

    function byProperty(propertyName) {
        return function(obj) {
            return obj[propertyName];
        };
    }

    return ProjectionComparator;
})