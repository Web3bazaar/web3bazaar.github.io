<template>
  <v-container class="giveaway-small-card pa-2 pa-sm-3">
    <v-row class="justify-center">
      <v-col cols="9" class="pb-0">
        <h3 class="capitalize text-center mb-0">{{ project.name }}</h3>
      </v-col>
      <v-col
        v-if="false"
        cols="12"
        md="3"
        class="d-flex justify-center align-center item-info px-0"
      >
        <img
          class="mx-auto"
          :src="project.prizeImage"
          style="max-height: 120px; max-width: 55px; cursor: pointer"
        />
        <!-- this needs to be dynamic -->
        3 / 100000
      </v-col>
      <v-col
        cols="12"
        md="12"
        class="d-flex flex-column justify-center item-info pt-0"
      >
        <giveaway-countdown :giveaway-end-date="project.giveawayEndDate">
        </giveaway-countdown>

        <p class="text-center mb-0">To win:</p>
      </v-col>

      <v-col cols="12" md="7" class="d-flex justify-center prizes-box pb-6">
        <giveaway-prizes :prizes-list="[]"> </giveaway-prizes>
      </v-col>

      <v-col cols="12" md="12" class="d-flex justify-center item-info">
        <ui-action-btn
          class=""
          style="max-width: 200px"
          :btn-text="'Enter Raffle'"
        >
        </ui-action-btn>
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
  position: relative;

  &::before {
    content: '';
    // TODO: change this to a variable
    background-image: url('https://cryptocdn.fra1.cdn.digitaloceanspaces.com/sites/8/1-hvdvynbNjWCcpppHv8nuuw.png');
    // background-image: var(--hero-image);
    background-size: cover;
    // background-position: center;
    opacity: 0.16;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: 0;
  }
  .prizes-box img {
    border: solid 5px purple;
    border-radius: 12px;

    background-color: rgba(0, 0, 0, 0.5);
    -webkit-box-shadow: 0px 0px 15px 1px rgba(255, 255, 255, 1);
    -moz-box-shadow: 0px 0px 15px 1px rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 15px 1px rgba(255, 255, 255, 1);
  }
  * {
    color: white;
  }
}
</style>
