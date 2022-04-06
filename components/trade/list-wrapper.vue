<template>
  <v-container class="trade-wrapper">
    <v-container v-if="newTrade" class="pa-0">
      <v-row :class="{ 'new-trade': newTrade }" justify="center">
        <v-col cols="12" sm="4" class="item-col">
          <p class="">From</p>
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
          <p class="">To</p>
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
    <v-container v-else class="pa-0">
      <v-row
        v-for="trade in trades"
        :key="trade.id"
        class="list-trade-row py-4"
        justify="center"
      >
        <v-col cols="12" sm="4" class="d-flex flex-column item-col">
          <div id="account_from">
            <p class="">
              <span style="color: #fff"> From </span>

              {{ trade.itemFrom.address | truncate(9) }}
              <span
                v-if="
                  account.toLowerCase() === trade.itemFrom.address.toLowerCase()
                "
                style="opacity: 0.5; color: rgb(226, 65, 173); font-size: 12px"
              >
                You
              </span>
            </p>
          </div>

          <v-card class="item-card">
            <trade-list-item
              :value="trade.itemFrom"
              :account-from="account"
              :projects="projects"
              :project-items="projectFromItems"
              @selectedProjectsAssets:update="
                updateSelectedProjectsAssets($event, 'From')
              "
            />
          </v-card>
        </v-col>

        <v-col
          cols="12"
          sm="1"
          class="d-flex flex-column align-center text-center pt-12"
        >
          <h6>
            Trade ID:
            {{ trade.tradeId }}
          </h6>
          <v-img
            contain
            class="mx-auto"
            max-width="40px"
            :src="require('@/assets/img/icons/switch.png')"
          />
        </v-col>
        <!-- To -->
        <v-col cols="12" sm="4" class="d-flex flex-column item-col">
          <div id="account_from">
            <p class="">
              <span style="color: #fff"> To </span>
              {{ trade.itemTo.address | truncate(9) }}
              <span
                v-if="
                  account.toLowerCase() === trade.itemTo.address.toLowerCase()
                "
                style="opacity: 0.5; color: rgb(226, 65, 173); font-size: 12px"
              >
                You
              </span>
            </p>
          </div>
          <v-card class="item-card">
            <trade-list-item
              :value="trade.itemTo"
              :projects="projects"
              :project-items="projectToItems"
              @selectedProjectsAssets:update="
                updateSelectedProjectsAssets($event, 'To')
              "
            />
          </v-card>
        </v-col>

        <v-col cols="12" sm="9" class="align-center pt-0 mb-5">
          <h6 class="text-left mb-0">
            {{ getTradeStatus(trade, { from: true }) }}
          </h6>
        </v-col>
        <v-col
          v-if="
            (creator && trade.tradeStatus !== 2) ||
            (!creator && trade.tradeStatus !== 3)
          "
          cols="12"
          sm="12"
          class="d-flex justify-center"
        >
          <v-btn
            type="submit"
            class="more-btn mb-15 pixel2 w3b-bg-gradient"
            :loading="loadingBtn"
            @click="handleTrade(trade)"
          >
            {{ tradeBtn(trade) }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

import { ethers } from 'ethers'

const CLAIM_BACK = 'Claim back assets'
const CLAIM = 'Claim assets'
const EXECUTE = 'Execute Trade'

export default {
  props: {
    trades: {
      type: Array,
      default: () => [],
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
      EXECUTE,
      CLAIM_BACK,
      loadingBtn: false,
      contractTypes: ['', 'ERC20', 'ERC1155', 'ERC721', 'NATIVE'],
      TradeStatus: [
        'NON',
        'TRADE_CREATED',
        'TRADE_CP_DEPOSITED',
        'PARTIAL_CLAIM',
        'TRADE_COMPLETED',
      ],
      TradeStatusMessages: {
        TRADE_CREATED: {
          creator: 'Waiting for counterparty deposit',
          executor: 'Counterparty assets deposited',
        },
        TRADE_CP_DEPOSITED: {
          creator: 'Waiting for counterparty deposit',
          executor: 'Counterparty assets deposited',

          // creator: 'Counterparty assets deposited',
        },
        PARTIAL_CLAIM: {
          creator: 'Counterparty assets deposited',
          executor:
            'You have already claimed these assets (waiting for counterparty to close the trade)',
        },
        // 'TRADE_COMPLETED': ,
      },
      UserStatus: ['NON', 'Execute Trade', 'DEPOSIT', 'CLAIM'],
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
  mounted() {
    // just for testing
    this.$store.commit('trader/itemFrom', {
      ...this.itemFrom,
      address: this.account,
    })
    this.$store.commit('modals/setPopupState', {
      type: 'loading',
      isShow: true,
    })
    this.$store
      .dispatch('trader/listOwnedIds', {
        selectedProjects: this.projects,
        wa: this.account,
        from: true,
      })
      .then(() => this.$store.commit('modals/closeModal'))
  },
  methods: {
    getTradeStatus(trade, { to, from }) {
      this.$logger('trade: ', trade)

      if (this.creator) {
        return this.TradeStatusMessages?.[this.TradeStatus[trade?.tradeStatus]]
          .creator
      } else {
        return this.TradeStatusMessages?.[this.TradeStatus[trade?.tradeStatus]]
          .executor
      }
    },
    tradeBtn(trade) {
      if (this.creator && trade.tradeStatus === 1) {
        return CLAIM_BACK
      } else if (this.creator && trade.tradeStatus === 3) {
        return CLAIM
      } else if (this.creator) {
        return this.UserStatus[trade?.itemFrom?.traderStatus]
      } else {
        return this.UserStatus[trade?.itemTo?.traderStatus]
      }
    },
    async handleTrade(trade) {
      this.loadingBtn = true
      this.$store.commit('modals/setPopupState', {
        type: 'loading',
        isShow: true,
      })

      let tx
      try {
        // const res =
        if (this.creator && trade.tradeStatus === 3) {
          tx = await this.$store.dispatch('bazaar-connector/claim', {
            walletAddress: this.account,
            tradeId: trade.tradeId,
          })
          await this.checkForTrade(trade.tradeId, 4)

          this.$emit('updateDashboard')
        } else if (this.creator) {
          tx = await this.$store.dispatch('bazaar-connector/claimBack', {
            walletAddress: this.account,
            tradeId: trade.tradeId,
          })
        } else {
          const isApproved = await this.$store.dispatch(
            'bazaar-connector/isApproved',
            {
              contractAddress: trade.itemTo.contractAddress,
              contractType: this.contractTypes[trade.itemTo.traderType],
              walletAddress: this.account,
            }
          )
          if (!isApproved) {
            // not aproved do request and wait
            tx = await this.$store.dispatch('bazaar-connector/setApproval', {
              contractAddress: trade.itemTo.contractAddress,
              contractType: this.contractTypes[trade.itemTo.traderType],
              walletAddress: this.account,
            })
            await tx.wait()
            // await this.checkIfContractIsApprovedForWallet()
          }
          if (trade.tradeStatus === 1) {
            //  do executeTrade request and wait, check for transaction approved
            await this.$store.dispatch('bazaar-connector/executeTrade', {
              tradeId: trade.tradeId,
            })
            await this.checkForTrade(trade.tradeId, 2)
            this.$emit('updateDashboard')
            return
          }

          // TODO: check if transaction is approved
          tx = await this.$store.dispatch('bazaar-connector/claim', {
            walletAddress: this.account,
            tradeId: trade.tradeId,
          })

          await this.checkForTrade(trade.tradeId, 3)
        }

        this.$store.commit('modals/setPopupState', {
          type: 'loading',
          isShow: true,
          data: {
            state: 'mining',
          },
        })

        await tx.wait()

        this.$emit('updateDashboard')
      } catch (error) {
        console.error(error)
        this.$store.commit('modals/closeModal')
      } finally {
        this.loadingBtn = false
        // this.$store.commit('modals/closeModal')
      }
    },
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
.trade-wrapper {
  .item-col:first-child .item-card section.list-item {
    left: 3px;
  }
  .item-col:nth-child(3) .item-card section.list-item {
    right: 3px;
  }
  .list-trade-row:not(:first-child) {
    border-top: solid 1px #3b3b3bc0;
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
