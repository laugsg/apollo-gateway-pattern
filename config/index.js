const retailerHost = process.env.GATEWAY || "";
const authToken = process.env.AUTH_TOKEN || "";
const environment = process.env.ENVIRONMENT;

const setRetailerHost = (host, region, environment) => {
  if (environment === "acceptance") {
    const hostBase = host.split("/uk/retailers/search")[0];
    return `${hostBase}/${region}/retailers/search`;
  }
  return host;
};

const clientConfig = [
  process.env.CONTENTFUL_SPACE,
  process.env.CONTENTFUL_API_TOKEN,
  process.env.CONTENTFUL_PREVIEW_TOKEN,
  setRetailerHost(retailerHost, "uk", environment),
  authToken,
];

module.exports = {
  clientConfig,
};
