/*
  30958 - Pascal's triangle
  -------
  by Aswin S Vijay (@aswinsvijay) #medium #array #math

  ### Question

  Given a number N, construct the Pascal's triangle with N rows.
  [Wikipedia](https://en.wikipedia.org/wiki/Pascal%27s_triangle)

  > View on GitHub: https://tsch.js.org/30958
*/

/* _____________ Your Code Here _____________ */

type IdxNext<Arr extends 0[][] = [],  Head extends 0[][] = [[0]] > =
  Arr extends [ infer A extends 0[], infer B extends 0[], ...infer Rest extends 0[][] ]
    ? [ ...Head, [ ...A, ...B ], ...IdxNext<[B, ...Rest], []> ]
    : Arr extends []
      ? []
      : [ ...Head, [0] ]

type IdxNextByNumber<N extends number, Counter extends 0[] = [], Last extends 0[][] = [[0]]> =
  N extends Counter['length']
    ? Last
    : IdxNextByNumber<N, [ ...Counter, 0 ], IdxNext<Last extends [] ? [[0]] : Last>>

type IdxArr<N extends number, Arr = IdxNextByNumber<N>> =
  Arr extends [ infer A extends 0[], ...infer Rest extends 0[][] ]
    ? [ A['length'], ...IdxArr<0, Rest> ]
    : []

type Pascal<N extends number, Counter extends 0[] = []> =
  N extends Counter['length']
    ? []
    : [ IdxArr<Counter['length']>, ...Pascal<N, [ ...Counter, 0 ]> ]

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<
    Equal<
      Pascal<1>,
      [
        [1],
      ]
    >
  >,
  Expect<
    Equal<
      Pascal<3>,
      [
        [1],
        [1, 1],
        [1, 2, 1],
      ]
    >
  >,
  Expect<
    Equal<
      Pascal<5>,
      [
        [1],
        [1, 1],
        [1, 2, 1],
        [1, 3, 3, 1],
        [1, 4, 6, 4, 1],
      ]
    >
  >,
  Expect<
    Equal<
      Pascal<7>,
      [
        [1],
        [1, 1],
        [1, 2, 1],
        [1, 3, 3, 1],
        [1, 4, 6, 4, 1],
        [1, 5, 10, 10, 5, 1],
        [1, 6, 15, 20, 15, 6, 1],
      ]
    >
  >,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/30958/answer
  > View solutions: https://tsch.js.org/30958/solutions
  > More Challenges: https://tsch.js.org
*/
