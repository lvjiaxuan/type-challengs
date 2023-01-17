/*
  517 - Multiply
  -------
  by null (@uid11) #extreme #math #template-literal

  ### Question

  **This challenge continues from [476 - Sum](https://tsch.js.org/476), it is recommended that you finish that one first, and modify your code based on it to start this challenge.**

  Implement a type `Multiply<A, B>` that multiplies two non-negative integers and returns their product as a string. Numbers can be specified as string, number, or bigint.

  For example,

  ```ts
  type T0 = Multiply<2, 3> // '6'
  type T1 = Multiply<3, '5'> // '15'
  type T2 = Multiply<'4', 10> // '40'
  type T3 = Multiply<0, 16> // '0'
  type T4 = Multiply<'13', '21'> // '273'
  type T5 = Multiply<'43423', 321543n> // '13962361689'
  ```

  > View on GitHub: https://tsch.js.org/517
*/

/* _____________ Your Code Here _____________ */

type _Number2Array<
  N extends string,
  _AddOne extends boolean = false,
  _Result extends 0[] = [],
  _NN extends number = `${ N }` extends `${ infer I extends number }` ? I : never,
> = _Result['length'] extends _NN
  ? _AddOne extends false ? _Result : [ 0, ..._Result ]
  : _Number2Array<N, _AddOne, [ ..._Result, 0 ]>

type _TwoSingleDigitSum<
  A extends _DigitString,
  B extends _DigitString,
  _PlusOne extends boolean = false,
  _Carry extends boolean = false,
  _Counter extends 0[] = [],
  _SumArray extends unknown[] = [ ..._Number2Array<A, _PlusOne>, ..._Number2Array<B> ],
> = _Counter['length'] extends 10
  ? _TwoSingleDigitSum<A, B, _PlusOne, true>
  : _Carry extends false
    ? _Counter['length'] extends _SumArray['length']
      ? { carry: false, digit: _Counter['length'] }
      : _TwoSingleDigitSum<A, B, _PlusOne, false, [ ..._Counter, 0 ]>
    : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ..._Counter ]['length'] extends _SumArray['length']
      ? { carry: true, digit: _Counter['length'] }
      : _TwoSingleDigitSum<A, B, _PlusOne, true, [ ..._Counter, 0 ]>

type _DigitString = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
type _GetLast<T extends string | number | bigint, _Rest extends string = ''> = `${ T }` extends _DigitString
  ? { rest: _Rest, last: `${ T }` }
  : `${ T }` extends `${ infer Rest extends string }${ infer I extends string }`
    ? _GetLast<I, `${ _Rest }${ Rest }`>
    : { rest: '', last: '0' }

// 476
type Sum<
  A extends string | number | bigint,
  B extends string | number | bigint,
  _PlusOne extends boolean = false,
  _Result extends string = '',
  _AL extends { rest: string, last: _DigitString } = _GetLast<A>,
  _BL extends { rest: string, last: _DigitString } = _GetLast<B>,
  _LastSum extends { carry: boolean, digit: number } = _TwoSingleDigitSum<_AL['last'], _BL['last'], _PlusOne>,
> = `${ _AL['rest'] }${ _BL['rest'] }` extends ''
  ? `${ _LastSum['carry'] extends true ? 1 : '' }${ _LastSum['digit'] }${ _Result }`
  : Sum<_AL['rest'], _BL['rest'], _LastSum['carry'], `${ _LastSum['digit'] }${ _Result }`>

// =============================================================================

type _ShiftZero<T extends string> = T extends `0${ infer Rest }` ? (Rest extends '' ? '0' : _ShiftZero<Rest>) : T

type _TwoSingleDigitMultiply<
  A extends _DigitString,
  B extends _DigitString,
  _Acc extends string = '0',
  _Times extends 0[] = [],
  _A extends _DigitString = _ShiftZero<A>,
  _B extends _DigitString = _ShiftZero<B>,
> = `${ _Times['length'] }` extends _B
  ? _Acc extends `${ infer Tens }${ infer Single }`
    ? Single extends ''
      ? { carry: '0', digit: _Acc & _DigitString }
      : { carry: Tens & _DigitString, digit: Single & _DigitString }
    : never
  : _TwoSingleDigitMultiply<_A, _B, Sum<_A, _Acc>, [ ..._Times, 0 ]>

type _OnlyOneSingleDigitMultiply<
  A extends string,
  B extends _DigitString,
  _Carry extends _DigitString = '0',
  _AL extends { rest: string, last: _DigitString } = _GetLast<A>,
  _Step extends { carry: _DigitString, digit: _DigitString } = _TwoSingleDigitMultiply<_AL['last'], B, _Carry>,
  _Result extends string = '',
> = _AL['rest'] extends ''
  ? `${ _Step['carry'] extends '0' ? '' : _Step['carry'] }${ _Step['digit'] }`
  : `${ _OnlyOneSingleDigitMultiply<_AL['rest'], B, _Step['carry']> }${ _Step['digit'] }`


type Multiply<
  A extends string | number | bigint,
  B extends string | number | bigint,
  _Acc extends string = '0',
  _Zeroes extends string = '',
  _BL extends { rest: string, last: _DigitString } = _GetLast<B>,
> = _BL['rest'] extends ''
  ? _ShiftZero<Sum<`${ _Acc }`, _OnlyOneSingleDigitMultiply<`${ A }${ _Zeroes }`, _BL['last']>>>
  : Multiply<A, _BL['rest'], Sum<`${ _Acc }`, _OnlyOneSingleDigitMultiply<`${ A }${ _Zeroes }`, _BL['last']>>, `${ _Zeroes }0`>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Multiply<2, 3>, '6'>>,
  Expect<Equal<Multiply<3, '5'>, '15'>>,
  Expect<Equal<Multiply<'4', 10>, '40'>>,
  Expect<Equal<Multiply<0, 16>, '0'>>,
  Expect<Equal<Multiply<'13', '21'>, '273'>>, // 13 + 26 = 273
  Expect<Equal<Multiply<'43423', 321543n>, '13962361689'>>,
  Expect<Equal<Multiply<9999, 1>, '9999'>>,
  Expect<Equal<Multiply<4325234, '39532'>, '170985150488'>>,
  Expect<Equal<Multiply<100_000n, '1'>, '100000'>>,
  Expect<Equal<Multiply<259, 9125385>, '2363474715'>>,
  Expect<Equal<Multiply<9, 99>, '891'>>,
  Expect<Equal<Multiply<315, '100'>, '31500'>>,
  Expect<Equal<Multiply<11n, 13n>, '143'>>,
  Expect<Equal<Multiply<728, 0>, '0'>>,
  Expect<Equal<Multiply<'0', 213>, '0'>>,
  Expect<Equal<Multiply<0, '0'>, '0'>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/517/answer
  > View solutions: https://tsch.js.org/517/solutions
  > More Challenges: https://tsch.js.org
*/
