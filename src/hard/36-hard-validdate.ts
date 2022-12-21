/*
  9155 - ValidDate
  -------
  by ch3cknull (@ch3cknull) #hard

  ### Question

  Implement a type `ValidDate`, which takes an input type T and returns whether T is a valid date.

  **Leap year is not considered**

  Good Luck!

  ```ts
  ValidDate<'0102'> // true
  ValidDate<'0131'> // true
  ValidDate<'1231'> // true
  ValidDate<'0229'> // false
  ValidDate<'0100'> // false
  ValidDate<'0132'> // false
  ValidDate<'1301'> // false
  ```

  > View on GitHub: https://tsch.js.org/9155
*/


/* _____________ Your Code Here _____________ */

// Mine version
type Month31 = '01' | '03' | '05' | '07' | '08' | '10' | '12'
type Month30 = '04' | '06' | '09' | '11'
type Month28 = '02'

type _AllNumber = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '0'

type ValidDate2<T extends string> =
  T extends `${ Month31 }${ infer Date1 }${ infer Date2 }`
    ? Date1 extends '0'
      ? Date2 extends '0' ? false : true // == __00
      : Date1 extends '1' | '2'
        ? Date2 extends _AllNumber ? true : false
        : Date1 extends '3'
          ? Date2 extends '0' | '1'
            ? true
            : false // > __32
          : false // > 4___
    : T extends `${ Month30 }${ infer Date1 }${ infer Date2 }`
      ? Date1 extends '0'
        ? Date2 extends '0' ? false : true // == __00
        : Date1 extends '1' | '2'
          ? Date2 extends _AllNumber ? true : false
          : Date1 extends '3'
            ? Date2 extends '0'
              ? true
              : false // > __31
            : false // 4___
      : T extends `${ Month28 }${ infer Date1 }${ infer Date2 }`
        ? Date1 extends '0'
          ? Date2 extends '0' ? false : true // == __00
          : Date1 extends '1'
            ? Date2 extends _AllNumber ? true : false
            : Date1 extends '2'
              ? Date2 extends '9'
                ? false // > 0229
                : true
              : false
        : false

// https://github.com/type-challenges/type-challenges/issues/16935
type M1 = '01' | ' 03' | '05' | '07' | '08' | '10' | '12'
type M2 = '04' | '06' | '09' | '11'
type M3 = '02'

type AddZero<T extends number> =
  `${ T }` extends `${ infer K }${ infer F }`
    ? F extends ''
      ? `0${ K }`
      : `${ T }`
    : never

type D1<T = 28, S extends 0[] = [0], R = never> =
  S['length'] extends T
    ? R | `${ AddZero<S['length']> }`
    : D1<T, [...S, 0], R | `${ AddZero<S['length']> }`>
type D2 = '29' | '30'
type D3 = '31'

type ValidDate<T extends string> =
  T extends `${ M1 }${ D1 | D2 | D3 }`
    ? true
    : T extends `${ M2 }${ D1 | D2 }`
      ? true
      : T extends `${ M3 }${ D1 } `
        ? true
        : false

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<ValidDate<'0102'>, true>>,
  Expect<Equal<ValidDate<'0131'>, true>>,
  Expect<Equal<ValidDate<'1231'>, true>>,
  Expect<Equal<ValidDate<'0229'>, false>>,
  Expect<Equal<ValidDate<'0100'>, false>>,
  Expect<Equal<ValidDate<'0132'>, false>>,
  Expect<Equal<ValidDate<'1301'>, false>>,
  Expect<Equal<ValidDate<'0123'>, true>>,
  Expect<Equal<ValidDate<'01234'>, false>>,
  Expect<Equal<ValidDate<''>, false>>,
]


/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/9155/answer
  > View solutions: https://tsch.js.org/9155/solutions
  > More Challenges: https://tsch.js.org
*/

