<template>
  <v-container class="pa-0">
    <v-row
      v-for="trade in trades"
      :key="trade.id"
      class="list-trade-row py-4"
      justify="center"
    >
      <trade-list-wrapper :trade="trade" :creator="creator" />
    </v-row>
  </v-container>
</template>

<script>
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
}
</script>

<style></style>
