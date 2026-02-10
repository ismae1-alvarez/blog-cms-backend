export class Result<T, E = string> {
  private constructor(
    public readonly ok: boolean,
    public readonly value: T | null,
    public readonly error: E | null
  ) { }

  static ok<T>(value: T) {
    return new Result<T, null>(true, value, null)
  }

  static fail<E>(error: E) {
    return new Result<null, E>(false, null, error)
  }
}
