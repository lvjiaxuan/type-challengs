/*
  216 - Slice
  -------
  by Anthony Fu (@antfu) #extreme #array

  ### Question

  Implement the JavaScript `Array.slice` function in the type system. `Slice<Arr, Start, End>` takes the three argument. The output should be a subarray of `Arr` from index `Start` to `End`. Indexes with negative numbers should be counted from reversely.

  For example

  ```ts
  type Arr = [1, 2, 3, 4, 5]
  type Result = Slice<Arr, 2, 4> // expected to be [3, 4]
  ```

  > View on GitHub: https://tsch.js.org/216
*/

/* _____________ Your Code Here _____________ */

// #4425
type _GreaterThan<T extends number, U extends number, Arr extends 0[] = []> =
  U extends Arr['length']
    ? T extends Arr['length']
      ? false // 相等
      : true // T 数字更大
    : T extends Arr['length']
      ? false // 先到达 T，证明 U 数字更大
      : _GreaterThan<T, U, [ ...Arr, 0 ]> // 两个都没到达

type _ToPositiveIdx<N extends number, Arr extends unknown[], _Counter extends 0[] = []> =
  `${ N }` extends `-${ infer I extends number }`
    ? _Counter['length'] extends I
      ? Arr['length']
      : Arr extends [ unknown, ...infer Rest ]
        ? _ToPositiveIdx<N, Rest, [ ..._Counter, 0 ]>
        : never
    : N

type _VerifyIdx<A extends number, B extends number, Max extends number> =
  _GreaterThan<A, B> extends true
    ? false
    : _GreaterThan<A, Max> extends true
      ? false
      : _GreaterThan<B, Max> extends true
        ? false
        : true


type Slice<
  Arr extends unknown[],
  Start extends number = 0,
  End extends number = Arr['length'],
  _Idx extends 0[] = [],
  _OverStart extends boolean = false,
  _Result extends unknown[] = [],
  _Start extends number = _ToPositiveIdx<Start, Arr>,
  _End extends number = _ToPositiveIdx<End, Arr>,
  _CurrentValue extends Arr[number] = Arr[_Idx['length']],
  _ValidIdx extends boolean = _VerifyIdx<_Start, _End, Arr['length']>,
> = _ValidIdx extends false
  ? []
  : _Idx['length'] extends _Start
    ? _Idx['length'] extends _End
      ? []
      : Slice<Arr, _Start, _End, [ ..._Idx, 0 ], true, [ _CurrentValue ]>
    : _OverStart extends false
      ? Slice<Arr, _Start, _End, [ ..._Idx, 0 ], false>
      : _Idx['length'] extends _End
        ? _Result
        : Slice<Arr, _Start, _End, [ ..._Idx, 0 ], true, [ ..._Result, _CurrentValue ]>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type Arr = [1, 2, 3, 4, 5]

type cases = [
  // basic
  Expect<Equal<Slice<Arr, 0, 1>, [1]>>,
  Expect<Equal<Slice<Arr, 0, 0>, []>>,
  Expect<Equal<Slice<Arr, 2, 4>, [3, 4]>>,

  // optional args
  Expect<Equal<Slice<[]>, []>>,
  Expect<Equal<Slice<Arr>, Arr>>,
  Expect<Equal<Slice<Arr, 0>, Arr>>,
  Expect<Equal<Slice<Arr, 2>, [3, 4, 5]>>,

  // negative index
  Expect<Equal<Slice<Arr, 0, -1>, [1, 2, 3, 4]>>,
  Expect<Equal<Slice<Arr, -3, -1>, [3, 4]>>,

  // invalid
  Expect<Equal<Slice<Arr, 10>, []>>,
  Expect<Equal<Slice<Arr, 1, 0>, []>>,
  Expect<Equal<Slice<Arr, 10, 20>, []>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/216/answer
  > View solutions: https://tsch.js.org/216/solutions
  > More Challenges: https://tsch.js.org
*/
