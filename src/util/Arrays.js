define(['Guard'], function(Guard) {
    var Arrays = {
        clone: function(arr) {
            Guard(arr, "arr").isArray();
            return Array.prototype.slice.call(arr, 0);
        },
        frozenClone: function(arr) {
            Guard(arr, "arr").isArray();
            return Object.freeze(Arrays.clone(arr));
        },
    };
    return Arrays;
});