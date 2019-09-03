const { ApolloServer, gql, SchemaDirectiveVisitor } = require('apollo-server');
const { DirectiveLocation, GraphQLDirective, defaultFieldResolver } = require('graphql');

class IsAuthenticated extends SchemaDirectiveVisitor {
  static getDirectiveDeclaration(directiveName) {
    return new GraphQLDirective({
      name: directiveName,
      locations: [DirectiveLocation.FIELD_DEFINITION],
      args: {},
    });
  }

  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function(root, args, context, info) {
      if (!context.user) throw new Error('Unauthenticated!');
      return await resolve.apply(this, [root, args, context, info]);
    };
  }
}

module.exports = { isAuthenticated: IsAuthenticated };
