const sleeper = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const contractTypes = {
  ERC20: 'ERC20',
  ERC1155: 'ERC1155',
  ERC721: 'ERC721',
  NATIVE: 'NATIVE',
}

export default (context, inject) => {
  inject('sleeper', sleeper)
  inject('contractTypes', contractTypes)
  // For Nuxt <= 2.12, also add 👇
  context.$sleeper = sleeper
}
