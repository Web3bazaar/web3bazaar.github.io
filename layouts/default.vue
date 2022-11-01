<template>
  <div id="web3_bazaar" class="body">

    <layout-header-app />

    <div>
      <div v-if="!loading" class="jumbotron-fluid">
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
   
  </div>
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
      loading: true,
    }
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
    ...mapState('connector', ['isWalletConnected', 'chainId']),
  },
  async mounted() {},
  methods: {
    async metamaskCheckSuccess() {
      this.$logger('CHECK COMPLETE')
      // load data now
      this.$store.commit('modals/setPopupState', {
        type: 'loading',
        isShow: true,
      })

      await this.$store.dispatch('trader/GET_PROJECT_DATA')
      this.$store.commit('modals/closeModal')
      this.loading = false
    },
    metamaskCheckError(message) {
      this.$logger('CHECK COMPLETE')
      if (message) alert(message)
      this.loading = false
    },
  },
}
</script>



<style lang="scss">

.body {

    font-weight:100;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow-y: visible;
    display:flex;
    flex-direction: column;
} 

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

#web3_bazaar{
  width: 100%;
}
</style>
