/*
  21104 - FindAll
  -------
  by tunamagur0 (@tunamagur0) #medium #template-literal #string

  ### Question

  Given a pattern string P and a text string T, implement the type `FindAll<T, P>` that returns an Array that contains all indices (0-indexed) from T where P matches.

  > View on GitHub: https://tsch.js.org/21104
*/

/* _____________ Your Code Here _____________ */

type _CalcStrLen<T extends string, Res extends 0[] = []> =
  T extends `${ string }${ infer Rest extends string }`
    ? _CalcStrLen<Rest, [ ...Res, 0 ]>
    : Res

type FindAll<T extends string, P extends string, Append extends string = ''> =
  P extends ''
    ? []
    : T extends `${ infer Fore extends string }${ P }${ infer Rest extends string }`
      ? [
          _CalcStrLen<`${ Append }${ Fore }`>['length'],
          ...(
            Fore extends '' // Specified for `AA...`
              ? T extends `${ infer A extends string }${ infer Rest2 extends string }`
                ? FindAll<Rest2, P, `${ A }${ Append }`>
                : never
              : FindAll<Rest, P, `${ Fore }${ P }${ Append }`>
          )]
      : []

type xxx = FindAll<'Collection of TypeScript type challenges', 'Type'>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<FindAll<'Collection of TypeScript type challenges', 'Type'>, [14]>>,
  Expect<Equal<FindAll<'Collection of TypeScript type challenges', 'pe'>, [16, 27]>>,
  Expect<Equal<FindAll<'Collection of TypeScript type challenges', ''>, []>>,
  Expect<Equal<FindAll<'', 'Type'>, []>>,
  Expect<Equal<FindAll<'', ''>, []>>,
  Expect<Equal<FindAll<'AAAA', 'A'>, [0, 1, 2, 3]>>,
  Expect<Equal<FindAll<'AAAA', 'AA'>, [0, 1, 2]>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/21104/answer
  > View solutions: https://tsch.js.org/21104/solutions
  > More Challenges: https://tsch.js.org
*/
