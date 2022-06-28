<template>
  <section class="list-item">
    <v-container>
      <v-row class="justify-space-evenly">
        <v-col v-if="!creator" cols="12" class="pb-2">
          <p>Enter counter-party address</p>
          <v-text-field
            solo
            dense
            :value="value"
            :hide-details="true"
            @input="update"
          />
        </v-col>
        <v-col v-else cols="12" class="pt-10 pb-7">
          <div id="account_from">
            {{ creator | truncate(9) }}
            <span
              style="opacity: 0.5; color: rgb(226, 65, 173); font-size: 12px"
            >
              You
            </span>
          </div>
        </v-col>

        <v-col v-if="value" cols="12" sm="12">
          <p>Choose your assets</p>

          <v-expansion-panels class="projects-panels">
            <v-expansion-panel v-for="(project, i) in projects" :key="i">
              <v-expansion-panel-header
                v-if="getAssets(project) && getAssets(project).length > 0"
              >
                <v-container class="pa-0">
                  <v-row justify="space-between">
                    <v-col cols="auto" class="pa-0 d-flex align-center">
                      <img class="mr-1 mt-n1" :src="iconCheckmark" />
                      <p class="bold mb-0">
                        {{ project.assetName || project.projectName }}
                      </p>
                    </v-col>
                    <v-col
                      cols="auto"
                      class="selected-assets d-flex align-center"
                    >
                      <div v-if="numberSelectedAssets(getAssets(project)) > 0">
                        {{ numberSelectedAssets(getAssets(project)) }}
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
              </v-expansion-panel-header>
              <v-expansion-panel-content
                v-if="getAssets(project) && getAssets(project).length > 0"
              >
                <!-- {{ getAssets(project) }} -->
                <trade-asset-selection-grid
                  :value="getAssets(project)"
                  @change="selectedProjectsAssets($event, project)"
                />
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
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
import { mapState } from 'vuex'
export default {
  props: {
    creator: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
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
      iconCheckmark: require('@/assets/img/icons/checkmark.png'),
    }
  },
  computed: {
    ...mapState('trader', ['projects']),
  },
  watch: {},
  methods: {
    numberSelectedAssets(assets) {
      return assets.filter((a) => a.selected).length
    },

    async selectedProjectsAssets(val, project) {
      this.$logger('selectedProjectsAssets watch', val)
      const destination = this.creator ? 'creator' : 'executor'

      const currentSelectedAssets = val.filter((a) => a.selected)

      this.$store.commit(`trader/${destination}SelectedAssets`, {
        [project.contractAddress]: currentSelectedAssets,
      })

      this.$store.commit('trader/updateProject', {
        contractAddress: project.contractAddress,
        [`${destination}Assets`]: val,
      })
      await this.$nextTick()
    },
    getAssets(project) {
      if (this.creator) {
        return project.creatorAssets
      } else {
        return project.executorAssets
      }
    },
    async update(value) {
      this.$emit('input', value)
      await this.$nextTick()
    },
  },
}
</script>

<style lang="scss">
.selected-assets {
  div {
    padding: 4px;
    padding-top: 3px;
    height: 20px;
    min-width: 20px;
    border-radius: 50%;
    background-color: #a6a6a65e;
  }
}
.projects-panels {
  .v-expansion-panel-content__wrap {
    padding: 0 12px 16px;
  }
}
</style>
