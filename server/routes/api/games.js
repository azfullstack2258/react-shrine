const Game = require('../../models/game');

module.exports = app => {
  app.get('/api/games', (req, res, next) => {
    Game.find()
      .exec()
      .then(game => res.json(game))
      .catch(err => next(err));
  });

  app.post('/api/games', function(req, res, next) {
    const game = new Game();

    game
      .save()
      .then(() => res.json(game))
      .catch(err => next(err));
  });

  app.delete('/api/games/:id', function(req, res, next) {
    Game.findOneAndRemove({ _id: req.params.id })
      .exec()
      .then(game => res.json())
      .catch(err => next(err));
  });
};
