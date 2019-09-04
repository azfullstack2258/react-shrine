const { query, mutation, directive } = require('../../graphql/resolvers/index');
const path = require('path');
const fs = require('fs');
const { mergeStrings } = require('gql-merge');
const { makeExecutableSchema } = require('graphql-tools');

const readData = dir => {
  const filesDir = path.resolve(__dirname, dir);
  const stats = fs.lstatSync(filesDir);
  if (stats.isFile()) {
    return fs.readFileSync(filesDir, 'utf-8');
  }
  const data = fs
    .readdirSync(filesDir)
    .map(file => fs.readFileSync(path.join(filesDir, file), 'utf-8'));
  return mergeStrings(data);
};

const schema = `
  ${readData('types')}
  ${readData('payloads')}
  ${readData('inputs')}
  ${readData('directives')}
  ${readData('query.graphql')}
  ${readData('mutation.graphql')}  
`;

module.exports = makeExecutableSchema({
  typeDefs: schema,
  schemaDirectives: directive,
  resolvers: {
    Query: query,
    Mutation: mutation,
  },
});
