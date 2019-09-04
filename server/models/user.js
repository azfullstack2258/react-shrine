const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
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
  transform() {
    const transformed = {};
    transformed['email'] = this.email;
    transformed['fullName'] = this.firstName + ' ' + this.lastName;
    return transformed;
  },
});

userSchema.pre('save', async function save(next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }

    this.password = bcrypt.hashSync(this.password);

    return next();
  } catch (error) {
    return next(error);
  }
});

module.exports = mongoose.model('User', userSchema);
