export class Result<T> {
  constructor(
    private readonly state:
      | { status: "ok"; value: T }
      | { status: "error"; message: string }
  ) {}
  static of<T>(value: T) {
    return new Result({ status: "ok", value });
  }
  static error<T>(message: string) {
    return new Result<T>({ status: "error", message });
  }
  map<A>(f: (props: T) => A): Result<A> {
    return this.state.status === "ok"
      ? Result.of<A>(f(this.state.value))
      : Result.error<A>(this.state.message);
  }
  print() {
    if (this.state.status === "ok") {
      console.log(this.state.value);
    } else {
      console.log("Error :", this.state.message);
    }
  }

  get value() {
    if (this.state.status === "ok") {
      return this.state.value;
    } else {
      return this.state.message;
    }
  }
}
