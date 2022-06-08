import 'https://gist.githubusercontent.com/qwtel/b14f0f81e3a96189f7771f83ee113f64/raw/TestRequest.ts'
import {
  assert,
  assertExists,
  assertEquals,
  assertStrictEquals,
  assertStringIncludes,
  assertThrows,
  assertRejects,
  assertArrayIncludes,
} from 'https://deno.land/std@0.133.0/testing/asserts.ts'
const { test } = Deno;

import '../index.ts'

test('exists', () => {
  // FIXME: ?
  // const ev = new Event('fetch');
  // (<any>ev).request = { url: 'http://localhost:1234' }
  // self.dispatchEvent(ev)
  assert('location' in self)
})
