<template>
  <v-btn
    class="more-btn pixel2 w3b-bg-gradient"
    type="submit"
    :small="small"
    :loading="loading"
    :disabled="disabled"
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
    small: {
      type: Boolean,
      default: false,
    },
    btnText: {
      default: '',
      type: String,
    },
    loading: {
      default: false,
      type: Boolean,
    },
    disabled: {
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

<style scoped>
.login-btn {
  width: 176px !important;
  height: 35px !important;
  font-size: 16px;
}
</style>
<style lang="scss">
.w3b-bg-gradient.v-btn--disabled {
  filter: grayscale(1);

  &::before,
  &::after {
    filter: grayscale(1);
  }
}
</style>
