/*
  2257 - MinusOne
  -------
  by Mustafo Faiz (@fayzzzm) #中等 #math

  ### 题目

  给定一个正整数作为类型的参数，要求返回的类型是该数字减 1。

  例如:

  ```ts
  type Zero = MinusOne<1> // 0
  type FiftyFour = MinusOne<55> // 54
  ```

  > 在 Github 上查看：https://tsch.js.org/2257/zh-CN
*/


/* _____________ 你的代码 _____________ */

// Mine(throw error)
// type MinusOne<T extends number, ARR extends unknown[] = []> = [...ARR, 1]['length'] extends T
//   ? ARR['length']
//   : MinusOne<T, [...ARR, 1]>

// Found in solutions
// type MinusOne<T extends number, ARR extends unknown[] = []> = [...ARR, 1]['length'] extends T
//   ? ARR['length']
//   : [...ARR, 1, 1]['length'] extends T // 减少 1 次 MinusOne 递归次数，但实际上增加了不止 1 次的递归次数
//     ? [...ARR, 1]['length']
//     : MinusOne<T, [...ARR, 1, 1]>

// More, refer to https://github.com/microsoft/TypeScript/issues/49459
type MinusOne<T extends number, ARR extends unknown[] = []> = 0 extends 1 ? never : [...ARR, 1]['length'] extends T
  ? ARR['length']
  : MinusOne<T, [...ARR, 1]>

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>,
  Expect<Equal<MinusOne<1101>, 1100>>,
]


/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/2257/answer/zh-CN
  > 查看解答：https://tsch.js.org/2257/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/

