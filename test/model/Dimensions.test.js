define(['Mocha', 'Chai', 'Dimensions'], 
function (mocha, chai, Dimensions) {
    var assert = chai.assert;
    
    var equal = assert.equal;
    var suite = mocha.suite, test = mocha.test;

    suite('Dimensions', function() {
        test('type is Dimensions', function() {
            var dim = new Dimensions([1,2,3]);
            equal(dim.constructor.name, 'Dimensions');
        });
    });
});