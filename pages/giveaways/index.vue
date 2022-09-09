<template>
  <section class="giveaways section-padding-100 darker">
    <v-container>
      <v-row>
        <v-col cols="12" class="d-flex justify-center">
          <h1 class="gradient-text capitalize">Active Giveaways</h1>
        </v-col>
      </v-row>
      <v-row
        v-if="currentGiveawaysProjectsCurrentChain.length > 0"
        justify="center"
      >
        <v-col
          v-for="project in currentGiveawaysProjectsCurrentChain"
          :key="project.name"
          cols="12"
          lg="8"
          class="d-flex justify-center"
        >
          <nuxt-link
            :event="project.giveawayEnded ? '' : 'click'"
            :to="'/giveaways/' + project.nameId"
          >
            <giveaway-small-card
              v-if="project.nameId !== 'web3bazaar'"
              :project="project"
            >
            </giveaway-small-card>
          </nuxt-link>
        </v-col>
      </v-row>
      <v-row v-else
        ><v-col cols="12" lg="12" class="d-flex justify-center">
          <h2 class="text-center">No active giveaways at the moment</h2>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
// import { ethers } from 'ethers'
import { mapState } from 'vuex'

// const giveaways = {
//   log: require('debug')('w3b:view:giveaways'),
//   error: require('debug')('w3b:view:error:giveaways'),
// }

export default {
  data() {
    return {}
  },
  computed: {
    ...mapState('giveaway', ['currentGiveawaysProjects']),
    ...mapState('networks', ['activeNetwork']),

    currentGiveawaysProjectsCurrentChain() {
      return this.currentGiveawaysProjects.filter(
        (e) => e.chainId === this.activeNetwork
      )
    },
  },
  watch: {},
  created() {},
  async mounted() {
    await this.$store.dispatch('giveaway/GET_GIVEAWAYS_DATA')
    this.$store.commit('modals/closeModal')
  },
  methods: {},
}
</script>

<style></style>
