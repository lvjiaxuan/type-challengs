/*
  31447 - CountReversePairs
  -------
  by jiangshan (@jiangshanmeta) #extreme

  ### Question

  Given an integer array nums, return the number of reverse pairs in the array.

  A reverse pair is a pair (i, j) where:

  * 0 <= i < j < nums.length and
  * nums[i] > nums[j].

  > View on GitHub: https://tsch.js.org/31447
*/

/* _____________ Your Code Here _____________ */

type Pairs<T extends number[]> = T extends [ infer F extends number, ...infer Rest extends number[] ]
  ? `${string}${F}${string}${Rest[number]}${string}` | Pairs<Rest>
  : never

type Filter<T extends string> = T extends unknown
  ? '9876543210' extends T
    ? T
    : never
  : never

// Previous challenge https://github.com/type-challenges/type-challenges/blob/main/questions/00730-hard-union-to-tuple/README.md
type UnionToIntersectionFn<U> = (U extends unknown ? (arg: () => U) => void : never) extends (arg: infer I) => void ? I : never
type GetUnionLast<U> = UnionToIntersectionFn<U> extends () => infer I ? I : never
type UnionToTuple<U, Last = GetUnionLast<U>> = [U] extends [never] ? [] : [...UnionToTuple<Exclude<U, Last>>, Last]

type CountReversePairs<
  T extends number[],
  P extends string = Pairs<T>,
  F extends string = Filter<P>
> = UnionToTuple<F>['length']

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<CountReversePairs<[5, 2, 6, 1]>, 4>>,
  Expect<Equal<CountReversePairs<[1, 2, 3, 4]>, 0>>,
  Expect<Equal<CountReversePairs<[-1, -1]>, 0>>,
  Expect<Equal<CountReversePairs<[-1]>, 0>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/31447/answer
  > View solutions: https://tsch.js.org/31447/solutions
  > More Challenges: https://tsch.js.org
*/
