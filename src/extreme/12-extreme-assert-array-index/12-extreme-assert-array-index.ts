/*
  925 - Assert Array Index
  -------
  by null (@uid11) #extreme #array

  ### Question

  Sometimes we want to use the good old `for`-loop with an index to traverse the array, but in this case TypeScript does not check in any way that we are accessing the elements of the array at its real index (not exceeding the length of the array), and that we are not using an arbitrary number as an index, or index from another array (for nested loops, for traversing matrices or graphs):
  ```ts
  const matrix = [
      [3, 4],
      [5, 6],
      [7, 8],
  ];

  // This example contains no type errors when the noUncheckedIndexedAccess option is off.
  for (let i = 0; i < matrix.length; i += 1) {
      const columns: number[] = matrix[i];

      for (let j = 0; j < columns.length; j += 1) {
          const current: number = columns[i]; // oops! i instead of j

          console.log(
              current.toFixed(), // TypeError: Cannot read property 'toFixed' of undefined
          );
      }
  }
  ```

  You can enable the [noUncheckedIndexedAccess](https://www.typescriptlang.org/tsconfig#noUncheckedIndexedAccess) option (in `tsconfig.json`), but then each time you access an array element, you will need to check that this element exists, which is somewhat verbose and inconvenient, especially since in the case of such a `for`-traversal, we are sure that the index does not exceed the length of the array:
  ```ts
  const numbers = [5, 7];

  for (let i = 0; i < numbers.length; i += 1) {
      const current = numbers[i];

      if (current !== undefined) {
          console.log(current.toFixed());
      }
  }
  ```

  Write an `assert`-function `assertArrayIndex(array, key)` that can be applied to any `array` (with an arbitrary unique string `key`, which is needed to distinguish arrays at the type level) to allow access to the elements of this array only by the index obtained from array by the special generic type `Index<typeof array>` (this functionality requires enabling the [noUncheckedIndexedAccess](https://www.typescriptlang.org/tsconfig#noUncheckedIndexedAccess) option in `tsconfig.json`):
  ```ts
  const numbers = [5, 7];

  assertArrayIndex(numbers, 'numbers');

  for (let i = 0 as Index<typeof numbers>; i < numbers.length; i += 1) {
      console.log(numbers[i].toFixed());
  }
  ```

  When accessing by such an index, it must be guaranteed that an element in the array exists, and when accessing an array by any other indices, there is no such guarantee (the element may not exist):
  ```ts
  const matrix = [
      [3, 4],
      [5, 6],
      [7, 8],
  ];

  assertArrayIndex(matrix, 'rows');

  let sum = 0;

  for (let i = 0 as Index<typeof matrix>; i < matrix.length; i += 1) {
      const columns: number[] = matrix[i];

      const x: number[] = matrix[0];

      assertArrayIndex(columns, 'columns');

      for (let j = 0 as Index<typeof columns>; j < columns.length; j += 1) {
          sum += columns[j];

          const y: number = columns[i];

          const z: number = columns[0];

          const u: number[] = matrix[j];
      }
  }
  ```

  The `assertArrayIndex` function cannot be called on tuples (since the accessing the elements is already well typed in them):
  ```ts
  const tuple = [5, 7] as const;

  // @ts-expect-error
  assertArrayIndex(tuple, 'tuple');
  ```

  (Additional design considerations for the proposed API: [#925](https://github.com/type-challenges/type-challenges/issues/925#issuecomment-780889329).)

  > View on GitHub: https://tsch.js.org/925
*/

/* _____________ Your Code Here _____________ */

type Secrets = [
  1e32, 2e32, 3e32, 4e32, 5e32, 6e32, 7e32, 8e32, 9e32, 10e32,
  11e32, 12e32, 13e32, 14e32, 15e32, 16e32, 17e32, 18e32, 19e32, 20e32,
  21e32, 22e32, 23e32, 24e32, 25e32, 26e32, 27e32, 28e32, 29e32, 30e32,
  31e32, 32e32, 33e32, 34e32, 35e32, 36e32, 37e32, 38e32, 39e32, 40e32,
  41e32, 42e32, 43e32, 44e32, 45e32, 46e32, 47e32, 48e32, 49e32, 50e32,
  51e32, 52e32, 53e32, 54e32, 55e32, 56e32, 57e32, 58e32, 59e32, 60e32,
  61e32, 62e32, 63e32, 64e32, 65e32, 66e32, 67e32, 68e32, 69e32, 70e32,
  71e32, 72e32, 73e32, 74e32, 75e32, 76e32, 77e32, 78e32, 79e32, 80e32,
  81e32, 82e32, 83e32, 84e32, 85e32, 86e32, 87e32, 88e32, 89e32, 90e32,
  91e32, 92e32, 93e32, 94e32, 95e32, 96e32, 97e32, 98e32, 99e32, 100e32,
  101e32, 102e32, 103e32, 104e32, 105e32, 106e32, 107e32, 108e32, 109e32, 110e32,
  111e32, 112e32, 113e32, 114e32, 115e32, 116e32, 117e32, 118e32, 119e32, 120e32,
  121e32, 122e32, 123e32, 124e32, 125e32, 126e32, 127e32, 128e32, 129e32, 130e32,
  131e32, 132e32, 133e32, 134e32, 135e32, 136e32, 137e32, 138e32, 139e32, 140e32,
  141e32, 142e32, 143e32, 144e32, 145e32, 146e32, 147e32, 148e32, 149e32, 150e32,
  151e32, 152e32, 153e32, 154e32, 155e32, 156e32, 157e32, 158e32, 159e32, 160e32,
  161e32, 162e32, 163e32, 164e32, 165e32, 166e32, 167e32, 168e32, 169e32, 170e32,
  171e32, 172e32, 173e32, 174e32, 175e32, 176e32, 177e32, 178e32, 179e32, 180e32,
  181e32, 182e32, 183e32, 184e32, 185e32, 186e32, 187e32, 188e32, 189e32, 190e32,
  191e32, 192e32, 193e32, 194e32, 195e32, 196e32, 197e32, 198e32, 199e32, 200e32,
]

