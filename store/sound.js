export const state = () => ({
  isSoundEnabled: true,
  actionButton: new Audio(
    require('@/assets/audio/SFX/click-buttons.wav').default
  ),
  successState: new Audio(
    require('@/assets/audio/SFX/success_op1.wav').default
  ),
})

export const actions = {
  playSFXAudio({ state }, { audioToPlay }) {
    // state.isSoundEnabled &&
    if (state[audioToPlay]) {
      state[audioToPlay].volume = 0.5
      state[audioToPlay].play()
    }
  },
}
export const mutations = {
  toggleSound(state) {
    state.isSoundEnabled = !state.isSoundEnabled
    localStorage.setItem('isSoundEnabled', state.isSoundEnabled)
  },
  initializeSound(state) {
    const isSoundEnabled = localStorage.getItem('isSoundEnabled')
    if (!isSoundEnabled) {
      state.isSoundEnabled = true
      localStorage.setItem('isSoundEnabled', 'true')
    } else if (isSoundEnabled === 'false') {
      state.isSoundEnabled = false
      localStorage.setItem('isSoundEnabled', 'false')
    } else if (isSoundEnabled === 'true') {
      state.isSoundEnabled = true
      localStorage.setItem('isSoundEnabled', 'true')
    }
  },
}
