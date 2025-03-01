import { Err, Ok, Result } from '@/result'

type MathError = { message: string }

class DivisionByZeroError implements MathError {
  message = 'Division by zero'
}

class NegativeDivisionError implements MathError {
  message = 'Negative division'
}

const divide = function (
  n: number,
  divisor: number,
): Result<number, DivisionByZeroError> {
  return divisor === 0
    ? new Err(new DivisionByZeroError())
    : new Ok(n / divisor)
}

const sum = function (
  a: number,
  b: number,
): Result<number, NegativeDivisionError> {
  return a < 0 || b < 0 ? new Err(new NegativeDivisionError()) : new Ok(a + b)
}

function main(): void {
  const result = sum(20, 2)

  if (result.ok()) {
    console.log('Success:', result.unwrap())
  } else {
    console.error('Failure:', result.error())
  }

  const result2 = divide(20, 0)

  if (result2.ok()) {
    console.log('Success:', result2.unwrap())
  } else {
    console.error('Failure:', result2.error())
  }
}

main()
