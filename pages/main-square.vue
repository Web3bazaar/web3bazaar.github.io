<template>
  <section class="main-square section-padding-100 darker">
    <v-container>
      <!-- Tittle -->
      <v-row justify="end">
        <v-col cols="12" lg="6" class="d-flex justify-center">
          <h1 class="gradient-text">Main Square</h1>
        </v-col>
        <v-col cols="12" lg="3" class="d-flex justify-center">
          <nuxt-link :to="'/create-new-trade'">
            <button class="more-btn mb-15">Create a new trade</button>
          </nuxt-link>
        </v-col>
      </v-row>
      <!-- Trades submitted by you -->
      <v-row>
        <v-container class="trades submitted">
          <div class="trades--title">Trade submitted by you</div>
          <trade-list-wrapper />
        </v-container>
      </v-row>
      <!-- Trades offered by others -->
      <v-row>
        <v-container class="trades offered">
          <div class="trades--title">
            Trade submitted by your counter-parties
          </div>
          <trade-list-wrapper />
        </v-container>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {}
</script>

<style lang="scss"></style>
