function sum(a: number, b: number) {
  return a + b;
}
it('sum(3, 4) should return 7', () => {
  expect(sum(3, 4)).toBe(7);
});
