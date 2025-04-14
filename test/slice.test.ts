import { Slice, fill, concat, split, getAt, fromArray, toArray } from "../src/slice"

test("From literal array", () => {
  const i: Slice<string, 2> = ["f", "s"]

  expect(i.length).toBe(2)
})

test("Fill", () => {
  const i = fill("foo", 10)

  expect(i.length).toBe(10)
})

test("Concat", () => {
  const c: Slice<number, 16> = concat(fill(0, 8), fill(1, 8))
  expect(c.length).toBe(16)
})

test("Split", () => {
  const [first, second]: [Slice<number, 16>, Slice<number, 16>] = split(fill(0, 32), 16)

  expect(first.length).toBe(16)
  expect(second.length).toBe(16)
})

test("GetAt", () => {
  const c = getAt(fill(1, 3), 2)

  expect(c).toBe(1)
})

test("FromArray", () => {
  const arr: number[] = [1, 2, 3]

  expect(fromArray(arr, 3)?.toString()).toBe(arr.toString())
  expect(fromArray(arr, 2)).toBe(undefined)
})
