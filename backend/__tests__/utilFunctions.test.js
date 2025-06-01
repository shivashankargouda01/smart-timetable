// __tests__/utilFunctions.test.js

const { formatUserName, calculateTax } = require('../utils/helpers');

describe('Utility Functions', () => {
  test('formatUserName should trim and combine names', () => {
    expect(formatUserName(' John ', ' Doe ')).toBe('John Doe');
  });

  test('calculateTax should return 10% tax by default', () => {
    expect(calculateTax(100)).toBe(10);
  });

  test('calculateTax should handle custom tax rate', () => {
    expect(calculateTax(200, 0.2)).toBe(40);
  });
});
