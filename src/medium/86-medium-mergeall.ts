/* eslint-disable @typescript-eslint/ban-types */
/*
  27932 - MergeAll
  -------
  by scarf (@scarf005) #medium #object #array #union

  ### Question

  Merge variadic number of types into a new type. If the keys overlap, its values should be merged into an union.

  For example:

  ```ts
  type Foo = { a: 1; b: 2 }
  type Bar = { a: 2 }
  type Baz = { c: 3 }

  type Result = MergeAll<[Foo, Bar, Baz]> // expected to be { a: 1 | 2; b: 2; c: 3 }
  ```

  > View on GitHub: https://tsch.js.org/27932
*/

/* _____________ Your Code Here _____________ */

type MergeAll<XS extends unknown[], _R extends Record<string, unknown> = {}> =
  XS extends [ infer F extends Record<string, unknown>, ...infer Rest ]
    ? MergeAll<Rest, Omit<_R, keyof F> & { [K in keyof F]: K extends keyof _R ? _R[K] | F[K] : F[K] }>
    : { [K in keyof _R]: _R[K] }

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type xx = MergeAll<[{ a: 1; b: 2 }, { a: 2 }, { c: 3 }]>

type cases = [
  Expect<Equal<MergeAll<[]>, {} >>,
  Expect<Equal<MergeAll<[{ a: 1 }]>, { a: 1 }>>,
  Expect<Equal<
  MergeAll<[{ a: string }, { a: string }]>,
  { a: string }>
  >,
  Expect<Equal<
  MergeAll<[{ }, { a: string }]>,
  { a: string }>
  >,
  Expect<Equal<
  MergeAll<[{ a: 1 }, { c: 2 }]>,
  { a: 1; c: 2 }>
  >,
  Expect<Equal<
  MergeAll<[{ a: 1; b: 2 }, { a: 2 }, { c: 3 }]>,
  { a: 1 | 2; b: 2; c: 3 }>
  >,
  Expect<Equal<MergeAll<[{ a: 1 }, { a: number }]>, { a: number }>>,
  Expect<Equal<MergeAll<[{ a: number }, { a: 1 }]>, { a: number }>>,
  Expect<Equal<MergeAll<[{ a: 1 | 2 }, { a: 1 | 3 }]>, { a: 1 | 2 | 3 }>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/27932/answer
  > View solutions: https://tsch.js.org/27932/solutions
  > More Challenges: https://tsch.js.org
*/
/* eslint-enable @typescript-eslint/ban-types */
