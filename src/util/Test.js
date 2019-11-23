define(['Strings'], function(Strings) {
    var Test = {
        isValue: function(value) {
            if (value === null || typeof(value) === 'undefined') {
                return false;
            }
            return true;
        },
        isString: function(value) {
            return Strings.isString(value);
        },
        instanceOf: function(value, objType) {
            if (!Test.isValue(value)) {
                return false;
            }
            return value instanceof objType;
        }
    };
    return Test;
});