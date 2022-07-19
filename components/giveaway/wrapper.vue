<template>
  <v-card class="background-wrapper">
    <v-row justify="start">
      <v-col cols="12" sm="12" class="pt-6">
        <giveaway-card :project-name="projectName" />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: {
    projectName: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      tab: 0,
      iconCheckmark: require('@/assets/img/icons/checkmark.png'),
    }
  },
  computed: {},
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
.background-wrapper.v-card {
  // width: 200px;
  // height: 200px;
  display: block;
  position: relative;
  background-color: transparent;
  box-shadow: none !important;
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
