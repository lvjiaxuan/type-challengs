/*
  4037 - IsPalindrome
  -------
  by jiangshan (@jiangshanmeta) #hard #string

  ### Question

  Implement type ```IsPalindrome<T>``` to check whether  a string or number is palindrome.

  For example:

  ```typescript
  IsPalindrome<'abc'> // false
  IsPalindrome<121> // true
  ```

  > View on GitHub: https://tsch.js.org/4037
*/


/* _____________ Your Code Here _____________ */

// Mine
// type Reverse<T extends string | number, _Result extends string = ''> =
//   `${ T }` extends `${ infer F }${ infer Rest }`
//     ? Reverse<Rest, `${ F }${ _Result }`>
//     : _Result

// type IsPalindrome<T extends string | number> = Reverse<T> extends `${ T }` ? true : false

// https://github.com/type-challenges/type-challenges/issues/16957
type IsPalindrome<T extends string | number, _S extends string = `${ T }`, _L extends string = ''> =
  _S extends `${ infer F }${ infer R }${ _L }`
    ? R extends '' ? true : IsPalindrome<R, R, F>
    : false

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<IsPalindrome<'abc'>, false>>,
  Expect<Equal<IsPalindrome<'b'>, true>>,
  Expect<Equal<IsPalindrome<'abca'>, false>>,
  Expect<Equal<IsPalindrome<'abcba'>, true>>,
  Expect<Equal<IsPalindrome<121>, true>>,
  Expect<Equal<IsPalindrome<19260817>, false>>,
]


/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4037/answer
  > View solutions: https://tsch.js.org/4037/solutions
  > More Challenges: https://tsch.js.org
*/

