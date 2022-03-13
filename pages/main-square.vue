<template>
  <section class="main-square section-padding-100 darker">
    <v-container>
      <!-- Tittle -->
      <v-row justify="end">
        <v-col cols="12" lg="6" class="d-flex justify-center">
          <h1 class="gradient-text">Main Square</h1>
        </v-col>
        <v-col cols="12" lg="3" class="d-flex justify-center">
          <nuxt-link :to="'/create-new-trade'">
            <button class="more-btn mb-15">Create a new trade</button>
          </nuxt-link>
        </v-col>
      </v-row>
      <!-- Trades submitted by you -->
      <v-row>
        <v-container class="trades submitted">
          <div class="trades--title">Trade submitted by you</div>
          <trade-list-wrapper :trades="tradesSubmittedByYou" />
        </v-container>
      </v-row>
      <!-- Trades offered by others -->
      <v-row>
        <v-container class="trades offered">
          <div class="trades--title">
            Trade submitted by your counter-parties
          </div>
          <trade-list-wrapper :trades="tradesSubmittedByOthers" />
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

          if (e?.creator?.address === ethers.utils.getAddress(this.account)) {
            this.tradesSubmittedByYou.push({
              itemFrom: {
                address: e.creator.address,
                base_img: '',
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
                base_img: '',
                project_name: this.getProjectName(e.executer.contractAddress),
                item_quantity: e.executer.amount,
                item_name: this.getItemName(
                  e.creator.contractAddress,
                  e.executer.idAsset
                ),
                ...e.executer,
              },
            })
          }
        }
        console.log(this.tradesSubmittedByYou)
      } catch (error) {
        mainSquare.error('getTradesInfo error', error)

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
