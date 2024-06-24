/*
  31797 - Sudoku
  -------
  by Bruno Ladeia (@BrunoLad) #hard #union #array #tuple #game

  ### Question

  Write a type that verifies [Sudoku](https://en.wikipedia.org/wiki/Sudoku) game is solved. This is based off a [challenge](https://typehero.dev/challenge/day-22) from Advent of Typescript 2023 by TypeHero (Day 22). So kudos for them for thinking up such a neat challenge!

  > View on GitHub: https://tsch.js.org/31797
*/

/* _____________ Your Code Here _____________ */

// 游戏一般由9个3×3个的九宫格组成。
// 每一直行和每一横列的数字均须包含1～9，不能缺少，也不能重复。 
// 每一宫(粗黑线围起来的区域，通常是3x3 的九宫格)的数字均须包含1～9，不能缺少，也不能重复。
// 完成需同时满足这三个条件。

type BaseType = [
  [ Digits[],Digits[],Digits[] ],
  [ Digits[],Digits[],Digits[] ],
  [ Digits[],Digits[],Digits[] ],
  [ Digits[],Digits[],Digits[] ],
  [ Digits[],Digits[],Digits[] ],
  [ Digits[],Digits[],Digits[] ],
  [ Digits[],Digits[],Digits[] ],
  [ Digits[],Digits[],Digits[] ],
  [ Digits[],Digits[],Digits[] ],
]

type VerRows<T> = T extends [ infer F, ...infer R ]
  ? F extends [ [ infer A, infer B, infer C ], [ infer D, infer E, infer F ], [ infer G, infer H, infer I ] ]
    ? [A, B, C, D, E, F, G, H, I][number] extends Digits
      ? VerRows<R>
      : false
    : never
  : true

type VerCols<T, _R extends unknown[] = []> = T extends [ infer F, ...infer R ]
  ? F extends [ [ infer A extends _R[0], infer B extends _R[1], infer C extends _R[2] ],
                [ infer D extends _R[3], infer E extends _R[4], infer F extends _R[5] ],
                [ infer G extends _R[6], infer H extends _R[7], infer I extends _R[8] ]
              ]
    ? VerCols<R, [ _R[0] | A, _R[1] | B, _R[2] | C, _R[3] | D, _R[4] | E, _R[5] | F, _R[6] | G, _R[7] | H, _R[8] | I ]>
    : false
  : true

// type VerGrids<T> = T extends


type Digits = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type SudokuSolved = any

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type test_sudoku_1_actual = SudokuSolved<[
  [[1, 2, 3], [5, 6, 7], [4, 8, 9]],
  [[4, 8, 9], [1, 2, 3], [5, 6, 7]],
  [[5, 6, 7], [4, 8, 9], [1, 2, 3]],
  [[3, 1, 2], [8, 5, 6], [9, 7, 4]],
  [[7, 9, 4], [3, 1, 2], [8, 5, 6]],
  [[8, 5, 6], [7, 9, 4], [3, 1, 2]],
  [[2, 3, 1], [6, 4, 5], [7, 9, 8]],
  [[9, 7, 8], [2, 3, 1], [6, 4, 5]],
  [[6, 4, 5], [9, 7, 8], [2, 3, 1]],
]>

type test_sudoku_2_actual = SudokuSolved<[
  [[7, 1, 5], [4, 3, 8], [6, 9, 2]],
  [[4, 8, 6], [9, 2, 5], [7, 1, 3]],
  [[9, 3, 2], [1, 6, 7], [4, 8, 5]],
  [[6, 5, 7], [2, 8, 9], [1, 3, 4]],
  [[3, 2, 8], [7, 4, 1], [9, 5, 6]],
  [[1, 4, 9], [3, 5, 6], [8, 2, 7]],
  [[5, 9, 1], [6, 7, 3], [2, 4, 8]],
  [[2, 6, 3], [8, 9, 4], [5, 7, 1]],
  [[8, 7, 4], [5, 1, 2], [3, 6, 9]],
]>

type test_sudoku_3_actual = SudokuSolved<[
  [[3, 9, 2], [7, 5, 1], [8, 6, 4]],
  [[4, 8, 1], [6, 2, 9], [5, 7, 3]],
  [[5, 7, 6], [8, 4, 3], [2, 9, 1]],
  [[7, 2, 9], [3, 1, 8], [4, 5, 6]],
  [[6, 5, 8], [2, 7, 4], [3, 1, 9]],
  [[1, 4, 3], [5, 9, 6], [7, 2, 8]],
  [[2, 1, 4], [9, 3, 5], [6, 8, 7]],
  [[9, 6, 5], [4, 8, 7], [1, 3, 2]],
  [[8, 3, 7], [1, 6, 2], [9, 4, 5]],
]>

