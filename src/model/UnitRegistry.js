define(
    ['Guard', 'Test',
    'Unit', 'System', 'UnitType',
    'components/Registry',
    'DerivedUnitType', 'Units'
    ], 
    function(Guard, Test, 
        Unit, System, UnitType, 
        Registry,
        DerivedUnitType, Units) {
    
    function areUnitsEquivalent(lhs, rhs) {
        // Units are equivalent if they are structurally equivalent.
        return lhs === rhs || Units.equal(lhs, rhs);
    }

    function areSystemsEquivalent(lhs, rhs) {
        return lhs === rhs;
    }
        
    function isBaseUnitDef(def) {
        return !def.units;
    }

    function UnitRegistry() {
        var unitRegistry = new Registry(Unit, areUnitsEquivalent);
        var systemRegistry = new Registry(System, areSystemsEquivalent);

        var that = this;

        function coerceToSystem(systemOrId) {
            Guard(systemOrId, 'systemOrId').isValue();
            if (Test.instanceOf(systemOrId, System)) {
                return systemOrId;
            }
            else if (Test.isString(systemOrId)) {
                var id = systemOrId;
                return that.getSystem(id);
            }
            else {
                throw new Error('systemOrId was neither a System nor a valid System id.');
            }
        }

        function allUnitTypes() {
            return UnitType.values().concat(DerivedUnitType.values());
        }

        this.get = function get(unitName) {
            return unitRegistry.get(unitName);
        };
        this.tryGetUnitOfType = function (typeOrName, systemOrId) {
            var system = coerceToSystem(systemOrId);
            
            var prop;
            if (UnitType.isInstance(typeOrName) || DerivedUnitType.isInstance(typeOrName)) {
                var type = typeOrName;
                prop = system[type.name()];
            }
            else if (Test.isString(typeOrName)) {
                var name = typeOrName;
                prop = system[name];
            }
            else {
                throw new Error('typeOrName must be a UnitType, DerivedUnitType, or type name.');
            }

            if (!prop) {
                return false;
            }
            return prop();
        };
        this.tryGetUnitOfDimensions = function (dimensions, systemOrId) {
            var system = coerceToSystem(systemOrId);
            
            var matchingTypes = allUnitTypes()
                .map(function(type) { 
                    var fn = system[type.name()];
                    if (!fn) {
                        return null;
                    } else {
                        return fn();
                    }
                })
                .filter(function(maybeType) { return !!maybeType; })
                .filter(function(type) { return type.dimensions().equals(dimensions); });

            if (matchingTypes.length > 0) {
                return matchingTypes[0];
            }
            else {
                return false;
            }
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

            system.allUnits().forEach(function(unit) {
                if (!unit) {
                    throw new Error("value " + unit + " was not a Unit");
                }
                unitRegistry.register(unit);
            });

            return system;
        };        

        this.tryGetSystem = function tryGetSystem(systemName) {
            return systemRegistry.tryGet(systemName);
        };
    }

    return UnitRegistry;
});