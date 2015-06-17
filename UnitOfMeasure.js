var SimpleUnitTypes = [
	'distance',
	'time'
];

var CompositeUnitTypes = {
	acceleration: { distance: 1, time: -2 },
	speed: { distance: 1, time: -1 },
	area: { distance: 2 }
};

var UnitTypes = {};

for (var i = 0; i < SimpleUnitTypes.length; i++) {
	var t = SimpleUnitTypes[i];
	var obj = {};
	obj[t] = 1;
	UnitTypes[t] = obj;
}

for (var t in CompositeUnitTypes) {
	UnitTypes[t] = CompositeUnitTypes[t];
}

var Unit = function(unitType, name, scale) {		
	var f = function (v) {
		return new Quantity(v, f);
	};
	f.scale = function () { return scale; };
	f.units = function () {
		var u = {};
		u[name] = 1;
		return u;
	};
	f.unitType = function () { return unitType; };
	return f;
};

var SI = (function() {
	return {
		meters: Unit(UnitTypes.distance, 'meters', 1.0),
		seconds: Unit(UnitTypes.time, 'seconds', 1.0)
	};
}());

var Imperial = (function() {
	return {
		feet: Unit(UnitTypes.distance, 'feet', SI.meters.scale() * 0.3048),
		seconds: SI.seconds
	};
}());

function combineUnits(u1, u2, combine) {
	var c = {};
	for(var p in u1) {
		if (!u1.hasOwnProperty(p)) {
			continue;
		}
		c[p] = u1[p];
	}
	
	for(var p in u2) {
		if (!u2.hasOwnProperty(p)) {
			continue;
		}		
		var i = combine(c[p] || 0, u2[p]);
		if (i !== 0) {
			c[p] = i;
		}
		else {
			delete c[p];
		}
	}
	return c;
}

function multiplyUnits(u1, u2) {
	return combineUnits(u1, u2, function(a, b) { return a + b; });
}

function divideUnits(u1, u2) {
	return combineUnits(u1, u2, function(a, b) { return a - b; });
}

function Quantity(value, units, precision) {
	units = typeof units === 'string' ?
			UnitTypes[units] :
			units;
	
	if (typeof precision === 'undefined') {
		precision = Number.POSITIVE_INFINITY;
	}
	
	this._value = value;
	this._units = units;
	this._precision = precision;
}

Quantity.prototype = {
	times: function mult(rhs) {
		var lhs = this;
		return new Quantity(
			lhs.value() * rhs.value(),
			multiplyUnits(lhs.units(), rhs.units()),
			Math.min(lhs.precision(), rhs.precision())
		);
	},
	dividedBy: function div(rhs) {
		var lhs = this;
		return new Quantity(
			lhs.value() / rhs.value(),
			divideUnits(lhs.units(), rhs.units()),
			Math.min(lhs.precision(), rhs.precision())
		);
	},
	value: function () { return this._value; },
	units: function () { return this._units; },
	precision: function () { return this._precision; }
};

