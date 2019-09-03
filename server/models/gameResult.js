const mongoose = require('mongoose');
const Player = require('./player');
const { Schema } = mongoose;

const gameResultSchema = new Schema(
  {
    player: {
      type: Schema.Types.ObjectId,
      ref: 'Player'
    },
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
