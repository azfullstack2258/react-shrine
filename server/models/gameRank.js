const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameRankSchema = new Schema({
  rank: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('GameRank', gameRankSchema);
