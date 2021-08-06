const withPWA = require('next-pwa')
const isProd = process.env.NODE_ENV === 'production'

module.exports = withPWA({
  pwa: {
    disable: !isProd,
    dest: 'public',
  },
})
