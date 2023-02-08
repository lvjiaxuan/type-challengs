/* eslint-disable @typescript-eslint/ban-types */
/*
  6228 - JSON Parser
  -------
  by Hydration (@hydrati) #extreme #template-literal #json

  ### Question

  You're required to implement a type-level partly parser to parse JSON string into a object literal type.

  Requirements:
   - `Numbers` and `Unicode escape (\uxxxx)` in JSON can be ignored. You needn't to parse them.

  > View on GitHub: https://tsch.js.org/6228
*/

/* _____________ Your Code Here _____________ */

// Helper =================================
type IgnoreChar = ' ' | '\n' | '\r' | '\b' | '\f'

type ExtractPattern<
  T extends string,
  _LeftChar extends string = '[',
  _RightChar extends string = ']',
  _LeftCharCounters extends 0[] = [],
  _RightCharCounters extends 0[] = [],
  _Result extends string = '',
> = T extends `${ infer F }${ infer Rest }`
  ? F extends _LeftChar
    ? ExtractPattern<Rest, _LeftChar, _RightChar, [ ..._LeftCharCounters, 0 ], _RightCharCounters, `${ _Result }${ F }`>
    : F extends _RightChar
      ? ExtractPattern<Rest, _LeftChar, _RightChar, _LeftCharCounters, [ ..._RightCharCounters, 0 ], `${ _Result }${ F }`>
      : _LeftCharCounters['length'] extends _RightCharCounters['length']
        ? _Result
        : ExtractPattern<Rest, _LeftChar, _RightChar, _LeftCharCounters, _RightCharCounters, `${ _Result }${ F }`>
  : _Result

type TrimBothEnds<T extends string, Chars extends string = IgnoreChar> =
  T extends `${ Chars }${ infer Rest }`
    ? TrimBothEnds<Rest, Chars>
    : T extends `${ infer Rest }${ Chars }`
      ? TrimBothEnds<Rest, Chars>
      : T

type ResolveSpecialChar<T extends string, _Map extends Record<'r' | 'n' | 'b' | 'f', string> = { n: '\n', r: '\r', b: '\b', f: '\f', }> =
  T extends `${ infer A }\\${ infer I extends 'r' | 'n' | 'b' | 'f' }${ infer B }`
    ? ResolveSpecialChar<`${ A }${ _Map[I] }${ B }`> : T
// Helper =================================

// ParseObject ============================
type ParseObject<T extends string, _Key extends string = '', _Result extends Record<PropertyKey, unknown> = {}> =
  T extends `${ infer F }${ infer Rest }`
    ? F extends IgnoreChar | ','
      ? ParseObject<Rest, _Key, _Result>
      : F extends '"'
        ? _Key extends ''
          ? Rest extends `${ infer Key }":${ infer Rest2 }`
            ? ParseObject<Rest2, ResolveSpecialChar<Key>, _Result> // extract key
            : never
          : Rest extends `${ infer StringValue }"${ infer Rest2 }`
            ? ParseObject<Rest2, '', _Result & Record<_Key, StringValue>> // extract string value
            : Rest
        : T extends `false${ infer Rest2 }`
          ? ParseObject<Rest2, '', _Result & Record<_Key, false>>
          : T extends `true${ infer Rest2 }`
            ? ParseObject<Rest2, '', _Result & Record<_Key, true>>
            : T extends `null${ infer Rest2 }`
              ? ParseObject<Rest2, '', _Result & Record<_Key, null>>
              : F extends '['
                ? ExtractPattern<T> extends infer I
                  ? T extends `${ I & string }${ infer Rest2 }`
                    ? ParseObject<Rest2, '', _Result & Record<_Key, Parse<I & string>>>
                    : never
                  : never
                : F extends '{'
                  ? ExtractPattern<T, '{', '}'> extends infer I
                    ? T extends `${ I & string }${ infer Rest2 }`
                      ? ParseObject<Rest2, '', _Result & Record<_Key, Parse<I & string>>>
                      : never
                    : never
                  : F extends `${ number }`
                    ? never
                    : _Result
    : { [K in keyof _Result]: _Result[K] }
// ParseObject ============================

// ParseArray =============================
type ParseArray<T extends string, _Result extends unknown[] = []> =
  T extends `${ infer F }${ infer Rest }`
    ? F extends IgnoreChar | ','
      ? ParseArray<Rest, _Result>
      : F extends '['
        ? ExtractPattern<T> extends infer I
          ? T extends `${ I & string }${ infer Rest2 }`
            ? ParseArray<Rest2, [ ..._Result, Parse<I & string> ]>
            : never
          : never
        : F extends '{'
          ? ExtractPattern<T, '{', '}'> extends infer I
            ? T extends `${ I & string }${ infer Rest2 }`
              ? ParseArray<Rest2, [ ..._Result, Parse<I & string> ]>
              : never
            : never
          : F extends '"'
            ? Rest extends `${ infer StringValue }"${ infer Rest2 }`
              ? ParseArray<Rest2, [ ..._Result, StringValue]>
              : never
            : T extends `false${ infer Rest2 }`
              ? ParseArray<Rest2, [ ..._Result, false]>
              : T extends `true${ infer Rest2 }`
                ? ParseArray<Rest2, [ ..._Result, true]>
                : T extends `null${ infer Rest2 }`
                  ? ParseArray<Rest2, [ ..._Result, null]>
                  : F extends `${ number }`
                    ? never
                    : _Result
    : _Result
// ParseArray =============================


type Parse<T extends string, _T extends string = TrimBothEnds<T>> =
  _T extends `{${ infer I }}`
    ? ParseObject<I>
    : _T extends `[${ infer I }]`
      ? ParseArray<I>
      : T extends `${ infer I extends boolean }`
        ? I
        : T

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<(
    Parse<`
      {
        "a": "b",
        "b": false,
        "c": [true, false, "hello", {
          "a": "b",
          "b": false
        }],
        "nil": null
      }
    `>
  ), (
    {
      nil: null
      c: [true, false, 'hello', {
        a: 'b'
        b: false
      }]
      b: false
      a: 'b'
    }

  )>>,
  Expect<Equal<Parse<'{}'>, {}>>,

  Expect<Equal<Parse<'[]'>, []>>,

  Expect<Equal<Parse<'[1]'>, never>>,

  Expect<Equal<Parse<'true'>, true>>,

  Expect<Equal<
  Parse<'["Hello", true, false, null]'>,
  ['Hello', true, false, null]
  >>,

  Expect<Equal<
  (
    Parse<`
      {
        "hello\\r\\n\\b\\f": "world"
      }`>
  ), (
    {
      'hello\r\n\b\f': 'world'
    }
  )
  >>,

  Expect<Equal<Parse<'{ 1: "world" }'>, never>>,

  Expect<Equal<Parse<`{ "hello

  world": 123 }`>, never>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/6228/answer
  > View solutions: https://tsch.js.org/6228/solutions
  > More Challenges: https://tsch.js.org
*/
/* eslint-enable @typescript-eslint/ban-types */
