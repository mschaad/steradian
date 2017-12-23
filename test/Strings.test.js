define(['src/Strings'], function(Strings) {
    var ok = assert.ok,
		deepEqual = assert.deepEqual,
		equal = assert.equal;
	
	suite("Strings", function () {
		suite("isString", function() {
			test('returns true for literal string', function() {
				assert.isTrue(Strings.isString("foo"));
			});
	
			test('returns true for new String()', function() {
				assert.isTrue(Strings.isString(new String("foo")));
			});
		})
    });
});