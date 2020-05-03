define(['model/systems/Imperial', 'model/systems/SI'], function(Imperial, SI) {
    return {
        systems: function() {
            return [ Imperial, SI ];
        }
    };
});