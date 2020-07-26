# [Steradian](https://mschaad.github.io/steradian/module-steradian.html)
A JavaScript unit conversion and manipulation library for web (AMD) and node.js (CommonJS).

Check out the [documentation](https://mschaad.github.io/steradian/module-steradian.html)!

# Install
```
npm install steradian --save
```

# Usage

Steradian has explicit support for units of measure and unit systems, such as SI.  And it comes pre-loaded with the units you probably care about!

```js
// Steradian is just a simple library.  No muss, no fuss.
import Sr from 'steradian'

var meterLength = Sr.quantity('meter', 2);
// '2m'
```

## Quantities

Values that have units attached are instances of `Quantity` in Steradian.  You can do calculations with them and convert between units of compatible type.

## Calculations

### Arithmetic API
```js
var m1 = Sr.quantity('meter', 2);
var m2 = Sr.quantity('meter', 4);

m1.plus(m2);
// '6m'

m1.minus(m2);
// '-2m'

m1.times(m2);
// '8m^2'

m1.dividedBy(m2);
// '0.5' (no units!)
```

### Multiplication and Division
Multiplication and division work the way you'd expect.

```js
var p = Sr.quantity('pound', 2);
var f = Sr.quantity('foot', 4);
var m = Sr.quantity('meter', 3);

p.times(f)
// '8lb ft' (torque)

f.times(p)
// '8ft lb' (work)

f.times(m)
// '12ft m' (foot meters: a weird measure of area)
```

You can do addition and substraction of quantities of different types too, if they're dimensionally compatible.

```js
var m = Sr.quantity('meter', 2);
var f = Sr.quantity('foot', 4);

m.plus(f)
// '3.219199960985601m'

m.minus(f)
// '0.7808000390143988m'
```

## Conversion
```js
import Sr from 'steradian'

var meterLength = Sr.quantity('meter', 2);
// '2m'

// Conversion, functional-style
var footLength = Sr.convert(meterLength, 'foot');
// output is '6.56168ft'

// Conversion, OO-style
var footLength2 = meterLength.convertTo('foot');
// output is '6.56168ft'
```

### Complex Conversion
Steradian also features complex unit conversions between units and unit systems.
For instance, you can automatically convert miles per hour to SI units:
```js
Sr.unit({
  name: 'mile',
  type: 'length',
  symbol: 'mi',
  scale: 3.28084/5280
});

var hour = Sr.quantity('hour', 1);
var speedLimit = Sr.quantity('mile', 50).dividedBy(hour);
var SI = Sr.system('SI');
var speedLimitInSi = Sr.convert(speedLimit, SI);
// '22.351999284736024m/s'

// or if you prefer kilometers per hour...

Sr.unit({
  name: 'kilometer',
  type: 'length',
  symbol: 'km',
  scale: 1/1000
});

var kph = Sr.derivedUnit({
    name: 'kilometerPerHour',
    symbol: 'kph',
    units: [
        { unit: 'kilometer', power: 1 },
        { unit: 'hour', power: -1 },
    ]
});

speedLimit.convertTo(kph).toString()
// '80.46719742504969kph'


```

## Define Your Own Units

You can create your own unit types and use those too.

```js
// one chain is 66 feet.
Sr.unit({
    name: 'chain',
    type: 'length',
    symbol: 'chain',
    scale: 3.28084 / 66 // 66 feet
});

// one acre is ten square chain.
Sr.derivedUnit({
    name: 'acre',
    units: [
      { unit: 'chain', power: 2 } 
    ],
    symbol: 'ac',
    scale: 1/10
});

var chainInFeet = Sr.quantity('foot', 66);
var tenChainInFeet = Sr.quantity('foot', 660);

var acreInSquareFeet = chainInFeet.times(tenChainInFeet);

acreInSquareFeet.convertTo('acre').toString()
// '0.9999999999999998ac' (well, we got close)
```
