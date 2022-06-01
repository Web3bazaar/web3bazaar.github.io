<template>
  <v-container class="list-wrapper">
    <v-row :class="{ 'new-trade': newTrade }" justify="center">
      <v-col cols="12" sm="4" class="item-col">
        <p class="">You</p>
        <v-card class="item-card">
          <trade-list-item
            v-model="itemFrom"
            :account-from="account"
            :new-trade="newTrade"
            :projects="projects"
            :project-items="projectFromItems"
            @selectedProjectsAssets:update="
              updateSelectedProjectsAssets($event, 'From')
            "
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
        <p class="">Counter-party</p>
        <v-card class="item-card">
          <trade-list-item
            v-model="itemTo"
            :new-trade="newTrade"
            :projects="projects"
            :project-items="projectToItems"
            @selectedProjectsAssets:update="
              updateSelectedProjectsAssets($event, 'To')
            "
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

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
    projectTo() {
      return this.itemTo.projectName
    },
    projectFrom() {
      return this.itemFrom.projectName
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
      this.$logger('projectFrom list-wrapper:', val)
      // TODO: fetch list of items
      // this.$store.dispatch('trader/listOwnedIds', {
      //   selectedProjects: val,
      //   from: true,
      // })
    },
    projectTo(val) {
      this.$logger('projectTo list-wrapper: ', val)
      // TODO: fetch list of items
      // this.$store.dispatch('trader/listOwnedIds', {
      //   selectedProjects: val,
      //   to: true,
      // })
    },
    itemTo(val, oldVal) {
      this.$logger('itemTo list-wrapper: ', val?.address !== oldVal?.address)
      if (
        val?.address !== oldVal?.address &&
        ethers.utils.isAddress(val.address)
      ) {
        this.$store.dispatch('trader/listOwnedIds', {
          selectedProjects: this.projects,
          wa: val.address,
          to: true,
        })
      }
    },
  },
  async mounted() {
    // just for testing
    this.$store.commit('trader/itemFrom', {
      ...this.itemFrom,
      address: this.account,
    })
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
      from: true,
    })

    this.$store.commit('modals/closeModal')
  },
  methods: {
    ...mapActions('bazaar-connector', ['getTradeInfo']),

    updateSelectedProjectsAssets(value, destination) {
      this.$store.commit(`trader/tradeSelectedItem${destination}`, value)
    },
    async checkForTrade(tradeId, status) {
      const res = await this.$store.dispatch('bazaar-connector/getTradeInfo', {
        walletAddress: this.account,
        tradeId,
      })

      if (res.tradeStatus === status) {
        return true
      }

      await this.$sleeper(4 * 1000)

      return await this.checkForTrade(tradeId, status)
    },
    // checkIfContractIsApprovedForWallet(
    //   contractAddress,
    //   contractType,
    //   walletAddress
    // ) {
    //   try {
    //     return new Promise((resolve) => {
    //       resolve(
    //         this.$store.dispatch('bazaar-connector/isApproved', {
    //           contractAddress,
    //           contractType,
    //           walletAddress,
    //         })
    //       )
    //     }).then((result) => {
    //       if (result) return result
    //       else {
    //         const t = setInterval(() => {
    //           this.numTries--
    //           if (this.numTries === 0) clearInterval(t)
    //           return this.checkIfContractIsApprovedForWallet(
    //             contractAddress,
    //             contractType,
    //             this.account
    //           ).then((res) => {
    //             if (res) {
    //               clearInterval(t)
    //               return res
    //             }
    //           })
    //         }, 4 * 1000)
    //       }
    //     })
    //   } catch (error) {
    //     console.error('error', error)
    //   }
    // },
  },
}
</script>

<style lang="scss">
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
