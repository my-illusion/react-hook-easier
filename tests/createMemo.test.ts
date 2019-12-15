// function sum(a: number, b: number) {
//   return a + b;
// }
// it('sum(3, 4) should return 7', () => {
//   expect(sum(3, 4)).toBe(7);
// });

// test('map calls its argument with a non-null argument', () => {
//   const mock = jest.fn();
//   [1, null].map(x => mock(x));
//   expect(mock).toBeCalledWith(expect.anything());
// });

// function randocall(fn) {
//   return fn('232');
// }

// test('randocall calls its callback with a number', () => {
//   const mock = jest.fn();
//   randocall(mock);
//   expect(mock).toBeCalledWith(expect.any(Number));
// });

describe('arrayContaining', () => {
  const expected = ['Alice', 'Bob'];
  it('matches even if received contains additional elements', () => {
    expect(['Alice', 'Bob', 'Eve']).toEqual(expect.arrayContaining(expected));
  });
  it('does not match if received does not contain expected elements', () => {
    expect(['Bob', 'Eve']).not.toEqual(expect.arrayContaining(expected));
  });
});
