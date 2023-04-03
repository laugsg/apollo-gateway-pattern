const { makeExecutableSchema } = require('@graphql-tools/schema');
const { getRetailersFromWebService } = require('./getRetailersFromWebService');

const getAppSyncSchema = () => {
  return makeExecutableSchema({
    typeDefs: /* GraphQL */`
      type RetailerInternal {
        id: String!
        name: String!
        id_client: String!
        logo: String!
        image_alt: String!
        url: String!
        seo_url: String!
      }
  
      type Query {
        retailerInternal (id: String): RetailerInternal
        retailerInternalCollection: [RetailerInternal]
      }
    `,
    resolvers: {
      Query: {
        retailerInternal: (_, { id }) => getRetailersFromWebService(id)
      }
    }
  });
}

module.exports = {
  getAppSyncSchema
}
