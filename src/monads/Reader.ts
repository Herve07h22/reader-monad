export class Reader<R, A> {
  constructor(public readonly runWith: (r: R) => A) {}

  static ask<R>(): Reader<R, R> {
    return new Reader((r: R) => r);
  }

  map<B>(f: (a: A) => B): Reader<R, B> {
    return new Reader((r: R) => f(this.runWith(r)));
  }

  flatMap<B>(f: (a: A) => Reader<R, B>): Reader<R, B> {
    return new Reader((r: R) => f(this.runWith(r)).runWith(r));
  }

  then<B>(f: Reader<R, (a: A) => B>) {
    return new Reader((r: R) => f.runWith(r)(this.runWith(r)));
  }
}
