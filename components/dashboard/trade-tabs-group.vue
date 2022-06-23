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
        {{ project.projectName | truncate(30) }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="project in assetsByProject"
        :key="project.contractAddress"
      >
        <v-card
          class="background_image"
          :style="`--background-image: url('${project.backgroundImage}')`"
        >
          <v-row justify="start">
            <v-col
              v-for="asset in project.assets"
              :key="asset.idAsset"
              cols="3"
              sm="3"
              style=""
            >
              <dashboard-trade-tab-asset :asset="asset" />
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
      heroImage: 'https://vuejs.org/images/logo.png',
    }
  },
  computed: {
    currentSelectedProject() {
      return Object.keys(this.assetsByProject)[this.tab]
    },
  },
}
</script>
<style lang="scss">
.trade-tabs-group-card {
  border-radius: 0;
  height: 100%;
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
.background_image {
  // width: 200px;
  // height: 200px;
  display: block;
  position: relative;
}

.background_image::before {
  content: '';
  background-image: var(--background-image);
  // background-image: var(--hero-image);
  background-size: cover;
  // background-position: center;
  opacity: 0.09;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  z-index: 0;
}
</style>
