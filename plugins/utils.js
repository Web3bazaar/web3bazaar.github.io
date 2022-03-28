const sleeper = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export default (context, inject) => {
  inject('sleeper', sleeper)
  // For Nuxt <= 2.12, also add 👇
  context.$sleeper = sleeper
}
