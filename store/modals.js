export const state = () => ({
  showModal: false,
  modalType: null,
  modalData: null,
})

export const mutations = {
  setPopupState(state, { type, isShow, data }) {
    state.modalType = type
    state.showModal = isShow
    state.modalData = data
  },
  closeModal(state) {
    state.modalType = null
    state.showModal = false
    state.modalData = null
  },
}
