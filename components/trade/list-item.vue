<template>
  <section class="list-item">
    <v-container v-if="!newTrade">
      <v-row class="justify-space-evenly">
        <!-- <v-col cols="12">
          <div id="account_from">{{ value.address | truncate(9) }}</div>
        </v-col> -->
        <v-col cols="5" class="d-flex justify-center">
          <v-img contain class="ml-0" max-height="150px" :src="value.baseImg" />
        </v-col>
        <v-col cols="7">
          <div id="project_from" class="text-left pb-3">
            <a
              :href="value.projectLink"
              target="_blank"
              class="item-quantity text-left small-links white--text"
            >
              {{ value.projectName }}
              <img :width="16" :src="linkIcon" />
            </a>
          </div>
          <p v-if="value.traderType !== 1" class="item-name text-left pb-0">
            <a
              :href="value.externalUrl"
              target="_blank"
              class="item-name text-left small-links grey--text"
            >
              Token ID {{ value.idAsset }}
              <img :width="16" :src="linkIcon" />
            </a>
          </p>
          <p class="item-quantity text-left grey--text">
            Amount {{ formattedQuantity }}
          </p>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else>
      <v-row class="justify-space-evenly">
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
            <span
              style="opacity: 0.5; color: rgb(226, 65, 173); font-size: 12px"
            >
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
            item-text="projectName"
            :value="value.projectName"
            :disabled="!value.address"
            @input="update('projectName', $event)"
          >
            <template #selection="{ item, index }">
              <v-chip v-if="index < maxProjectsToShow">
                <span>{{ item.projectName | truncate(8, 'start') }}</span>
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
  </section>
</template>

<script>
import { ethers } from 'ethers'

export default {
  components: {},
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

      linkIcon: require('@/assets/img/icons/link.png'),
    }
  },
  computed: {
    formattedQuantity() {
      return ethers.utils.formatUnits(
        (this.value?.itemAmount || 0) + '',
        'ether'
      )
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
        console.log(this.selectedProjects)
        this.selectedProjects.forEach((p) => {
          console.log(p)
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
      if (key === 'projectName') {
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
