define(['Arrays'], function(Arrays) {	
	function Enum(values) {
		this._values = Arrays.frozenClone(values);

		var that = this;

		this._values.forEach(function(v, i) {
			that[v] = i;
		});
		
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