<template>
  <v-container>
    <v-row class="list-trade-row pb-4" justify="center">
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
        class="d-flex flex-column align-center text-center py-0 pt-7"
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
                account.toLowerCase() === trade.executor.address.toLowerCase()
              "
              style="color: #fff"
            >
              You
            </span>
            <span v-else style="color: #fff"> Counter-party </span>
            {{ trade.executor.address | truncate(9) }}
          </p>
        </div>
        <v-card class="item-card">
          <dashboard-trade-tabs-group
            :assets-by-project="trade.executor.assetsByProject"
          />
        </v-card>
      </v-col>

      <v-col cols="12" sm="12" class="align-center pt-0">
        <h6 class="text-left">
          {{ getTradeStatus(trade, { from: true }) }}
        </h6>
        <a
          :href="`https://mumbai.polygonscan.com/address/${bazaarContractAddress}`"
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
        class="d-flex justify-center pt-0"
      >
        <ui-action-btn
          class="mb-7 mt-0"
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
const CLAIM_BACK = 'Cancel Trade'
const EXECUTE = 'Execute Trade'

export default {
  props: {
    trade: {
      type: Object,
      required: true,
    },
    creator: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      loadingBtn: false,

      TradeStatusMessages: {
        waitingExecutor: 'Waiting for counterparty',
        depositExecutor: 'Counterparty assets deposited',
        alreadyClaimed:
          'You have already claimed these assets (waiting for counterparty to close the trade)',
        // 'TRADE_COMPLETED': ,
      },
      linkIcon: require('@/assets/img/icons/link.png'),
      bazaarContractAddress: process.env.BAZAAR_CONTRACT_ADDRESS,
    }
  },
  computed: {
    ...mapState('connector', ['isWalletConnected', 'account']),
  },
  methods: {
    ...mapActions(['getTradesInfo']),
    ...mapActions('sound', ['playSFXAudio']),

    async handleTrade(trade) {
      this.loadingBtn = true

      let message, tx

      this.$store.commit('modals/setPopupState', {
        type: 'loading',
        isShow: true,
      })

      try {
        // const res =
        if (this.creator && trade.tradeStatus === 1) {
          tx = await this.$store.dispatch('bazaar-connector/claimBack', {
            walletAddress: this.account,
            tradeId: trade.tradeId,
          })

          message = 'You have successfully claimed your assets back.'
        } else {
          const { contractAddressArray, contractTypeArray } =
            await this.$store.dispatch(
              'bazaar-connector/checkIsApprovedArray',
              {
                assets: trade.executor.assetsByProject,
                walletAddress: this.account,
              }
            )
          if (contractAddressArray.length > 0 && contractTypeArray.length > 0) {
            // not aproved do request and wait
            tx = await this.$store.dispatch(
              'bazaar-connector/setApprovalArray',
              {
                contractAddressArray,
                contractTypeArray,
                walletAddress: this.account,
              }
            )
            // await tx.wait()
            // await this.checkIfContractIsApprovedForWallet()
          }
          if (trade.tradeStatus === 1) {
            //  do executeTrade request and wait, check for transaction approved
            tx = await this.$store.dispatch('bazaar-connector/executeTrade', {
              tradeId: trade.tradeId,
            })
            message = 'Your new assets have been claimed.'
          }
        }

        this.$store.commit('modals/setPopupState', {
          type: 'loading',
          isShow: true,
          data: {
            state: 'mining',
          },
        })
        await tx.wait()
        // await this.checkForTrade(trade.tradeId, 2)
        this.$store.commit('modals/setPopupState', {
          type: 'success',
          isShow: true,
          data: {
            message,
            txHash: tx.hash,
          },
        })
        this.playSFXAudio({ audioToPlay: 'successState' })
        // update the dashboard silently
        setTimeout(() => {
          this.getTradesInfo()
        }, 5 * 1000)
      } catch (error) {
        // console.error(error)
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
      // console.log('executor', this.UserStatus[trade?.executor.traderStatus])

      switch (true) {
        // case this.creator && trade.tradeStatus === 3:
        case this.creator &&
          trade.tradeStatus > 1 &&
          trade.executor.traderStatus > 1 &&
          trade.creator.traderStatus !== 3:
        case !this.creator &&
          trade.tradeStatus > 1 &&
          trade.creator.traderStatus > 1 &&
          trade.executor.traderStatus !== 3:
          return CLAIM
        // return DEPOSIT
        case this.creator && trade.tradeStatus === 1:
          return CLAIM_BACK
        case !this.creator && trade.tradeStatus === 1:
          return EXECUTE
        default:
          return false
      }
    },
    getTradeStatus(trade, { to, from }) {
      this.$logger('trade: ', trade)

      // console.log(trade.tradeId)
      // console.log(this.TradeStatus[trade?.tradeStatus])
      // console.log('creator', this.UserStatus[trade?.creator.traderStatus])

      switch (true) {
        // case this.creator && trade.tradeStatus === 3:

        case this.creator && trade.creator.traderStatus === 3:
        case !this.creator && trade.executor.traderStatus === 3:
          return this.TradeStatusMessages.alreadyClaimed

        case this.creator && trade.tradeStatus === 1:
          return this.TradeStatusMessages.waitingExecutor
        case !this.creator && trade.tradeStatus === 1:
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
