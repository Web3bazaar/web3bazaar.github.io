<template>
  <footer class="main-footer text-center">
    <!--Footer Bottom-->
    <div class="footer-bottom">
      <v-container>
        <v-row justify="space-between">
          <v-col cols="auto" class="copyright-text">
            Copyright ©{{ getYear }} Web3 Bazaar
          </v-col>
          <v-col v-if="isSoundEnabled" cols="auto">
            <button @click="toggleSound"><StopButton /></button>
          </v-col>
          <v-col v-else cols="auto">
            <button @click="toggleSound"><PlayButton /></button>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </footer>
</template>

<script>
import { mapState } from 'vuex'

import StopButton from '@/assets/img/pixel-logos/stopButton.vue'
import PlayButton from '@/assets/img/pixel-logos/playButton.vue'

export default {
  components: {
    StopButton,
    PlayButton,
  },
  computed: {
    getYear() {
      return new Date().getFullYear()
    },
    ...mapState('sound', ['isSoundEnabled']),
  },
  mounted() {
    this.$store.commit('sound/initializeSound')
    this.playSound()
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
    playSound() {
      if (this.isSoundEnabled) {
        this.audio = new Audio(
          require('~/assets/audio/background/Life-at-the-bazaar.mp3').default
        )

        this.audio.volume = 0
        const interval = 400 // 200ms interval

        const fadeout = () =>
          setInterval(() => {
            // Reduce volume by 0.05 as long as it is above 0
            // This works as long as you start with a multiple of 0.05!
            if (this.audio.volume < 0.4) {
              this.audio.volume += 0.03
            } else {
              // Stop the setInterval when 0 is reached
              clearInterval(fadeout)
            }
          }, interval)

        fadeout()
        this.audio.loop = true

        this.audio.play()
      }
    },
  },
}
</script>

<style></style>
