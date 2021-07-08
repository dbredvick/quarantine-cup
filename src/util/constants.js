// prettier-ignore
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

export const rules = [
  {
    value: "A",
    stringRep: "an ace",
    rule: `Ace is "Social"`,
    moreInfo: "Everyone takes a big drink. Cheers!",
  },
  {
    value: "2",
    stringRep: "a two",
    rule: `Two is "You"`,
    moreInfo: "Choose a player to take a drink.",
  },
  {
    value: "3",
    stringRep: "a three",
    rule: `Three is "Me"`,
    moreInfo: "Take a drink!",
  },
  {
    value: "4",
    stringRep: "a four",
    rule: `Four is "Floor"`,
    moreInfo: "Everyone must point down - last person drinks.",
  },
  {
    value: "5",
    stringRep: "a five",
    rule: `Five is "Guys"`,
    moreInfo: "All guys drink.",
  },
  {
    value: "6",
    stringRep: "a six",
    rule: `Six is "Chicks"`,
    moreInfo: "All chicks drink.",
  },
  {
    value: "7",
    stringRep: "a seven",
    rule: `Seven is "Heaven"`,
    moreInfo: "Everyone must point up - last person drinks.",
  },
  {
    value: "8",
    stringRep: "an eight",
    rule: `Eight is "Mate"`,
    moreInfo: "Pick someone who must drink every time you do, and vice versa.",
  },
  {
    value: "9",
    stringRep: "a nine",
    rule: `Nine is "Rhyme"`,
    moreInfo:
      "Player who drew the card picks a word. Everyone must take a turn and rhyme with the original word. If you repeat or can't think of one - drink.",
  },
  {
    value: "10",
    stringRep: "a ten",
    rule: `Ten is "Categories"`,
    moreInfo:
      "Player who drew the card picks a category. Everyone must take a turn and say a word in that category. If you repeat or can't think of one - drink.",
  },
  {
    value: "J",
    stringRep: "a jack",
    rule: `Jack is "Never Have I Ever"`,
    moreInfo: `Everyone holds up three fingers. Starting with the player who drew the card, say something that you haven't done. Everyone who has done it puts a finger down. First person out drinks.`,
  },
  {
    value: "Q",
    stringRep: "a queen",
    rule: `Queen is "Question Master"`,
    moreInfo:
      "Player who drew the card is the Question Master. Anyone who answers their questions must drink.",
  },
  {
    value: "K",
    stringRep: "a king",
    rule: `King is "Rule Master"`,
    moreInfo:
      "Player who drew the card comes up with a rule. This rule is in effect until the next King is drawn.",
  },
];

export const generateDeckOfCards = () => {
  let deck = [];
  const suitNames = suits.map((x) => x.name);
  values.map((value, j) => {
    suitNames.map((suit, i) => {
      deck.push({
        suit,
        value,
        available: true,
        played: 0,
        num: Math.random() * (i + 1),
      });
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

export const getGameRule = (cardData) => {
  if (!cardData || !cardData.value || values.indexOf(cardData.value) === -1)
    return "";
  const rule = rules.find((x) => x.value == cardData.value);
  return rule;
};

export const tagIds = {
  quarantineCup: 1447145,
  homepage: 1447147,
  fridayReminder: 1447105,
  user: 1447149,
  earlySupporter: 1447150,
};

export const getTagIds = (tags) => {
  return tags.map((x) => tagIds[x]);
};
