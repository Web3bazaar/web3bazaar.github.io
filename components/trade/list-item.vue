<template>
  <v-container class="list-item">
    <v-row v-if="!newTrade" class="justify-space-evenly">
      <v-col cols="12">
        <div id="account_from">{{ value.address | truncate(9) }}</div>
      </v-col>
      <v-col cols="12" sm="12">
        <div id="project_from">{{ value.project_name }}</div>
      </v-col>
      <v-col cols="12" sm="5" class="d-flex justify-center pb-1">
        <v-img contain class="ml-0" max-height="150px" :src="value.base_img" />
      </v-col>
      <v-col cols="12" sm="6" class="text-left pb-1">
        <p class="item-quantity text-left">
          Item Quantity {{ formattedQuantity }}
        </p>

        <p class="item-name text-left">Item Name {{ value.item_name }}</p>
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
      <!--  <v-col cols="12" sm="12">
        <p>Amount</p>
        <v-text-field
          solo
          dense
          hide-details
          :value="value.amount"
          @input="update('amount', $event)"
        />
      </v-col> -->
    </v-row>
  </v-container>
</template>

<script>
import { ethers } from 'ethers'

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
  computed: {
    formattedQuantity() {
      return ethers.utils.formatUnits(this.value?.item_quantity + '', 'ether')
    },
  },
  watch: {
    selectedProjectsAssets(val) {
      this.$logger(val)
      this.$emit('selectedProjectsAssets:update', val)
    },
  },
  methods: {
    updateSelectedProjectsAssets() {
      const selectedProjectsAssets = []
      if (this.accountFrom) {
        this.selectedProjects.forEach((p) => {
          selectedProjectsAssets.push(...(p.projectFromItems || []))
        })
      } else {
        this.selectedProjects.forEach((p) => {
          selectedProjectsAssets.push(...(p.projectToItems || []))
        })
      }
      // selectedProjectsAssets.forEach(
      //   (a) => (a.selected = false),
      //   (a) => (a.chosenAmount = 0)
      // )
      return selectedProjectsAssets
    },
    async update(key, value) {
      this.$emit('input', { ...this.value, [key]: value })
      await this.$nextTick()
      if (key === 'project_name') {
        // console.log('project_name', key, value, oldVal)
        // console.log('update projects list')

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
