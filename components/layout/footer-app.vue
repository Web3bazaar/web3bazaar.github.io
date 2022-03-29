<template>
  <footer class="main-footer text-center">
    <!--Footer Bottom-->
    <div class="footer-bottom">
      <div class="auto-container">
        <div class="copyright-text">Copyright ©{{ getYear }} Web3 Bazaar</div>
        <button @click="toggleSound">Toggle my sound preferences!</button>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  computed: {
    getYear() {
      return new Date().getFullYear()
    },
  },
  methods: {
    toggleSound() {
      this.$store.commit('sound/toggleSound')
      if (!this.audio) {
        this.playSound()
      } else if (this.audio.paused) {
        this.audio.play()
      } else {
        this.audio.pause()
      }
      // this.audio = null
    },
  },
}
</script>

<style></style>
