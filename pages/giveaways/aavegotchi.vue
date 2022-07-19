<template>
  <section class="giveaways section-padding-100 darker">
    <v-container>
      <v-row>
        <v-col cols="12" lg="12" class="d-flex justify-center">
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
  data() {
    return { project: 'aavegotchi' }
  },
}
</script>

<style lang="scss" scoped></style>
