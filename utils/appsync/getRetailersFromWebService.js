const axios = require('axios').default;
const {clientConfig} = require("../../config")

module.exports = {
    getRetailersFromWebService: async (retailerId) => {
        const [retailerHost, retailerAuth] = clientConfig.slice(-2)
        const body = {
            "filter": [
                {
                    "property": "id_merchant",
                    "operator": "eq",
                    "value": retailerId
                },
                {
                    "property": "published",
                    "operator": "eq",
                    "value": true
                }
            ],
            "fields": [
                "id_merchant",
                "id_client",
                "id_merchant_pool",
                "name",
                "merchant_url",
                "retailerLogoImage.name",
                "retailerLogoImage.height",
                "retailerLogoImage.width",
                "published",
                "image_alt",
                "seo_url"
            ],
            "page": 1,
            "size": 10000
        }

        try {
            if (retailerId == null) {
                return null
            }
            const result = await axios.post(retailerHost, body, { headers: { "authorization": retailerAuth } });
            const selectedRetailer = result.data.data[0];
            return {
                id: selectedRetailer?.id_merchant || "",
                name: selectedRetailer?.name || "",
                id_client: selectedRetailer?.id_client || "",
                logo: selectedRetailer?.["retailerLogoImage.name"] || "",
                image_alt: selectedRetailer?.image_alt || "",
                url: selectedRetailer?.merchant_url || "",
                seo_url: selectedRetailer?.seo_url || ""
            };
        } catch (error) {
            console.log(error);
        }

        return -1
    }
}
