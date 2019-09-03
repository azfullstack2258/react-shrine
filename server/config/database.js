const mongoose = require('mongoose');
const config = require('../../config/config');
const isDev = process.env.NODE_ENV !== 'production';
const DB_URI = isDev ? config.db_dev : config.db;

mongoose.connect(DB_URI, { useNewUrlParser: true });
mongoose.connection.once('open', () =>
  console.log('Successfully connected to MongoDB')
);
mongoose.connection.on('error', error => console.error(error));

module.exports = mongoose;
