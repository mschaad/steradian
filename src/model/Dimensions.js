define([], function() {
	function Dimensions(dim) {
		if (!dim) {
			throw new Error("dim was not an array");
		}
		var _values = [];
		for(var i = 0; i < dim.length; i++) {
			_values[i] = dim[i];
		}
		
		this.get = function(i) {
			return _values[i];
		};

		this.size = function() {
			return _values.length;
		};
		
		this.equals = function(rhs) {
			var lhs = this;
			if (lhs.size() !== rhs.size()) {
				return false;
			}
			for(var i = 0; i < lhs.size(); i++) {
				if (lhs.get(i) !== rhs.get(i)) {
					return false;
				}
			}
			return true;
		};

		this.add = function(rhs) {
			var lhs = this;
			var lhs_i, rhs_i;
			var newDimensions = [];
			var i;
			for(i = 0; i < lhs.size(); i++) {
				lhs_i = lhs.get(i) || 0;
				newDimensions[i] = lhs_i;
			}
			var i_max = Math.max(lhs.size(), rhs.size());
			for(i = 0; i < i_max; i++) {
				rhs_i = rhs.get(i) || 0;
				lhs_i = lhs.get(i) || 0;
				newDimensions[i] = lhs_i + rhs_i;
			}
			return new Dimensions(newDimensions);
		};

		this.mult = function(scalar) {
			var lhs = this;
			var newDimensions = [];
			var i;
			newDimensions.length = lhs.size();
			for(i = 0; i < lhs.size(); i++) {
				var value = lhs.get(i) || 0;
				newDimensions[i] = value * scalar;
			}
			return new Dimensions(newDimensions);
		};
	}

	var empty = new Dimensions([]);
	Dimensions.empty = function() {
		return empty;
	};

	return Dimensions;
});