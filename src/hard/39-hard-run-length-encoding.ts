/* eslint-disable @typescript-eslint/no-namespace */
/*
  14188 - Run-length encoding
  -------
  by Hen Hedymdeith (@alfaproxima) #hard

  ### Question

  Given a `string` sequence of a letters f.e. `AAABCCXXXXXXY`. Return run-length encoded string `3AB2C6XY`.
  Also make a decoder for that string.

  > View on GitHub: https://tsch.js.org/14188
*/


/* _____________ Your Code Here _____________ */

namespace RLE {
  export type Encode<S extends string, _Last extends string = '', _Length extends 0[] = [0], _Result extends string = ''> =
    S extends `${ infer F }${ infer Rest }`
      ? _Last extends ''
        ? RLE.Encode<S, F>
        : F extends _Last
          ? RLE.Encode<Rest, _Last, [ ..._Length, 0 ], `${ _Length['length'] extends 1 ? '' : _Length['length'] }${ F }`>
          : `${ _Result }${ RLE.Encode<S> }`
      : _Result

  export type Decode<S extends string, _CountHelper extends 0[] = [], _Result extends string = ''> =
    S extends `${ infer Length extends number }${ infer Character }${ infer Rest }`
      ? _CountHelper['length'] extends Length
        ? `${ _Result }${ Decode<Rest, []> }`
        : Decode<S, [ ..._CountHelper, 0 ], `${ _Result }${ Character }`>
      : S extends `${ infer SingleCharacter }${ infer Rest }`
        ? Decode<Rest, [], `${ _Result }${ SingleCharacter }`>
        : _Result
}


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  // Raw string -> encoded string
  Expect<Equal<RLE.Encode<'AAABCCXXXXXXY'>, '3AB2C6XY'>>,

  // Encoded string -> decoded string
  Expect<Equal<RLE.Decode<'3AB2C6XY'>, 'AAABCCXXXXXXY'>>,
]


/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/14188/answer
  > View solutions: https://tsch.js.org/14188/solutions
  > More Challenges: https://tsch.js.org
*/

/* eslint-enable @typescript-eslint/no-namespace */
