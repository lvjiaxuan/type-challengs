/*
  8804 - Two Sum
  -------
  by PsiloLau (@Psilocine) #hard #array #math

  ### Question

  Given an array of integers `nums` and an integer `target`, return true if two numbers such that they add up to `target`.

  > View on GitHub: https://tsch.js.org/8804
*/


/* _____________ Your Code Here _____________ */

// Mine
// type _Number2ArrayLength<N extends number, _Result extends 0[] = []> = _Result['length'] extends N ? _Result : _Number2ArrayLength<N, [ ..._Result, 0 ]>
// type _NumberArray2Length<A extends number[]> = A extends [ infer F extends number, ...infer Rest extends number[] ] ? [ _Number2ArrayLength<F>, ..._NumberArray2Length<Rest> ] : []
// type TwoSum<
//   T extends number[],
//   U extends number,
//   _Head extends 0[] = [0],
//   _HeadLength extends number = _Head['length'],
//   _T extends 0[][] = _NumberArray2Length<T>,
// > = T extends [ infer F extends number, ...infer Rest extends number[] ]
//   ? [ ..._Number2ArrayLength<F>, ..._T[_HeadLength] ]['length'] extends U
//     ? true
//     : _Head['length'] extends _T['length']
//       ? TwoSum<Rest, U>
//       : TwoSum<T, U, [ ..._Head, 0 ]>
//   : false

type LengthToArray<T extends number, R extends unknown[] = []> = R['length'] extends T
  ? R
  : LengthToArray<T, [...R, unknown]>

type Sum<A extends number, B extends number> = A extends number
  ? B extends number
    ? [...LengthToArray<A>, ...LengthToArray<B>]['length']
    : never
  : never

type TwoSum<T extends number[], U extends number> =
  T extends [infer F extends number, ...infer O extends number[]]
    ? U extends Sum<F, O[number]>
      ? true
      : TwoSum<O, U>
    : false


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<TwoSum<[3, 3], 6>, true>>,
  Expect<Equal<TwoSum<[3, 2, 4], 6>, true>>,
  Expect<Equal<TwoSum<[2, 7, 11, 15], 15>, false>>,
  Expect<Equal<TwoSum<[2, 7, 11, 15], 9>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 0>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 1>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 2>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 3>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 4>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 5>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 6>, false>>,
]


/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/8804/answer
  > View solutions: https://tsch.js.org/8804/solutions
  > More Challenges: https://tsch.js.org
*/

