define([], function() {
    /* jshint browser: true */
    try {
        var chai = require('chai');
        return chai;
    } catch (err) {
        return window.chai;
    }
});