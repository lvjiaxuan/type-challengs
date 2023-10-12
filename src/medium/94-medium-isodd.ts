/*
  30301 - IsOdd
  -------
  by jiangshan (@jiangshanmeta) #medium #string

  ### Question

  return true is a number is odd

  > View on GitHub: https://tsch.js.org/30301
*/

/* _____________ Your Code Here _____________ */

// Mine
// type RemovePreZero<T extends string> = T extends `0${ infer Rest extends string }` ? RemovePreZero<Rest> : T

// type IsOdd<T extends number> = `${ T }` extends `${ number }${ infer Rest extends string }`
//   ? RemovePreZero<Rest> extends `${ infer Num extends number }`
//     ? IsOdd<Num>
//     : T extends 1 | 3 | 5 | 7 | 9
//       ? true
//       : false
//   : false

// #30334
type IsOdd<T extends number> = `${ T }` extends `${ number | '' }${ 1 | 3 | 5 | 7 | 9 }` ? true : false

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<IsOdd<2023>, true>>,
  Expect<Equal<IsOdd<1453>, true>>,
  Expect<Equal<IsOdd<1926>, false>>,
  Expect<Equal<IsOdd<number>, false>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/30301/answer
  > View solutions: https://tsch.js.org/30301/solutions
  > More Challenges: https://tsch.js.org
*/
