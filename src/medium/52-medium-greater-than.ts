/*
  4425 - Greater Than
  -------
  by ch3cknull (@ch3cknull) #medium #array

  ### Question

  In This Challenge, You should implement a type `GreaterThan<T, U>` like `T > U`

  Negative numbers do not need to be considered.

  For example

  ```ts
  GreaterThan<2, 1> //should be true
  GreaterThan<1, 1> //should be false
  GreaterThan<10, 100> //should be false
  GreaterThan<111, 11> //should be true
  ```

  Good Luck!

  > View on GitHub: https://tsch.js.org/4425
*/


/* _____________ Your Code Here _____________ */
// 基于 #17226 思路：Arr['length'] 先到达谁（T | U），就说明谁小
// 他是先比较 T ，用了 2 次 extends
// 我试一下先比较 U ，发现得用 3 次 extends
type GreaterThan<T extends number, U extends number, Arr extends 0[] = []> =
  U extends Arr['length']
    ? T extends Arr['length']
      ? false // 相等
      : true // T 数字更大
    : T extends Arr['length']
      ? false // 先到达 T，证明 U 数字更大
      : GreaterThan<T, U, [ ...Arr, 0 ]> // 两个都没到达

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<GreaterThan<1, 0>, true>>,
  Expect<Equal<GreaterThan<5, 4>, true>>,
  Expect<Equal<GreaterThan<4, 5>, false>>,
  Expect<Equal<GreaterThan<0, 0>, false>>,
  Expect<Equal<GreaterThan<20, 20>, false>>,
  Expect<Equal<GreaterThan<10, 100>, false>>,
  Expect<Equal<GreaterThan<111, 11>, true>>,
]


/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4425/answer
  > View solutions: https://tsch.js.org/4425/solutions
  > More Challenges: https://tsch.js.org
*/

