define(['Mocha', 'Chai', 'Strontium', 'test/StandardStrontiumFn', 'UnitExpression', 'Term'], 
function (mocha, chai, Strontium, StandardStrontiumFn, UnitExpression, Term) {
    var assert = chai.assert;
    
    var equal = assert.equal,
        throws = assert.throws,
        closeTo = assert.closeTo;

    var suite = mocha.suite, test = mocha.test;
	
	suite("Quantity", function () {
        suite("convertTo", function() {
            var Sr = StandardStrontiumFn();
            
            test('can convert between simple units of the same type', function() {
                var q = Sr.quantity("foot", 6);
                var q2 = q.convertTo("meter");
                equal(q2.units().toString(), "m");
                closeTo(q2.value(), 1.8288, 5e-5);
            });
        });

        suite("constructor", function() {
            var Sr = StandardStrontiumFn();
            
            test('can construct quantity of derived unit', function() {
                var q = Sr.quantity("Newton", 6.123);
                var quantityTerms = q.units().terms();
                assert.equal(1, quantityTerms.length);
                assert.equal("Newton", quantityTerms[0].unit().name());
            });
        });

        suite("arithmetic", function() {
            var Sr = StandardStrontiumFn();
            var quantity = Sr.quantity;

            var meter = Sr.unit('meter');
            var foot = Sr.unit('foot');
            var second = Sr.unit('second');

            suite("addition", function() {
                test("addition of equal types", function() {
                    var q = quantity(meter, 3).plus(quantity(meter, 4));
                    equal(q.toString(), "7m");
                });
                test("addition of compatible types", function() {
                    var q = quantity(meter, 3);
                    var q2 = q.plus(quantity(foot, 4));
                    
                    equal(q2.units().toString(), "m");
                    closeTo(q2.value(), 4.2192, 5e-5);
                });
                test("addition of incompatible types", function() {
                    throws(function() {
                        quantity(meter, 3).plus(quantity(second, 4));
                    });
                });
            });

            suite("subtraction", function() {
                test("subtraction of equal types", function() {
                    var q = quantity(meter, 3).minus(quantity(meter, 4));
                    equal(q.toString(), "-1m");
                });
                test("subtraction of compatible types", function() {
                    var q = quantity(meter, 3);
                    var q2 = q.minus(quantity(foot, 4));
                    
                    equal(q2.units().toString(), "m");
                    closeTo(q2.value(), 1.7808, 5e-5);
                });
                test("subtraction of incompatible types", function() {
                    throws(function() {
                        quantity(meter, 3).minus(quantity(second, 4));
                    });
                });
            });

            suite("multiplication", function() {
                test("multiplication of equal types", function() {
                    var q = quantity(meter, 3).times(quantity(meter, 4));
                    equal(q.toString(), "12m^2");
                });
                test("multiplication of like types", function() {
                    var q = quantity(meter, 3);
                    var q2 = q.times(quantity(foot, 4));
                    
                    equal(q2.units().toString(), "m ft");
                    equal(q2.value(), 12);
                });
                test("multiplication of disparate types", function() {
                    var q = quantity(meter, 3).times(quantity(second, 4));
                    equal(q.toString(), "12m s");
                });
            });

            suite("division", function() {
                test("division of equal types", function() {
                    var q = quantity(meter, 12).dividedBy(quantity(meter, 4));
                    equal(q.toString(), "3");
                });
                test("division of like types", function() {
                    var q = quantity(meter, 12);
                    var q2 = q.dividedBy(quantity(foot, 4));
                    
                    equal(q2.units().toString(), "m/ft");
                    equal(q2.value(), 3);
                });
                test("division of disparate types", function() {
                    var q = quantity(meter, 12).dividedBy(quantity(second, 4));
                    equal(q.toString(), "3m/s");
                });
            });
        });

		suite("toString", function() {
            var Sr = StandardStrontiumFn();

            test('format, named base unit', function() {
                var q = Sr.quantity("foot", 6.123);                    
                var s = q.toString();
                assert.equal("6.123ft", s);
            });

            test('format, ad-hoc units', function() {
                var meter = Sr.unit('meter');
                var second = Sr.unit('second');
                var meterPerSecond = new UnitExpression([
                    new Term(meter, 1), 
                    new Term(second, -1), 
                ]);

                var q = Sr.quantity(meterPerSecond, 6.123);                    
                var s = q.toString();
                assert.equal("6.123m/s", s);
            });

            test('format, derived unit', function() {
                var Newton = Sr.unit('Newton');

                var q = Sr.quantity(Newton, 6.123);                    
                var s = q.toString();
                assert.equal("6.123N", s);
            });
        });
    });
});