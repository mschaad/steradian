define(['Guard'], function(Guard) {

	function Term(unit, power) {
		Guard(unit, "unit").isTruthy();
		this._unit = unit;
		Guard(power, "power").isNumber();
		this._power = power;
		Object.freeze(this);
	}

	Term.prototype = {
		unit: function() {
			return this._unit;
		},
		power: function() {
			return this._power;
		}
	};
	
	return Term;
});