<template>
  <v-container
    v-if="userTradesHistory && userTradesHistory.length > 0"
    class="trades-history"
  >
    <div class="trades--title">Your last trades</div>
    <history-table> </history-table>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['userTradesHistory']),
  },
}
</script>

<style></style>
