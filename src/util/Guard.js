define("Guard", ['Strings', 'Test'], function(Strings, Test) {
	function Guard(value, name) {
		function getErrorMessage(args) {
			return name + 
				" should have been " + 
				args.expectedString +
				", but found value '" + value + 
				"'";
		}

		function getError(expectedString) {
			return new Error(
				getErrorMessage({ expectedString: expectedString })
			);
		}

		var that = {
			isValue: function() {
				if (!Test.isValue(value)) {
					throw getError('a value');
				}
				return that;
			},
			instanceOf: function(objType) {
				if (!Test.instanceOf(value, objType)) {
					throw getError("an instance of " + objType.name);
				}
				return that;
			},
			isString: function() {
				if (!Test.isString(value)) {
					throw getError("a String");
				}
				return that;
			},
			isTruthy: function() {
				if (!value) {
					throw getError("a truthy value");
				}
				return that;
			},
			isArray: function() {
				if (!Array.isArray(value)) {
					throw getError("an array");
				}
				return that;
			},
			isArrayOf: function(objType) {
				that.isArray();
				var firstErrorIndex = value.findIndex(function(element, idx) {
					return !(element instanceof objType);
				});
				if (firstErrorIndex > -1) {
					var badElement = value[firstErrorIndex];
					throw new Error(name + " should have been an array of " + objType.name() + ", but found '" + badElement + "' at index " + firstErrorIndex);
				}

				return that;
			},
			isNumber: function() {
				if (!isNaN(parseFloat(value)) && isFinite(value)) {
					return that;
				} 
				else {
					throw new Error(name + " should have been a Number, but found value '" + value + "'");
				}
			},
			isObject: function() {
				if (Test.isObject(value)) {
					return that;
				}
				else {
					throw new Error(name + " should have been an object, but found value '" + value + "'");
				}
			},
			isNotZero: function() {
				if (value === 0) {
					throw new Error(name + " should have not have been zero, but found value '" + value + "'");
				}
				return that;
			},
			isFunction: function() {
				if (Test.isFunction(value)) {
					return that;
				} else {
					throw new Error(name + "should have been a function, but found value '" + value + "'");
				}
			}
		};

		return that;
	}
	
	return Guard;
});