define(['steradian', 'test/StandardUnitDefinitions'], function(Steradian, StandardUnitDefinitions) {
    return function() {
        var Sr = Steradian();
        StandardUnitDefinitions.install(Sr);
        return Sr;
    };
});