<template>
  <v-container class="prizes-box">
    <v-row>
      <v-col v-for="(prize, i) in prizesList" :key="i" class="d-flex">
        <a
          :href="prizesURI[i]"
          target="_blank"
          class="d-flex"
          style="width: inherit"
        >
          <img
            class="mx-auto"
            :src="prize"
            style="max-height: 120px; max-width: 55px; cursor: pointer"
          />
        </a>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    prizesList: {
      type: Array,
      default: () => [],
    },
    prizesURI: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style>
.prizes-box img {
  border: solid 5px purple;
  border-radius: 12px;

  background-color: transparent;
  -webkit-box-shadow: 0px 0px 15px 1px rgba(255, 255, 255, 1);
  -moz-box-shadow: 0px 0px 15px 1px rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 15px 1px rgba(255, 255, 255, 1);
}
</style>
