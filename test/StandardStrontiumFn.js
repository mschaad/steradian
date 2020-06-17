define(['strontium', 'test/StandardUnitDefinitions'], function(Strontium, StandardUnitDefinitions) {
    return function() {
        var Sr = Strontium();
        StandardUnitDefinitions.install(Sr);
        return Sr;
    };
});