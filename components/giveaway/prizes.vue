<template>
  <v-container>
    <v-row>
      <v-col class="d-flex">
        <img
          class="mx-auto"
          :src="'https://app.aavegotchi.com/images/items/10.svg'"
          style="max-height: 120px; max-width: 55px; cursor: pointer"
        />
        <img
          class="mx-auto"
          :src="'https://app.aavegotchi.com/images/items/11.svg'"
          style="max-height: 120px; max-width: 55px; cursor: pointer"
        />
        <img
          class="mx-auto"
          :src="'https://app.aavegotchi.com/images/items/12.svg'"
          style="max-height: 120px; max-width: 55px; cursor: pointer"
        />
        <img
          class="mx-auto"
          :src="'https://app.aavegotchi.com/images/items/13.svg'"
          style="max-height: 120px; max-width: 55px; cursor: pointer"
        />
        <img
          class="mx-auto"
          :src="'https://app.aavegotchi.com/images/items/15.svg'"
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

<style></style>
