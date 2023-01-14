/*
  476 - Sum
  -------
  by null (@uid11) #extreme #math #template-literal

  ### Question

  Implement a type `Sum<A, B>` that summing two non-negative integers and returns the sum as a string. Numbers can be specified as a string, number, or bigint.

  For example,

  ```ts
  type T0 = Sum<2, 3> // '5'
  type T1 = Sum<'13', '21'> // '34'
  type T2 = Sum<'328', 7> // '335'
  type T3 = Sum<1_000_000_000_000n, '123'> // '1000000000123'
  ```

  > View on GitHub: https://tsch.js.org/476
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
  A extends string,
  B extends string,
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

type _DigitNumber = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
type _GetLast<T extends string | number | bigint, _Rest extends string = ''> = `${ T }` extends _DigitNumber
  ? { rest: _Rest, last: `${ T }` }
  : `${ T }` extends `${ infer Rest extends string }${ infer I extends string }`
    ? _GetLast<I, `${ _Rest }${ Rest }`>
    : { rest: '', last: '0' }

type Sum<
  A extends string | number | bigint,
  B extends string | number | bigint,
  _PlusOne extends boolean = false,
  _Result extends string = '',
  _AL extends { rest: string, last: _DigitNumber } = _GetLast<A>,
  _BL extends { rest: string, last: _DigitNumber } = _GetLast<B>,
  _LastSum extends { carry: boolean, digit: number } = _TwoSingleDigitSum<_AL['last'], _BL['last'], _PlusOne>,
> = `${ _AL['rest'] }${ _BL['rest'] }` extends ''
  ? `${ _LastSum['carry'] extends true ? 1 : '' }${ _LastSum['digit'] }${ _Result }`
  : Sum<_AL['rest'], _BL['rest'], _LastSum['carry'], `${ _LastSum['digit'] }${ _Result }`>


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Sum<2, 3>, '5'>>,
  Expect<Equal<Sum<'13', '21'>, '34'>>,
  Expect<Equal<Sum<'328', 7>, '335'>>,
  Expect<Equal<Sum<1_000_000_000_000n, '123'>, '1000000000123'>>,
  Expect<Equal<Sum<9999, 1>, '10000'>>,
  Expect<Equal<Sum<4325234, '39532'>, '4364766'>>,
  Expect<Equal<Sum<728, 0>, '728'>>,
  Expect<Equal<Sum<'0', 213>, '213'>>,
  Expect<Equal<Sum<0, '0'>, '0'>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/476/answer
  > View solutions: https://tsch.js.org/476/solutions
  > More Challenges: https://tsch.js.org
*/
