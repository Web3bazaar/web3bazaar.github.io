<template>
  <v-container class="trades-history">
    <div class="trades--title">Your trades history</div>
    <v-row
      v-for="trade in tradesHistory"
      :key="trade.id"
      class="trades-wrapper-row py-4"
      justify="center"
    >
      <DashboardTradeWrapper :trade="trade" />
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['tradesHistory']),
  },
}
</script>

<style></style>
