define([], function() {
	function Term(unit, power) {
		this.unit = function() { return unit; };
		this.power = function() { return power; };
	}
	
	return Term;
});