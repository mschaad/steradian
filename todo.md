# BACKLOG
* add concept of unit systems, such as SI vs imperial
    - [x] update `convert` function to accept a system as a target
    - [x] support mapping arbitrary units to target system
    - [ ] support forward references in System definition/registration
* add support for additional unit types within a system (e.g. furlong)
* fix casing inconsistency between BaseUnit and DerivedUnit
* make SI system properties just properties, not functions

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