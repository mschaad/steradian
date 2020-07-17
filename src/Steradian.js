/**
 * The steradian module can itself be used as a default instance of the Steradian type,
 * or as a constructor of new instances of Steradian objects.
 * 
 * Use the module as default instance if you want a single, global instance of Steradian that comes
 * pre-loaded with the Units from the SI and Imperial Systems.
 * 
 * Use the module as a constructor if you want one or more Steradian instances that do not come
 * preloaded with any Units.
 * 
 * @module steradian
 */
define(
	[
	'Guard', 'Test', 
	'Quantity','UnitRegistry', 
	'model/systems/StandardSystems',
	'Convert'
	],
	function(
		Guard, Test, 
		Quantity,UnitRegistry, 
		StandardSystems,
		Convert) {

		/**
		 * Creates an empty instance of Steradian.
		 * 
		 * Use an instance of Steradian to construct new Quantities, Units, 
		 * and Systems, and perform conversions between them.
		 * @class
		 * @alias Steradian
		 * @example
		 * // this instance comes pre-loaded with SI and Imperial.
		 * const Sr = require('steradian');
		 * @example 
		 * // the main module is also a function.
		 * const Steradian = require('steradian');
		 * // constructed instances are empty and fully customizable.
		 * const Sr = Steradian();
		 */
		function Steradian() {
			var registry = new UnitRegistry();

			/**
			 * A definition of a BaseUnit.
			 * @typedef {Object} BaseUnitDefinition
			 * @property {string} name - Full name of the Unit you are creating.  This is the name that will be used to retrieve the Unit.
			 * @property {string} type - String corresponding to the type of unit being created.  Valid names can be found in the UnitType enumeration.
			 * @property {string} symbol - The symbol that will be used for the Unit in string representations of Quantities and UnitExpressions.
			 * @property {number} scale - The "scale" of the Unit, which represents its size relative to a default Unit of the same type, which should have the scale of 1.0.
			 * 								The correct question to ask when picking a scale is "how many of these units fit *inside* the default unit?"
			 * 								Example: 'meter' is the default unit of measure.  How many feet fit inside a meter?  About 3.28084.  
			 * 								So the scale of 'foot' should be 3.28084.
			 * 								Larger-than-default units will have scales less than 1.0.
			 * 								Example: 'second' is the default unit of time.  How many minutes fit inside a second?  1/60th of one minute.
			 * 								So the scale of 'minute' should be 1/60, or 0.01666. 
			 */

			 /**
			 * A definition of a DerivedUnit.
			 * @typedef {Object} DerivedUnitDefinition
			 * @property {string} name - Full name of the Unit you are creating.  This is the name that will be used to retrieve the Unit.
			 * @property {array} units - units
			 * @property {string} symbol - The symbol that will be used for the Unit in string representations of Quantities and UnitExpressions.
			 * @property {number} scale - The "scale" of the Unit, which represents its size relative to a default Unit of the same type, which should have the scale of 1.0.
			 * 								The correct question to ask when picking a scale is "how many of these units fit *inside* the default unit?"
			 * 								Example: 'meter' is the default unit of measure.  How many feet fit inside a meter?  About 3.28084.  
			 * 								So the scale of 'foot' should be 3.28084.
			 * 								Larger-than-default units will have scales less than 1.0.
			 * 								Example: 'second' is the default unit of time.  How many minutes fit inside a second?  1/60th of one minute.
			 * 								So the scale of 'minute' should be 1/60, or 0.01666. 
			 */

			/**
			 * A definition of a System
			 * @typedef {Object} SystemDefinition
			 * @property {string} name - name of the System.
			 * @property {Object} base - an object containing all "standard" BaseUnits in the System.
			 * @property {Object} derived - an object containing all "standard" DerivedUnits of in the System.
			 * @property {array} other - an array containing all other (non-standard) units in the System.
			 */
			
			var SrInstance = 
			/** @lends Steradian# */
			{
				/**
				 * Gets a Unit (either BaseUnit or DerivedUnit) by the specified name, or creates a new BaseUnit
				 * according to the given BaseUnitDefinition.
				 * @param {string|BaseUnitDefinition} idOrDef - String representing the id of the Unit to retrieve, or Object containing definition of a new Unit.
				 * @method
				 * @type {Unit}
				 */
				unit: function(idOrDef) {
					// getter
					if (Test.isString(idOrDef)) {
						var id = idOrDef;
						return registry.get(id);
					}
					// setter
					else {
						return registry.register(idOrDef);	
					}
				},
				/**
				 * Gets a System by the specified name, or creates a new System
				 * according to the given SystemDefinition.
				 * @method
				 * @param {string|SystemDefinition|System} idOrDefOrSystem 
				 * @type {System}
				 */
				system: function(idOrDefOrSystem) {
					// getter
					if (Test.isString(idOrDefOrSystem)) {
						var id = idOrDefOrSystem;
						return registry.getSystem(id);
					} 
					// setter
					else {
						var defOrSystem = idOrDefOrSystem;
						return registry.registerSystem(defOrSystem);
					}
				},
				/**
				 * Creates a new DerivedUnit from the given DerivedUnitDefinition.
				 * @method
				 * @param {DerivedUnitDefinition} def 
				 * @type {DerivedUnit}
				 */
				derivedUnit: function (def) {
					return registry.register(def);
				},
				/**
				 * Constructs a Quantity from the given unitExpression and value.
				 * @method
				 * @param {string|Unit|UnitExpression} unitExpression - A Unit name, Unit instance or UnitExpression from which to construct a Quantity.
				 * @param {number} value - the numeric value associated with the Quantity.
				 * @type {Quantity}
				 */
				quantity: function (unitExpression, value) {
					unitExpression = Convert.toUnitExpression(unitExpression, registry);
					if (!SrInstance) {
						throw new Error("SrInstance was not an object");
					}
					var q = new Quantity(unitExpression, value, SrInstance);
					return q;
				},
				/**
				 * Converts the given quantity to the target units or system.
				 * If targetUnitsOrSystem is a string, then it must correspond to
				 * a defined Unit or System.
				 * @method
				 * @param {Quantity} quantity
				 * @param {string|Unit|UnitExpression|System} targetUnitsOrSystem 
				 * @type {Quantity}
				 */
				convert: function(q, targetUnitsOrSystem) {
					var protoQuantity = Convert.quantity(q, targetUnitsOrSystem, registry);
					return SrInstance.quantity(protoQuantity.units, protoQuantity.value);
				}
			};

			return SrInstance;
		}

		function copyProperties(src, dest) {
			for(var key in src) {
				if (src.hasOwnProperty(key)) {
					dest[key] = src[key];
				}
			}
		}
		
		// Decorate the Steradian function (the result of this module def)
		// with the members of a Steradian object.  This gives
		// the Steradian module the nice property of being both a
		// Steradian function (so you CAN manufacture your own Steradian object)
		// and a Steradian object (so you don't HAVE to manufacture your own 
		// Steradian object).
		var Sr = Steradian();
		copyProperties(Sr, Steradian);

		StandardSystems.systems().forEach(function(system) {
			Sr.system(system);
		});
		
		return Steradian;
	}
);
