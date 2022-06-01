<template>
  <v-container>
    <v-row class="list-trade-row py-4" justify="center">
      <v-col cols="12" sm="12" class="d-flex flex-column item-col">
        <div id="account_from">
          <p>
            <span
              v-if="
                account.toLowerCase() === trade.creator.address.toLowerCase()
              "
              style="color: #fff"
            >
              You
            </span>
            <span v-else style="color: #fff"> Counter-party </span>
            {{ trade.creator.address | truncate(9) }}
          </p>
        </div>

        <v-card class="item-card">
          <dashboard-trade-tabs-group
            :assets-by-project="trade.creator.assetsByProject"
            :account-from="account"
          />
        </v-card>
      </v-col>

      <v-col
        cols="12"
        sm="12"
        class="d-flex flex-column align-center text-center pt-7 pb-0"
      >
        <v-img
          contain
          class="mx-auto"
          max-width="40px"
          style="transform: rotate(90deg)"
          :src="require('@/assets/img/icons/switch.png')"
        />
      </v-col>
      <!-- To -->
      <v-col cols="12" sm="12" class="d-flex flex-column item-col pt-0">
        <div id="account_from">
          <p>
            <span
              v-if="
                account.toLowerCase() === trade.executer.address.toLowerCase()
              "
              style="color: #fff"
            >
              You
            </span>
            <span v-else style="color: #fff"> Counter-party </span>
            {{ trade.executer.address | truncate(9) }}
          </p>
        </div>
        <v-card class="item-card">
          <dashboard-trade-tabs-group
            :assets-by-project="trade.executer.assetsByProject"
          />
        </v-card>
      </v-col>

      <v-col cols="12" sm="9" class="align-center pt-0">
        <h6 class="text-left">
          {{ getTradeStatus(trade, { from: true }) }}
        </h6>
        <a
          :href="'https://mumbai.polygonscan.com/address/0x670bc34b16e0994fd64D90F127fDe38c0f1Afb83'"
          target="_blank"
          class="text-left small-links white--text"
        >
          <h6>
            Trade ID:
            {{ parseInt(trade.tradeId) }}
            <img :width="16" :src="linkIcon" />
          </h6>
        </a>
      </v-col>
      <v-col
        v-if="tradeBtn(trade)"
        cols="12"
        sm="12"
        class="d-flex justify-center"
      >
        <ui-action-btn
          class="mb-7"
          :loading="loadingBtn"
          :btn-text="tradeBtn(trade)"
          @click="handleTrade(trade)"
        >
        </ui-action-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

const CLAIM = 'Claim assets'
const CLAIM_BACK = 'Claim back assets'
const EXECUTE = 'Execute Trade'

