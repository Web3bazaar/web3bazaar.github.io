<template>
  <v-container>
    <v-row v-if="!newTrade" class="justify-space-evenly">
      <v-col cols="12">
        <div id="account_from">{{ value.address | truncate(9) }}</div>
      </v-col>
      <v-col cols="12" sm="12">
        <v-img
          contain
          class="project_logo mx-auto mb-1"
          :src="value.base_img"
        />
        <div id="project_from">{{ value.project_name }}</div>
      </v-col>
      <v-col cols="12" sm="12" class="d-flex justify-center pb-1">
        <v-img
          contain
          class="mr-1 ml-0"
          max-width="20px"
          :src="value.item_logo_url"
        />
        <p class="item-quantity mr-1">{{ value.item_quantity }}</p>

        <p class="item-name">{{ value.item_name }}</p>
      </v-col>
    </v-row>

    <v-row v-else class="justify-space-evenly">
      <v-col v-if="!accountFrom" cols="12">
        <p>Enter counter-party address</p>
        <v-text-field
          solo
          dense
          :value="value.address"
          :hide-details="true"
          @input="update('address', $event)"
        />
      </v-col>
      <v-col v-else cols="12" class="pt-10 pb-6">
        <div id="account_from">
          {{ accountFrom | truncate(9) }}
          <span style="opacity: 0.5; color: rgb(226, 65, 173); font-size: 12px">
            You
          </span>
        </div>
      </v-col>

      <v-col cols="12" sm="12">
        <v-img
          class="project_logo mx-auto"
          height="120"
          :src="value.base_img"
        />
        <p>Choose a project</p>

        <v-select
          solo
          dense
          hide-details
          :items="projects"
          item-value="project_name"
          item-text="project_name"
          :value="value.project_name"
          @input="update('project_name', $event)"
        >
        </v-select>
      </v-col>

      <v-col cols="12" sm="12">
        <p>Choose an asset</p>
        <v-select
          solo
          dense
          hide-details
          elevation="0"
          :items="projectItems"
          item-text="item_name"
          :value="value.item_name"
          @input="update('item_name', $event)"
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
                :src="item.item_logo_url"
              />
              {{ item.item_name }}
            </div>
          </template>
          <template #item="{ item }">
            <div class="d-flex simple-text">
              <v-img
                class="project_logo mx-auto mr-2"
                height="20"
                width="20"
                :src="item.item_logo_url"
              />
              {{ item.item_name }}
            </div>
          </template>
        </v-select>
      </v-col>
      <v-col cols="12" sm="12">
        <p>Amount</p>
        <v-text-field
          solo
          dense
          hide-details
          :value="value.item_quantity"
          @input="update('item_quantity', $event)"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    accountFrom: {
      type: String,
      default: '',
    },
    projects: {
      type: Array,
      default: () => [],
    },
    projectItems: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Object,
      default: () => {},
    },
    newTrade: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    async update(key, value) {
      this.$emit('input', { ...this.value, [key]: value })
      await this.$nextTick()
      if (key === 'project_name') {
        console.log('change base_url')
        this.$emit('input', {
          ...this.value,
          base_img: this.projects.find((p) => p.project_name === value)
            .base_img,
        })
      }
    },
  },
}
</script>

<style></style>
