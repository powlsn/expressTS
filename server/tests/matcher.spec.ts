test('two plus two is four', () => {
  expect(2 + 2).toBe(4);
});

test('objects assignment', () => {
  const data = { one: 1 };
  data['two'] = 2;
  expect(data).toEqual({ one: 1, two: 2 });
});

test('adding positive numbers is not zero', () => {
  for (let i = 1; i < 10; i++) {
    for (let j = 1; j < 10; j++) {
      expect(i + j).not.toBe(0);
    }
  }
});

test('null', () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined();
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
});

test('zero', () => {
  const z = 0;
  expect(z).not.toBeNull();
  expect(z).toBeDefined();
  expect(z).not.toBeUndefined();
  expect(z).not.toBeTruthy();
  expect(z).toBeFalsy();
});

test('comparing numbers have matcher equivalents', () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4.5);

  // equivalent for numbers
  expect(value).toBe(4);
  expect(value).toEqual(4);
});

// For floating point equality, use toBeCloseTo instead of toEqual, because you don't want a test to depend on a tiny rounding error.
test('adding floating point numbers', () => {
  const val = 0.1 + 0.2;
  expect(val).toBeCloseTo(0.3);
  // expect(val).toBe(0.3);
});

// You can check strings against regular expressions
test('no I in Team', () => {
  expect('team').not.toMatch(/I/);
});

test('ther is erbe in Sterben', () => {
  expect('Sterben').toMatch(/erbe/);
});

const shoppingList = ['katzenfutter', 'müllsäcke', 'klopapier', 'bier', 'chips'];

test('did you forget the beer?', () => {
  expect(shoppingList).toContain('bier');
  expect(new Set(shoppingList)).toContain('bier');
});

// Exceptions - throw the ERROR and smash it around your ears.

// preset (setup)
function compileC() {
  throw new Error('are u serios?');
}

test('compile c goes as expected', () => {
  expect(compileC).toThrow();
  expect(compileC).toThrow(Error);

  // equivalent or also you can use a regex or msg
  expect(compileC).toThrow('are u serios?');
  expect(compileC).toThrow(/serios/);
});
