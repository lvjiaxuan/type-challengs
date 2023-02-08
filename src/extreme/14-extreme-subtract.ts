/*
  7561 - Subtract
  -------
  by Lo (@LoTwT) #extreme #tuple

  ### Question

  Implement the type Subtraction that is ` - ` in Javascript by using BuildTuple.

  If the minuend is less than the subtrahend, it should be `never`.

  It's a simple version.

  For example

  ```ts
  Subtract<2, 1> // expect to be 1
  Subtract<1, 2> // expect to be never
  ```

  > View on GitHub: https://tsch.js.org/7561
*/

/* _____________ Your Code Here _____________ */

type BuildTuple<N extends number, _A extends 0[] = []> = _A['length'] extends N ? _A : BuildTuple<N, [ ..._A, 0 ]>
// M => minuend, S => subtrahend
type Subtract<
  M extends number,
  S extends number,
  _Counter extends 0[] = [],
  _BM extends 0[] = BuildTuple<M>,
  _BS extends 0[] = BuildTuple<S>,
> = [ ..._Counter, ..._BS ]['length'] extends _BM['length']
  ? _Counter['length']
  : _Counter['length'] extends _BM['length']
    ? never
    : Subtract<M, S, [ ..._Counter, 0 ]>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Subtract<1, 1>, 0>>,
  Expect<Equal<Subtract<2, 1>, 1>>,
  Expect<Equal<Subtract<1, 2>, never>>,
  Expect<Equal<Subtract<5, 2>, 3>>,
  // @ts-expect-error
  Expect<Equal<Subtract<1000, 999>, 1>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/7561/answer
  > View solutions: https://tsch.js.org/7561/solutions
  > More Challenges: https://tsch.js.org
*/
