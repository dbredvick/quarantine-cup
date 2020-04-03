// prettier-ignore
const suits = ["spades", "diamonds", "clubs", "hearts"];
// prettier-ignore
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

export const generateDeckOfCards = () => {
  let deck = [];
  values.map(value => {
    suits.map(suit => {
      deck.push({ suit, value, available: true, played: 0 });
    });
  });
  return deck;
};
