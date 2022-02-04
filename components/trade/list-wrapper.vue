<template>
  <v-container>
    <v-row class="trade-item" justify="center">
      <!-- From -->
      <v-col cols="12" sm="2" class="item-col">
        <v-card class="item-card">
          <trade-list-item :item="itemFrom" />
        </v-card>
      </v-col>

      <v-col cols="12" sm="1" class="d-flex align-center">
        <v-img
          contain
          class="mx-auto"
          max-width="40px"
          :src="require('@/assets/img/icons/switch.png')"
        />
      </v-col>
      <!-- To -->
      <v-col cols="12" sm="2" class="item-col">
        <v-card class="item-card">
          <trade-list-item :item="itemTo" />
        </v-card>
      </v-col>
    </v-row>
    <v-row class="trade-item" justify="center">
      <v-col cols="12" class="text-center">
        <button type="submit" class="more-btn mb-15">Claim back</button>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      itemFrom: {
        address: '0x999...123',
        project_name: 'SunFlower Farms',
        item_name: 'Sunflower',
        item_quantity: 10,
        item_logo_url:
          'https://2264006251-files.gitbook.io/~/files/v0/b/gitbook-28427.appspot.com/o/assets%2F-MdunBb1X4ZSri9eSiAH%2F-MdunWUWe2Sfa8_DWsah%2F-Mduu7lwWSjVljFv_AOn%2Ffruit.png?alt=media&token=2907b67b-da46-4548-858f-a37885b887f0',
      },
      itemTo: {
        address: '0x123...999',
        project_name: 'SunFlower Farms',
        item_name: 'potato',
        item_quantity: 30,
        item_logo_url:
          'https://2264006251-files.gitbook.io/~/files/v0/b/gitbook-28427.appspot.com/o/assets%2F-MdunBb1X4ZSri9eSiAH%2F-MdunWUWe2Sfa8_DWsah%2F-MduuF0vhWOH6ROHcNKn%2Ffruit.png?alt=media&token=17281d54-377f-4f91-be9b-367f266aabb5',
      },
    }
  },
}
</script>

<style lang="scss">
.trade-item {
  .item-col:first-child .item-card .container {
    left: 3px;
  }
  .item-col:last-child .item-card .container {
    right: 3px;
  }
}
</style>
