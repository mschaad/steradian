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
                    new Node('foo', [ 'bar', 'baz' ]),
                    new Node('bar', [ 'baz' ]),
                    new Node('baz', [])
                ];
                var resolution = d.getResolutionOrder(nodes);
    
                var actual = resolution.map(function(n) { return n.name; });
                var expected = ['baz', 'bar', 'foo'];
    
                deepEqual(expected, actual);
            });

            test('contains cycle', function() {
                var d = new DependencyAnalyzer();
                var nodes = [
                    new Node('foo', [ 'bar', 'baz' ]),
                    new Node('bar', [ 'baz', 'foo' ]),
                    new Node('baz', [])
                ];
                throws(function() {
                    d.getResolutionOrder(nodes);
                });
            });
        });
    });
});