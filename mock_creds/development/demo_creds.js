
const DEMO_ACCESS_KEY = 'DKFJSOFYSOFJDSLJFSDF'
const DEMO_CONFIG_OBJ = {
  one: 'ONE',
  two: 'TWO'
}
const URL_ROUTE = 'https://34.467.75.34'

// module.exports = { CLIENT_ACCESS_KEY, DEVELOPER_ACCESS_KEY }

module.exports.vars = (serverless) => {
  return {
    DEMO_ACCESS_KEY: DEMO_ACCESS_KEY,
    DEMO_CONFIG_OBJ: DEMO_CONFIG_OBJ,
    URL_ROUTE: URL_ROUTE
  }
}
