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

// Mine version 1

type Day31 = '01' | '03' | '05' | '07' | '08' | '10' | '12'
type Day30 = '04' | '06' | '09' | '11'
type Day28 = '02'

type _AllNumber = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '0'

type ValidDate<T extends string> =
  T extends `${ Day31 }${ infer Day1 }${ infer Day2 }`
    ? Day1 extends '0'
      ? Day2 extends '0' ? false : true // == __00
      : Day1 extends '1' | '2'
        ? Day2 extends _AllNumber ? true : false
        : Day1 extends '3'
          ? Day2 extends '0' | '1'
            ? true
            : false // > __32
          : false // > 4___
    : T extends `${ Day30 }${ infer Day1 }${ infer Day2 }`
      ? Day1 extends '0'
        ? Day2 extends '0' ? false : true // == __00
        : Day1 extends '1' | '2'
          ? Day2 extends _AllNumber ? true : false
          : Day1 extends '3'
            ? Day2 extends '0'
              ? true
              : false // > __31
            : false // 4___
      : T extends `${ Day28 }${ infer Day1 }${ infer Day2 }`
        ? Day1 extends '0'
          ? Day2 extends '0' ? false : true // == __00
          : Day1 extends '1'
            ? Day2 extends _AllNumber ? true : false
            : Day1 extends '2'
              ? Day2 extends '9'
                ? false // > 0229
                : true
              : false
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