type test_sudoku_4_actual = SudokuSolved<[
  [[1, 2, 3], [5, 6, 7], [4, 8, 9]],
  [[4, 8, 9], [1, 2, 3], [5, 6, 7]],
  [[5, 6, 7], [4, 8, 9], [1, 2, 3]],
  [[3, 1, 2], [8, 5, 6], [9, 7, 4]],
  [[7, 9, 4], [3, 1, 2], [8, 5, 6]],
  [[8, 5, 6], [7, 9, 4], [3, 1, 2]],
  [[2, 3, 1], [6, 4, 5], [8, 9, 4]],
  [[9, 7, 8], [2, 3, 1], [6, 4, 5]],
  [[6, 4, 5], [9, 7, 8], [2, 3, 1]],
]>

type test_sudoku_5_actual = SudokuSolved<[
  [[7, 1, 5], [4, 3, 8], [6, 9, 2]],
  [[4, 8, 6], [9, 2, 5], [7, 1, 3]],
  [[9, 3, 2], [1, 6, 7], [4, 8, 5]],
  [[6, 5, 7], [2, 8, 9], [1, 3, 4]],
  [[3, 2, 8], [7, 4, 1], [9, 5, 6]],
  [[1, 4, 9], [3, 5, 6], [8, 2, 7]],
  [[5, 9, 1], [6, 2, 3], [2, 4, 8]],
  [[2, 6, 3], [8, 9, 4], [5, 7, 1]],
  [[8, 7, 4], [5, 1, 2], [3, 6, 9]],
]>

type test_sudoku_6_actual = SudokuSolved<[
  [[8, 9, 7], [3, 6, 1], [1, 4, 5]],
  [[6, 3, 4], [1, 4, 9], [2, 8, 7]],
  [[1, 2, 4], [5, 8, 7], [9, 6, 3]],
  [[3, 8, 9], [6, 2, 1], [5, 7, 4]],
  [[4, 7, 2], [8, 9, 5], [6, 3, 1]],
  [[5, 1, 6], [4, 7, 3], [8, 2, 9]],
  [[7, 5, 1], [2, 3, 8], [4, 9, 6]],
  [[9, 6, 8], [7, 5, 4], [3, 1, 2]],
  [[2, 4, 3], [9, 1, 6], [7, 5, 8]],
]>

type test_sudoku_7_actual = SudokuSolved<[
  [[1, 2, 3], [5, 6, 7], [4, 8, 9]],
  [[2, 3, 5], [6, 7, 4], [8, 9, 1]],
  [[3, 5, 6], [7, 4, 8], [9, 1, 2]],
  [[5, 6, 7], [4, 8, 9], [1, 2, 3]],
  [[6, 7, 4], [8, 9, 1], [2, 3, 5]],
  [[7, 4, 8], [9, 1, 2], [3, 5, 6]],
  [[4, 8, 9], [1, 2, 3], [5, 6, 7]],
  [[8, 9, 1], [2, 3, 5], [6, 7, 4]],
  [[9, 1, 2], [3, 5, 6], [7, 4, 8]],
]>

type test_sudoku_8_actual = SudokuSolved<[
  [[3, 9, 2], [7, 5, 1], [8, 6, 4]],
  [[3, 9, 2], [7, 5, 1], [8, 6, 4]],
  [[3, 9, 2], [7, 5, 1], [8, 6, 4]],
  [[3, 9, 2], [7, 5, 1], [8, 6, 4]],
  [[3, 9, 2], [7, 5, 1], [8, 6, 4]],
  [[3, 9, 2], [7, 5, 1], [8, 6, 4]],
  [[3, 9, 2], [7, 5, 1], [8, 6, 4]],
  [[3, 9, 2], [7, 5, 1], [8, 6, 4]],
  [[3, 9, 2], [7, 5, 1], [8, 6, 4]],
]>

type cases = [
  Expect<Equal<test_sudoku_1_actual, true>>,
  Expect<Equal<test_sudoku_2_actual, true>>,
  Expect<Equal<test_sudoku_3_actual, true>>,
  Expect<Equal<test_sudoku_4_actual, false>>,
  Expect<Equal<test_sudoku_5_actual, false>>,
  Expect<Equal<test_sudoku_6_actual, false>>,
  Expect<Equal<test_sudoku_7_actual, false>>,
  Expect<Equal<test_sudoku_8_actual, false>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/31797/answer
  > View solutions: https://tsch.js.org/31797/solutions
  > More Challenges: https://tsch.js.org
*/
