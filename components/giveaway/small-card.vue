<template>
  <v-container class="giveaway-small-card pa-2 pa-sm-3">
    <v-row class="justify-center">
      <v-col cols="12">
        <h3 class="capitalize text-center">{{ project.name }} Giveaway</h3>
      </v-col>
      <v-col
        cols="12"
        md="12"
        class="d-flex flex-column justify-center item-info"
      >
        <giveaway-countdown :giveaway-end-date="project.giveawayEndDate">
        </giveaway-countdown>
      </v-col>
      <v-col
        cols="12"
        md="12"
        class="d-flex flex-column justify-center item-info"
      >
        <img
          class="mx-auto"
          :src="project.prizeImage"
          style="max-height: 120px; max-width: 155px; cursor: pointer"
        />
      </v-col>
      <v-col
        cols="12"
        md="auto"
        class="d-flex flex-column justify-center item-info pt-0"
      >
        <ui-action-btn class="mb-8" :btn-text="'Enter Raffle'"> </ui-action-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    project: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      giveawayEndDate: new Date('2022-07-20T12:00:00Z'),
      timeToEndDate: {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        ended: false,
      },
    }
  },
  mounted() {},
}
</script>

<style lang="scss">
.giveaway-small-card {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 18px;
  * {
    color: white;
  }
}
</style>
