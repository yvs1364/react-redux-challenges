const insertDash = require('../lib/01_dash_insertion');

test('#insertDash should handle empty string', () => {
  expect(insertDash("")).toBe("");
});

test('#insertDash should not change "Le Wagon"', () => {
  expect(insertDash("Le Wagon")).toBe("Le Wagon");
});

test('#insertDash should work for "hello"', () => {
  expect(insertDash("hello")).toBe("hel-lo");
});

test('#insertDash should work for "anticonstitutionnellement"', () => {
  expect(insertDash("anticonstitutionnellement")).toBe("an-ticon-s-titution-nel-lemen-t");
});
