const Game = require('../../../models/game');

const getGames = async (obj, args, cx) => {
  const { user } = cx;

  try {
    const games = await Game.find().populate('gameResults');

    return games.transform();
  } catch (err) {
    throw err;
  }
};

module.exports = {
  query: { getGames },
};
