/**
 * @description テスト環境の動作確認用サンプルテスト
 * @example
 * ```bash
 * npm test
 * ```
 */

describe('Example Test', () => {
  it('should pass basic test', () => {
    expect(1 + 1).toBe(2);
  });

  it('should handle string operations', () => {
    const message = 'Hello, World!';
    expect(message).toContain('Hello');
    expect(message.length).toBeGreaterThan(0);
  });

  it('should handle array operations', () => {
    const numbers = [1, 2, 3, 4, 5];
    expect(numbers).toHaveLength(5);
    expect(numbers).toContain(3);
    expect(numbers.reduce((a, b) => a + b, 0)).toBe(15);
  });
});
