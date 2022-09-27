// bug：1. 联合类型返回 never；2. never 类型返回 unknown
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never
type test1 = UnionToIntersection<any>
type test2 = UnionToIntersection<unknown>
type test3 = UnionToIntersection<never> // unknown
type test4 = UnionToIntersection<void>
type test5 = UnionToIntersection<null>
type test6 = UnionToIntersection<undefined>
type test7 = UnionToIntersection<1 | 2> // never

// bug：互相 extends 并不能 cover 所有场景
type NOT_EQUAL_INTERNAL<VALUE, EXPECTED> = UnionToIntersection<VALUE> extends UnionToIntersection<EXPECTED>
  ? UnionToIntersection<EXPECTED> extends UnionToIntersection<VALUE>
    ? false
    : true
  : true

type FAIL_CASES_OF_NOT_EQUAL_INTERNAL = [
  NOT_EQUAL_INTERNAL<any, unknown>,
  NOT_EQUAL_INTERNAL<any, never>,
  NOT_EQUAL_INTERNAL<any, void>, // boolean ?
  NOT_EQUAL_INTERNAL<unknown, never>,
  // NOT_EQUAL_INTERNAL<unknown, void>, // true 这里对了
  // NOT_EQUAL_INTERNAL<never, void>, // true 这里对了
  NOT_EQUAL_INTERNAL<{ readonly a: string }, { a: string }>,
  // ......
]

// type NotEqual<VALUE, EXPECTED> = NOT_EQUAL_INTERNAL<VALUE, EXPECTED> extends true ? true : false // same
type NotEqual<VALUE, EXPECTED> = true extends NOT_EQUAL_INTERNAL<VALUE, EXPECTED> ? true : false // same

// Old Equal.
type Equal<VALUE extends EXPECTED, EXPECTED> = NotEqual<VALUE, EXPECTED> extends false ? true : false

type cases1 = [
  Equal<1, number>, // Base.
  // @ts-expect-error
  Equal<number, 1>,
  Equal<1, 1>,
  Equal<{ readonly a: string }, { a: string }>, // `true` is not expected
  Equal<{ a: string }, { readonly a: string }>, // `true` is not expected
  Equal<any, unknown>, // `true` is not expected.
  Equal<never, any>, // `true` is not expected.
  // @ts-expect-error
  Equal<any, never>, // `true` is not expected.
  // @ts-expect-error
  Equal<unknown, never>, // `true` is not expected.
  Equal<never, unknown>, // `true` is not expected.
  // @ts-expect-error
  Equal<1 | 2, 1 | 3>, // `true` is not expected.
  // ......
]

// 综下，单向和双向 extends 方式不能枚举所有场景
type cases = [
  '1',
  any extends any ? true : false, // true
  any extends unknown ? true : false, // true
  any extends never ? true : false, // boolean
  any extends void ? true : false, // boolean
  any extends null ? true : false, // boolean
  any extends undefined ? true : false, // boolean
  '2',
  unknown extends any ? true : false, // true
  unknown extends unknown ? true : false, // true
  unknown extends never ? true : false, // false
  unknown extends void ? true : false, // false
  unknown extends null ? true : false, // false
  unknown extends undefined ? true : false, // false
  '3',
  never extends any ? true : false, // true
  never extends unknown ? true : false, // true
  never extends never ? true : false, // true
  never extends void ? true : false, // true
  never extends null ? true : false, // true
  never extends undefined ? true : false, // true
  '4',
  void extends any ? true : false, // true
  void extends unknown ? true : false, // true
  void extends never ? true : false, // false
  void extends void ? true : false, // true
  void extends null ? true : false, // false
  void extends undefined ? true : false, // false
  '5',
  null extends any ? true : false, // true
  null extends unknown ? true : false, // true
  null extends never ? true : false, // false
  null extends void ? true : false, // false
  null extends null ? true : false, // true
  null extends undefined ? true : false, // false
  '6',
  undefined extends any ? true : false, // true
  undefined extends unknown ? true : false, // true
  undefined extends never ? true : false, // false
  undefined extends void ? true : false, // true
  undefined extends null ? true : false, // false
  undefined extends undefined ? true : false, // true
  '7',
  { readonly a: string } extends { a: string } ? true : false, // true
  { a: string } extends { readonly a: string } ? true : false, // true
]

// Final Equal.
/**
 * 这个三元表达式的条件
 * 1. 前者必须是带临时范形、返回值是临时范形的函数
 * 2. 后者就是要比较的类型
 */
type Equal2<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? true : false

type cases2 = [
  Equal2<1, number>,
  Equal2<number, 1>,
  Equal2<1, 1>,
  Equal2<{ readonly a: string }, { a: string }>,
  Equal2<{ a: string }, { readonly a: string }>,
  Equal2<any, unknown>,
  Equal2<never, any>,
  Equal2<any, never>,
  Equal2<unknown, never>,
  Equal2<never, unknown>,
  Equal2<1 | 2, 1 | 3>,
]
