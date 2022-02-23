const logger = require('debug')('w3b:logger')

export default (context, inject) => {
  if (process.env.dev) localStorage.debug = 'w3b:*'

  inject('logger', logger)
  // For Nuxt <= 2.12, also add 👇
  context.$logger = logger
}
