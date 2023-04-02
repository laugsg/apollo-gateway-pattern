require("dotenv").config();

// GraphQL tools
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { stitchSchemas } = require("@graphql-tools/stitch");

// Apollo tools
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const gql = require("graphql-tag");

// custom tools
const { getSchema } = require("./utils/contenful/getSchema");


(async () => {
  const { schema } = await getSchema();
  const contentfulSchema = { schema: schema };

  let userSchema = makeExecutableSchema({
    typeDefs: `
  type ALSOUser {
    id: ID!
    email: String
  }
  type Query {
    userById(id: ID!): ALSOUser
  }
  `,
    resolvers: {},
  });
  const userSubschema = { schema: userSchema };

  // build the combined schema
  const gatewaySchema = stitchSchemas({
    subschemas: [contentfulSchema, userSubschema],
  });

  await initApollo(gatewaySchema);
})();

async function initApollo(gatewaySchema) {
  const server = new ApolloServer({ schema: gatewaySchema });
  const { url } = await startStandaloneServer(server);
  console.log(`
        🚀  Server is running!
        📭  Query at ${url}
    `);
}
