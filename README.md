# ESeries

A TypeScript library for working with E-series preferred values commonly used in electronic components.

This project is a TypeScript port of the original [Python eseries library by Rob Smallshire](https://github.com/rob-smallshire/eseries/).

## Installation

```bash
npm install eseries
```

## Usage

```typescript
import { 
  ESeries, 
  findNearest, 
  findGreaterThan, 
  findLessThan, 
  erange, 
  tolerance 
} from 'eseries';

// Find the closest E24 value to 42
const nearest = findNearest(ESeries.E24, 42);
console.log(nearest); // 43

// Get all E12 values between 10 and 100
const values = erange(ESeries.E12, 10, 100);
console.log(values); // [10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82]

// Find the tolerance of an E6 series
const tol = tolerance(ESeries.E6);
console.log(tol); // 0.2 (20%)
```

## All Functions

### Core Functions

```typescript
import { ESeries, series, seriesKeys, seriesKeyFromName } from 'eseries';

// Available E-series
console.log(seriesKeys()); // [3, 6, 12, 24, 48, 96, 192]

// Get base values of a series
console.log(series(ESeries.E12)); // [10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82]

// Get a series from its name
console.log(seriesKeyFromName('E24')); // 24
```

### Finding Values

```typescript
import { 
  ESeries, 
  findNearest, 
  findNearestFew, 
  findGreaterThan, 
  findGreaterThanOrEqual,
  findLessThan,
  findLessThanOrEqual
} from 'eseries';

// Find the closest E24 value to 42
console.log(findNearest(ESeries.E24, 42)); // 43

// Find the 2 nearest E24 values to 42
console.log(findNearestFew(ESeries.E24, 42, 2)); // [39, 43]

// Find value greater than 42
console.log(findGreaterThan(ESeries.E24, 42)); // 43

// Find value greater than or equal to 43
console.log(findGreaterThanOrEqual(ESeries.E24, 43)); // 43

// Find value less than 42
console.log(findLessThan(ESeries.E24, 42)); // 39

// Find value less than or equal to 39
console.log(findLessThanOrEqual(ESeries.E24, 39)); // 39
```

### Value Ranges

```typescript
import { ESeries, erange, openErange } from 'eseries';

// Get all E12 values between 10 and 100 (inclusive)
console.log(erange(ESeries.E12, 10, 100));
// [10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82, 100]

// Get all E12 values between 10 and 100 (excluding 100)
console.log(openErange(ESeries.E12, 10, 100));
// [10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82]
```

### Tolerance Functions

```typescript
import { 
  ESeries, 
  tolerance, 
  lowerToleranceLimit, 
  upperToleranceLimit, 
  toleranceLimits 
} from 'eseries';

// Get tolerance of an E6 series (20%)
console.log(tolerance(ESeries.E6)); // 0.2

// Get lower tolerance limit of a value
console.log(lowerToleranceLimit(ESeries.E6, 100)); // 80

// Get upper tolerance limit of a value
console.log(upperToleranceLimit(ESeries.E6, 100)); // 120

// Get both limits as a tuple
console.log(toleranceLimits(ESeries.E6, 100)); // [80, 120]
```

### Formatting Functions

```typescript
import { engString, roundSig } from 'eseries';

// Format a number with engineering notation and SI prefix
console.log(engString(0.00000123)); // "1.23 µ"
console.log(engString(4700)); // "4.7 k"

// Format a number with plain engineering notation (no prefix)
console.log(engString(4700, 3, false)); // "4700"

// Round to significant figures
console.log(roundSig(123.456789, 4)); // 123.5
```

## CLI

The package includes a command-line interface:

```bash
# Find the nearest E24 value to 42
eseries nearest E24 42

# Find values greater than or equal to 42
eseries ge E24 42 --symbol

# Show all E12 values between 10 and 100
eseries range E12 10 100
```

Run `eseries --help` for more information.

## License

MIT