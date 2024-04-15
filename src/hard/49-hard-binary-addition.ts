/*
  32532 - Binary Addition
  -------
  by Finley Garton (@finleygn) #hard #recursion #array

  ### Question

  Implement `BinaryAdd` to add two binary numbers together. The numbers should not be translated out of binary at any point.

  Note the two inputs will always have the same length.

  > View on GitHub: https://tsch.js.org/32532
*/

/* _____________ Your Code Here _____________ */

type Bit = 1 | 0

type Single<A extends Bit, B extends Bit, Carry extends boolean = false> =
  `${A}${B}` extends `11`
    ?  { carry: true, tail: Carry extends true ? 1 : 0 }
    : `${A}${B}` extends `10` | `01`
      ? { carry: Carry, tail: Carry extends true ? 0 : 1 }
      : { carry: false, tail: Carry extends true ? 1 : 0 }

type BinaryAdd<A extends Bit[], B extends Bit[], Carry extends boolean = false, Res extends Bit[] = []> =
  A extends [ ...infer RestA extends Bit[], infer FA extends Bit ]
    ? B extends [ ...infer RestB extends Bit[], infer FB extends Bit ]
      ? Single<FA, FB, Carry> extends infer F
        ? F extends { carry: boolean, tail: Bit }
          ? BinaryAdd<RestA, RestB, F['carry'], [F['tail'], ...Res]>
          : never
        :never
      : never
    : [ ...(Carry extends true ? [1] : []), ...Res ]

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<
    BinaryAdd<[1], [1]>,
    [1, 0]
  >>,
  Expect<Equal<
    BinaryAdd<[0], [1]>,
    [1]
  >>,
  Expect<Equal<
    BinaryAdd<[1, 1, 0], [0, 0, 1]>,
    [1, 1, 1]
  >>,
  Expect<Equal<
    BinaryAdd<
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]>,
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0]
  >>,
  Expect<Equal<
    BinaryAdd<
      [1, 0, 1, 0, 1, 1, 1, 0],
      [1, 0, 0, 0, 1, 1, 0, 0]>,
    [1, 0, 0, 1, 1, 1, 0, 1, 0]
  >>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/32532/answer
  > View solutions: https://tsch.js.org/32532/solutions
  > More Challenges: https://tsch.js.org
*/
