interface Result<S, E> {
  ok(): this is Ok<S>
  fail(): this is Err<E>
  unwrap(): S
  error(): E
  map<T>(fn: (value: S) => T): Result<T, E>
  mapErr<F>(fn: (error: E) => F): Result<S, F>
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

  map<T>(fn: (value: S) => T): Result<T, never> {
    return new Ok(fn(this.value))
  }

  mapErr<F>(_fn: (error: never) => F): Result<S, never> {
    return this
  }

  flatMap<T, F>(fn: (value: S) => Result<T, F>): Result<T, F> {
    return fn(this.value)
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

  map<T>(_fn: (value: never) => T): Result<T, E> {
    return this
  }

  mapErr<F>(fn: (error: E) => F): Result<never, F> {
    return new Err(fn(this.value))
  }

  flatMap<T, F>(_fn: (value: never) => Result<T, F>): Result<T, E> {
    return this
  }
}

export { Result, Ok, Err }
