/*
  296 - Permutation
  -------
  by Naoto Ikuno (@pandanoir) #中等 #union

  ### 题目

  实现联合类型的全排列，将联合类型转换成所有可能的全排列数组的联合类型。

  ```typescript
  type perm = Permutation<'A' | 'B' | 'C'>; // ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']
  ```

  > 在 Github 上查看：https://tsch.js.org/296/zh-CN
*/


/* _____________ 你的代码 _____________ */

/**
 * # 知识点
 * 1. 范形 T 不接受never，但允许缺省的 never
 */

// case 1
// type Permutation<T> = T extends infer V ? [V] : never
// case 5 范型 T 不接受never，要通过 tuple 类型判断
// type Permutation<T, A = T> = [T] extends [never]
//   ? []
//   : T extends infer V ? [V] : never
// left case 使用 A 范型缺省 T，因为 T 在 extends 右侧时已经被拆开了，A 是作为一个副本的存在
type Permutation<T, A = T> = [T] extends [never]
  ? []
  : T extends A ? [T, ...Permutation<Exclude<A, T>>] : never

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Permutation<'A'>, ['A']>>,
  Expect<Equal<Permutation<'A' | 'B' | 'C'>, ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']>>,
  Expect<Equal<Permutation<'B' | 'A' | 'C'>, ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']>>,
  Expect<Equal<Permutation<boolean>, [false, true] | [true, false]>>,
  Expect<Equal<Permutation<never>, []>>,
]


/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/296/answer/zh-CN
  > 查看解答：https://tsch.js.org/296/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/

