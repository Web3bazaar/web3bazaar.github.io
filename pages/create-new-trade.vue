<template>
  <section class="create-new-trade section-padding-100 darker">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" lg="6" class="d-flex justify-center">
          <h1 class="gradient-text">Create a trade</h1>
        </v-col>
      </v-row>
      <v-row v-if="isWalletConnected">
        <v-col>
          <trade-list-wrapper
            :new-trade="true"
            :projects="projects"
            :project-to-items="projectToItems"
            :project-from-items="projectFromItems"
          />
        </v-col>
        <v-col cols="12" class="text-center">
          <button type="submit" class="more-btn mb-15">Add trade</button>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {}
  },
  computed: {
    ...mapState('connector', ['isWalletConnected', 'account']),
    ...mapState('trader', ['projectFromItems', 'projectToItems', 'projects']),
  },
}
</script>

<style></style>
