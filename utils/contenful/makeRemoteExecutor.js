const { fetch } = require('cross-undici-fetch');
const { print } = require('graphql');
const compress = require('graphql-query-compress');

module.exports = (url, auth = null, previewAuth = null) => {
  return async ({ document, variables }) => {
    const contentfulUrl = `${process.env.CONTENTFUL_ENDPOINT}/spaces/${process.env.CONTENTFUL_SPACE}/environments/${process.env.CONTENTFUL_ENVIRONMENT}`;
    const query = typeof document === 'string' ? document : print(document);
    const isPreview = variables?.isPreview;
    const fetchResult = await fetch(contentfulUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(auth ? {Authorization: isPreview ? previewAuth : auth} : {})
      },
      body: JSON.stringify({ query: compress(query), variables })
    });
    return fetchResult.json();
  }
}