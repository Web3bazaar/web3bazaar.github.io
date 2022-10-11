<template>
  <footer class="copyright">
    <!--Footer Bottom-->
    <div>
      <div>
        <div>
          <div class="playmusic_button">
            <div v-if="isSoundEnabled">
              <button @click="toggleSound" class="playmusic"><StopButton /></button>
            </div>
            <div v-else>
              <button @click="toggleSound" class="playmusic"><PlayButton /></button>
            </div>
          </div>
       
          <div>
            <h5>Copyright ©{{ getYear }} Web3 Bazaar</h5>
          </div>
        </div>
      </div>
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

<style scoped src="assets/css/for_index.css">
</style>
