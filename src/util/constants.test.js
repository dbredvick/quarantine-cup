import { generateDeckOfCards } from "./constants";

test("generated deck to have 52 cards", () => {
  expect(generateDeckOfCards().length).toBe(52);
});
