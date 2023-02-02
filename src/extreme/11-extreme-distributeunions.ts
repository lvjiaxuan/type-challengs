/*
  869 - DistributeUnions
  -------
  by Gabriel Vergnaud (@gvergnaud) #extreme

  ### Question

  Implement a type `Distribute Unions`, that turns a type of data structure containing union types into a union of
  all possible types of permitted data structures that don't contain any union. The data structure can be any
  combination of objects and tuples on any level of nesting.

  For example:

  ```ts
  type T1 = DistributeUnions<[1 | 2, 'a' | 'b']>
  // =>   [1, 'a'] | [2, 'a'] | [1, 'b'] | [2, 'b']

  type T2 = DistributeUnions<{ type: 'a', value: number | string } | { type: 'b', value: boolean }>
  //  =>  | { type 'a', value: number }
  //      | { type 'a', value: string }
  //      | { type 'b', value: boolean }

  type T3 = DistributeUnions<[{ value: 'a' | 'b' },  { x: { y: 2 | 3  } }] | 17>
  //  =>  | [{ value: 'a' },  { x: { y: 2  } }]
  //      | [{ value: 'a' },  { x: { y: 3  } }]
  //      | [{ value: 'b' },  { x: { y: 2  } }]
  //      | [{ value: 'b' },  { x: { y: 3  } }]
  //      | 17
  ```

  For context, this type can be very useful if you want to exclude a case on deep data structures:

  ```ts
  type ExcludeDeep<A, B> = Exclude<DistributeUnions<A>, B>

  type T0 = ExcludeDeep<[{ value: 'a' | 'b' },  { x: { y: 2 | 3  } }] | 17, [{ value: 'a' },  any]>
  //      | [{ value: 'b' },  { x: { y: 3  } }]
  //  =>  | [{ value: 'b' },  { x: { y: 2  } }]
  //      | 17
  ```

  > View on GitHub: https://tsch.js.org/869
*/

/* _____________ Your Code Here _____________ */

// Utils ===================
// type _ToLiteralObject<T> = { [K in keyof T]: T[K] }
// Utils ===================

// Tuple ====================
type _DistributeTuple<T extends unknown[]> =
  T extends [ infer F, ...infer R ]
    ? F extends F
      ? _DistributeNestForTuple<DistributeUnions<F>, _DistributeTuple<R>>
      : never
    : []

type _DistributeNestForTuple<T, Rest extends unknown[]> = T extends T ? [ T, ..._DistributeTuple<Rest>] : never
// Tuple ====================

// Object ===================
type _Never2Unknown<T> = [T] extends [never] ? unknown : T

type _CombineObject<T, _T extends T = T> =
(T extends T ? T & _Never2Unknown<Exclude<_T, Pick<_T, keyof T>>> : never) extends infer I
  ? { [K in keyof I]: I[K] }
  : never

type _DistributeByKey<T, K extends string> = T extends T ? { [_K in K]: T } : never

type _DistributeSingleObject<T extends object, _K extends keyof T = keyof T> =
  _K extends _K
    ? T[_K] extends infer V
      ? V extends object
        ? _DistributeByKey< // For nesting
        _CombineObject<_DistributeSingleObject<V>>,
        _K & string
        >
        : { [__K in _K]: V }
      : never
    : never

// type TestOf_DistributeSingleObject = _DistributeSingleObject<{ x: 'a' | 'b'; y: 'c' | 'd' }>
// res: { x: 'a' } | { x: 'b' } | { y: 'c' } | { y: 'd' }

// type TestOf_CombineObject = _CombineObject<{ x: 'a' } | { x: 'b' } | { y: 'c' } | { y: 'd' }>
// res: { x: 'a', y: 'c' } | { x: 'a', y: 'd' } | { x: 'b', y: 'c' } | { x: 'b', y: 'd' }

// type TestOf_CombineObject = _CombineObject<{ a: 1 } | { b: 2 } | { b: 3 } | { b: 4 }>
// res: { a: 1, b: 2 } | { a: 1, b: 3 } | { b: 2, a: 1 } | { b: 3, a: 1 }

// type TestOf_DistributeByKey = _DistributeByKey<{ a:1, b: 2 } | { a: 1, b: 3 }, 'x'>
// res: {
//   x: {
//     a: 1;
//     b: 2;
//   };
// } | {
//   x: {
//     a: 1;
//     b: 3;
//   };
// }

