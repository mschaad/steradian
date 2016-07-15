define([], function() {
	function Quantity(unit, value) {
		this.unit = unit;
		this.value = value;
	}
		
	Quantity.prototype = {
		convertTo: function(newUnits) {
			var originalDimensions = this.unit.getDimensions();
			var newDimensions = newUnits.getDimensions();
			if (!originalDimensions.equals(newDimensions)) {
				throw 'incompatible unit dimensions';
			}
			
			var oldTerms = this.unit.getTerms();
			var newTerms = newUnits.getTerms();
			
			var delta = {};
			
			var unitTable = {};
			
			var i, term, unit, currentValue, updatedValue;
			
			for(i = 0; i < newTerms.length; i++) {
				term = newTerms[i];
				unit = term.unit();
				unitTable[unit.name] = unit;
				currentValue = delta[unit.name] || 0;
				updatedValue = currentValue + term.power();
				delta[unit.name] = updatedValue;
			}
			
			for(i = 0; i < oldTerms.length; i++) {
				term = oldTerms[i];
				unit = term.unit();
				unitTable[unit.name] = unit;
				currentValue = delta[unit.name] || 0;
				updatedValue = currentValue - term.power();
				delta[unit.name] = updatedValue;
			}
			
			var scale = 1;
			for(var unitName in delta) {
				if (delta.hasOwnProperty(unitName)) {
					power = delta[unitName];
					unit = unitTable[unitName];
					if (power > 0) {
						scale = scale * Math.pow(unit.scale, power);
					}
					else if (power < 0) {
						scale = scale / Math.pow(unit.scale, power);
					}
					else { //-> power == 0
						//that's interesting.  but still, do nothing.
					}
				}
			}
			
			var newValue = this.value * scale;
			
			return new Quantity(newUnits, newValue);
		}
	};
		
	return Quantity;
});