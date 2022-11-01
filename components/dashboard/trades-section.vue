<template>
  <v-container class="pa-0 trades-wrapper">
    <v-row
      v-if="!hasTradesPendingExecutor && !hasTradesPendingCreator"
      justify="center"
    >
      <v-col class="d-flex flex-column">
        <h5 class="d-flex mb-4 text-center">
          It seems like you don't have any open trades in the Bazaar.
        </h5>
        <v-spacer />
        <nuxt-link :to="'/create-new-trade'" class="mt-12">
          <ui-action-btn :btn-text="'New Trade'"> </ui-action-btn>
        </nuxt-link>
      </v-col>
    </v-row>
    <!-- Trades submitted by you -->
    <v-row v-if="hasTradesPendingCreator" justify="center">
      <v-container class="trades creator">
        <div class="trades--title">Trades submitted by you</div>
        <v-row
          v-for="trade in tradesCreator"
          :key="trade.id"
          class="trades-wrapper-row py-4"
          justify="center"
        >
          <DashboardTradeWrapper :trade="trade" :creator="account" />
        </v-row>
      </v-container>
    </v-row>
    <!-- Trades offered by others -->
    <v-row v-if="hasTradesPendingExecutor" class="mt-8">
      <v-container class="trades executor">
        <div class="trades--title">
          Trades submitted by your counter-parties
        </div>
        <v-row
          v-for="trade in tradesExecutor"
          :key="trade.id"
          class="trades-wrapper-row py-4"
          justify="center"
        >
          <DashboardTradeWrapper :trade="trade" />
        </v-row>
      </v-container>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  props: {
    creator: {
      type: Boolean,
      default: false,
    },
    trades: {
      type: Array,
      default: () => {},
    },
  },
  data() {
    return {
      TradeStatusMessages: {
        waitingExecutor: 'Waiting for counter-party deposit',
        depositExecutor: 'Counter-party assets deposited',
        alreadyClaimed:
          'You have already claimed these assets (waiting for counter-party to close the trade)',
        // 'TRADE_COMPLETED': ,
      },
    }
  },

  computed: {
    ...mapState('connector', ['isWalletConnected', 'account']),
    ...mapState('trader', ['projects']),
    ...mapState(['tradesCreator', 'tradesExecutor']),
    ...mapGetters(['hasTradesPendingCreator', 'hasTradesPendingExecutor']),
  },
  methods: {},
}
</script>

<style></style>
