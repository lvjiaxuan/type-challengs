/*
  55 - Union to Intersection
  -------
  by Zheeeng (@zheeeng) #困难 #utils #infer

  ### 题目

  > 由谷歌自动翻译，欢迎 PR 改进翻译质量。

  实现高级util类型`UnionToIntersection<U>`

  例如

  ```ts
  type I = Union2Intersection<'foo' | 42 | true> // expected to be 'foo' & 42 & true
  ```

  > 在 Github 上查看：https://tsch.js.org/55/zh-CN
*/


/* _____________ 你的代码 _____________ */
// https://github.com/type-challenges/type-challenges/issues/122
// https://stackoverflow.com/a/74003461/178728
type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type NeverType = 'foo' & 42 & true // never

type cases = [
  Expect<Equal<UnionToIntersection<'foo' | 42 | true>, 'foo' & 42 & true>>,
  Expect<Equal<UnionToIntersection<(() => 'foo') | ((i: 42) => true)>, (() => 'foo') & ((i: 42) => true)>>,
]


/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/55/answer/zh-CN
  > 查看解答：https://tsch.js.org/55/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/

