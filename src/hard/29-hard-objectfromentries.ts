/*
  2949 - ObjectFromEntries
  -------
  by jiangshan (@jiangshanmeta) #hard #object

  ### Question

  Implement the type version of ```Object.fromEntries```

  For example:

  ```typescript
  interface Model {
    name: string;
    age: number;
    locations: string[] | null;
  }

  type ModelEntries = ['name', string] | ['age', number] | ['locations', string[] | null];

  type result = ObjectFromEntries<ModelEntries> // expected to be Model
  ```

  > View on GitHub: https://tsch.js.org/2949
*/


/* _____________ Your Code Here _____________ */

// mine
// type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never
// type ObjectFromEntries<T> = UnionToIntersection<T extends [ infer P extends PropertyKey, infer V ] ? Record<P, V> : never>

// https://github.com/type-challenges/type-challenges/issues/19704
type ObjectFromEntries<T extends [string | number | symbol, unknown]> = {
  [E in T as E[0]]: E[1]
}

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

interface Model {
  name: string
  age: number
  locations: string[] | null
}

type ModelEntries = ['name', string] | ['age', number] | ['locations', string[] | null]

type cases = [
  Expect<Equal<ObjectFromEntries<ModelEntries>, Model>>,
]


/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2949/answer
  > View solutions: https://tsch.js.org/2949/solutions
  > More Challenges: https://tsch.js.org
*/

