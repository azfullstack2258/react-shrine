const authHandlers = require('./handleGenerators/auth');
const gameHandlers = require('./handleGenerators/game');
const authDirectivesHandlers = require('./directives/auth');

const query = {
  ...gameHandlers.query
};

const mutation = {
  ...authHandlers.mutation
};

const directive = {
  ...authDirectivesHandlers
};

module.exports = {
  query,
  mutation,
  directive
};
