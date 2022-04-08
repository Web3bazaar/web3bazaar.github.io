<template>
  <section
    class="main-square section-padding-100 darker"
    style="min-height: 70vh"
  >
    <v-container>
      <!-- Tittle -->
      <v-row justify="end">
        <v-col cols="12" lg="6" class="d-flex justify-center">
          <h1 class="gradient-text">Main Square</h1>
        </v-col>
        <v-col cols="12" lg="3" class="d-flex justify-center">
          <nuxt-link
            v-if="tradesSubmittedByYou.length > 0"
            :to="'/create-new-trade'"
          >
            <ui-action-btn :btn-text="'New Trade'"> </ui-action-btn>
          </nuxt-link>
        </v-col>
      </v-row>

      <v-row
        v-if="
          !(
            tradesSubmittedByYou.length > 0 &&
            tradesSubmittedByOthers.length > 0
          )
        "
        justify="center"
      >
        <v-col cols="12" lg="6" class="d-flex flex-column align-center">
          <h4 class="d-flex mb-4 text-center">
            It seems like there's no active trades submitted by or for you at
            the moment
          </h4>
          <v-spacer />
          <nuxt-link :to="'/create-new-trade'" class="">
            <ui-action-btn :btn-text="'New Trade'"> </ui-action-btn>
          </nuxt-link>
        </v-col>
      </v-row>
      <!-- Trades submitted by you -->
      <v-row v-if="tradesSubmittedByYou.length > 0" justify="center">
        <v-container class="trades submitted">
          <div class="trades--title">Trades submitted by you</div>
          <trade-list-wrapper
            :trades="tradesSubmittedByYou"
            :creator="true"
            @updateDashboard="getTradesInfo"
          />
        </v-container>
      </v-row>
      <!-- Trades offered by others -->
      <v-row v-if="tradesSubmittedByOthers.length > 0" class="mt-8">
        <v-container class="trades offered">
          <div class="trades--title">
            Trades submitted by your counterparties
          </div>
          <trade-list-wrapper
            :trades="tradesSubmittedByOthers"
            @updateDashboard="getTradesInfo"
          />
        </v-container>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import { mapState } from 'vuex'

import { ethers } from 'ethers'

