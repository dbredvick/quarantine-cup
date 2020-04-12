//import from './db.js';

export const startGame = (game) => {
  // update the game, hit an endpoint, who knows
};

export const makeChoice = (game) => {
  // update the game, hit an endpoint, who knows
};

export const currentUser = (game) => {
  return game.users.find((x) => x.isMyTurn === true);
};

export const numberOfPlayers = (game) => {
  return game?.users?.length || 0;
};

export const isHost = (game, uid) => {
  return game?.owner === uid;
};
