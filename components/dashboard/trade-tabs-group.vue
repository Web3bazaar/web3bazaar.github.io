<template>
  <v-card class="trade-tabs-group-card">
    <v-tabs
      v-model="tab"
      class="trade-tabs"
      background-color="light-grey"
      color="white"
      dark
    >
      <v-tab v-for="project in assetsByProject" :key="project.contractAddress">
        <img class="mr-1 mt-n1" :src="iconCheckmark" />
        {{ (project.assetName || project.projectName) | truncate(30) }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="project in assetsByProject"
        :key="project.contractAddress"
      >
        <v-card
          class="background_image"
          :style="`--background-image: url('${getBackgroundImg(project)}')`"
        >
          <v-row justify="start">
            <v-col
              v-for="asset in project.assets"
              :key="asset.idAsset"
              cols="3"
              sm="3"
              style=""
            >
              <dashboard-trade-tab-asset
                :asset="asset"
                :asset-name="project.assetName"
              />
            </v-col>
          </v-row>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
export default {
  props: {
    assetsByProject: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      tab: 0,
      iconCheckmark: require('@/assets/img/icons/checkmark.png'),
    }
  },
  computed: {
    currentSelectedProject() {
      return Object.keys(this.assetsByProject)[this.tab]
    },
  },
  methods: {
    getBackgroundImg(project) {
      return (
        project.banner ||
        project.backgroundImage ||
        require('assets/img/bg-img/pattern.png')
      )
    },
  },
}
</script>
<style lang="scss">
.trade-tabs-group-card {
  border-radius: 0;
  height: 100%;
  .background_image {
    max-height: 270px;
    height: 100%;

    overflow-x: hidden;
    overflow-y: auto;
    padding: 12px;
  }
}

.trade-tabs {
  .v-tabs-bar {
    height: 42px;
  }
  .v-tab {
    max-width: unset;
    font-size: 0.8rem;
  }
}
.background_image.v-card {
  // width: 200px;
  // height: 200px;
  display: block;
  position: relative;
  background-color: #393939;
}

.background_image::before {
  content: '';
  background-image: var(--background-image);
  // background-image: var(--hero-image);
  background-size: cover;
  // background-position: center;
  opacity: 0.16;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  z-index: 0;
}
</style>
