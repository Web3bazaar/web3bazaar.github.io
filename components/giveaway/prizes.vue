<template>
  <v-container class="prizes-box">
    <v-row>
      <v-col class="d-flex">
        <img
          v-for="prize in prizesList"
          :key="prize"
          class="mx-auto"
          :src="prize"
          style="max-height: 120px; max-width: 55px; cursor: pointer"
        />
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
  },
}
</script>

<style>
.prizes-box img {
  border: solid 5px purple;
  border-radius: 12px;

  background-color: rgba(0, 0, 0, 0.5);
  -webkit-box-shadow: 0px 0px 15px 1px rgba(255, 255, 255, 1);
  -moz-box-shadow: 0px 0px 15px 1px rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 15px 1px rgba(255, 255, 255, 1);
}
</style>
