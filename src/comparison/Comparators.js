define([
    'comparison/comparators/DefaultComparator', 
    'comparison/comparators/StringComparator', 
    'comparison/comparators/ProjectionComparator', 
    'comparison/comparators/CompositeComparator',
    'comparison/comparators/ArrayComparator'
], 
function(DefaultComparator, StringComparator, ProjectionComparator, CompositeComparator, ArrayComparator) {
    var Comparators = {
        DEFAULT: DefaultComparator,
        STRING: StringComparator,
        composite: function(comparators) {
            return CompositeComparator.create(comparators)
        },
        byProperty: function(name, comparator) {
            return ProjectionComparator.ofProperties(name, comparator);
        },
        byProjection: function(projection, comparator) {
            return ProjectionComparator.create(projection, comparator);
        },
        array: function(comparator) {
            return ArrayComparator.create(comparator);
        }
    };

    return Comparators;
});