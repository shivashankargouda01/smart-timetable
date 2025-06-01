// __tests__/appHealth.test.js

describe('App basic tests', () => {
  it('should always return true for a sanity check', () => {
    expect(true).toBe(true);
  });

  it('should sum two numbers correctly', () => {
    const sum = (a, b) => a + b;
    expect(sum(3, 4)).toBe(7);
  });
});
