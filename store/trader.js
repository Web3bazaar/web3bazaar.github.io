export const state = () => ({
  itemFrom: {
    base_img:
      'https://2264006251-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F-MdunBb1X4ZSri9eSiAH%2Fuploads%2Fj3zLlHOEGa4kKLWE3qsv%2FTwitter_art.png?alt=media&token=bb90dda5-cf06-4395-bc59-42a3d45bb403',
    address: '0x999...123',
    project_name: 'SunFlower Farms',
    item_name: 'Sunflower',
    item_quantity: 1,
    type: 'ERC-721',
    item_logo_url:
      'https://aavegotchi.com/_next/image?url=%2Fimages%2Fitems%2F152.svg&w=128&q=75',
  },
  itemTo: {
    base_img:
      'https://2264006251-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F-MdunBb1X4ZSri9eSiAH%2Fuploads%2Fj3zLlHOEGa4kKLWE3qsv%2FTwitter_art.png?alt=media&token=bb90dda5-cf06-4395-bc59-42a3d45bb403',
    address: '0x123...999',
    project_name: 'SunFlower Farms',
    item_name: 'potato',
    item_quantity: 30,
    item_logo_url:
      'blob:https://aavegotchi.com/6419374b-3038-4ec6-a8f6-d2acaa172a98',
  },
  projectFromItems: [
    {
      item_name: 'Mythical Rofl',
      item_logo_url:
        'https://aavegotchi.com/_next/image?url=%2Fimages%2Fitems%2F155.svg&w=256&q=75',
      item_quantity: '5',
    },
  ],
  projectToItems: [
    {
      item_name: 'Aantenna Bot',
      item_logo_url:
        'https://aavegotchi.com/_next/image?url=%2Fimages%2Fitems%2F261.svg&w=256&q=75',
      item_quantity: '3',
    },
  ],
  projects: [
    {
      base_img:
        'https://2264006251-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F-MdunBb1X4ZSri9eSiAH%2Fuploads%2Fj3zLlHOEGa4kKLWE3qsv%2FTwitter_art.png?alt=media&token=bb90dda5-cf06-4395-bc59-42a3d45bb403',
      project_name: 'Sunflower',
      address: '0x112123132',
      api_base: 'https://...',
      type: 'ERC-721',
    },
    {
      base_img: 'https://picsum.photos/id/11/500/300',
      project_name: 'Defi kingdoms',
      address: '0x112123132',
      api_base: 'https://...',
      type: 'ERC-721',
    },
    {
      base_img:
        'https://blog.bitnovo.com/wp-content/uploads/2021/11/Que%CC%81-es-Aavegotchi1.jpg',
      project_name: 'Aavegotchi',
      address: '0x112123132',
      api_base: 'https://...',
      type: 'ERC-721',
    },
  ],
})

export const mutations = {
  itemFrom(state, value) {
    state.itemFrom = value
  },
  itemTo(state, value) {
    state.itemTo = value
  },
}
