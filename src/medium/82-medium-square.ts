/*
  27133 - Square
  -------
  by null (@aswinsvijay) #medium #tuple #array #math

  ### Question

  Given a number, your type should return its square.

  > View on GitHub: https://tsch.js.org/27133
*/

/* _____________ Your Code Here _____________ */

type _SingleSquareMap = {
  '1': '1',
  '2': '2',
  '3': '9',
  '4': '16',
  '5': '25',
  '6': '36',
  '7': '49',
  '8': '64',
  '9': '81',
}

type _Reverse<A extends string | number | bigint, _Result extends string = ''> =
  `${ A }` extends `${ infer AH }${ infer AT }`
    ? _Reverse<AT, `${ AH }${ _Result }`>
    : _Result

// type DigsNext = { '0': '1', '1': '2', '2': '3', '3': '4', '4': '5', '5': '6', '6': '7', '7': '8', '8': '9' }
// type DigsPrev = { [K in keyof DigsNext as DigsNext[K]]: K }
// type _SubOne<A> = A extends `${ infer AH }${ infer AT }`
//   ? AH extends '0'
//     ? `9${ _SubOne<AT> }`
//     : `${ DigsPrev[AH & keyof DigsPrev] }${ AT }`
//   : never
// type SubOne<A extends string | number | bigint> = _Reverse<_SubOne<_Reverse<A>>>

// type Sub<
//   A extends string | number | bigint,
//   B extends string | number | bigint,
//   _Counter extends 0[] = [],
//   _B extends number = `${ B }` extends `${ infer NB extends number }` ? NB : never,
// > = _Counter['length'] extends _B
//   ? A
//   : Sub<SubOne<A>, B, [ ..._Counter, 0 ]>

type _Number2Array<
  N extends string,
  _AddOne extends boolean = false,
  _Result extends 0[] = [],
  _NN extends number = `${ N }` extends `${ infer I extends number }` ? I : never,
> = _Result['length'] extends _NN
  ? _AddOne extends false ? _Result : [ 0, ..._Result ]
  : _Number2Array<N, _AddOne, [ ..._Result, 0 ]>

type _Split<S extends string> = `${ S }` extends `${ infer A }${ infer B }`
  ? [ ...(B extends '' ? [] : _Split<B>), `${ A }` ]
  : [S]
type Split<S extends string> = _Split<_Reverse<S>>

type GetSingleNumSquare<N extends string> = N extends `${ infer NN extends keyof _SingleSquareMap }${ infer Zeroes }`
  ? `${ _SingleSquareMap[NN] }${ Zeroes }${ Zeroes }`
  : never

type Sum = Split<'54'> extends [ infer A extends string, infer B extends string]
  ? `${ GetSingleNumSquare<A> }${ GetSingleNumSquare<B> }`
  : never


/* _____________ Test Cases _____________ */
import type {
  Equal,
  Expect,
} from '@type-challenges/utils'

type cases = [
  // Expect<Equal<Square<0>, 0>>,
  // Expect<Equal<Square<1>, 1>>,
  // Expect<Equal<Square<3>, 9>>,
  // Expect<Equal<Square<20>, 400>>,
  // Expect<Equal<Square<100>, 10000>>,

  // // Negative numbers
  // Expect<Equal<Square<-2>, 4>>,
  // Expect<Equal<Square<-5>, 25>>,
  // Expect<Equal<Square<-31>, 961>>,
  // Expect<Equal<Square<-50>, 2500>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/27133/answer
  > View solutions: https://tsch.js.org/27133/solutions
  > More Challenges: https://tsch.js.org
*/
