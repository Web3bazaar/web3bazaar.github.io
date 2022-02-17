<template>
  <v-select
    solo
    dense
    hide-details
    elevation="0"
    :items="projectItems"
    item-text="name"
    :value="value.name"
    @input="update('name', $event)"
  >
    <template #prepend-inner="item">
      <v-img
        class="project_logo mx-auto"
        height="120"
        :src="item.item_logo_url"
      />
    </template>
    <template #selection="{ item }">
      <div class="d-flex simple-text">
        <v-img
          class="project_logo mx-auto mr-2"
          height="20"
          width="20"
          :src="item.image"
        />
        {{ item.name }}
      </div>
    </template>
    <template #item="{ item }">
      <div class="d-flex simple-text">
        <v-img
          class="project_logo mx-auto mr-2"
          height="20"
          width="20"
          :src="item.image"
        />
        {{ item.name }}
      </div>
    </template>
  </v-select>
</template>

<script>
// deprecated
export default {}
</script>

<style></style>
