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

// type _Number2Array<
//   N extends string | number,
//   _AddOne extends boolean = false,
//   _Result extends 0[] = [],
//   _NN extends number = `${ N }` extends `${ infer I extends number }` ? I : never,
// > = _Result['length'] extends _NN
//   ? _AddOne extends false ? _Result : [ 0, ..._Result ]
//   : _Number2Array<N, _AddOne, [ ..._Result, 0 ]>

type _Reverse<A extends string | number | bigint, _Result extends string = ''> =
  `${ A }` extends `${ infer AH }${ infer AT }`
    ? _Reverse<AT, `${ AH }${ _Result }`>
    : _Result
type Split<S extends string | number> = `${ S }` extends `${ infer A }${ infer B }`
  ? [ ...(B extends '' ? [] : Split<B>), `${ A }` ]
  : [`${ S }`]
type testOfSplit = Split<'352'>

// type Sum<
//   A extends number,
//   B extends number,
//   Pos extends 0[] = [],
//   _Carry extends 0[] = [],
//   _A extends string[] = Split<A>,
//   _B extends string[] = Split<B>,
//   _PosA extends 0[] = _Number2Array<_A[Pos['length']]>,
//   _PosB extends 0[] = _Number2Array<_B[Pos['length']]>,
//   _StepSum extends number = [ ..._PosA, ..._PosB ]['length'],
// > = `${ _StepSum }` extends `${ infer Carry extends number }${ infer Tail extends number }`
//   ? `${ Tail }${ Sum<A, B, [ ...Pos, 0 ], _Number2Array<Carry>> }`
//   : `${ _StepSum }`

// type test = Sum<12, 399>

type GetSingleNumSquare<N extends string> = N extends `${ infer NN extends keyof _SingleSquareMap }${ infer Zeroes }`
  ? `${ _SingleSquareMap[NN] }${ Zeroes }${ Zeroes }`
  : never
type testOfGetSingleNumSquare = GetSingleNumSquare<'90'> // "8100"

// // a^2 + b^2
type SumA<T extends string> = Split<T> extends [ infer A extends string, infer B extends string]
  ? `${ GetSingleNumSquare<B> }${ GetSingleNumSquare<A> extends keyof _SingleSquareMap ? `0${ GetSingleNumSquare<A> }` : GetSingleNumSquare<A> }`
  : never
type testOfSumA = SumA<'54'> // "2509"

// // 2ab
// // type SumB<A extends string, B extends string, _A = >


// type TinyMultiply<
//   A extends number,
//   B extends number,
//   _Counter extends 0[] = [],
//   _Acc extends 0[] = [],
//   _AArr extends 0[] = _Number2Array<A>,
// > = B extends _Counter['length']
//   ? _Acc['length']
//   : TinyMultiply<A, B, [ ..._Counter, 0 ], [ ..._Acc, ..._AArr ]>
// type testOfTinyMultiply = TinyMultiply<10, 9>


// type TinySum<A extends number, B extends number> = [ ..._Number2Array<A>, ..._Number2Array<B> ]['length']

// type xxx<
//   A extends number,
//   B extends number,
//   _RA extends string = _Reverse<A>,
//   _RB extends string = _Reverse<B>,
//   _DataA extends { F: number, Rest: number } =
//   _RA extends `${ infer F extends number }${ infer Rest extends number }` ? { F: F, Rest: Rest } : never,
//   _DataB extends { F: number, Rest: number } =
//   _RB extends `${ infer F extends number }${ infer Rest extends number }` ? { F: F, Rest: Rest } : never,
// > = TinySum<_DataA['F'], _DataB['F']> extends `${ infer Carry extends number }${ infer Tail extends number }`
//   ? `${ Tail }${ xxx<_DataA['Rest'], _DataB['Rest']> }`
//   : `${ TinySum<_DataA['F'], _DataB['F']> }`

// type qq = xxx<1, 2>

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
