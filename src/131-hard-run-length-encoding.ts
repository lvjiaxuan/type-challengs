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

type _Str2Num<S extends string> = S extends `${ infer N extends number }` ? N : never
type _Num2Arr<N extends number, _Result extends 0[] = []> = _Result['length'] extends N ? _Result : _Num2Arr<N, [ ..._Result, 0 ]>

namespace RLE {
  export type Encode<S extends string, _Last extends string = '', _Length extends 0[] = [0], _Result extends string = ''> =
    S extends `${ infer F }${ infer Rest }`
      ? _Last extends ''
        ? RLE.Encode<S, F>
        : F extends _Last
          ? RLE.Encode<Rest, _Last, [ ..._Length, 0 ], `${ _Length['length'] extends 1 ? '' : _Length['length'] }${ F }`>
          : `${ _Result }${ RLE.Encode<S> }`
      : _Result

  export type Decode<S extends string> = any
}

type xx = RLE.Decode<'3AB2C6XY'>

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

