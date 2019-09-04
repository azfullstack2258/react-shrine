const User = require('../../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();

async function createUser(obj, args) {
  try {
    const { input } = args;
    const { firstName, lastName, email, password, confirm } = input;

    if (password !== confirm) {
      throw new Error('Password mismatch.');
    }

    // TODO: We could add some validations here
    // e.g. Check password strength, username validation, etc.

    // Check if user with the name already exists.
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User with the username already exists!');
    }

    const user = new User({ firstName, email, lastName, password }, err => {
      if (err) throw err;
    });

    await user.save();

    // Generate token for this signed up user
    const token = jwt.sign({ id: user._id }, process.env.SECRET);

    return { token, ...user.transform() };
  } catch (err) {
    throw err;
  }
}

async function login(obj, args) {
  const { email, password } = args;
  try {
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      throw new Error('User does not exist.');
    }

    // Check if password is valid
    const passwordIsValid = user.passwordMatches(password);
    if (!passwordIsValid) throw new Error('Incorrect password.');

    // Generate token for this signed in user
    const token = jwt.sign({ id: user._id }, process.env.SECRET);
    return { token, ...user.transform() };
  } catch (err) {
    throw err;
  }
}

module.exports = {
  mutation: { login, createUser },
};
