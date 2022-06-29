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
  async fetch() {
    await this.$store.dispatch('trader/GET_PROJECT_DATA')
  },
  head() {
    return {
      htmlAttrs: {
        // style: 'overflow-y:hidden',
      },
      meta: [],
    }
  },
  computed: {
    ...mapState('modals', ['showModal', 'modalType']),
  },

  methods: {
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
  width: 6px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #888;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgba(116, 80, 254, 0.7);
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgba(116, 80, 254, 1);
}
// #main-b {
//   max-height: 100vh;
// }
</style>
