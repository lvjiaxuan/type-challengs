/*
  114 - CamelCase
  -------
  by Anthony Fu (@antfu) #hard #template-literal

  ### Question

  Implement `CamelCase<T>` which converts `snake_case` string to `camelCase`.

  For example

  ```ts
  type camelCase1 = CamelCase<'hello_world_with_types'> // expected to be 'helloWorldWithTypes'
  type camelCase2 = CamelCase<'HELLO_WORLD_WITH_TYPES'> // expected to be same as previous one
  ```

  > View on GitHub: https://tsch.js.org/114
*/


/* _____________ Your Code Here _____________ */

type StringToUnion<T extends string, Upper = false> =
  T extends `${ infer F }${ infer R }`
    ? (Upper extends true ? Uppercase<F> : Lowercase<F>) | StringToUnion<R, Upper>
    : never
type LowerLetterUnion = StringToUnion<'qwertyuioplkjhgfdsazxcvbnm'>
// type UpperLetterUnion = StringToUnion<'qwertyuioplkjhgfdsazxcvbnm', true>

// Mine
type CamelCase<
  S extends string,
  Result extends string = '',
  UpperFlag extends boolean = true,
  FirstLetter extends boolean = true,
> =
  S extends `${ infer F }${ infer R }`
    ? Lowercase<F> extends LowerLetterUnion
      ? FirstLetter extends true
        ? CamelCase<R, `${ Lowercase<F> }`, false, false>
        : CamelCase<R, `${ Result }${ UpperFlag extends true ? Uppercase<F> : Lowercase<F> }`, false, false>
      : CamelCase<R, `${ Result }${ F extends '_' ? '' : F }`, true, false>
    : Result

// 参考 https://github.com/type-challenges/type-challenges/issues/19025 进行优化
type CamelCase2<
  S extends string,
  Result extends string = '',
> =
  Lowercase<S> extends `${ infer BeforeWordLetter }${ infer BeforeWordRest }_${ infer AfterWordLetter }${ infer Rest }`
    ? CamelCase2<Rest, `${ Result }${ BeforeWordLetter }${ BeforeWordRest }${ Uppercase<AfterWordLetter> }`>
    : `${ Result }${ Lowercase<S> }`

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<CamelCase<'foobar'>, 'foobar'>>,
  Expect<Equal<CamelCase<'FOOBAR'>, 'foobar'>>,
  Expect<Equal<CamelCase<'foo_bar'>, 'fooBar'>>,
  Expect<Equal<CamelCase<'foo_bar_hello_world'>, 'fooBarHelloWorld'>>,
  Expect<Equal<CamelCase<'HELLO_WORLD_WITH_TYPES'>, 'helloWorldWithTypes'>>,
  Expect<Equal<CamelCase<'-'>, '-'>>,
  Expect<Equal<CamelCase<''>, ''>>,
  Expect<Equal<CamelCase<'😎'>, '😎'>>,
]

type cases2 = [
  Expect<Equal<CamelCase2<'foobar'>, 'foobar'>>,
  Expect<Equal<CamelCase2<'FOOBAR'>, 'foobar'>>,
  Expect<Equal<CamelCase2<'foo_bar'>, 'fooBar'>>,
  Expect<Equal<CamelCase2<'foo_bar_hello_world'>, 'fooBarHelloWorld'>>,
  Expect<Equal<CamelCase2<'HELLO_WORLD_WITH_TYPES'>, 'helloWorldWithTypes'>>,
  Expect<Equal<CamelCase2<'-'>, '-'>>,
  Expect<Equal<CamelCase2<''>, ''>>,
  Expect<Equal<CamelCase2<'😎'>, '😎'>>,
]


/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/114/answer
  > View solutions: https://tsch.js.org/114/solutions
  > More Challenges: https://tsch.js.org
*/

