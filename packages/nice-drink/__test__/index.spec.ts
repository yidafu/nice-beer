
test('pass test', () => {
  function toTrue(): boolean {
    return true;
  }
  expect(toTrue()).toBe(true);
});
