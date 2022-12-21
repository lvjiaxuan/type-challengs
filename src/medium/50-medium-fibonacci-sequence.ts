/*
  4182 - 斐波那契序列
  -------
  by windliang (@wind-liang) #中等

  ### 题目

  Implement a generic Fibonacci\<T\> takes an number T and returns it's corresponding [Fibonacci number](https://en.wikipedia.org/wiki/Fibonacci_number).

  The sequence starts:
  1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, ...

  For example
  ```js
  type Result1 = Fibonacci<3> // 2
  type Result2 = Fibonacci<8> // 21
  ```

  > 在 Github 上查看：https://tsch.js.org/4182/zh-CN
*/


/* _____________ 你的代码 _____________ */
// https://github.com/type-challenges/type-challenges/issues/16384
// f(n)=f(n-2)+f(n-1)
// n 至少从 2 开始
type Fibonacci<
  T extends number,
  N extends 0[] = [0, 0],
  Num1 extends 1[] = [1],
  Num2 extends 1[] = [1],
> = T extends 1 | 2 | N['length']
  ? Num2['length']
  : Fibonacci<T, [ ...N, 0 ], Num2, [...Num1, ...Num2]>


/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Fibonacci<1>, 1>>, // 1
  Expect<Equal<Fibonacci<2>, 1>>, // 1 1
  Expect<Equal<Fibonacci<3>, 2>>, // 1 1 2
  Expect<Equal<Fibonacci<8>, 21>>, // 1 1 2 3 4 8 13 21
]


/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/4182/answer/zh-CN
  > 查看解答：https://tsch.js.org/4182/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/

