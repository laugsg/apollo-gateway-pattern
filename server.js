require("dotenv").config();

const { expressMiddleware } = require('@apollo/server/express4');
const express = require('express');
const http = require('http');
const cors = require('cors');
const { json } = require('body-parser');

// GraphQL tools
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { stitchSchemas } = require("@graphql-tools/stitch");

// Apollo tools
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const gql = require("graphql-tag");

// datasources
const { getContentfulSchema } = require("./utils/contenful/getContentfulSchema");
const { getAppSyncSchema } = require("./utils/appsync/getAppSyncSchema");

// endpoints
const { getRetailersFromWebService } = require("./utils/appsync/getRetailersFromWebService");

(async () => {
  const app = express();
  app.use(
    `/`,
    cors(),
    json(),
    (req,res,next) => {
      // const { clientId, region } = req.params
      // getRetailersFromWebService(clientId, region);
      console.log(">>>>>>> middleware")
      next();
    },
  );

  // schemas
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
