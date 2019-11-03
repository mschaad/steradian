define(['Guard'], function(Guard) {
	function Term(unit, power) {
		Guard(unit, "unit").isTruthy();
		this.unit = function() { return unit; };
		Guard(power, "power").isNumber();
		this.power = function() { return power; };
	}
	
	return Term;
});