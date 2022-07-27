<template>
  <section class="giveaways section-padding-100 darker">
    <v-container>
      <v-row>
        <v-col cols="12" lg="12" class="d-flex justify-center">
          <h1 class="gradient-text capitalize">{{ project }} Giveaway</h1>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" sm="3" class="d-none d-sm-flex"> </v-col>

        <v-col cols="12" sm="6">
          <p class="text-center mb-0">Prizes:</p>
          <giveaway-prizes :prizes-list="prizesList"> </giveaway-prizes>
        </v-col>
        <v-col cols="12" sm="3" class="d-none d-sm-flex"> </v-col>
        <v-col
          cols="12"
          sm="3"
          class="d-flex justify-center align-center tickets-info px-0"
        >
          <img
            class="mx-4"
            :src="raffleTicketImage"
            style="max-height: 120px; max-width: 85px"
          />
          <!-- this needs to be dynamic -->
          {{ totalIssued }} / {{ projectMaxSupply }} left
        </v-col>
        <v-col cols="12" sm="6" class="px-0">
          <giveaway-countdown :giveaway-end-date="giveawayEndDate">
          </giveaway-countdown>
        </v-col>

        <v-col cols="12" sm="3" class="d-none d-sm-flex"> </v-col>
      </v-row>
      <v-row justify="space-between">
        <v-col cols="12" sm="3">
          <giveaway-rules> </giveaway-rules>
        </v-col>
        <v-col cols="12" sm="9">
          <giveaway-wrapper :project-name="project" />
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
const aavegotchi = 'aavegotchi'
export default {
  async asyncData({ store }) {
    store.commit('modals/setPopupState', {
      type: 'loading',
      isShow: true,
    })
    await store.dispatch('giveaway/GET_GIVEAWAYS_DATA')

    store.commit('modals/closeModal')

    return await store.dispatch('giveaway/getProjectData', {
      projectName: aavegotchi,
    })
  },
  data() {
    return {
      project: aavegotchi,
      projectMaxSupply: 0,
      totalIssued: 0,
    }
  },
  async mounted() {
    ;({ maxSupply: this.projectMaxSupply, totalIssued: this.totalIssued } =
      await this.$store.dispatch('giveaway/getProjectMaxSupply', {
        nameId: this.nameId,
        raffleContractAddress: this.raffleContractAddress,
      }))
  },
}
</script>

<style lang="scss" scoped>
.tickets-info {
  font-size: 1.2rem;
}
.prizes-box img {
  border: solid 5px purple;
  border-radius: 12px;

  background-color: rgba(0, 0, 0, 0.5);
  -webkit-box-shadow: 0px 0px 15px 1px rgba(255, 255, 255, 1);
  -moz-box-shadow: 0px 0px 15px 1px rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 15px 1px rgba(255, 255, 255, 1);
}
</style>