export default {
  props: {
    trade: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loadingBtn: false,

      TradeStatusMessages: {
        waitingExecutor: 'Waiting for counterparty deposit',
        depositExecutor: 'Counterparty assets deposited',
        alreadyClaimed:
          'You have already claimed these assets (waiting for counterparty to close the trade)',
        // 'TRADE_COMPLETED': ,
      },
      linkIcon: require('@/assets/img/icons/link.png'),
    }
  },
  computed: {
    ...mapState('connector', ['isWalletConnected', 'account']),
  },
  methods: {
    ...mapActions(['getTradesInfo']),

    async handleTrade(trade) {
      this.loadingBtn = true
      this.$store.commit('modals/setPopupState', {
        type: 'loading',
        isShow: true,
      })

      let tx
      try {
        // const res =
        if (this.creator && trade.itemTo.traderStatus === 2) {
          tx = await this.$store.dispatch('bazaar-connector/claim', {
            walletAddress: this.account,
            tradeId: trade.tradeId,
          })
          // await this.checkForTrade(trade.tradeId, 4)

          // this.$emit('getTradesInfo')
        } else if (this.creator && trade.tradeStatus === 1) {
          tx = await this.$store.dispatch('bazaar-connector/claimBack', {
            walletAddress: this.account,
            tradeId: trade.tradeId,
          })
          this.$store.commit('modals/setPopupState', {
            type: 'loading',
            isShow: true,
            data: {
              state: 'mining',
            },
          })
          await tx.wait()
          this.$store.commit('modals/setPopupState', {
            type: 'success',
            isShow: true,
            data: {
              message: 'You have successfully claimed your assets back.',
            },
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
            tx = await this.$store.dispatch('bazaar-connector/executeTrade', {
              tradeId: trade.tradeId,
            })
            this.$store.commit('modals/setPopupState', {
              type: 'loading',
              isShow: true,
              data: {
                state: 'mining',
              },
            })
            await tx.wait()
            // await this.checkForTrade(trade.tradeId, 2)
            this.$store.commit('modals/closeModal')
            this.getTradesInfo()

            return
          }

          tx = await this.$store.dispatch('bazaar-connector/claim', {
            walletAddress: this.account,
            tradeId: trade.tradeId,
          })
          this.$store.commit('modals/setPopupState', {
            type: 'loading',
            isShow: true,
            data: {
              state: 'mining',
            },
          })
          await tx.wait()

          //   await this.checkForTrade(trade.tradeId, 3)

          this.$store.commit('modals/setPopupState', {
            type: 'success',
            isShow: true,
            data: {
              message: 'Your new assets have been claimed.',
            },
          })
        }

        // update the dashboard silently
        this.getTradesInfo()
      } catch (error) {
        console.error(error)
        this.$store.commit('modals/closeModal')
      } finally {
        this.loadingBtn = false
        // this.$store.commit('modals/closeModal')
      }
    },
    tradeBtn(trade) {
      // console.log(trade.tradeId)
      // console.log(this.TradeStatus[trade?.tradeStatus])
      // console.log('creator', this.UserStatus[trade?.creator.traderStatus])
      // console.log('executer', this.UserStatus[trade?.executer.traderStatus])

      switch (true) {
        // case this.creator && trade.tradeStatus === 3:
        case this.creator &&
          trade.tradeStatus > 1 &&
          trade.executer.traderStatus > 1 &&
          trade.creator.traderStatus !== 3:
        case !this.creator &&
          trade.tradeStatus > 1 &&
          trade.creator.traderStatus > 1 &&
          trade.executer.traderStatus !== 3:
          return CLAIM
        // return DEPOSIT
        case this.creator && trade.tradeStatus === 1:
          return CLAIM_BACK
        case trade.tradeStatus === 1 && !this.creator:
          return EXECUTE
        default:
          return false
        // break
      }

      // if (this.creator && trade.tradeStatus === 1) {
      //   return CLAIM_BACK
      // } else if (this.creator && trade.tradeStatus === 3) {
      //   return CLAIM
      // } else if (this.creator && trade.itemTo.traderStatus === 3) {
      //   return CLAIM
      // } else if (trade.tradeStatus === 2 && trade.itemTo.traderStatus === 2) {
      //   return CLAIM
      // } else if (trade.itemTo.traderStatus === 3) {
      //   return this.UserStatus[trade?.creator?.traderStatus]
      // }
    },
    getTradeStatus(trade, { to, from }) {
      this.$logger('trade: ', trade)

      // console.log(trade.tradeId)
      // console.log(this.TradeStatus[trade?.tradeStatus])
      // console.log('creator', this.UserStatus[trade?.creator.traderStatus])
      // console.log('itemTo', this.UserStatus[trade?.itemTo.traderStatus])

      switch (true) {
        // case this.creator && trade.tradeStatus === 3:

        case this.creator && trade.creator.traderStatus === 3:
        case !this.creator && trade.executer.traderStatus === 3:
          return this.TradeStatusMessages.alreadyClaimed

        case this.creator &&
          trade.tradeStatus === 1 &&
          trade.executer.traderStatus < 2:
          return this.TradeStatusMessages.waitingExecutor
        case this.creator && trade.executer.traderStatus > 1:
        case !this.creator && trade.creator.traderStatus > 1:
          return this.TradeStatusMessages.depositExecutor
        default:
          return true
        // break
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.item-card {
  border-radius: 0;
}
</style>
