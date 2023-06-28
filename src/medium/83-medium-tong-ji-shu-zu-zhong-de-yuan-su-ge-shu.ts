/* eslint-disable @typescript-eslint/ban-types */
/*
  9989 - CountElementNumberToObject
  -------
  by 凤之兮原 (@kongmingLatern) #medium

  ### Question

  With type ``CountElementNumberToObject``, get the number of occurrences of every item from an array and return them in an object. For example:


  type Simple1 = CountElementNumberToObject<[]> // return {}
  type Simple2 = CountElementNumberToObject<[1,2,3,4,5]>
  return {
    1: 1,
    2: 1,
    3: 1,
    4: 1,
    5: 1
  }

  type Simple3 = CountElementNumberToObject<[1,2,3,4,5,[1,2,3]]>
  return {
    1: 2,
    2: 2,
    3: 2,
    4: 1,
    5: 1
  }

  > View on GitHub: https://tsch.js.org/9989
*/

/* _____________ Your Code Here _____________ */
type DigsNext = { '0': '1', '1': '2', '2': '3', '3': '4', '4': '5', '5': '6', '6': '7', '7': '8', '8': '9' }
type AddOne<A extends number | string> = `${ A }` extends `${ infer AH }${ infer AT }`
  ? AH extends '9'
    ? `0${ AddOne<AT> }`
    : `${ DigsNext[AH & keyof DigsNext] }${ AT }`
  : '1'

type ToNumber<T> = T extends string | number
  ? `${ T }` extends `${ infer I extends number }` ? I : never
  : never

type ToArrayNumber<T, _R extends unknown[] = []> = T extends [ infer I, ...infer Rest ]
  ? [I] extends [number | string]
    ? `${ I }` extends `${ infer NI extends number }`
      ? ToArrayNumber<Rest, [ ..._R, NI ]>
      : never
    : ToArrayNumber<Rest, [ ..._R, I]>
  : _R

type CountElementNumberToObject<
  T extends unknown[],
  _R extends Record<number, number> = {},
> = ToArrayNumber<T> extends [ infer I, ...infer Rest ]
  ? [I] extends [number]
    ? CountElementNumberToObject<Rest, Omit<_R, I> & Record<I, ToNumber<AddOne<_R[I]>>>>
    : I extends unknown[]
      ? CountElementNumberToObject<[ ...I, ...Rest], _R>
      : {}
  : { [K in keyof _R]: _R[K] }


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'
type cases = [
  Expect<Equal<CountElementNumberToObject<[1, 2, 3, 4, 5]>, {
    1: 1
    2: 1
    3: 1
    4: 1
    5: 1
  }
  >>,
  Expect<Equal<CountElementNumberToObject<[1, 2, 3, 4, 5, [1, 2, 3]]>, {
    1: 2
    2: 2
    3: 2
    4: 1
    5: 1
  }>>,
  Expect<Equal<CountElementNumberToObject<[1, 2, 3, 4, 5, [1, 2, 3, [4, 4, 1, 2]]]>, {
    1: 3
    2: 3
    3: 2
    4: 3
    5: 1
  }>>,
  Expect<Equal<CountElementNumberToObject<[never]>, {}>>,
  Expect<Equal<CountElementNumberToObject<['1', '2', '0']>, {
    0: 1
    1: 1
    2: 1
  }>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/9989/answer
  > View solutions: https://tsch.js.org/9989/solutions
  > More Challenges: https://tsch.js.org
*/
/* eslint-enable @typescript-eslint/ban-types */
