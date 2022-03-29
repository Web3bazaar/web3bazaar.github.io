<template>
  <v-app id="web3_bazaar">
    <layout-header-app />
    <div id="main-b" class="overflow-y-auto">
      <div class="jumbotron-fluid">
        <Nuxt />
      </div>
    </div>

    <layout-donations-section />
    <layout-footer-app />

    <!-- ##### Footer Area End ##### -->

    <modal-wrapper v-if="showModal" />
    <ProviderDetector
      @checkSuccess="metamaskCheckSuccess"
      @checkError="metamaskCheckError"
    />
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

import ModalWrapper from '@/modals/modal-wrapper.vue'

export default {
  name: 'DefaultLayout',
  components: {
    ModalWrapper,
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
      audio: null,
    }
  },
  head() {
    return {
      htmlAttrs: {
        // style: 'overflow-y:hidden',
      },
    }
  },
  computed: {
    ...mapState('modals', ['showModal', 'modalType']),
    ...mapState('sound', ['isSoundEnabled']),
  },
  mounted() {
    this.$store.commit('sound/initializeSound')
    this.playSound()
  },
  methods: {
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
            if (this.audio.volume < 0.6) {
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
    metamaskCheckSuccess() {
      this.$logger('CHECK COMPLETE')
      // load data now
    },
    metamaskCheckError(message) {
      this.$logger('CHECK COMPLETE')
      if (message) alert(message)
    },
  },
}
</script>
<style lang="scss">
/* width */
::-webkit-scrollbar {
  width: 30px;
}

/* Track */
::-webkit-scrollbar-track {
  background: rgba(116, 80, 254, 0.7);
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
// #main-b {
//   max-height: 100vh;
// }
</style>
