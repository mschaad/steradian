define([], function() {
	function Dimensions(dim) {
		var _values = [];
		for(var i = 0; i < dim.length; i++) {
			_values[i] = dim[i];
		}
		
		this.get = function(i) {
			return _values[i];
		};
		
		this.equals = function(other) {
			var size = _values.length;
			for(var i = 0; i < size; i++) {
				if (this.get(i) !== other.get(i)) {
					return false;
				}
			}
			return true;
		};
	}
	return Dimensions;
});