define(['mocha', 'chai', 'Strontium', 'test/StandardStrontiumFn', 'UnitExpression', 'Term'], 
function (mocha, chai, Strontium, StandardStrontiumFn, UnitExpression, Term) {
    var assert = chai.assert;
    
    var ok = assert.ok,
		deepEqual = assert.deepEqual,
        equal = assert.equal;

    var suite = mocha.suite, test = mocha.test;
	
	suite("Quantity", function () {
        suite("convertTo", function() {
            var Sr = StandardStrontiumFn();
            
            test('can convert between simple units of the same type', function() {
                var q = Sr.quantity("foot", 6);
                var q2 = q.convertTo("meter");
                ok(q2);
            });
        })

        suite("constructor", function() {
            var Sr = StandardStrontiumFn();
            
            test('can construct quantity of derived unit', function() {
                var q = Sr.quantity("Newton", 6.123);
                var quantityTerms = q.unitExpression().terms()
                assert.equal(1, quantityTerms.length);
                assert.equal("Newton", quantityTerms[0].unit().name);
            });
        })

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