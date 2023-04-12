require("dotenv").config();

// GraphQL tools
const { stitchSchemas } = require("@graphql-tools/stitch");

// Apollo tools
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

// datasources
const { getContentfulSchema } = require("./utils/contenful/getContentfulSchema");
const { getAppSyncSchema } = require("./utils/appsync/getAppSyncSchema");

(async () => {
  /** Contentful pattern */
  const { schema } = await getContentfulSchema();
  const contentfulSchema = { schema: schema };

  let appSyncSchema = getAppSyncSchema()
  const appSyncSubschema = { schema: appSyncSchema };

  // combine schemas
  const gatewaySchema = stitchSchemas({
    subschemas: [contentfulSchema, appSyncSubschema],
  });

  // initialize apollo server
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
