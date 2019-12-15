import { useCache } from '../src';

const cacheMap = useCache({});
test("for same key, it's value will be saved", () => {
  const value = () => {};
  cacheMap(1, value);
  expect(cacheMap(1)).toBe(value);
});
