/*
  14080 - FizzBuzz
  -------
  by Lee Crosby (@Cygnut) #hard #array #math #infer

  ### Question

  The FizzBuzz problem is a classic test given in coding interviews. The task is simple:

  Print integers 1 to N, except:

  - Print "Fizz" if an integer is divisible by 3;
  - Print "Buzz" if an integer is divisible by 5;
  - Print "FizzBuzz" if an integer is divisible by both 3 and 5.

  For example, for N = 20, the output should be:
  `1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz, 11, Fizz, 13, 14, FizzBuzz, 16, 17, Fizz, 19, Buzz`
  `1, 2, 3,    4, 5,    6,    7, 8, 9,    10,   11, 12,   13, 14, 15,       16, 17, 18,   19, 20`

  In the challenge below, we will want to generate this as an array of string literals.

  For large values of N, you will need to ensure that any types generated do so efficiently (e.g. by
  correctly using the tail-call optimisation for recursion).

  > View on GitHub: https://tsch.js.org/14080
*/

/* _____________ Your Code Here _____________ */

type _Number2Array<N extends number, _Result extends 0[] = []> = _Result['length'] extends N ? _Result : _Number2Array<N, [ ..._Result, 0 ]>

// Return 'Fizz' if N is divisible by 3, otherwise return ''.
type _Fizz<N extends number, _Counter extends 0[] = [], _Array extends 0[] = _Number2Array<N>> =
  _Array extends []
    ? _Counter['length'] extends 3 ? 'Fizz' : ''
    : _Counter['length'] extends 3
      ? _Fizz<_Array['length'], []>
      : _Array extends [ 0, ...infer Rest ]
        ? _Fizz<Rest['length'], [ 0, ..._Counter ]>
        : ''

// Return 'Buzz' if N is divisible by 5, otherwise return ''.
type _Buzz<N extends number, _Counter extends 0[] = [], _Array extends 0[] = _Number2Array<N>> =
  _Array extends []
    ? _Counter['length'] extends 5 ? 'Buzz' : ''
    : _Counter['length'] extends 5
      ? _Buzz<_Array['length'], []>
      : _Array extends [ 0, ...infer Rest ]
        ? _Buzz<Rest['length'], [ 0, ..._Counter ]>
        : ''

type FizzBuzz<
  N extends number,
  _Counter extends 0[] = [0],
  _Result extends string[] = ['1'],
  _CounterPlusOne extends 0[] = [ ..._Counter, 0],
  _FizzBuzz extends string = `${ _Fizz<_CounterPlusOne['length'] & number> }${ _Buzz<_CounterPlusOne['length'] & number> }`,
> = _Counter['length'] extends N
  ? _Result
  : FizzBuzz<N, _CounterPlusOne, [ ..._Result, _FizzBuzz extends '' ? `${ _CounterPlusOne['length'] & number }` : _FizzBuzz ]>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<FizzBuzz<1>, ['1']>>,
  Expect<Equal<FizzBuzz<5>, ['1', '2', 'Fizz', '4', 'Buzz']>>,
  Expect<Equal<FizzBuzz<20>, [
    '1',
    '2',
    'Fizz',
    '4',
    'Buzz',
    'Fizz',
    '7',
    '8',
    'Fizz',
    'Buzz',
    '11',
    'Fizz',
    '13',
    '14',
    'FizzBuzz',
    '16',
    '17',
    'Fizz',
    '19',
    'Buzz',
  ]>>,
  Expect<Equal<FizzBuzz<100>, [
    '1',
    '2',
    'Fizz',
    '4',
    'Buzz',
    'Fizz',
    '7',
    '8',
    'Fizz',
    'Buzz',
    '11',
    'Fizz',
    '13',
    '14',
    'FizzBuzz',
    '16',
    '17',
    'Fizz',
    '19',
    'Buzz',
    'Fizz',
    '22',
    '23',
    'Fizz',
    'Buzz',
    '26',
    'Fizz',
    '28',
    '29',
    'FizzBuzz',
    '31',
    '32',
    'Fizz',
    '34',
    'Buzz',
    'Fizz',
    '37',
    '38',
    'Fizz',
    'Buzz',
    '41',
    'Fizz',
    '43',
    '44',
    'FizzBuzz',
    '46',
    '47',
    'Fizz',
    '49',
    'Buzz',
    'Fizz',
    '52',
    '53',
    'Fizz',
    'Buzz',
    '56',
    'Fizz',
    '58',
    '59',
    'FizzBuzz',
    '61',
    '62',
    'Fizz',
    '64',
    'Buzz',
    'Fizz',
    '67',
    '68',
    'Fizz',
    'Buzz',
    '71',
    'Fizz',
    '73',
    '74',
    'FizzBuzz',
    '76',
    '77',
    'Fizz',
    '79',
    'Buzz',
    'Fizz',
    '82',
    '83',
    'Fizz',
    'Buzz',
    '86',
    'Fizz',
    '88',
    '89',
    'FizzBuzz',
    '91',
    '92',
    'Fizz',
    '94',
    'Buzz',
    'Fizz',
    '97',
    '98',
    'Fizz',
    'Buzz',
  ]>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/14080/answer
  > View solutions: https://tsch.js.org/14080/solutions
  > More Challenges: https://tsch.js.org
*/
