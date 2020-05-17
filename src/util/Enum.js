define(['Guard', 'Arrays'], function(Guard, Arrays) {	
	function Enum(def) {
		Guard(def.values, 'def.values').isValue().isArray();
		Guard(def.name, 'def.name').isValue().isString();

		var that = this;
		var enumName = def.name;

		this.name = enumName;

		function Value(name, value) {
			this.name = function() { return name; };
			this.value = function() { return value; };
			this.type = function() { return that; };
		}

		this._values = def.values.map(function(name, idx) {
			return new Value(name, idx);
		});

		this._values.forEach(function(v) {
			that[v.name()] = v;
		});

		Object.freeze(this._values);
		Object.freeze(this);
	}

	Enum.prototype = {
		values: function() {
			return this._values;
		},
		contains: function(name) {
			return !!this.tryGet(name);
		},
		isInstance: function(enumValue) {
			return enumValue.type() === this;
		},
		get: function(name) {
			var value = this.tryGet(name);
			if (!value) {
				throw new Error(name + ' is not a defined member of ' + enumName);
			}
			return value;
		},
		tryGet: function(name) {
			Guard(name, 'name').isValue().isString();
			var value = this[name];
			if (typeof value === 'undefined') {
				return false;
			}
			return value;
		}
	};
	
	var EnumModule = {
		create: function (values) {
			var e = new Enum(values);
			return e;
		}
	};
	
	return EnumModule;
});