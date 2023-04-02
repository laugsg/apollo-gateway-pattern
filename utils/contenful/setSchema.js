const { getSubschema } = require('./getSchema');

const setSchema = async () => {
  const contentfulSubschema = await getSubschema()
  console.log("contentfulSubschema", contentfulSubschema)
  try {
    return contentfulSubschema
  } catch (error) {
    console.log('Error in setSchema:', error);
  }
}

module.exports = {
  setSchema
}
