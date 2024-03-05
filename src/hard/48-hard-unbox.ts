/*
  32427 - Unbox
  -------
  by Julian Coy (@eXamadeus) #hard #utils #promise #function #tuple #array

  ### Question

  How can we build a type that "unboxes" arrays, functions, promises, and tuples?

  Example:

  ```typescript
  Unbox<string> // string
  Unbox<()=>number> // number
  Unbox<boolean[]> // boolean
  Unbox<Promise<boolean>> // boolean
  ```

  Bonus: Can we make it recursive?

  ```typescript
  Unbox<() => () => () => () => number> // number
  ```

  Double Bonus: Can we control the recursion?

  ```typescript
  Unbox<() => () => () => () => number, 3> // () => number
  ```

  > View on GitHub: https://tsch.js.org/32427
*/

/* _____________ Your Code Here _____________ */

// type Base<T> = T extends ((infer F)[]) | ((...args: any) => infer F) | (Promise<infer F>)
//   ? F
//   : never

// type Unbox<T, level extends number = 0, Counter extends 0[] = []> =
//   Base<T> extends never
//     ? T
//     : level extends 0
//       ? Unbox<Base<T>>
//       : level extends Counter['length']
//         ? T
//         : Unbox<Base<T>, level, [ 0, ...Counter ]>

type Unbox<T, Depth = 0, Count extends 0[] = [0]> =
  T extends ((...args: any[]) => infer R) | (infer R)[] | Promise<infer R>
    ? Count['length'] extends Depth ? R : Unbox<R, Depth, [...Count, 0]>
    : T

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  // Base cases
  Expect<Equal<Unbox<number>, number>>,
  Expect<Equal<Unbox<() => number>, number>>,
  Expect<Equal<Unbox<() => number | string>, number | string>>,
  Expect<Equal<Unbox<number[]>, number>>,
  Expect<Equal<Unbox<(number | string)[]>, number | string>>,
  Expect<Equal<Unbox<[number]>, number>>,
  Expect<Equal<Unbox<Promise<number>>, number>>,

  // Bonus: Recursion
  Expect<Equal<Unbox<() => Promise<() => Array<Promise<boolean>>>>, boolean>>,

  // Bonus: Recusion levels
  Expect<Equal<Unbox<() => () => () => () => number, 0>, number>>,
  Expect<Equal<Unbox<() => () => () => () => number, 1>, () => () => () => number>>,
  Expect<Equal<Unbox<() => () => () => () => number, 2>, () => () => number>>,
  Expect<Equal<Unbox<() => () => () => () => number, 3>, () => number>>,
  Expect<Equal<Unbox<() => () => () => () => number, 4>, number>>,
  Expect<Equal<Unbox<() => () => () => () => number, 5>, number>>,
  Expect<Equal<Unbox<number[][][][], 0>, number>>,
  Expect<Equal<Unbox<number[][][][], 1>, number[][][]>>,
  Expect<Equal<Unbox<number[][][][], 2>, number[][]>>,
  Expect<Equal<Unbox<number[][][][], 3>, number[]>>,
  Expect<Equal<Unbox<number[][][][], 4>, number>>,
  Expect<Equal<Unbox<number[][][][], 5>, number>>,
  Expect<Equal<Unbox<[[[[number]]]], 0>, number>>,
  Expect<Equal<Unbox<[[[[number]]]], 1>, [[[number]]]>>,
  Expect<Equal<Unbox<[[[[number]]]], 2>, [[number]]>>,
  Expect<Equal<Unbox<[[[[number]]]], 3>, [number]>>,
  Expect<Equal<Unbox<[[[[number]]]], 4>, number>>,
  Expect<Equal<Unbox<[[[[number]]]], 5>, number>>,
  Expect<Equal<Unbox<Promise<Promise<Promise<number>>>, 0>, number>>,
  Expect<Equal<Unbox<Promise<Promise<Promise<number>>>, 1>, Promise<Promise<number>>>>,
  Expect<Equal<Unbox<Promise<Promise<Promise<number>>>, 2>, Promise<number>>>,
  Expect<Equal<Unbox<Promise<Promise<Promise<number>>>, 3>, number>>,
  Expect<Equal<Unbox<Promise<Promise<Promise<number>>>, 4>, number>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/32427/answer
  > View solutions: https://tsch.js.org/32427/solutions
  > More Challenges: https://tsch.js.org
*/
