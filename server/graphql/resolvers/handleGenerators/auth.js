const User = require('../../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();

async function createUser(obj, args) {
  try {
    const { username, password } = args;

    // TODO: We could add some validations here
    // e.g. Check password strength, username validation, etc.

    // Check if user with the name already exists.
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new Error('User with the username already exists!');
    }

    const user = new User({ username, password }, err => {
      if (err) throw err;
    });

    await user.save();

    // Generate token for this signed up user
    const token = jwt.sign({ id: user._id }, process.env.SECRET);

    return { token, password: null, ...user._doc };
  } catch (err) {
    throw err;
  }
}

async function login(obj, args) {
  const { username, password } = args;
  try {
    const user = await User.findOne({ username });

    // Check if user exists
    if (!user) {
      throw new Error('User does not exist.');
    }

    // Check if password is valid
    const passwordIsValid = user.passwordMatches(password);
    if (!passwordIsValid) throw new Error('Incorrect password.');

    // Generate token for this signed in user
    const token = jwt.sign({ id: user._id }, process.env.SECRET);
    return { token, ...user._doc };
  } catch (err) {
    throw err;
  }
}

module.exports = {
  mutation: { login, createUser }
};
