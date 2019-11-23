define([], function() {
    return {
        isString: function(value) {
            return (value instanceof String) || typeof(value) === "string";
        }
    };
})