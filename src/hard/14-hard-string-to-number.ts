/*
  300 - String to Number
  -------
  by Pig Fang (@g-plane) #hard #template-literal

  ### Question

  Convert a string literal to a number, which behaves like `Number.parseInt`.

  > View on GitHub: https://tsch.js.org/300
*/


/* _____________ Your Code Here _____________ */

// Mine
// type NumberStringUnion = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
// type ToNumber<S extends string, _HelpArr extends 0[] = [], _SS = S> =
//   S extends `${ infer F }${ infer Rest }`
//     ? F extends NumberStringUnion
//       ? ToNumber<Rest, [], _SS>
//       : never
//     : `${ _HelpArr['length'] }` extends _SS
//       ? _HelpArr['length']
//       : ToNumber<'', [ ..._HelpArr, 0 ], _SS>

// https://github.com/type-challenges/type-challenges/issues/18836
type ToNumber<S extends string> = S extends `${ infer N extends number }` ? N : never

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<ToNumber<'0'>, 0>>,
  Expect<Equal<ToNumber<'5'>, 5>>,
  Expect<Equal<ToNumber<'12'>, 12>>,
  Expect<Equal<ToNumber<'27'>, 27>>,
  Expect<Equal<ToNumber<'18@7_$%'>, never>>,
]


/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/300/answer
  > View solutions: https://tsch.js.org/300/solutions
  > More Challenges: https://tsch.js.org
*/

