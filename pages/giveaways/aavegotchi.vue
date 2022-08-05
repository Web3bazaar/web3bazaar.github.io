<template>
  <section class="giveaways section-padding-100 darker">
    <v-container v-if="raffleContractAddress">
      <v-row>
        <v-col cols="12" lg="12" class="d-flex justify-center pb-0">
          <h1 class="gradient-text capitalize mb-0">
            {{ projectName }} Giveaway
          </h1>
        </v-col>
      </v-row>
      <v-row justify="start">
        <v-col
          cols="12"
          sm="3"
          class="d-flex justify-center align-center flex-column tickets-info px-0 pt-5"
        >
          <img
            v-if="raffleTicketImage"
            class="mx-4"
            :src="raffleTicketImage"
            style="max-height: 80px; max-width: 100%"
          />
          <div>
            {{ projectMaxSupply - totalIssued }} / {{ projectMaxSupply }} left
          </div>
        </v-col>
        <v-col cols="12" sm="6" class="pt-0 pb-4">
          <p class="text-center mb-0">Prizes:</p>
          <giveaway-prizes :prizes-list="prizesList"> </giveaway-prizes>
        </v-col>

        <v-col cols="12" sm="12" class="pt-1">
          <giveaway-countdown :giveaway-end-date="giveawayEndDate">
          </giveaway-countdown>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" sm="3" class="">
          <giveaway-rules> </giveaway-rules>
        </v-col>
        <v-col cols="12" sm="9" class="pt-0">
          <giveaway-wrapper :project-name="projectName" />
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

    //   store.commit('modals/closeModal')

    //   return
  },
  data() {
    return {
      projectName: aavegotchi,
      projectMaxSupply: 0,
      totalIssued: 0,
      raffleContractAddress: null,
    }
  },
  async created() {},
  async mounted() {
    const data = await this.$store.dispatch('giveaway/getProjectData', {
      projectName: aavegotchi,
    })

    Object.assign(this, data)
    ;({ maxSupply: this.projectMaxSupply, totalIssued: this.totalIssued } =
      await this.$store.dispatch('giveaway/getProjectMaxSupply', {
        nameId: this.nameId,
        raffleContractAddress: this.raffleContractAddress,
      }))

    this.$store.commit('modals/closeModal')
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