type _DistributeObject<T extends object> = T extends T ? _CombineObject<_DistributeSingleObject<T>> : never
// Object ===================


// Main ====================
type DistributeUnions<T> = T extends unknown[]
  ? _DistributeTuple<T>
  : T extends object
    ? _DistributeObject<T>
    : T
// Main ====================


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  // Already distributed unions should stay the same:
  Expect<Equal<DistributeUnions<1>, 1>>,
  Expect<Equal<DistributeUnions<string>, string>>,
  Expect<Equal<DistributeUnions<1 | 2>, 1 | 2>>,
  Expect<Equal<DistributeUnions<'b' | { type: 'a' } | [1]>, 'b' | { type: 'a' } | [1]>>,
  // tuples:
  Expect<Equal<DistributeUnions<[1 | 2, 3]>, [1, 3] | [2, 3]>>,
  Expect<Equal<DistributeUnions<[1 | 2, 'a' | 'b']>, [1, 'a'] | [1, 'b'] | [2, 'a'] | [2, 'b']>>,
  Expect<
  Equal<
  DistributeUnions<[1 | 2, 'a' | 'b', false | true]>,
  | [1, 'a', false]
  | [1, 'a', true]
  | [1, 'b', false]
  | [1, 'b', true]
  | [2, 'a', false]
  | [2, 'a', true]
  | [2, 'b', false]
  | [2, 'b', true]
  >
  >,
  // objects
  Expect<
  Equal<
  DistributeUnions<{ x: 'a' | 'b'; y: 'c' | 'd' }>,
  { x: 'a'; y: 'c' } | { x: 'a'; y: 'd' } | { x: 'b'; y: 'c' } | { x: 'b'; y: 'd' }
  >
  >,
  Expect<
  Equal<
  DistributeUnions<{ type: 'a'; value: number | string } | { type: 'b'; value: boolean }>,
  | { type: 'a'; value: string }
  | { type: 'a'; value: number }
  | { type: 'b'; value: false }
  | { type: 'b'; value: true }
  >
  >,
  Expect<
  Equal<
  DistributeUnions<
  | {
    type: 'a'
    option: { kind: 'none' } | { kind: 'some'; value: 'x' | 'y' }
  }
  | { type: 'b'; msg: string }
  >,
  | { type: 'b'; msg: string }
  | { type: 'a'; option: { kind: 'none' } }
  | { type: 'a'; option: { kind: 'some'; value: 'x' } }
  | { type: 'a'; option: { kind: 'some'; value: 'y' } }
  >
  >,
  Expect<
  Equal<
  DistributeUnions<{ option: { z: 'a' | 'b', x: { y: 1 | 2 | 3 } } }>,
  | { option: { z: 'a', x: { y: 1 } } }
  | { option: { z: 'a', x: { y: 2 } } }
  | { option: { z: 'a', x: { y: 3 } } }
  | { option: { z: 'b', x: { y: 1 } } }
  | { option: { z: 'b', x: { y: 2 } } }
  | { option: { z: 'b', x: { y: 3 } } }
  >
  >,
  // mixed structures:
  Expect<
  Equal<
  DistributeUnions<[false | true, { value: 'a' | 'b' }, { x: { y: 2 | 3 } }]>,
  | [false, { value: 'a' }, { x: { y: 2 } }]
  | [false, { value: 'a' }, { x: { y: 3 } }]
  | [false, { value: 'b' }, { x: { y: 2 } }]
  | [false, { value: 'b' }, { x: { y: 3 } }]
  | [true, { value: 'a' }, { x: { y: 2 } }]
  | [true, { value: 'a' }, { x: { y: 3 } }]
  | [true, { value: 'b' }, { x: { y: 2 } }]
  | [true, { value: 'b' }, { x: { y: 3 } }]
  >
  >,
  // Expect<
  // Equal<
  // DistributeUnions<17 | [10 | { value: 'a' | 'b' }, { x: { y: 2 | 3 } }]>,
  // | 17
  // | [10, { x: { y: 2 } }]
  // | [10, { x: { y: 3 } }]
  // | [{ value: 'a' }, { x: { y: 2 } }]
  // | [{ value: 'a' }, { x: { y: 3 } }]
  // | [{ value: 'b' }, { x: { y: 2 } }]
  // | [{ value: 'b' }, { x: { y: 3 } }]
  // >
  // >,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/869/answer
  > View solutions: https://tsch.js.org/869/solutions
  > More Challenges: https://tsch.js.org
*/
