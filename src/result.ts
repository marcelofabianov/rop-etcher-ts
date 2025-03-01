interface Result<S, E> {
  ok(): this is Ok<S>
  fail(): this is Err<E>
  unwrap(): S
  error(): E
}

class Ok<S> implements Result<S, never> {
  constructor(private readonly value: S) {}

  ok(): this is Ok<S> {
    return true
  }

  fail(): this is Err<never> {
    return false
  }

  unwrap(): S {
    return this.value
  }

  error(): never {
    throw new Error('Cannot call error() on an Ok')
  }
}

class Err<E> implements Result<never, E> {
  constructor(public readonly value: E) {}

  ok(): this is Ok<never> {
    return false
  }

  fail(): this is Err<E> {
    return true
  }

  unwrap(): never {
    throw new Error(`Unwrapped an Err: ${this.value}`)
  }

  error(): E {
    return this.value
  }
}

export { Result, Ok, Err }
