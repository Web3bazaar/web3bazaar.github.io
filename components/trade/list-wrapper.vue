<template>
  <v-container class="trade-wrapper">
    {{ itemTo }}
    <v-row :class="{ 'new-trade': newTrade }" justify="center">
      <!-- From -->
      <v-col cols="12" sm="4" class="item-col">
        <p>From</p>
        <v-card class="item-card">
          <trade-list-item
            v-model="itemFrom"
            :account-from="account"
            :new-trade="newTrade"
            :projects="projects"
            :project-items="projectFromItems"
          />
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
      <v-col cols="12" sm="4" class="item-col">
        <p>To</p>

        <v-card class="item-card">
          <trade-list-item
            v-model="itemTo"
            :new-trade="newTrade"
            :projects="projects"
            :project-items="projectToItems"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    newTrade: {
      type: Boolean,
      default: false,
    },
    projects: {
      type: Array,
      default: () => [],
    },
    projectFromItems: {
      type: Array,
      default: () => [],
    },
    projectToItems: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {}
  },
  computed: {
    ...mapState('connector', ['account']),
    projectTo() {
      return this.itemTo.project_name
    },
    projectFrom() {
      return this.itemFrom.project_name
    },
    itemTo: {
      get() {
        return this.$store.state.trader.itemTo
      },
      set(value) {
        this.$store.commit('trader/itemTo', value)
      },
    },
    itemFrom: {
      get() {
        return this.$store.state.trader.itemFrom
      },
      set(value) {
        this.$store.commit('trader/itemFrom', value)
      },
    },
  },
  watch: {
    projectFrom(val) {
      console.log('projectFrom list-wrapper:', val)
      // TODO: fetch list of items
      // this.$store.dispatch('trader/listOwnedIds', {
      //   selectedProjects: val,
      //   from: true,
      // })
    },
    projectTo(val) {
      console.log('projectTo list-wrapper: ', val)
      // TODO: fetch list of items
      this.$store.dispatch('trader/listOwnedIds', {
        selectedProjects: val,
        to: true,
      })
    },
  },
  created() {
    // just for testing
    this.$store.commit('trader/itemFrom', {
      ...this.itemFrom,
      address: this.account,
    })

    this.$store.dispatch('trader/listOwnedIds', {
      selectedProjects: this.projects,
      from: true,
    })
  },
}
</script>

<style lang="scss">
.trade-wrapper {
  .item-col:first-child .item-card .container {
    left: 3px;
  }
  .item-col:last-child .item-card .container {
    right: 3px;
  }
}
.new-trade {
  .v-card.item-card {
    height: 500px;
  }
}
.trade-item {
  div[class^='col'] {
    position: relative;
  }
}
.v-card.item-card {
  height: 260px;
  position: relative;
  background-image: linear-gradient(
    130deg,
    #eb3fa9 0%,
    #395ff6 50%,
    #eb3fa9 100%
  );
  color: whitesmoke;
  * {
    text-align: center;
  }

  .container {
    height: 100%;

    border-radius: 10px;
    background-color: #0a1026;
    position: relative;
    border: solid 1px rgba(255, 255, 255, 0.25);
    text-align: left;
    padding: 10px;
    // width: 97.4%;
    // height: 98.7%;

    top: -3px;
    p {
      margin-bottom: 4px;
    }
    &::before {
      content: '';
      position: absolute;
      width: 102.6%;
      height: 101.3%;
      top: -3px;
      left: -3px;
      border-radius: 10px;
      z-index: -1;
      background-image: linear-gradient(
        130deg,
        #eb3fa9 0%,
        #395ff6 50%,
        #eb3fa9 100%
      );
    }
  }
}
</style>
