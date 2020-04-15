// prettier-ignore
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

export const generateDeckOfCards = () => {
  let deck = [];
  const suitNames = suits.map((x) => x.name);
  values.map((value, i) => {
    suitNames.map((suit) => {
      deck.push({ suit, value, available: true, played: 0, num: i });
    });
  });
  return shuffle(deck);
};

export const suits = [
  { symbol: "♠︎", name: "spades" },
  { symbol: "♥︎", name: "hearts" },
  { symbol: "♣︎", name: "clubs" },
  { symbol: "♦︎", name: "diamonds" },
];

export const symbolFromName = (name) =>
  suits.find((x) => x.name === name).symbol;

export const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
