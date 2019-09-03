const mongoose = require('mongoose');
const { Schema } = mongoose;

const playerSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    gameResults: [{
      type: Schema.Types.ObjectId,
      ref: 'GameResult'
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Player', playerSchema);
