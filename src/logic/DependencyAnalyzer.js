define(['Guard', 'Test'], function(Guard, Test) {
    function DependencyAnalyzer() {

    }

    function ofString(s) {
        if (!Test.isString(s)) {
            return "not a string";
        }
        return null;
    }

    function Node(name, edges) {
        Guard(name, 'name').isValue().isString();
        edges = edges || [];
        Guard(edges, 'edges').isValue().isArray(ofString);
        this.name = name;
        this.edges = Array.prototype.slice.call(edges, 0);
        Object.freeze(this.edges);
        Object.freeze(this);
    }

    function Index() {
        var idx = Object.create(null);
        this.register = function(node) {
            Guard(node, 'node').isValue().instanceOf(Node);
            if (idx[node.name]) {
                throw new Error('already registered node with name ' + node.name);
            }
            idx[node.name] = node;
        };
        this.registerAll = function(nodes) {
            Guard(nodes, 'nodes').isValue().isArrayOf(Node);
            var that = this;
            nodes.forEach(function(node) {
                that.register(node);
            });
        };
        this.resolve = function(name) {
            Guard(name, 'name').isValue().isString();
            var n = idx[name];
            if (!n) {
                throw new Error('could not find node with name ' + name);
            }
            return n;
        };
    }

    function Set() {
        var map = Object.create(null);
        this.contains = function(s) {
            Guard(s, 's').isValue().isString();
            return !!map[s];
        };
        this.add = function(s) {
            Guard(s, 's').isValue().isString();
            map[s] = s;
        };
        this.remove = function(s) {
            Guard(s, 's').isValue().isString();
            delete map[s];
        };
    }

    DependencyAnalyzer.prototype = {
        getResolutionOrder: function(nodes) {
            Guard(nodes, 'nodes').isArrayOf(Node);
            var orderedNodes = [];
            this.analyze(nodes, function(node) {
                orderedNodes.push(node);
            });
            return orderedNodes;
        },
        analyze: function(nodes, callback) {
            Guard(nodes, 'nodes').isArrayOf(Node);
            Guard(callback, 'callback').isValue().isFunction();

            var resolving = new Set();
            var resolved = new Set();

            function markResolving(node) {
                Guard(node, 'node').isValue().instanceOf(Node);
                if (resolving.contains(node.name)) {
                    throw new Error('circular dependency');
                }
                resolving.add(node.name);
            }

            function markResolved(node) {
                Guard(node, 'node').isValue().instanceOf(Node);
                resolved.add(node.name);
                resolving.remove(node.name);
                callback(node);
            }

            function isResolved(node) {
                Guard(node, 'node').isValue().instanceOf(Node);
                return resolved.contains(node.name);
            }

            var index = new Index();
            index.registerAll(nodes);

            function resolveDependenciesRecursive(node) {
                if (isResolved(node)) {
                    return;
                }
                markResolving(node);
                node.edges.forEach(function(edge) {
                    var depNode = index.resolve(edge);
                    if (!isResolved(depNode)) {
                        resolveDependenciesRecursive(depNode);
                    }
                });
                markResolved(node);
            }

            nodes.forEach(function(node) {
                resolveDependenciesRecursive(node);
            });
        }
    };

    Object.assign(DependencyAnalyzer, {
        Node: Node
    });

    return DependencyAnalyzer;
});