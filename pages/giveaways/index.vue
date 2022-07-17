<template>
  <section class="giveaways section-padding-100 darker">
    <v-container>
      <v-row>
        <v-col cols="12" lg="3" class="d-flex justify-start">
          <nuxt-link class="mb-6" :to="'/giveaways'">
            <ui-action-btn :btn-text="'Giveaways'"> </ui-action-btn>
          </nuxt-link>
        </v-col>
        <v-col cols="12" lg="5" class="d-flex justify-center">
          <h1 class="gradient-text capitalize">{{ project }} Giveaway</h1>
        </v-col>
      </v-row>
      <v-row justify="space-between">
        <v-col cols="12" sm="3">
          <giveaway-rules> </giveaway-rules>
        </v-col>
        <v-col cols="12" sm="9">
          <giveaway-wrapper />
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
// import { ethers } from 'ethers'
// import { mapState, mapActions } from 'vuex'

// const giveaways = {
//   log: require('debug')('w3b:view:giveaways'),
//   error: require('debug')('w3b:view:error:giveaways'),
// }

export default {
  data() {
    return {}
  },
  async fetch() {},
  computed: {},
  watch: {},
  mounted() {},
  methods: {},
}
</script>

<style></style>
