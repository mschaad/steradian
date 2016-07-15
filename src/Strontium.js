define(
	['src/UnitType', 'src/Term', 'src/Unit', 'src/DerivedUnit', 'src/Quantity'], 
	function(UnitType, Term, Unit, DerivedUnit, Quantity) {
		
		function Strontium() {
			var unitTable = {};
			
			function getEquivalentBaseTerms(term) {
				function flatten(arrays) {
					var flattened = [];
					flattened.length = arrays.reduce(function(acc, arr) { return acc + arr.length; }, 0);
					arrays.forEach(function(a) { 
						Array.prototype.push.apply(flattened, a);
					});
					return flattened;
				}
				function sumPowersOf(terms) {
					var sum = terms.reduce(function(acc, t) { acc + t.power() }, 0);
					return sum;
				}
				function groupBy(arr, keySelector) {
					var groups = {};
					for (var i = 0; i < arr.length; i++) {
						var item = arr[i];
						var key = keySelector(item);
						var group = groups[key] || { key: key, items: [] };
						group.items.push(item);
						groups[key] = group;
					}
					return groups;
				}
				
				var unit = term.unit();
				if (u.isBase()) {
					return u.terms();
				}
				else {
					var terms;
					terms = u.terms();
					terms = flatten(terms.map(getEquivalentBaseTerms));
					terms = terms.map(function(innerTerm) {
						return new Term(innerTerm.unit(), innerTerm.power() * term.power());
					});
					terms = groupBy(terms, function(t) { return t.unit(); });
					terms = terms.map(function(group) {
						return new Term(group.key, sumPowersOf(group.items));
					});
					return terms;
				}
			}
			
			function toTerm(desc) {
				return new Term(desc.unit, desc.power);
			}
						
			return {
				unit: function(def) {
					var unit = new Unit(def.name, def.type, def.symbol, def.scale);
					unitTable[def.name] = unit;
					return unit;
				},
				defineDerivedUnit: function(termDescriptors) {
					var terms = termDescriptors.map(toTerm);
					var unit = new DerivedUnit(terms);
					return unit;
				},
				quantity: function(unit, value) {
					var q = new Quantity(unit, value);
					return q;
				}
			};
		}
		
		function copyProperties(src, dest) {
			for(var key in src) {
				if (src.hasOwnProperty(key)) {
					dest[key] = src[key];
				}
			}
		}
		
		var Sr = Strontium();
		copyProperties(Sr, Strontium);
		
		return Strontium;
});
