define(['Mocha', 'Chai', 'logic/DependencyAnalyzer'], function(mocha, chai, DependencyAnalyzer) {
    var Node = DependencyAnalyzer.Node;

    var suite = mocha.suite,
        test = mocha.test,
        assert = chai.assert,
        deepEqual = assert.deepEqual,
        throws = assert.throws;

    suite('DependencyAnalyzer', function() {
        suite('getResolutionOrder', function() {
            test('happy path', function() {
                var d = new DependencyAnalyzer();
                var nodes = [
                    new Node('foo', 'FOO', [ 'bar', 'baz' ]),
                    new Node('bar', 'BAR', [ 'baz' ]),
                    new Node('baz', 'BAZ', [])
                ];
                var resolution = d.getResolutionOrder(nodes);
    
                var actual = resolution.map(function(n) { return n.name; });
                var expected = ['baz', 'bar', 'foo'];
    
                deepEqual(expected, actual);
            });

            test('contains cycle', function() {
                var d = new DependencyAnalyzer();
                var nodes = [
                    new Node('foo', 'FOO', [ 'bar', 'baz' ]),
                    new Node('bar', 'BAR', [ 'baz', 'foo' ]),
                    new Node('baz', 'BAZ', [])
                ];
                throws(function() {
                    d.getResolutionOrder(nodes);
                });
            });
        });
    });
});