const mainSquare = {
  log: require('debug')('w3b:view:createNewTrade'),
  error: require('debug')('w3b:view:error:createNewTrade'),
}
export default {
  data() {
    return {
      tradesSubmittedByYou: [],
      tradesSubmittedByOthers: [],
      contractTypes: ['', 'ERC20', 'ERC1155', 'ERC721', 'NATIVE'],
    }
  },
  computed: {
    ...mapState('connector', ['isWalletConnected', 'account']),
    ...mapState('trader', ['projects']),
  },
  watch: {
    async account(val) {
      if (val) {
        await this.getTradesInfo()
      }
    },
  },
  async mounted() {
    if (this.isWalletConnected) {
      await this.getTradesInfo()
    }
  },
  methods: {
    async getTradesInfo() {
      this.$store.commit('modals/setPopupState', {
        type: 'loading',
        isShow: true,
        data: {
          state: 'loading',
        },
      })

      const tradesSubmittedByYou = []
      const tradesSubmittedByOthers = []
      this.loading = true

      try {
        const tradesIdsList = await this.getTradesIds()
        mainSquare.log('tradesIdsList', tradesIdsList)

        const promises = []

        for (let i = 0; i < tradesIdsList.length; i++) {
          const e = tradesIdsList[i]
          promises.push(this.getSingleTradeInfo(e._hex))
        }

        const resolvedPromises = await Promise.all(promises)

        //  resolvedPromises.map

        for (let i = 0; i < resolvedPromises.length; i++) {
          const e = resolvedPromises[i]

          if (e.tradeStatus === 4) continue

          if (e?.creator?.address === ethers.utils.getAddress(this.account)) {
            tradesSubmittedByYou.push({
              tradeStatus: e.tradeStatus,
              tradeId: e.tradeId,
              itemFrom: {
                address: e.creator.address,
                // base_img: await this.getBaseImgUrl(
                //   e.creator.contractAddress,
                //   e.creator.idAsset,
                //   e.creator.traderType
                // ),
                // project_name: this.getProjectName(e.creator.contractAddress),
                itemAmount: e.creator.amount,
                // item_name: this.getItemName(
                //   e.creator.contractAddress,
                //   e.creator.idAsset
                // ),
                // externalUrl: this.getExternalUrl(
                //   e.creator.contractAddress,
                //   e.creator.idAsset
                // ),
                ...(await this.getProjectInfo(
                  e.creator.contractAddress,
                  e.creator.idAsset,
                  e.creator.traderType
                )),
                ...e.creator,
              },
              itemTo: {
                address: e.executer.address,
                itemAmount: e.executer.amount,
                ...(await this.getProjectInfo(
                  e.executer.contractAddress,
                  e.executer.idAsset,
                  e.executer.traderType
                )),
                ...e.executer,
              },
            })
          }

          if (e?.executer?.address === ethers.utils.getAddress(this.account)) {
            tradesSubmittedByOthers.push({
              tradeStatus: e.tradeStatus,
              tradeId: e.tradeId,
              itemFrom: {
                address: e.creator.address,
                itemAmount: e.creator.amount,
                ...(await this.getProjectInfo(
                  e.creator.contractAddress,
                  e.creator.idAsset,
                  e.creator.traderType
                )),
                ...e.creator,
              },
              itemTo: {
                address: e.executer.address,
                itemAmount: e.executer.amount,
                ...(await this.getProjectInfo(
                  e.executer.contractAddress,
                  e.executer.idAsset,
                  e.executer.traderType
                )),
                ...e.executer,
              },
            })
          }
        }

        this.tradesSubmittedByYou = tradesSubmittedByYou
        this.tradesSubmittedByOthers = tradesSubmittedByOthers

        this.$store.commit('modals/closeModal')
      } catch (error) {
        mainSquare.error('getTradesInfo error', error)
        this.$store.commit('modals/closeModal')
        this.loading = false
      }
    },

    getExternalUrl(contractAddress, assetId) {
      const p = this.projects.find((p) => p.contractAddress === contractAddress)
      if (p.contractType.toLowerCase() === 'erc20') {
        return p.blockExplorerUrl
      } else {
        return p.assetExternalLink + assetId
      }
    },
    async getProjectInfo(contractAddress, idAsset, contractTypeIndex) {
      const { image, tokenImage, name } = await this.$store.dispatch(
        'details/getAssetDetails',
        {
          walletAddress: this.account,
          asset: {
            id: idAsset,
          },
          contractAddress,
          contractType: this.contractTypes[contractTypeIndex],
        }
      )

      const { projectName, assetExternalLink, projectLink } =
        this.projects.find((p) => p.contractAddress === contractAddress) || {}

      const externalUrl = assetExternalLink + idAsset

      return {
        baseImg: image || tokenImage,
        projectName,
        itemName: name,
        externalUrl,
        projectLink,
      }
    },

    async getTradesIds() {
      return await this.$store.dispatch('bazaar-connector/getOpenTrades', {
        walletAddress: this.account,
      })
    },
    async getSingleTradeInfo(tradeId) {
      return await this.$store.dispatch('bazaar-connector/getTradeInfo', {
        walletAddress: this.account,
        tradeId,
      })
    },
  },
}
</script>

<style lang="scss">
.trades--title {
  font-size: 1.3rem;
  margin-bottom: 16px;
  &::before {
    content: '';
    display: block;
    position: relative;
    width: 100%;
    height: 1px;
    background-image: linear-gradient(
      130deg,
      #eb3fa9 0%,
      #395ff6 50%,
      #eb3fa9 100%
    ) !important;
  }
}
</style>
