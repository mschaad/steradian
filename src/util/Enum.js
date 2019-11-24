define([], function() {
	var Enum = {
		create: function (values) {
			var e = Object.create(null);
			for(var i = 0; i < values.length; i++) {
				var name = values[i];
				e[name] = i;
			}
			Object.freeze(e);
			return e;
		}
	};
	
	return Enum;
});