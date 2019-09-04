const Game = require('../../../models/game');

const games = async (obj, args, cx) => {
  const { user } = cx;

  try {
    const allGames = await Game.find().populate('gameResults');

    return allGames.map(game => game.transform());
  } catch (err) {
    throw err;
  }
};

module.exports = {
  query: { games },
};
