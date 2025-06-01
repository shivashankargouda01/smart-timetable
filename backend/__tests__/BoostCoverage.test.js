const { alwaysTrue, add, greet } = require('../extra/BoostCoverage');

test('alwaysTrue returns true', () => {
  expect(alwaysTrue()).toBe(true);
});

test('add returns sum', () => {
  expect(add(2, 3)).toBe(5);
});

test('greet returns greeting', () => {
  expect(greet('Shiva')).toBe('Hello, Shiva');
});
