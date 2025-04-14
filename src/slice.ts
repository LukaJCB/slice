export type Slice<A, N extends number> = A[] & { length: N }

export type Lt<N extends number, Acc extends number[] = []> = Acc["length"] extends N
  ? Acc[number]
  : Lt<N, [...Acc, Acc["length"]]>

export function fill<A, N extends number>(a: A, length: N): Slice<A, N> {
  return new Array<A>(length).fill(a, 0, length) as Slice<A, N>
}

export function toArray<A, N extends number>(s: Slice<A, N>): A[] {
  return s
}

export function getAt<A, N extends number, M extends Lt<N>>(s: Slice<A, N>, m: M): A {
  return s.at(m) as A
}

export type Add<
  A extends number,
  B extends number,
  Acc extends 1[] = [],
  Acc2 extends 1[] = [],
  Acc3 extends 1[] = [],
> = A extends Acc["length"]
  ? B extends Acc2["length"]
    ? Acc3["length"]
    : Add<A, B, Acc, [...Acc2, 1], [...Acc3, 1]>
  : Add<A, B, [...Acc, 1], Acc2, [...Acc3, 1]>

export function concat<A, N extends number, M extends number>(a: Slice<A, N>, b: Slice<A, M>): Slice<A, Add<N, M>> {
  return [...a, ...b] as Slice<A, Add<N, M>>
}

export function fromArray<A, N extends number>(as: A[], n: N): Slice<A, N> | undefined {
  return as.length === n ? (as as Slice<A, N>) : undefined
}

export type Subtract<
  A extends number,
  B extends number,
  Diff extends 1[] = [],
  Acc extends 1[] = [],
  Started extends number = Diff extends [] ? Acc["length"] : B,
> = Acc["length"] extends A
  ? B extends Started
    ? Diff["length"]
    : never
  : B extends Started
    ? Subtract<A, B, [...Diff, 1], [...Acc, 1]>
    : Subtract<A, B, Diff, [...Acc, 1]>

export function split<A, N extends number, M extends number>(
  a: Slice<A, N>,
  m: M,
): [Slice<A, M>, Slice<A, Subtract<N, M>>] {
  return [a.slice(0, m), a.slice(m, a.length)] as [Slice<A, M>, Slice<A, Subtract<N, M>>]
}
