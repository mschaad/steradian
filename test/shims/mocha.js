define([], function() {
    /* jshint browser: true */
    try {
        var mocha = require('mocha');
        return mocha;   
    } catch (err) {
        var m = window.Mocha;
        return m;
    }
});