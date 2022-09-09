<template>
  <v-container
    class="giveaway-small-card pa-2 pa-sm-3"
    :style="`--background-image: url('${project.backgroundImage}')`"
  >
    <v-row class="justify-center">
      <v-col cols="9" class="pb-0">
        <h3 class="capitalize text-center mb-0">{{ project.name }}</h3>
      </v-col>
      <v-col
        cols="12"
        md="12"
        class="d-flex flex-column justify-center item-info pt-0"
      >
        <giveaway-countdown
          :giveaway-end-date="project.giveawayEndDate"
          @giveaway-ended="hasEnded = true"
        >
        </giveaway-countdown>

        <p class="text-center mb-0">To win:</p>
      </v-col>

      <v-col cols="12" md="7" class="d-flex justify-center pb-6">
        <giveaway-prizes
          :prizes-list="project.prizesList"
          :prizes-u-r-i="project.prizesURI"
        >
        </giveaway-prizes>
      </v-col>

      <v-col cols="12" md="12" class="d-flex justify-center item-info">
        <ui-action-btn
          class=""
          :disabled="hasEnded"
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
      hasEnded: false,
    }
  },
}
</script>

<style lang="scss">
.giveaway-small-card {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 18px;
  position: relative;

  &::before {
    content: '';
    background-image: var(--background-image);
    background-size: cover;
    // background-position: center;
    opacity: 0.16;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: 0;
    border-radius: 18px;
  }

  * {
    color: white;
  }
}
</style>
