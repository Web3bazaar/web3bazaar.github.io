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
          <giveaway-wrapper :project="project" />
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {
  asyncData({ params }) {
    const { project } = params // When calling /abc the slug will be "abc"
    return { project }
  },
}
</script>

<style lang="scss" scoped>
.capitalize {
  text-transform: capitalize;
}
</style>
