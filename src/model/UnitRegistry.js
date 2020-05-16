define(
    ['Guard', 'Test',
    'Unit', 'System',
    'Units'
    ], 
    function(Guard, Test, Unit, System, Units) {
    
    function Registry(registryItemType) {
        Guard(registryItemType, 'registryItemType').isValue().isFunction();
        this.registryItemType = registryItemType;
        var table = Object.create(null);

        this.register = function register(item) {
            Guard(item, this.getItemTypeName()).isValue().instanceOf(registryItemType);
            var name = item.name();
            Guard(name, this.getItemTypeName() + '.name').isString();
            if (this.hasItem(name)) {
                throw new Error("duplicate " + this.getItemTypeName() + " registered: " + name);
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

    function isBaseUnitDef(def) {
        return !def.units;
    }

    function UnitRegistry() {
        var unitRegistry = new Registry(Unit);
        var systemRegistry = new Registry(System);

        this.get = function get(unitName) {
            return unitRegistry.get(unitName);
        };
        this.hasUnit = function hasUnit(unitName) {
            return unitRegistry.hasItem(unitName);
        };
        this.register = function register(defOrUnit) {
            var unit;
            if (Test.instanceOf(defOrUnit, Unit)) {
                unit = defOrUnit;
            }
            else if (Test.isObject(defOrUnit)) {
                var def = defOrUnit;
                if (isBaseUnitDef(def)) {
                    unit = Units.createBaseUnit(def);
                }
                else {
                    unit = Units.createDerivedUnit(def, this);
                }
            }
            unitRegistry.register(unit);
            
            return unit;
        };

        this.tryGet = function tryGet(unitName) {
            return unitRegistry.tryGet(unitName);
        };

        this.getSystem = function getSystem(systemName) {
            return systemRegistry.get(systemName);
        };
        this.hasSystem = function hasSystem(systemName) {
            return systemRegistry.hasItem(systemName);
        };
        this.registerSystem = function registerSystem(defOrSystem) {
            var system;
            if (Test.instanceOf(defOrSystem, System)) {
                system = defOrSystem;
            }
            else if (Test.isObject(defOrSystem)) {
                var def = defOrSystem;
                system = System.create(def);
            }
            systemRegistry.register(system);
            return system;
        };        

        this.tryGetSystem = function tryGetSystem(systemName) {
            return systemRegistry.tryGet(systemName);
        };
    }

    return UnitRegistry;
})