type _Map = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 10,
  k: 11,
  l: 12,
  m: 13,
  n: 14,
  o: 15,
  p: 16,
  q: 17,
  r: 18,
  s: 19,
  t: 20,
  u: 21,
  v: 22,
  w: 23,
  x: 24,
  y: 25,
  z: 16,
}

type UniqIndex2<S> = S extends `${ infer F }${ infer R }` ? _Map[F & keyof _Map] | UniqIndex2<R> : never


type UniqIndex<S> = ToSecretsUion<BitString<S>>

type ToSecretsUion<BS, SS=Secrets, ACC=never>
  = SS extends [infer S0, infer S1, ...infer TS]
    ? BS extends `0${ infer R }` ? ToSecretsUion<R, TS, ACC | S0>
      : BS extends `1${ infer R }` ? ToSecretsUion<R, TS, ACC | S1>
        : ACC
    : never


type BitString<S, ACC extends string = ''>
  = S extends `${ infer L }${ infer R }` ? BitString<R, `${ ACC }${ CharToBS[keyof CharToBS & L] }`> : ACC

type CharToBS
  = CharToBS_Helper<'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_$'>

// eslint-disable-next-line @typescript-eslint/ban-types
type CharToBS_Helper<CS, BS='0000000', ACC={}>
  = CS extends `${ infer L }${ infer R }` ? CharToBS_Helper<R, AddBit<BS>, ACC & Record<L, BS>> : ACC

type AddBit<S>
  = S extends `${ infer R }1` ? `${ AddBit<R> }0` : S extends `${ infer U }0` ? `${ U }1` : never


function assertArrayIndex<A extends readonly unknown[], K extends string>(
  array: IsTuple<A> extends true ? never : A,
  key: K): asserts array is typeof array & Record<'key', UniqIndex2<K>> & Record<UniqIndex2<K>, A[number]> {}

type IsTuple<T extends readonly unknown[]> = number extends T['length'] ? false : true

type Index<A> = A[keyof A & 'key']

/* _____________ Test Cases _____________ */

const matrix = [
  [ 3, 4 ],
  [ 5, 6 ],
  [ 7, 8 ],
]

assertArrayIndex(matrix, 'rows')

let sum = 0

for (let i = 0 as Index<typeof matrix>; i < matrix.length; i += 1) {
  const columns: number[] = matrix[i]

  const x: number[] = matrix[0]

  assertArrayIndex(columns, 'columns')

  for (let j = 0 as Index<typeof columns>; j < columns.length; j += 1) {
    sum += columns[j]

    const y: number = columns[i]

    const z: number = columns[0]

    const u: number[] = matrix[j]
  }
}

const a: string[] = []

assertArrayIndex(a, 'a')

for (let p = 0 as Index<typeof a>; p < a.length; p += 1) {
  const value: string = a[p]

  const z: string = a[2]
}

a.push('qux')

// @ts-expect-error: number is not assignable to string
a.push(3)

for (const value of a) {
  const other: string = value
}

const b: number[] = []

assertArrayIndex(b, 'b')

for (let p = 0 as Index<typeof a>; p < b.length; p += 1) {
  // @ts-expect-error: number | undefined is not assignable to string
  const value: string = b[p]
}

const c: string[] = []

assertArrayIndex(c, 'c')

for (let p = 0; p < c.length; p += 1) {
  let value: string = c[p]

  value = c[0 as Index<typeof a>]
}

const d: readonly number[] = []

assertArrayIndex(d, 'd')

for (let p = 0 as Index<typeof d>; p < d.length; p += 1) {
  const value: number = d[p]

  // @ts-expect-error: only permits reading
  d[2] = 3
}


/* eslint-disable @typescript-eslint/no-unsafe-call */
// @ts-expect-error: push does not exist on readonly
d.push(3)
/* eslint-enable @typescript-eslint/no-unsafe-call */

const e: [number] = [ 0 ]

// @ts-expect-error: [boolean] is not assignable to never
assertArrayIndex(e, 'e')

const f: readonly [boolean] = [ false ]

// @ts-expect-error: [boolean] is not assignable to never
assertArrayIndex(f, 'f')

const tuple = [ 5, 7 ] as const

// @ts-expect-error: readonly [5, 7] is not assignable to never
assertArrayIndex(tuple, 'tuple')

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/925/answer
  > View solutions: https://tsch.js.org/925/solutions
  > More Challenges: https://tsch.js.org
*/
