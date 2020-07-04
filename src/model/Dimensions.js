define(['Guard', 'Arrays'], function(Guard, Arrays) {
	function Dimensions(dim) {
		Guard(dim, "dim").isValue().isArray();
		this._values = Arrays.frozenClone(dim);
		Object.freeze(this);
	}

	Dimensions.prototype = {
		get: function(i) {
			Guard(i, 'i').isNumber();
			return this._values[i];
		},
		size: function() {
			return this._values.length;
		},
		equals: function(rhs) {
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
		},
		add: function(rhs) {
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
		},
		mult: function(scalar) {
			var lhs = this;
			var newDimensions = [];
			var i;
			newDimensions.length = lhs.size();
			for(i = 0; i < lhs.size(); i++) {
				var value = lhs.get(i) || 0;
				newDimensions[i] = value * scalar;
			}
			return new Dimensions(newDimensions);
		}
	};

	Object.defineProperty(Dimensions.prototype, 'constructor', {
		value: Dimensions,
		enumerable: false,
		writable: true
	});

	var empty = new Dimensions([]);
	Dimensions.empty = function() {
		return empty;
	};

	return Dimensions;
});