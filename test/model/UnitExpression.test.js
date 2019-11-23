define([
    'mocha', 'chai', 
    'UnitExpression', 'Term',
    'test/StandardStrontiumFn'], 
function (
    mocha, chai, 
    UnitExpression, Term,
    StandardStrontiumFn
) {
    var assert = chai.assert;
    
    var ok = assert.ok,
		deepEqual = assert.deepEqual,
        equal = assert.equal;
    
    var suite = mocha.suite, test = mocha.test;

	suite("UnitExpression", function () {
        var Sr = StandardStrontiumFn();

        var Newton = Sr.derivedUnit({
            name: "Newton",
            symbol: "N",
            units: [
                { unit: "kilogram", power: 1 },
                { unit: "meter", power: 1 },
                { unit: "second", power: -2 }
            ]
        });

        function term(name, power) {
            return new Term(
                Sr.unit(name),
                power
            );
        }

        suite("terms", function() {
            test("simple", function() {
                var lhs = new UnitExpression([
                    term('meter', 1),
                    term('second', 1)
                ]);
    
                var terms = lhs.terms();
    
                equal(2, terms.length);
                
                equal("meter", terms[0].unit().name);
                equal(1, terms[0].power());

                equal("second", terms[1].unit().name);
                equal(1, terms[1].power());
            });
        });

        suite("simplify", function() {
            test("simple", function() {
                var lhs = new UnitExpression([
                    term('meter', 2),
                    term('meter', -1),
                    term('second', 1),
                    term('meter', 1),
                    term('meter', 1),
                    term('second', 1)
                ]);
    
                var combined = lhs.simplify();
                var terms = combined.terms();
    
                equal(2, terms.length);
                
                equal("meter", terms[0].unit().name);
                equal(3, terms[0].power());

                equal("second", terms[1].unit().name);
                equal(2, terms[1].power());
            });
        });

        suite("toMap", function() {
            test("simple", function() {
                var lhs = new UnitExpression([
                    term('meter', 1),
                    term('second', 1)
                ]);

                var actualMap = lhs.toMap();
    
                equal(1, actualMap.meter);
                equal(1, actualMap.second);
            });
        });

        suite("mult", function() {
            test("simple", function() {
                var lhs = new UnitExpression([
                    term('meter', 1),
                    term('second', 1)
                ]);

                var rhs = new UnitExpression([
                    term('kilogram', 1),
                    term('second', -1)
                ]);

                var actual = lhs.mult(rhs);

                var actualMap = actual.toMap();

                equal(1, actualMap.meter);
                equal(0, actualMap.second);
                equal(1, actualMap.kilogram);
            });
        });

        suite("div", function() {
            test("simple", function() {
                var lhs = new UnitExpression([
                    term('meter', 1),
                    term('second', 1)
                ]);

                var rhs = new UnitExpression([
                    term('kilogram', 1),
                    term('second', -1)
                ]);

                var actual = lhs.div(rhs);

                var actualMap = actual.toMap();

                equal(1, actualMap.meter);
                equal(2, actualMap.second);
                equal(-1, actualMap.kilogram);
            });
        });

        suite("pow", function() {
            test("simple", function() {
                var lhs = new UnitExpression([
                    term('meter', 1),
                    term('second', -1)
                ]);

                var actual = lhs.pow(2);

                var actualMap = actual.toMap();

                equal(2, actualMap.meter);
                equal(-2, actualMap.second);
            });
        });

        suite("toBaseUnits", function() {
            test("simple", function() {
                var lhs = new UnitExpression([
                    new Term(Newton, 3),
                    new Term(Newton, -1)
                ]);

                var actual = lhs.toBaseUnits();
                var actualMap = actual.toMap();

                equal(2, actualMap.kilogram);
                equal(2, actualMap.meter);
                equal(-4, actualMap.second);
            });
        });
        // var metersPerSecond = Sr.defineDerivedUnit([
        //     { unit: "meter", power: 1 },
        //     { unit: "second", power: -1 }
        // ]);

        // test("module returns object", function() {
        //     ok(DerivedUnit);
        // });

        // test("instances have appropriate methods", function() {
        //     ok(metersPerSecond.getDimensions);
        //     ok(metersPerSecond.getTerms);
        // });

        // suite('toString', function() {
        //     var Sr = StandardStrontiumFn();

        //     test('m/s', function() {
        //         var meterPerSecond = Sr.defineDerivedUnit([
        //             { unit: 'meter', power: 1 },
        //             { unit: 'second', power: -1 }
        //         ]);
    
        //         equal('m/s', meterPerSecond.toString());
        //     });
            
        //     test("m/s^2", function() {
        //         var meterPerSecondSq = Sr.defineDerivedUnit([
        //             { unit: 'meter', power: 1 },
        //             { unit: 'second', power: -2 }
        //         ]);
    
        //         equal('m/s^2', meterPerSecondSq.toString());
        //     });

        //     test("m s", function() {
        //         var meterSecond = Sr.defineDerivedUnit([
        //             { unit: 'meter', power: 1 },
        //             { unit: 'second', power: 1 }
        //         ]);
    
        //         equal('m s', meterSecond.toString());
        //     });

        //     test("m^2", function() {
        //         var meterSquared = Sr.defineDerivedUnit([
        //             { unit: 'meter', power: 2 }
        //         ]);
    
        //         equal('m^2', meterSquared.toString());
        //     });

        //     test("m^0", function() {
        //         var meterSquared = Sr.defineDerivedUnit([
        //             { unit: 'meter', power: 0 }
        //         ]);
    
        //         equal('', meterSquared.toString());
        //     });
        // });
    })
});