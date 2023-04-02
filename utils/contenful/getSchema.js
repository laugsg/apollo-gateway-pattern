const contentfulEndpoint = process.env.CONTENTFUL_ENDPOINT;
const contentfulEnv = process.env.CONTENTFUL_ENVIRONMENT;
const { introspectSchema } = require("@graphql-tools/wrap");
const { clientConfig } = require("../../config");
const makeRemoteExecutor = require("./makeRemoteExecutor");

module.exports = {
  getSchema: async () => {
    const [space, token, previewToken, ...rest] = clientConfig;
    const contentfulUrl = `${contentfulEndpoint}/spaces/${space}/environments/${contentfulEnv}`;
    const contentfulToken = `Bearer ${token}`;
    const contentfulPreviewToken = `Bearer ${previewToken}`;
    const remoteExecutor = await makeRemoteExecutor(
      contentfulUrl,
      contentfulToken,
      contentfulPreviewToken
    );
    try {
    console.log("Introspecting contentful schema ...");
    return introspectSchema(remoteExecutor).then((contentfulRemoteSchema) => {
      return {
        schema: contentfulRemoteSchema,
        executor: remoteExecutor,
      };
    });
  } catch(error) {
    throw new Error('instrospect schema fails', error)
  }
  },
};
