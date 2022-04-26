<template>
  <v-container class="pa-0 trades-wrapper">
    <v-row
      v-if="!hasTradesPendingExecutor && !hasTradesPendingCreator"
      justify="center"
    >
      <v-col cols="12" lg="6" class="d-flex flex-column align-center">
        <h4 class="d-flex mb-4 text-center">
          It seems like there's no active trades submitted by or for you at the
          moment
        </h4>
        <v-spacer />
        <nuxt-link :to="'/create-new-trade'" class="">
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
          <trade-list-wrapper :trade="trade" :creator="true" />
        </v-row>
      </v-container>
    </v-row>
    <!-- Trades offered by others -->
    <v-row v-if="hasTradesPendingExecutor" class="mt-8">
      <v-container class="trades executor">
        <div class="trades--title">Trades submitted by your counterparties</div>
        <v-row
          v-for="trade in tradesExecutor"
          :key="trade.id"
          class="trades-wrapper-row py-4"
          justify="center"
        >
          <trade-list-wrapper :trade="trade" />
        </v-row>
        <!-- 
          <trade-list-wrapper
            :trades="tradesExecutor"
            @updateDashboard="getTradesInfo"
          /> -->
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
  computed: {
    ...mapState('connector', ['isWalletConnected', 'account']),
    ...mapState('trader', ['projects']),
    ...mapState(['tradesCreator', 'tradesExecutor']),
    ...mapGetters(['hasTradesPendingCreator', 'hasTradesPendingExecutor']),
  },
}
</script>

<style></style>
