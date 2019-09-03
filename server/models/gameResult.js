const mongoose = require('mongoose');
const { Schema } = mongoose;

const gameResultSchema = new Schema(
  {
    score: {
      type: Number,
      required: true
    },
    rank: {
      type: Schema.Types.ObjectId,
      ref: 'GameRank'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('GameResult', gameResultSchema);
