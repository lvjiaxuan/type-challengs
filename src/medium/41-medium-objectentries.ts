/*
  2946 - ObjectEntries
  -------
  by jiangshan (@jiangshanmeta) #medium #object

  ### Question

  Implement the type version of ```Object.entries```

  For example

  ```typescript
  interface Model {
    name: string;
    age: number;
    locations: string[] | null;
  }
  type modelEntries = ObjectEntries<Model> // ['name', string] | ['age', number] | ['locations', string[] | null];
  ```

  > View on GitHub: https://tsch.js.org/2946
*/


/* _____________ Your Code Here _____________ */

// Mine
type ObjectEntries<T, RT = Required<T>> = keyof T extends infer P
  ? P extends keyof T
    ? [P, T[P] extends undefined ? undefined : Exclude<T[P], undefined>]
    : never
  : never

// Better Solutions
// type ObjectEntries<T> = {
//   [P in keyof T]-?: [P, T[P] extends undefined ? undefined : Exclude<T[P], undefined>]
// }[keyof T]

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

interface Model {
  name: string
  age: number
  locations: string[] | null
}

type ModelEntries = ['name', string] | ['age', number] | ['locations', string[] | null]

type cases = [
  Expect<Equal<ObjectEntries<Model>, ModelEntries>>,
  Expect<Equal<ObjectEntries<Partial<Model>>, ModelEntries>>,
  Expect<Equal<ObjectEntries<{ key?: undefined }>, ['key', undefined]>>,
  Expect<Equal<ObjectEntries<{ key?: undefined | 1 }>, ['key', 1]>>,
  Expect<Equal<ObjectEntries<{ key: undefined }>, ['key', undefined]>>,
  Expect<Equal<ObjectEntries<{ key: undefined | 1 }>, ['key', 1]>>,
]


/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2946/answer
  > View solutions: https://tsch.js.org/2946/solutions
  > More Challenges: https://tsch.js.org
*/

