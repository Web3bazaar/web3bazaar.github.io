<template>
  <section class="giveaways section-padding-100 darker">
    <v-container>
      <v-row>
        <v-col cols="12" lg="12" class="d-flex justify-center">
          <h1 class="gradient-text capitalize">{{ project }} Giveaway</h1>
        </v-col>
      </v-row>
      <v-row justify="space-between">
        <v-col cols="12" sm="12">
          <giveaway-countdown :giveaway-end-date="giveawayEndDate">
          </giveaway-countdown>
        </v-col>
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
const web3bazaar = 'web3bazaar'
export default {
  async asyncData({ store }) {
    store.commit('modals/setPopupState', {
      type: 'loading',
      isShow: true,
    })
    await store.dispatch('giveaway/GET_GIVEAWAYS_DATA')

    store.commit('modals/closeModal')

    return await store.dispatch('giveaway/getProjectData', {
      projectName: web3bazaar,
    })
  },
  data() {
    return { project: web3bazaar }
  },
}
</script>

<style lang="scss" scoped></style>
