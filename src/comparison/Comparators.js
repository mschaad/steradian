define(['comparison/comparators/DefaultComparator', 'comparison/comparators/StringComparator', 'comparison/comparators/ProjectionComparator', 'comparison/comparators/CompositeComparator'], function(DefaultComparator, StringComparator, ProjectionComparator, CompositeComparator) {
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
        }
    };

    return Comparators;
});