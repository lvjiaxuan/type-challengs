/*
  29650 - ExtractToObject
  -------
  by Maxim Bazuev (@bazuka5801) #medium #object

  ### Question

  Implement a type that extract prop value to the interface. The type takes the two arguments. The output should be an object with the prop values.
    Prop value is object.

    For example

  ```ts
  type Test = { id: '1', myProp: { foo: '2' }}
  type Result = ExtractToObject<Test, 'myProp'> // expected to be { id: '1', foo: '2' }
  ```

  > View on GitHub: https://tsch.js.org/29650
*/

/* _____________ Your Code Here _____________ */

type O<T> = { [K in keyof T]: T[K] }
type ExtractToObject<T extends object, U extends keyof T> = O<Omit<T, U> & T[U]>


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

interface test1 { id: '1'; myProp: { foo: '2' } }

interface testExpect1 {
  id: '1'
  foo: '2'
}

interface test2 {
  id: '1'
  prop1: { zoo: '2' }
  prop2: { foo: '4' }
}

interface testExpect2 {
  id: '1'
  prop1: { zoo: '2' }
  foo: '4'
}

interface test3 {
  prop1: { zoo: '2'; a: 2; b: 4; c: 7 }
  prop2: { foo: '4'; v: 2; d: 4; g: 7 }
  k: 289
}

interface testExpect3 {
  zoo: '2'
  a: 2
  b: 4
  c: 7
  prop2: { foo: '4'; v: 2; d: 4; g: 7 }
  k: 289
}

interface test4 { id: '1'; myProp: { foo: '2' } }

interface testExpect4 {
  id: '1'
  myProp: { foo: '2' }
}

type cases = [
  Expect<Equal<ExtractToObject<test1, 'myProp'>, testExpect1>>,
  Expect<Equal<ExtractToObject<test2, 'prop2'>, testExpect2>>,
  Expect<Equal<ExtractToObject<test3, 'prop1'>, testExpect3>>,
  // @ts-expect-error
  Expect<Equal<ExtractToObject<test4, 'prop4'>, testExpect4>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/29650/answer
  > View solutions: https://tsch.js.org/29650/solutions
  > More Challenges: https://tsch.js.org
*/
