# BACKLOG
* fix bugs in Convert code that expects Term.unit to be a Unit, when it is actually a UnitExpression
    (this can easily happen if we're converting from pounds to newtons, but Newton doesn't exist)
* make SI system properties just properties, not functions
* support multiplying quantities by scalars (using Quantity.times)
* support defining DerivedUnits in terms of Quantities.

# IDEAS
- add unit type dimensional signature (e.g. "speed" means distance/time)
- remove BaseUnit.expression() (it is NOT analogous to DerivedUnit.expression())
- simplify/consolidate code with Vector operations
- add support for dimensionless scalar types (e.g. Mol)
- add support for angles
- make it easier to express quantities of complex types (such as "4 m/s")
- support unit aliases
- add unit parsing.  i.e. recognize "m/s" as "meters per second"
- add concept of tags for distinguishing semantically different types of the same dimensions, such work (F.d) and torque (r x F)

# INFRA
- support debugging
  -   support source maps
- add coverage report (Istanbul?)
- convert to TypeScript
- upload to github
- add CI
- remove npm in favor of yarn
- add acceptance tests for prod build