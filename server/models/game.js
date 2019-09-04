const mongoose = require('mongoose');
const GameResult = require('./gameResult');
const User = require('./user');
const { Schema } = mongoose;

const gameSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    gameResults: [
      {
        type: Schema.Types.ObjectId,
        ref: 'GameResult',
      },
    ],
  },
  { timestamps: true },
);

gameSchema.method({
  async topScore() {
    if (!this.gameResults.length) return 0;
    const gameRes = await GameResult.findById(this.gameResults[0]);
    let max = gameRes.score;

    for (let i = 1; i < this.gameResults.length; i++) {
      const gR = await GameResult.findById(this.gameResults[i]);
      if (max < gR.score) {
        max = gR.score;
      }
    }

    return max;
  },
  async transform() {
    const transformed = {};
    transformed['title'] = this.title;
    transformed['results'] = [];
    for (let i = 0; i < this.gameResults.length; i++) {
      const gR = await GameResult.findById(this.gameResults[i]).populate('player');
      const pr = await User.findById(gR.player.userId);
      transformed['results'].push({
        player: pr.name,
        score: gR.score,
      });
    }
    return transformed;
  },
});

module.exports = mongoose.model('Game', gameSchema);
