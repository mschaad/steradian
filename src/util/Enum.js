define(['Arrays'], function(Arrays) {	
	function Enum(names) {
		
		function Value(name, value) {
			this.name = function() { return name; };
			this.value = function() { return value; };
		}

		this._values = names.map(function(name, idx) {
			return new Value(name, idx);
		});

		var that = this;
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
			return typeof this[name] !== 'undefined';
		}
	}
	
	var EnumModule = {
		create: function (values) {
			var e = new Enum(values);
			return e;
		}
	};
	
	return EnumModule;
});