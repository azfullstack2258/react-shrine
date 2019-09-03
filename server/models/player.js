const mongoose = require('mongoose');
const { Schema } = mongoose;

const playerSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    name: {
      type: String,
      required: true
    },
    birthday: {
      type: String
    },
    country: {
      type: String
    },
    gameResults: [{
      type: Schema.Types.ObjectId,
      ref: 'GameResult'
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Player', playerSchema);
