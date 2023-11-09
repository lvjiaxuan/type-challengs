/*
  30430 - Tower of hanoi
  -------
  by null (@aswinsvijay) #medium #array

  ### Question

  Simulate the solution for the Tower of Hanoi puzzle. Your type should take the number of rings as input an return an array of steps to move the rings from tower A to tower B using tower C as additional. Each entry in the array should be a pair of strings `[From, To]` which denotes ring being moved `From -> To`.

  [Wikipedia](https://en.wikipedia.org/wiki/Tower_of_Hanoi)
  [GeeksForGeeks](https://www.geeksforgeeks.org/c-program-for-tower-of-hanoi)

  > View on GitHub: https://tsch.js.org/30430
*/

/* _____________ Your Code Here _____________ */

// 2^n - 1
// type Times<N extends number, Counter extends 0[] = [], Res extends 0[] = [0]> =
//   [0, ...Counter]['length'] extends N
//     ? Res['length']
//     : Times<N, [0, ...Counter], [...Res, ...Res, 0]>


type Hanoi<N extends number, From = 'A', To = 'B', Intermediate = 'C', Counter extends 0[] = []> =
  Counter['length'] extends N
    ? []
    : [...Hanoi<N, From, Intermediate, To, [ ...Counter, 0 ]>, [From, To], ...Hanoi<N, Intermediate, To, From, [ ...Counter, 0]>]

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type Tests = [
  Expect<Equal<Hanoi<0>, []>>,
  Expect<Equal<Hanoi<1>, [['A', 'B']]>>,
  Expect<Equal<Hanoi<2>, [['A', 'C'], ['A', 'B'], ['C', 'B']]>>,

  Expect<Equal<Hanoi<3>, [
    ['A', 'B'], ['A', 'C'], ['B', 'C'],
    ['A', 'B'],
    ['C', 'A'], ['C', 'B'], ['A', 'B'],
  ]>>, // 3 a-b

  Expect<Equal<Hanoi<4>, [
    ['A', 'C'], ['A', 'B'], ['C', 'B'],
    ['A', 'C'],

    ['B', 'A'], ['B', 'C'], ['A', 'C'],
    ['A', 'B'],

    ['C', 'B'], ['C', 'A'], ['B', 'A'],
    ['C', 'B'],

    ['A', 'C'], ['A', 'B'], ['C', 'B'],
  ]>>,

  Expect<Equal<Hanoi<5>, [
    ['A', 'B'], ['A', 'C'], ['B', 'C'],
    ['A', 'B'],

    ['C', 'A'], ['C', 'B'], ['A', 'B'],
    ['A', 'C'],

    ['B', 'C'], ['B', 'A'], ['C', 'A'],
    ['B', 'C'],

    ['A', 'B'], ['A', 'C'], ['B', 'C'],
    ['A', 'B'],

    ['C', 'A'], ['C', 'B'], ['A', 'B'],
    ['C', 'A'],

    ['B', 'C'], ['B', 'A'], ['C', 'A'],
    ['C', 'B'],

    ['A', 'B'], ['A', 'C'], ['B', 'C'],
    ['A', 'B'],

    ['C', 'A'], ['C', 'B'], ['A', 'B'],
  ]>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/30430/answer
  > View solutions: https://tsch.js.org/30430/solutions
  > More Challenges: https://tsch.js.org
*/
