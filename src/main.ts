import { Err, Ok, Result } from '@/result'

type MathError = { message: string }

class DivisionByZeroError implements MathError {
  message = 'Division by zero'
}

const divide = function (
  n: number,
  divisor: number,
): Result<number, DivisionByZeroError> {
  return divisor === 0
    ? new Err(new DivisionByZeroError())
    : new Ok(n / divisor)
}

function main(): void {
  const result2 = divide(20, 0)

  if (result2.ok()) {
    console.log('Success:', result2.unwrap())
  } else {
    console.error('Failure:', result2.error())
  }
}

main()
