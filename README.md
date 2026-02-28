# @dxtintx/keyrange

A lightweight and intuitive TypeScript/JavaScript utility for extracting specific elements from arrays using string patterns.

With `@dxtintx/keyrange` (via the `KeyRange` class), you can easily declare which elements of an array to keep and which to skip, reading from either the start or the end of the array.

## Installation

You can install the package via npm or yarn:

```bash
npm install @dxtintx/keyrange
# or
yarn add @dxtintx/keyrange

```

## Pattern Syntax

The pattern is a simple string consisting of numbers and hyphens (`-`):

* **Numbers (`1`-`9`)**: Specifies the number of elements to **keep**.
* **Hyphens (`-`)**: Specifies the number of elements to **skip** (one hyphen = one skipped element).

*Note: Currently, patterns are parsed character by character, so numbers represent single digits.*

## Quick Start

```typescript
import { KeyRange } from '@dxtintx/keyrange';

const arr = [1, 2, 3, 4, 5, 6];

// Keep 2, skip 1, keep 2. The rest of the array is kept by default.
const result = new KeyRange(arr, "2-2").makeRange();
console.log(result); 
// Output: [1, 2, 4, 5, 6]

```

## Features & Examples

The `KeyRange` class provides a chainable API to configure how the pattern is applied.

### 1. Reading from the End (`setMode`)

You can apply the pattern starting from the end of the array using `.setMode("fromEnd")`. The output array will maintain its original left-to-right order.

```typescript
const arr = [1, 2, 3, 4, 5, 6];

// Skip 3 from the end, then keep 1.
const result = new KeyRange(arr, "---1")
    .setMode("fromEnd")
    .makeRange();

console.log(result);
// Output: [1, 2, 3] (Skips 6, 5, 4. Keeps 3. The unreached start is kept).

```

### 2. Cutting out the rest of the array (`setCutOutOfPattern`)

By default, any elements in the array that are not reached by the pattern are included in the result. You can change this behavior by setting `.setCutOutOfPattern(true)`, which will drop all untouched elements.

```typescript
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

// Skip 3 from the end, keep 2, and DROP the rest.
const result = new KeyRange(arr, "---2")
    .setMode("fromEnd")
    .setCutOutOfPattern(true)
    .makeRange();

console.log(result);
// Output: [6, 7]

```

## API Reference

### `new KeyRange(array: any[], pattern: string)`

Creates a new instance of the slicer.

* `array`: The source array you want to process.
* `pattern`: The string pattern (e.g., `"1---2"`).

### Methods

| Method | Type | Default | Description |
| --- | --- | --- | --- |
| `setMode(mode)` | `"fromStart" | "fromEnd"` | `"fromStart"` | Determines the direction from which the pattern is applied. |
| `setCutOutOfPattern(boolean)` | `boolean` | `false` | If `true`, elements not covered by the pattern will be discarded. |
| `makeRange()` | `any[]` | `[]` | Executes the slicing and returns the new array. Throws an error if the pattern is out of bounds. |

## License

MIT