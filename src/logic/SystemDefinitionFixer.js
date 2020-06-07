define(
    ['Guard', 'Test', 'Units', 'Unit',
        'UnitType', 'DerivedUnitType', 
        'components/Registry', 'logic/DependencyAnalyzer',
        'logic/SystemDefVisitor'], 
    function(Guard, Test, Units, Unit,
        UnitType, DerivedUnitType, 
        Registry, DependencyAnalyzer,
        SystemDefVisitor) {
        
        var Node = DependencyAnalyzer.Node;

        function SystemDefinitionFixer(systemDef) {
            var reg = collectUnitsAsRegistry(systemDef);
            var fixedSystemDef = replaceUnitDefinitionsWithUnits(systemDef, reg);
            return fixedSystemDef;
        }

        function getDerivedUnitNodes(systemDef) {
            return DerivedUnitType.values()
                .map(function (unitType) {
                    return systemDef.derived[unitType.name()];
                })
                .filter(function (derivedUnitOrDef) {
                    return !!derivedUnitOrDef;
                })
                .map(function (derivedUnitOrDef) {
                    if (Units.isUnit(derivedUnitOrDef)) {
                        return mapUnitToNode(derivedUnitOrDef);
                    }
                    else {
                        var derivedUnitDef = derivedUnitOrDef;
                        return mapDerivedUnitDefToNode(derivedUnitDef);
                    }
                });
        }

        function mapUnitToNode(unit) {
            // no dependencies, because it's already resolved.
            // we still need to model it as a Node, though,
            // so that the DependencyAnalyzer doesn't complain
            // that the graph is incomplete.
            return new Node(unit.name(), unit, []);
        }        

        function mapDerivedUnitDefToNode(derivedUnitDef) {
            var dependencyNames = derivedUnitDef.units
            .map(function(termDef) {
                return termDef.unit;
            })
            .map(function(unitOrName) {
                if (Units.isUnit(unitOrName)) {
                    return null;
                }
                var name = unitOrName;
                return name;
            })
            .filter(function(name) { return !!name; });

            return new Node(
                    derivedUnitDef.name,
                    derivedUnitDef,
                    dependencyNames
            );
        }

        function getBaseUnitNodes(systemDef) {
            var baseUnits = getBaseUnits(systemDef);
            var baseUnitNodes = baseUnits.map(mapUnitToNode);
            return baseUnitNodes;
        }

        function getNodesInResolutionOrder(systemDef) {
            var dependencyAnalyzer = new DependencyAnalyzer();
            var derivedUnitNodes = getDerivedUnitNodes(systemDef);
            var baseUnitNodes = getBaseUnitNodes(systemDef);
            var graphNodes = baseUnitNodes.concat(derivedUnitNodes);
            var orderedNodes = dependencyAnalyzer.getResolutionOrder(graphNodes);
            return orderedNodes;   
        }

        function getBaseUnits(systemDef) {
            return UnitType.values()
                .map(function (unitType) {
                    return systemDef.base[unitType.name()];
                })
                .map(function (baseUnitOrDef) {
                    if (Units.isUnit(baseUnitOrDef)) {
                        var baseUnit = baseUnitOrDef;
                        return baseUnit;
                    }
                    else {
                        var baseUnitDef = baseUnitOrDef;
                        return Units.createBaseUnit(baseUnitDef);
                    }
                });
        }

        function replaceUnitDefinitionsWithUnits(systemDef, reg) {
            var visitor = new SystemDefVisitor();
            var copy = {};
            visitor.visit(systemDef, {
                name: function (name) {
                    copy.name = name;
                },
                baseUnits: function ( /*unitMap*/) {
                    copy.base = {};
                },
                baseUnit: function (unitType, baseUnitOrDef) {
                    var baseUnit = Units.isUnit(baseUnitOrDef) ?
                        baseUnitOrDef :
                        reg.get(baseUnitOrDef.name);
                    copy.base[unitType] = baseUnit;
                },
                derivedUnits: function ( /*derivedUnitMap*/) {
                    copy.derived = {};
                },
                derivedUnit: function (unitType, derivedUnitOrDef) {
                    var derivedUnit = Units.isUnit(derivedUnitOrDef) ?
                        derivedUnitOrDef :
                        reg.get(derivedUnitOrDef.name);
                    copy.derived[unitType] = derivedUnit;
                },
                otherUnits: function ( /*units*/) {
                    copy.other = [];
                },
                otherUnit: function (unitOrDef) {
                    var unit = Units.isUnit(unitOrDef) ?
                        unitOrDef :
                        reg.get(unitOrDef.name);
                    copy.other.push(unit);
                }
            });
            return copy;
        }

        function collectUnitsAsRegistry(systemDef) {
            var reg = new Registry(Unit, Units.equal);
            var orderedNodes = getNodesInResolutionOrder(systemDef);
            // Prime the registry with the already-constructed Units.
            orderedNodes
                .map(function (node) {
                    return node.data;
                })
                .filter(function (data) {
                    return Units.isUnit(data);
                })
                .forEach(function (unit) {
                    reg.register(unit);
                });

            // Construct the DerivedUnits from their definitions.
            orderedNodes
                .map(function (node) {
                    return node.data;
                })
                .filter(function (unitOrDef) {
                    // there are no BaseUnit defs in this collection.
                    return !Units.isUnit(unitOrDef);
                })
                .forEach(function (derivedUnitDef) {
                    var derivedUnit = Units.createDerivedUnit(derivedUnitDef, reg);
                    reg.register(derivedUnit);
                    return derivedUnit;
                });
            return reg;
        }
   
        return SystemDefinitionFixer;
    }
);