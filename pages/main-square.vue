<template>
  <section
    class="main-square section-padding-100 darker"
    style="min-height: 70vh"
  >
    <v-container>
      <!-- Tittle -->
      <v-row justify="end">
        <v-col cols="12" lg="6" class="d-flex justify-center">
          <h1 class="gradient-text">Main Square</h1>
        </v-col>
        <v-col cols="12" lg="3" class="d-flex justify-center">
          <nuxt-link
            v-if="hasTradesPendingExecutor || hasTradesPendingCreator"
            class="mb-6"
            :to="'/create-new-trade'"
          >
            <ui-action-btn :btn-text="'New Trade'"> </ui-action-btn>
          </nuxt-link>
        </v-col>
      </v-row>
      <dashboard-trades-section> </dashboard-trades-section>
    </v-container>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

const mainSquare = {
  log: require('debug')('w3b:view:createNewTrade'),
  error: require('debug')('w3b:view:error:createNewTrade'),
}
export default {
  data() {
    return {
      tradesSubmittedByYou: [],
      tradesSubmittedByOthers: [],
    }
  },
  computed: {
    ...mapState('connector', ['isWalletConnected', 'account']),
    ...mapState('trader', ['projects']),
    ...mapState(['tradesCreator', 'tradesExecutor']),
    ...mapGetters(['hasTradesPendingCreator', 'hasTradesPendingExecutor']),
  },
  watch: {
    async account(val) {
      if (val) {
        await this.getTradesInfo()
      }
    },
  },
  async mounted() {
    if (this.isWalletConnected) {
      await this.getTradesInfo()
    }
  },
  methods: {
    async getTradesInfo() {
      mainSquare.log('CALLED getTradesInfo')
      await this.$store.dispatch('trader/GET_PROJECT_DATA')

      try {
        const res = await this.$store.dispatch('getTradesInfo')
        mainSquare.log('getTradesInfo finished:', res)

        this.loading = true

        this.$store.commit('modals/closeModal')
      } catch (error) {
        mainSquare.error('getTradesInfo error', error)
        this.$store.commit('modals/closeModal')
        this.loading = false
      }
    },

    getExternalUrl(contractAddress, assetId) {
      const p = this.projects.find((p) => p.contractAddress === contractAddress)
      if (p.contractType.toLowerCase() === 'erc20') {
        return p.blockExplorerUrl
      } else {
        return p.assetExternalLink + assetId
      }
    },
  },
}
</script>

<style lang="scss">
.trades--title {
  font-size: 1.3rem;
  margin-bottom: 16px;
  &::before {
    content: '';
    display: block;
    position: relative;
    width: 100%;
    height: 1px;
    background-image: linear-gradient(
      130deg,
      #eb3fa9 0%,
      #395ff6 50%,
      #eb3fa9 100%
    ) !important;
  }
}
</style>
