/*
  9286 - FirstUniqueCharIndex
  -------
  by jiangshan (@jiangshanmeta) #medium #string

  ### Question

  Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1. (Inspired by [leetcode 387](https://leetcode.com/problems/first-unique-character-in-a-string/))

  > View on GitHub: https://tsch.js.org/9286
*/


/* _____________ Your Code Here _____________ */

type _String2Union<T extends string> = T extends `${ infer F }${ infer Rest }` ? F | _String2Union<Rest> : never

type FirstUniqueCharIndex<T extends string, _Idx extends 0[] = [], _UnionOldChar extends string = never> =
  T extends `${ infer F }${ infer Rest }`
    ? F extends _String2Union<Rest> | _UnionOldChar
      ? FirstUniqueCharIndex<Rest, [ ..._Idx, 0 ], _UnionOldChar | F>
      : _Idx['length']
    : -1

// shorter
// https://github.com/type-challenges/type-challenges/issues/20858
// https://github.com/type-challenges/type-challenges/issues/20796


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<FirstUniqueCharIndex<'leetcode'>, 0>>,
  Expect<Equal<FirstUniqueCharIndex<'loveleetcode'>, 2>>,
  Expect<Equal<FirstUniqueCharIndex<'aabb'>, -1>>,
  Expect<Equal<FirstUniqueCharIndex<''>, -1>>,
]


/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/9286/answer
  > View solutions: https://tsch.js.org/9286/solutions
  > More Challenges: https://tsch.js.org
*/

