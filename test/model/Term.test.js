define([
    'Mocha', 'Chai', 
    'Term'
], 
function (
    mocha, chai, 
    Term
) {
    var assert = chai.assert; 
    var equal = assert.equal;

    var suite = mocha.suite, test = mocha.test;
    
    suite('Term', function() {
        test('type is Term', function() {
            var term = new Term('meter', 1);
            equal(term.constructor.name, 'Term');
        });
    });
});