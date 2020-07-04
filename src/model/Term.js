define(['Guard'], function(Guard) {

	function Term(unit, power) {
		Guard(unit, "unit").isValue();		
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
		},
		toString: function() {
			return "Term:" + this._unit.toString() + "^" + this._power;
		}
	};

	Object.defineProperty(Term.prototype, 'constructor', {
		value: Term,
		enumerable: false,
		writable: true
	});
	
	return Term;
});