<template>
  <v-btn
    class="more-btn mb-15 pixel2 w3b-bg-gradient"
    type="submit"
    :loading="loading"
    :ripple="false"
    @click="playSound"
  >
    {{ btnText }}
  </v-btn>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  components: {},
  props: {
    btnText: {
      default: '',
      type: String,
    },
    loading: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {}
  },
  computed: {},
  methods: {
    ...mapActions('sound', ['playSFXAudio']),

    playSound() {
      this.playSFXAudio({ audioToPlay: 'actionButton' })
      this.$emit('click')
    },
  },
}
</script>

<style lang="scss" scoped>
.login-btn {
  width: 176px !important;
  height: 35px !important;
  font-size: 16px;
}
</style>
