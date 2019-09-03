const mongoose = require('mongoose');
const GameResult = require('./gameResult');
const { Schema } = mongoose;

const gameSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    gameResults: [{
      type: Schema.Types.ObjectId,
      ref: 'GameResult'
    }]
  },
  { timestamps: true }
);

gameSchema.methods({
  async topScore() {
    if (!this.gameResults.length) return 0;
    const gameRes = await GameResult.findById(this.gameResults[0]);
    let max = gameRes.score;

    for (let i = 1; i < this.gameResults.length; i ++) {
      const gR = await GameResult.findById(this.gameResults[i]);
      if (max < gR.score) {
        max = gR.score;
      }
    }

    return max;
  }
});

module.exports = mongoose.model('Game', gameSchema);
