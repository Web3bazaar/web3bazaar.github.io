<template>
  <section
    class="main-square section-padding-100 darker"
    style="min-height: 70vh"
  >
    <v-container>
      <!-- Tittle -->
      <v-row justify="center">
        <v-col cols="12" lg="6" class="d-flex justify-center">
          <h1 class="gradient-text">Main Square</h1>
        </v-col>
        <v-col
          v-if="tradesSubmittedByYou.length > 0"
          cols="12"
          lg="12"
          class="d-flex justify-center"
        >
          <nuxt-link :to="'/create-new-trade'">
            <v-btn class="more-btn mb-15 pixel2 w3b-bg-gradient">
              Create a new trade
            </v-btn>
          </nuxt-link>
        </v-col>
      </v-row>
      <!-- Trades submitted by you -->
      <v-row>
        <v-container class="trades submitted">
          <div v-if="tradesSubmittedByYou.length > 0" class="trades--title">
            Trade submitted by you
          </div>
          <trade-list-wrapper
            v-if="tradesSubmittedByYou.length > 0"
            :trades="tradesSubmittedByYou"
            :creator="true"
            @updateDashboard="getTradesInfo"
          />
          <v-col
            v-else
            cols="12"
            lg="12"
            class="d-flex flex-column align-center"
          >
            <h3 class="d-flex">There are no active trades listed for you</h3>
            <v-spacer />
            <nuxt-link :to="'/create-new-trade'" class="">
              <v-btn class="more-btn mb-15 d-flex pixel2 w3b-bg-gradient">
                Create a new trade
              </v-btn>
            </nuxt-link>
          </v-col>
        </v-container>
      </v-row>
      <!-- Trades offered by others -->
      <v-row v-if="tradesSubmittedByOthers.length > 0">
        <v-container class="trades offered">
          <div class="trades--title">
            Trade submitted by your counter-parties
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

        console.log(resolvedPromises)

        for (let i = 0; i < resolvedPromises.length; i++) {
          const e = resolvedPromises[i]

          if (e.tradeStatus === 4) continue

          if (e?.creator?.address === ethers.utils.getAddress(this.account)) {
            tradesSubmittedByYou.push({
              tradeStatus: e.tradeStatus,
              tradeId: e.tradeId,
              itemFrom: {
                address: e.creator.address,
                base_img: await this.getBaseImgUrl(
                  e.creator.contractAddress,
                  e.creator.idAsset
                ),
                project_name: this.getProjectName(e.creator.contractAddress),
                item_quantity: e.creator.amount,
                item_name: this.getItemName(
                  e.creator.contractAddress,
                  e.creator.idAsset
                ),
                ...e.creator,
              },
              itemTo: {
                address: e.executer.address,
                base_img: await this.getBaseImgUrl(
                  e.executer.contractAddress,
                  e.executer.idAsset
                ),
                project_name: this.getProjectName(e.executer.contractAddress),
                item_quantity: e.executer.amount,
                item_name: this.getItemName(
                  e.executer.contractAddress,
                  e.executer.idAsset
                ),
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
                base_img: await this.getBaseImgUrl(
                  e.creator.contractAddress,
                  e.creator.idAsset
                ),
                project_name: this.getProjectName(e.creator.contractAddress),
                item_quantity: e.creator.amount,
                item_name: this.getItemName(
                  e.creator.contractAddress,
                  e.creator.idAsset
                ),
                ...e.creator,
              },
              itemTo: {
                address: e.executer.address,
                base_img: await this.getBaseImgUrl(
                  e.executer.contractAddress,
                  e.executer.idAsset
                ),
                project_name: this.getProjectName(e.executer.contractAddress),
                item_quantity: e.executer.amount,
                item_name: this.getItemName(
                  e.executer.contractAddress,
                  e.executer.idAsset
                ),
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

    getProjectName(contractAddress) {
      return this.projects.find((p) => p.contractAddress === contractAddress)
        .project_name
    },

    getItemName(contractAddress, idAsset) {
      return idAsset
    },

    async getBaseImgUrl(contractAddress, idAsset) {
      const { image } = await this.$store.dispatch('details/getAssetDetails', {
        walletAddress: this.account,
        asset: { id: idAsset },
      })
      console.log(image)
      return image
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

<style lang="scss"></style>
