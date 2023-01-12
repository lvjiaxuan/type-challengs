/*
  274 - Integers Comparator
  -------
  by Pig Fang (@g-plane) #extreme #template-literal #math

  ### Question

  Implement a type-level integers comparator. We've provided an enum for indicating the comparison result, like this:

  - If `a` is greater than `b`, type should be `Comparison.Greater`.
  - If `a` and `b` are equal, type should be `Comparison.Equal`.
  - If `a` is lower than `b`, type should be `Comparison.Lower`.

  **Note that `a` and `b` can be positive integers or negative integers or zero, even one is positive while another one is negative.**

  > View on GitHub: https://tsch.js.org/274
*/

/* _____________ Your Code Here _____________ */

enum Comparison {
  Greater,
  Equal,
  Lower,
}

// # 4425
type _GreaterThanForPos<T extends number, U extends number, _Counter extends 0[] = []> =
  _Counter['length'] extends T
    ? _Counter['length'] extends U
      ? Comparison.Equal
      : Comparison.Lower
    : _Counter['length'] extends U
      ? Comparison.Greater
      : _GreaterThanForPos<T, U, [ ..._Counter, 0 ]>

// Limit version
// type Comparator<
//   A extends number,
//   B extends number,
// > = `${ A },${ B }` extends `-${ infer IA extends number },-${ infer IB extends number }`
//   ? _GreaterThanForPos<IB, IA>
//   : `${ A },${ B }` extends `${ number },-${ number }`
//     ? Comparison.Greater
//     : `${ A },${ B }` extends `-${ number },${ number }`
//       ? Comparison.Lower
//       : _GreaterThanForPos<A, B>


type _RemoveZeroes<T extends string> =
  `${ T }` extends `${ infer A extends string }0${ infer B extends string }`
    ? B extends '' | '0' ? T : _RemoveZeroes<`${ A }${ B }`>
    : T

type _CountStringLength<T extends string, _Counter extends 0[] = []> =
  T extends `${ string }${ infer Rest }`
    ? _CountStringLength<Rest, [ ..._Counter, 0 ]>
    : _Counter['length']

type _ComparatorNumberLengthForPos<
  A extends number,
  B extends number,
  _A extends string = `${ A }` extends `${ infer I extends string }` ? I : never,
  _B extends string = `${ B }` extends `${ infer I extends string }` ? I : never,
> = _GreaterThanForPos<_CountStringLength<_A>, _CountStringLength<_B>>

type _ComparatorEqualLengthForPos<
  A extends number,
  B extends number,
  _A extends string = `${ A }` extends `${ infer I extends string }` ? _RemoveZeroes<I> : never,
  _B extends string = `${ B }` extends `${ infer I extends string }` ? _RemoveZeroes<I> : never,
> = _A extends `${ infer FA extends number }${ infer RestA extends number }`
  ? _B extends `${ infer FB extends number }${ infer RestB extends number }`
    ? FA extends FB
      ? _ComparatorEqualLengthForPos<RestA, RestB>
      : _GreaterThanForPos<FA, FB>
    : never
  : _GreaterThanForPos<A, B>

// No limit
type Comparator<A extends number, B extends number> =
  `${ A },${ B }` extends `-${ infer IA extends number },-${ infer IB extends number }`
    ? _ComparatorNumberLengthForPos<IA, IB> extends Comparison.Equal
      ? _ComparatorEqualLengthForPos<IB, IA>
      : _ComparatorNumberLengthForPos<IB, IA>
    : `${ A },${ B }` extends `${ number },-${ number }`
      ? Comparison.Greater
      : `${ A },${ B }` extends `-${ number },${ number }`
        ? Comparison.Lower
        : _ComparatorNumberLengthForPos<A, B> extends Comparison.Equal
          ? _ComparatorEqualLengthForPos<A, B>
          : _ComparatorNumberLengthForPos<A, B>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Comparator<5, 5>, Comparison.Equal>>,
  Expect<Equal<Comparator<5, 6>, Comparison.Lower>>,
  Expect<Equal<Comparator<5, 8>, Comparison.Lower>>,
  Expect<Equal<Comparator<5, 0>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, 0>, Comparison.Lower>>,
  Expect<Equal<Comparator<0, 0>, Comparison.Equal>>,
  Expect<Equal<Comparator<0, -5>, Comparison.Greater>>,
  Expect<Equal<Comparator<5, -3>, Comparison.Greater>>,
  Expect<Equal<Comparator<5, -7>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, -7>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, -3>, Comparison.Lower>>,
  Expect<Equal<Comparator<-25, -30>, Comparison.Greater>>,
  Expect<Equal<Comparator<15, -23>, Comparison.Greater>>,
  Expect<Equal<Comparator<40, 37>, Comparison.Greater>>,
  Expect<Equal<Comparator<-36, 36>, Comparison.Lower>>,
  Expect<Equal<Comparator<27, 27>, Comparison.Equal>>,
  Expect<Equal<Comparator<-38, -38>, Comparison.Equal>>,

  Expect<Equal<Comparator<1, 100>, Comparison.Lower>>,
  Expect<Equal<Comparator<100, 1>, Comparison.Greater>>,
  Expect<Equal<Comparator<-100, 1>, Comparison.Lower>>,
  Expect<Equal<Comparator<1, -100>, Comparison.Greater>>,
  Expect<Equal<Comparator<-100, -1>, Comparison.Lower>>,
  Expect<Equal<Comparator<-1, -100>, Comparison.Greater>>,

  // Extra tests if you like to challenge yourself!
  Expect<Equal<Comparator<9007199254740992, 9007199254740992>, Comparison.Equal>>,
  Expect<Equal<Comparator<-9007199254740992, -9007199254740992>, Comparison.Equal>>,
  Expect<Equal<Comparator<9007199254740991, 9007199254740992>, Comparison.Lower>>,
  Expect<Equal<Comparator<9007199254740992, 9007199254740991>, Comparison.Greater>>,
  Expect<Equal<Comparator<-9007199254740992, -9007199254740991>, Comparison.Lower>>,
  Expect<Equal<Comparator<-9007199254740991, -9007199254740992>, Comparison.Greater>>,
]


/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/274/answer
  > View solutions: https://tsch.js.org/274/solutions
  > More Challenges: https://tsch.js.org
*/


