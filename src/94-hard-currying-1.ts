/*
  17 - 柯里化 1
  -------
  by Anthony Fu (@antfu) #困难 #array

  ### 题目

  > 由谷歌自动翻译，欢迎 PR 改进翻译质量。

  >在此挑战中建议使用TypeScript 4.0

  [Currying](https://en.wikipedia.org/wiki/Currying) 是一种将带有多个参数的函数转换为每个带有一个参数的函数序列的技术。

  例如：

  ```ts
  const add = (a: number, b: number) => a + b
  const three = add(1, 2)

  const curriedAdd = Currying(add)
  const five = curriedAdd(2)(3)
  ```

  传递给 `Currying` 的函数可能有多个参数，您需要正确键入它。

  在此挑战中，curried 函数一次仅接受一个参数。分配完所有参数后，它应返回其结果。

  > 在 Github 上查看：https://tsch.js.org/17/zh-CN
*/


/* _____________ 你的代码 _____________ */

type Curry<Fn> = Fn extends (...args: infer Args) => infer Return
  ? Args extends [ infer First, ...infer Rest ]
    ? Rest extends []
      ? (p: First) => Return
      : (p: First) => Curry<(...args: Rest) => Return>
    : () => Return
  : never

declare function Currying<F>(fn: F): Curry<F>


/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

const curried1 = Currying((a: string, b: number, c: boolean) => true)
const curried2 = Currying((a: string, b: number, c: boolean, d: boolean, e: boolean, f: string, g: boolean) => true)
const curried3 = Currying(() => true)

type cases = [
  Expect<Equal<
    typeof curried1, (a: string) => (b: number) => (c: boolean) => true
  >>,
  Expect<Equal<
    typeof curried2, (a: string) => (b: number) => (c: boolean) => (d: boolean) => (e: boolean) => (f: string) => (g: boolean) => true
  >>,
  Expect<Equal<typeof curried3, () => true>>,
]


/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/17/answer/zh-CN
  > 查看解答：https://tsch.js.org/17/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/

