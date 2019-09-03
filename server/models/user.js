const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
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
    password: {
      type: String,
      min: 8,
      max: 32,
      set: v => bcrypt.hashSync(v, 10), // Encrypt user's password for security
    },
  },
  { timestamps: true },
);

userSchema.statics.findByToken = async function(token) {
  if (!token) return null;
  const decoded = jwt.verify(token, process.env.SECRET);
  return this.findOne({ _id: decoded.id });
};

userSchema.method({
  passwordMatches(password) {
    return bcrypt.compareSync(password, this.password);
  },
});

module.exports = mongoose.model('User', userSchema);
