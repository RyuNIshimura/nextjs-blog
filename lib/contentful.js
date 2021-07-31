const contentful = require('contentful')
const config = {
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_DELIVERY_ACCESS_TOKEN,
}

const client = contentful.createClient(config)
export default client