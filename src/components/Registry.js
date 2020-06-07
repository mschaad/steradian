define(['Guard', 'Test'], function(Guard, Test) {
    function Registry(registryItemType, areEquivalent) {
        Guard(registryItemType, 'registryItemType').isValue().isFunction();
        this.registryItemType = registryItemType;
        var table = Object.create(null);

        this.register = function register(item) {
            Guard(item, this.getItemTypeName()).isValue().instanceOf(registryItemType);
            var name = item.name();
            Guard(name, this.getItemTypeName() + '.name').isString();

            var maybeExistingItem = this.tryGet(item.name());
            if (maybeExistingItem) {
                if (!areEquivalent(item, maybeExistingItem)) {
                    throw new Error("duplicate " + this.getItemTypeName() + " registered: " + name);
                }                
            }
            table[name] = item;
            if (!this.tryGet(name)) {
                throw new Error('self-test failed registering ' + name);
            }
        };

        this.tryGet = function tryGet(name) {
            Guard(name, 'name').isString();
            var item = table[name];
            return item;
        };
    }

    Registry.prototype = {
        get: function get(name) {
            var item = this.tryGet(name);
            if (!Test.isValue(item)) {
                throw new Error("no " + this.getItemTypeName() + " found by the name '" + name + "'");
            }
            return item;
        },
        getItemTypeName: function getItemTypeName() {
            return this.registryItemType.name;
        },
        hasItem: function hasItem(name) {
            return !!this.tryGet(name);
        }
    };

    return Registry;
});