/*
  741 - Sort
  -------
  by Sg (@suica) #extreme #infer #array

  ### Question

  In this challenge, you are required to sort natural number arrays in either ascend order or descent order.

  Ascend order examples:
  ```ts
  Sort<[]> // []
  Sort<[1]> // [1]
  Sort<[2, 4, 7, 6, 6, 6, 5, 8, 9]> //  [2, 4, 5, 6, 6, 6, 7, 8, 9]
  ```

  The `Sort` type should also accept a boolean type. When it is `true`, the sorted result should be in descent order. Some examples:

  ```ts
  Sort<[3, 2, 1], true> // [3, 2, 1]
  Sort<[3, 2, 0, 1, 0, 0, 0], true> // [3, 2, 1, 0, 0, 0, 0]
  ```

  Extra challenges:
  1. Support natural numbers with 15+ digits.
  2. Support float numbers.

  > View on GitHub: https://tsch.js.org/741
*/

/* _____________ Your Code Here _____________ */

// https://github.com/type-challenges/type-challenges/issues/11688

// 冒泡排序
type Bubble<T extends number[], M extends boolean = false> // true最小数到末尾.false最大数到末尾.
    = T extends [infer A extends number, infer B extends number, ... infer R extends number[]]
      ? IsLower<A, B> extends M
        ? [B, ...Bubble<[A, ...R], M>]
        : [A, ...Bubble<[B, ...R], M>]
      : T

type Sort<T extends number[], M extends boolean = false>
    = Bubble<T, M> extends [... infer R extends number[], infer L]
      ? [...(Sort<R, M>), L]
      : T

type IsLower<A extends number, B extends number> = _Comparator<A, B> extends 'Lower' ? true : false
// 冒泡排序

// Utils
type _GetInteger<N extends string> = `${ N }` extends `${ infer Integer }.${ string }` ? Integer : N
type _GetFloat<N extends string> = `${ N }` extends `${ string }.${ infer Float }` ? Float : '0'
// Utils

// 正负浮点数比较
type _Comparator<A extends number, B extends number>
  = `${ A }` extends `-${ infer AbsA }`
    ? `${ B }` extends `-${ infer AbsB }`
      ? ComparePositives<AbsB, AbsA>
      : 'Lower'
    : `${ B }` extends `-${ number }`
      ? 'Greater'
      : ComparePositives<`${ A }`, `${ B }`>

// 正浮点数比较
type ComparePositives<
  A extends string,
  B extends string,
  _IntegerA extends string = _GetInteger<A>,
  _IntegerB extends string = _GetInteger<B>,
  _FloatA extends string = _GetFloat<A>,
  _FloatB extends string = _GetFloat<B>,
  _ByIntegerLength = _CompareByLength<_IntegerA, _IntegerB>,
  _ByIntegerDigits = _CompareByIntegerDigits<_IntegerA, _IntegerB>,
> = _ByIntegerLength extends 'Equal'
  ? _ByIntegerDigits extends 'Equal'
    ? _CompareByFloatDigits<_FloatA, _FloatB>
    : _ByIntegerDigits
  : _ByIntegerLength

// 字符串长度比较
type _CompareByLength<A extends string, B extends string>
  = A extends `${ string }${ infer AR }`
    ? B extends `${ string }${ infer BR }`
      ? _CompareByLength<AR, BR>
      : 'Greater'
    : B extends `${ string }${ infer BR }`
      ? 'Lower'
      : 'Equal'

// 浮点部分比较
type _CompareByFloatDigits<A extends string, B extends string> =
  A extends `${ infer AF }${ infer AR }`
    ? B extends `${ infer BF }${ infer BR }`
      ? _CompareDigits<AF, BF> extends 'Equal'
        ? _CompareByFloatDigits<AR, BR>
        : _CompareDigits<AF, BF>
      : 'Greater'
    : B extends ''
      ? 'Equal'
      : 'Lower'

// 比较长度相等的数值
type _CompareByIntegerDigits<A extends string, B extends string>
  = `${ A }|${ B }` extends `${ infer AF }${ infer AR }|${ infer BF }${ infer BR }`
    ? _CompareDigits<AF, BF> extends 'Equal'
      ? _CompareByIntegerDigits<AR, BR>
      : _CompareDigits<AF, BF>
    : 'Equal'

// 比较个位数值
type _CompareDigits<A extends string, B extends string>
  = A extends B
    ? 'Equal'
    : '0123456789' extends `${ string }${ A }${ string }${ B }${ string }`
      ? 'Lower'
      : 'Greater'

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Sort<[]>, []>>,
  Expect<Equal<Sort<[1]>, [1]>>,
  Expect<Equal<Sort<[2, 1]>, [1, 2]>>,
  Expect<Equal<Sort<[0, 0, 0]>, [0, 0, 0]>>,
  Expect<Equal<Sort<[1, 2, 3]>, [1, 2, 3]>>,
  Expect<Equal<Sort<[3, 2, 1]>, [1, 2, 3]>>,
  Expect<Equal<Sort<[3, 2, 1, 2]>, [1, 2, 2, 3]>>,
  Expect<Equal<Sort<[3, 2, 0, 1, 0, 0, 0]>, [0, 0, 0, 0, 1, 2, 3]>>,
  Expect<Equal<Sort<[2, 4, 7, 6, 6, 6, 5, 8, 9]>, [2, 4, 5, 6, 6, 6, 7, 8, 9]>>,
  Expect<Equal<Sort<[1, 1, 2, 1, 1, 1, 1, 1, 1]>, [1, 1, 1, 1, 1, 1, 1, 1, 2]>>,
  Expect<Equal<Sort<[], true>, []>>,
  Expect<Equal<Sort<[1], true>, [1]>>,
  Expect<Equal<Sort<[2, 1], true>, [2, 1]>>,
  Expect<Equal<Sort<[0, 0, 0], true>, [0, 0, 0]>>,
  Expect<Equal<Sort<[1, 2, 3], true>, [3, 2, 1]>>,
  Expect<Equal<Sort<[3, 2, 1], true>, [3, 2, 1]>>,
  Expect<Equal<Sort<[3, 2, 1, 2], true>, [3, 2, 2, 1]>>,
  Expect<Equal<Sort<[3, 2, 0, 1, 0, 0, 0], true>, [3, 2, 1, 0, 0, 0, 0]>>,
  Expect<Equal<Sort<[2, 4, 7, 6, 6, 6, 5, 8, 9], true>, [9, 8, 7, 6, 6, 6, 5, 4, 2]>>,
  // Extra
  Expect<Equal<Sort<[10, 20, 100, 1, 12, 21, 101]>, [1, 10, 12, 20, 21, 100, 101]>>,
  Expect<Equal<Sort<[222222222222222, 3333333335555444, 111111111111111]>, [111111111111111, 222222222222222, 3333333335555444]>>,
  Expect<Equal<Sort<[0.1, 0.01, 2.33, 0.223, 0.83, 0.002, 2.24, 2.3002]>, [0.002, 0.01, 0.1, 0.223, 0.83, 2.24, 2.3002, 2.33]>>,
  Expect<Equal<Sort<[ 100.1, -5, -2.29, 22, 0, 0.83, -2.3011, 0.834, -10, 101, 1, -2.301, 5, -2.28999 ]>, [-10, -5, -2.3011, -2.301, -2.29, -2.28999, 0, 0.83, 0.834, 1, 5, 22, 100.1, 101]>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/741/answer
  > View solutions: https://tsch.js.org/741/solutions
  > More Challenges: https://tsch.js.org
*/
