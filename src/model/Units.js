define(
    [
        'Guard', 'Strings',
        'Unit', 'BaseUnit', 'DerivedUnit', 'Term',
        'comparison/Comparators'
    ], 
    function(
        Guard, Strings,
        Unit, BaseUnit, DerivedUnit, Term,
        Comparators) {

        var COMPARATOR = Comparators.byProperty("name");

        function expect(value, pattern) {
            //TODO: enforce
        }

        return {
            createBaseUnit: function(def) {
                expect(def, {
                    name: String,
                    type: String,
                    symbol: String,
                    scale: Number
                });
                var unit = new BaseUnit(def.name, def.type, def.symbol, def.scale);
                return unit;
            },
            createDerivedUnit: function(def, registry) {
                Guard(def.units, 'def.units').isTruthy().isArray();
                expect(def, {
                    name: String,
                    units: Object /* List<TermDef> */,
                    symbol: String,
                    scale: Number
                });
				var terms = def.units.map(function(desc) {
                    return toTerm(desc, registry);
                });
				var scale = def.scale || 1;
                var unit = new DerivedUnit(def.name, def.symbol, scale, terms);
                return unit;
            },
            isUnit: Unit.isUnit,
            COMPARATOR: COMPARATOR,
            equal: function(lhs, rhs) {
                return COMPARATOR(lhs, rhs) === 0;
            }
        };
        
        function toTerm(desc, registry) {	
            return new Term(toUnit(desc.unit, registry), desc.power);
        }

        function toUnit(identifierOrUnit, registry) {
            var unit;
            if (Unit.isUnit(identifierOrUnit)) {
                unit = identifierOrUnit;
            }
            else if (Strings.isString(identifierOrUnit)) {
                var identifier = identifierOrUnit;
                if (!registry) {
                    throw new Error("cannot resolve unit name '" + 
                        identifierOrUnit + 
                        "' to a Unit because a registry was not supplied."
                    );
                }
                unit = registry.get(identifier);
            }
            else {
                throw new Error("Expected: unit name or Unit but found object of type '" +
                    typeof(identifierOrUnit) + "'");
            }
            return unit;
        }
    }
)