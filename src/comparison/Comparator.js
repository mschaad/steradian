define([], function() {
    
    var methods = {

    };

    var Comparator = {
        create: function(comparison) {
            var fn = function(lhs, rhs) {
                return comparison(lhs, rhs);
            };

            for(var name in methods) {
                fn[name] = methods[name];
            }

            return fn;
        }
    }

    return Comparator;
})