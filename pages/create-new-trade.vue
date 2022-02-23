<template>
  <section class="create-new-trade section-padding-100 darker">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" lg="6" class="d-flex justify-center">
          <h1 class="gradient-text">Create a trade</h1>
        </v-col>
      </v-row>
      <v-row v-if="isWalletConnected">
        <v-col>
          <trade-list-wrapper
            :new-trade="true"
            :projects="projects"
            :project-to-items="projectToItems"
            :project-from-items="projectFromItems"
          />
        </v-col>
        <v-col cols="12" class="text-center">
          <button type="submit" class="more-btn mb-15" @click="newTrade">
            Add trade
          </button>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {}
  },
  computed: {
    ...mapState('connector', ['isWalletConnected', 'account']),
    ...mapState('trader', [
      'projectFromItems',
      'projectToItems',
      'projects',
      'itemTo',
      'tradeSelectedItemFrom',
      'tradeSelectedItemTo',
    ]),
  },
  methods: {
    async newTrade() {
      // console.log('***** newTrade ****')
      this.$logger('tradeSelectedItemFrom', this.tradeSelectedItemFrom)
      this.$logger('tradeSelectedItemTo', this.tradeSelectedItemTo)

      if (!this.tradeSelectedItemFrom) return
      if (!this.tradeSelectedItemTo) return

      const {
        contractAddress: creatorAssetContract,
        id: creatorAssetId,
        chosenAmount: creatorAmount,
        contractType: creatorAssetType,
      } = this.tradeSelectedItemFrom.find((asset) => asset.selected > 0)

      const creatorObject = {
        creatorAssetContract,
        creatorAssetId,
        creatorAmount,
        creatorAssetType,
      }

      this.$logger(creatorObject)

      const {
        contractAddress: executorAssetContract,
        id: executorAssetId,
        chosenAmount: executorAmount,
        contractType: executorAssetType,
      } = this.tradeSelectedItemTo.find((asset) => asset.selected > 0)

      const executorWalletAdd = this.itemTo.address

      const executorObject = {
        executorAssetContract,
        executorAssetId,
        executorAmount,
        executorAssetType,
        executorWalletAdd,
      }

      this.$logger(executorObject)
      const ownedIds = await this.$store
        .dispatch('bazaar-connector/startTrade', {
          ...creatorObject,
          ...executorObject,
          wa: 'rootState.connector.account',
        })
        .catch((e) => {
          console.error(e)
        })

      this.$logger('Owned ID ', ownedIds)
    },
  },
}
</script>

<style></style>
