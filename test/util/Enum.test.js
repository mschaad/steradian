define(['Mocha', 'Chai', 'Enum'], function(mocha, chai, Enum) {
    var suite = mocha.suite,
        test = mocha.test;

    var assert = chai.assert;
    var equal = assert.equal,
        deepEqual = assert.deepEqual,
        ok = assert.ok;

    suite('Enum', function() {

        test('constructor', function() {
            var MetasyntacticVariables = Enum.create(['FOO','BAR','BAZ']);

            ok(MetasyntacticVariables.FOO);
            equal(MetasyntacticVariables.FOO.value(), 0);
            ok(MetasyntacticVariables.BAR);
            equal(MetasyntacticVariables.BAR.value(), 1);
            ok(MetasyntacticVariables.BAZ);
            equal(MetasyntacticVariables.BAZ.value(), 2);

            deepEqual(MetasyntacticVariables.values().map(function(v) { return v.name(); }), ['FOO', 'BAR', 'BAZ']);
        });
        
        test('contains', function() {
            var MetasyntacticVariables = Enum.create(['FOO','BAR','BAZ']);

            ok(MetasyntacticVariables.contains("FOO"));
            equal(MetasyntacticVariables.contains("FAKE"), false);
        });
    });
});