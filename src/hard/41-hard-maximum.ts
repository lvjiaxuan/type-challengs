/*
  9384 - Maximum
  -------
  by ch3cknull (@ch3cknull) #hard #array

  ### Question

  ### Description
  Implements a type `Maximum`,  get array like type `T`, and return max value in `T`

  `0 <= T[number] < 1000`, so **nagative number not considered**.

  If `T` is a empty array `[]`, just reutrn `never`

  ```ts
  Maximum<[]> // never
  Maximum<[0, 2, 1]> // 2
  Maximum<[1, 20, 200, 150]> // 200
  ```
  ### Advanced
  Can you implement type `Minimum` inspired by `Maximum`?

  > View on GitHub: https://tsch.js.org/9384
*/

/* _____________ Your Code Here _____________ */

// https://github.com/type-challenges/type-challenges/issues/21115
type GreaterThan<A, B, I extends any[] = []> =
  I['length'] extends A
    ? false
    : I['length'] extends B
      ? true
      : GreaterThan<A, B, [...I, any]>

type Maximum<Arr extends unknown[], M extends Arr[number] = Arr[0]> = Arr extends []
  ? [M] extends [undefined]
    ? never
    : M
  : Arr extends [ infer H, ...infer T ]
    ? Maximum<T, GreaterThan<H, M> extends true ? H : M>
    : never

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Maximum<[]>, never>>,
  Expect<Equal<Maximum<[0, 2, 1]>, 2>>,
  Expect<Equal<Maximum<[1, 20, 200, 150]>, 200>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/9384/answer
  > View solutions: https://tsch.js.org/9384/solutions
  > More Challenges: https://tsch.js.org
*/
