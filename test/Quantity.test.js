define(['src/Strontium', 'test/StandardStrontiumFn'], function (Strontium, StandardStrontiumFn) {
	var ok = assert.ok,
		deepEqual = assert.deepEqual,
        equal = assert.equal;
	
	suite("Quantity", function () {
        suite("convertTo", function() {
            var Sr = StandardStrontiumFn();
            
            test('can convert between simple units of the same type', function() {
                var q = Sr.quantity("foot", 6);
                var q2 = q.convertTo("meter");
                ok(q2);
            });
        })

		suite("toString", function() {
            var Sr = StandardStrontiumFn();

            test('format', function() {
                var q = Sr.quantity("foot", 6.123);                    
                var s = q.toString();
                assert.equal("6.123ft", s);
            });
        });
    });
});