/*
  30575 - BitwiseXOR
  -------
  by jiangshan (@jiangshanmeta) #hard

  ### Question

  Implement ```BitwiseXOR<S1,S2>``` which takes two binary string literal type and returns a binary string that reprents the bitwise XOR of S1 and S2

  For example:

  ```typescript
  BitwiseXOR<'0','1'> // expect '1'
  BitwiseXOR<'1','1'> // expect '0'
  BitwiseXOR<'10','1'>  // expect '11'
  ```

  > View on GitHub: https://tsch.js.org/30575
*/

/* _____________ Your Code Here _____________ */

type Reverse<S extends string> = S extends `${infer First}${infer Rest}` ? `${Reverse<Rest>}${First}` : ''

type GetLastAndRest<S extends string, _S extends string = Reverse<S>>
  = _S extends `${infer Last extends string}${infer Rest extends string}`
    ? { Last: Last, Rest: Reverse<Rest> }
    : { Last: '', Rest: '' }

type XOR<S1 extends string, S2 extends string> = S1 extends S2 ? '0' : '1'

type BitwiseXOR<
  S1 extends string,
  S2 extends string,
  _S1 extends { Last: string, Rest: string } = GetLastAndRest<S1>,
  _S2 extends { Last: string, Rest: string } = GetLastAndRest<S2>
> = `${ _S1['Rest'] }${ _S2['Rest'] }` extends ''
    ? `${XOR<_S1['Last'], _S2['Last']>}`
    : `${BitwiseXOR<_S1['Rest'], _S2['Rest']>}${XOR<_S1['Last'], _S2['Last']>}`

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<BitwiseXOR<'0', '1'>, '1'>>,
  Expect<Equal<BitwiseXOR<'1', '1'>, '0'>>,
  Expect<Equal<BitwiseXOR<'10', '1'>, '11'>>,
  Expect<Equal<BitwiseXOR<'110', '1'>, '111'>>,
  Expect<Equal<BitwiseXOR<'101', '11'>, '110'>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/30575/answer
  > View solutions: https://tsch.js.org/30575/solutions
  > More Challenges: https://tsch.js.org
*/
