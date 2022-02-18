<template>
  <v-container class="list-item">
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
        <p>Choose projects</p>

        <v-select
          v-model="selectedProjects"
          solo
          dense
          hide-details
          multiple
          label="Choose projects"
          :items="projects"
          return-object
          item-text="project_name"
          :value="value.project_name"
          @input="update('project_name', $event)"
        >
          <template #selection="{ item, index }">
            <v-chip v-if="index < maxProjectsToShow">
              <span>{{ item.project_name | truncate(8, 'start') }}</span>
            </v-chip>
            <span
              v-if="index === maxProjectsToShow"
              class="grey--text text-caption"
            >
              (+{{ value.length - maxProjectsToShow }} others)
            </span>
          </template>
        </v-select>
      </v-col>

      <v-col cols="12" sm="12">
        <p>Choose an asset</p>
        <trade-asset-selection-grid v-model="selectedProjectsAssets" />
      </v-col>
      <v-col cols="12" sm="12">
        <p>Amount</p>
        <v-text-field
          solo
          dense
          hide-details
          :value="value.amount"
          @input="update('amount', $event)"
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
  data() {
    return {
      maxProjectsToShow: 3,
      selectedProjects: [],
      selectedProjectsAssets: [],
    }
  },
  computed: {},
  methods: {
    updateSelectedProjectsAssets() {
      const selectedProjectsAssets = []
      if (this.accountFrom) {
        this.selectedProjects.forEach((p) => {
          selectedProjectsAssets.push(...(p.projectFromItems || []))
        })
      }
      selectedProjectsAssets.forEach(
        (a) => (a.selected = false),
        (a) => (a.chosenAmount = 0)
      )
      return selectedProjectsAssets
    },
    async update(key, value) {
      this.$emit('input', { ...this.value, [key]: value })
      await this.$nextTick()
      if (key === 'project_name') {
        console.log('project_name', key, value)
        console.log('update projects list')
        this.selectedProjectsAssets = this.updateSelectedProjectsAssets()
        // this.$emit('input', {
        //   ...this.value,
        //   base_img: this.projects.find((p) => p.project_name === value)
        //     .base_img,
        // })
      }
    },
  },
}
</script>

<style></style>
