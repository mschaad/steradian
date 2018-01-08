define(['Strings'], function(Strings) {
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

		return {
			isString: function() {
				if (!Strings.isString(value)) {
					throw getError("a String");
				}
				return this;
			},
			isTruthy: function() {
				if (!value) {
					throw getError("a truthy value");
				}
				return this;
			},
			isNumber: function() {
				if (!isNaN(parseFloat(value)) && isFinite(value)) {
					return this;
				} 
				else {
					throw new Error(name + " should have been a Number, but found value '" + value + "'");
				}
			},
			isNotZero: function() {
				if (value === 0) {
					throw new Error(name + " should have not have been zero, but found value '" + value + "'");
				}
				return this;
			}
		};
	}
	
	return Guard;
});