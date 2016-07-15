define([], function() {
	var Enum = {
		create: function (values) {
			var e = {};
			for(var i = 0; i < values.length; i++) {
				var name = values[i];
				e[name] = i;
			}
			return e;
		}
	};
	
	return Enum;
});