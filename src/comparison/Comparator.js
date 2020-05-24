define([], function() {
    
    var methods = {
        equal: function(lhs, rhs) {
            return this(lhs, rhs) === 0;
        },
        compare: function(lhs, rhs) {
            return this(lhs, rhs);
        }
    };

    var Comparator = {
        create: function(comparison) {
            var fn = function(lhs, rhs) {
                return comparison(lhs, rhs);
            };

            for(var name in methods) {
                var value = methods[name];
                if (typeof value === 'function') {
                    value = value.bind(fn);    
                }
                fn[name] = value;
            }

            return fn;
        }
    };

    return Comparator;
});