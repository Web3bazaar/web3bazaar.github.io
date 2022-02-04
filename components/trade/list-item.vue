<template>
  <v-container class="">
    <v-row class="justify-space-evenly">
      <v-col cols="12">
        <div id="account_from">{{ item.address }}</div>
      </v-col>

      <v-col cols="12" sm="12">
        <v-img
          contain
          class="project_logo mx-auto"
          :src="'https://2264006251-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F-MdunBb1X4ZSri9eSiAH%2Fuploads%2Fj3zLlHOEGa4kKLWE3qsv%2FTwitter_art.png?alt=media&token=bb90dda5-cf06-4395-bc59-42a3d45bb403'"
        />
        <div id="project_from">{{ item.project_name }}</div>
      </v-col>
      <v-col cols="12" sm="12" class="d-flex justify-center pb-1">
        <p class="item-quantity mr-1">{{ item.item_quantity }}</p>

        <p class="item-name">{{ item.item_name }}</p>
        <v-img
          contain
          class="mx-auto"
          max-width="30px"
          :src="item.item_logo_url"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style></style>
