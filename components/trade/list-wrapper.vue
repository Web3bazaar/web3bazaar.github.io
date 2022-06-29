<template>
  <v-container
    class="list-wrapper trades-wrapper-row"
    :class="{ disabledContainer: disabled }"
  >
    <v-row :class="{ 'new-trade': newTrade }" justify="center">
      <v-col cols="12" sm="5" class="item-col">
        <p class="">You</p>
        <v-card class="item-card">
          <trade-list-item
            v-model="account"
            :creator="account"
            :new-trade="newTrade"
            :projects="projects"
          />
        </v-card>
      </v-col>

      <v-col cols="12" sm="1" class="d-flex align-center">
        <v-img
          contain
          class="mx-auto mt-16"
          max-width="40px"
          :src="require('@/assets/img/icons/switch.png')"
        />
      </v-col>
      <!-- To -->
      <v-col cols="12" sm="5" class="item-col">
        <p class="">Counter-party</p>
        <v-card class="item-card">
          <trade-list-item
            v-model="executorAddress"
            :new-trade="newTrade"
            :projects="projects"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

import { ethers } from 'ethers'

// const DEPOSIT = 'DEPOSIT'

export default {
  props: {
    trade: {
      type: Object,
      default: () => {},
    },
    creator: {
      type: Boolean,
      default: false,
    },
    newTrade: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      numTries: 5,
      loadingBtn: false,
      contractTypes: ['', 'ERC20', 'ERC1155', 'ERC721', 'NATIVE'],
      TradeStatus: [
        'NON',
        'TRADE_CREATED',
        'TRADE_CP_DEPOSITED',
        'PARTIAL_CLAIM',
        'TRADE_COMPLETED',
      ],

      UserStatus: ['NON', 'OPEN', 'DEPOSIT', 'CLAIM'],
      // UserStatus: ['NON', 'OPEN', 'DEPOSIT', 'CLAIM'],
    }
  },
  computed: {
    ...mapState('connector', ['account']),
    ...mapState('trader', ['projects']),
    executorAddress: {
      get() {
        return this.$store.state.trader.executorAddress
      },
      set(value) {
        this.$store.commit('trader/executorAddress', value)
      },
    },
  },
  watch: {
    executorAddress(val, oldVal) {
      this.$logger('executorAddress list-wrapper: ', val !== oldVal)
      if (
        val !== oldVal &&
        ethers.utils.isAddress(val) &&
        val.toLowerCase() !== this.account.toLowerCase()
      ) {
        this.$store.dispatch('trader/listOwnedIds', {
          wa: val,
        })
      }
    },
  },
  async mounted() {
    // just for testing
    // this.$store.commit('trader/itemFrom', {
    //   ...this.itemFrom,
    //   address: this.account,
    // })
    this.$store.commit('modals/setPopupState', {
      type: 'loading',
      isShow: true,
      data: {
        reading: true,
      },
    })

    await this.$store.dispatch('trader/listOwnedIds', {
      selectedProjects: this.projects,
      wa: this.account,
      creator: true,
    })

    this.$store.commit('modals/closeModal')
  },
  methods: {},
}
</script>

<style lang="scss">
.disabledContainer {
  pointer-events: none;
}
.trades-wrapper-row {
  .item-col:first-child .item-card section.list-item {
    left: 3px;
  }
  .item-col:nth-child(3) .item-card section.list-item {
    right: 3px;
  }
  .list-trade-row {
    border-top: solid 1px #3b3b3bc0;
  }
}
.trades-wrapper-row:nth-child(2) {
  .list-trade-row {
    border-top: none;
  }
}

// .new-trade {
//   .v-card.item-card {
//     // height: 500px;
//   }
// }
.trade-item {
  div[class^='col'] {
    position: relative;
  }
}
.v-card.item-card {
  height: 100%;
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

  > section {
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
