/*
  3243 - FlattenDepth
  -------
  by jiangshan (@jiangshanmeta) #medium #array

  ### Question

  Recursively flatten array up to depth times.

  For example:

  ```typescript
  type a = FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2> // [1, 2, 3, 4, [5]]. flatten 2 times
  type b = FlattenDepth<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, [[5]]]. Depth defaults to be 1
  ```

  If the depth is provided, it's guaranteed to be positive integer.

  > View on GitHub: https://tsch.js.org/3243
*/


/* _____________ Your Code Here _____________ */

// Normal without `Depth` as well as defaults `Depth = 1`.
// type FlattenDepth<Arr = unknown[], Depth = 1> =
//   Arr extends [ infer First, ...infer Rest ]
//     ? First extends unknown[]
//       ? [ ...First, ...FlattenDepth<Rest>]
//       : [ First, ...FlattenDepth<Rest>]
//     : []


// https://github.com/type-challenges/type-challenges/issues/12384
// 抖机灵，但是不能正确处理比 cases 更深的 depth
// type FlattenDepth<T extends unknown[], N extends number = 1> =
//   T extends [infer F, ...infer Rest]
//     ? N extends 0
//       ? T
//       : [...(F extends unknown[] ? FlattenDepth<F, [-1, 0, 1, 2][N]> : [F]), ...FlattenDepth<Rest, N>]
//     : T

// Do implement `Depth`. `Depth` needs to be used with tuple.
// https://github.com/microsoft/TypeScript/issues/49459
// 我也抖机灵了, 哭~
type FlattenDepth<Arr extends unknown[] = [], Depth extends number = 1, DepthTuple extends unknown[] = []> =
  DepthTuple['length'] extends Depth | 999
    ? Arr // 不打平
    : Arr extends [ infer First, ...infer Rest] // 递归打平
      ? First extends unknown[]
        ? FlattenDepth<[ ...First, ...FlattenDepth<Rest> ], Depth, [ ...DepthTuple, 1 ]>
        : FlattenDepth<[ First, ...FlattenDepth<Rest> ], Depth, [ ...DepthTuple, 1 ]>
      : []

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<FlattenDepth<[]>, []>>,
  Expect<Equal<FlattenDepth<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<FlattenDepth<[1, [2]]>, [1, 2]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, [[5]]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>, [1, 2, 3, 4, 5]>>,
]


/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/3243/answer
  > View solutions: https://tsch.js.org/3243/solutions
  > More Challenges: https://tsch.js.org
*/

