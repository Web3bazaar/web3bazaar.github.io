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
          <v-btn
            v-if="isSelectedContractApproved"
            type="submit"
            class="more-btn mb-15"
            :loading="loadingBtn"
            @click="newTrade"
          >
            {{ ADD_TRADE }}
          </v-btn>

          <v-btn
            v-else
            type="submit"
            class="more-btn mb-15"
            :loading="loadingBtn"
            @click="approveSelectedContract"
          >
            {{ APPROVE }}
          </v-btn>
          <!-- <v-btn
            type="submit"
            class="more-btn mb-15"
            :loading="loadingBtn"
            @click="removeApprove"
          >
            REMOVE
          </v-btn> -->
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import { mapState } from 'vuex'

const createNewTrade = {
  log: require('debug')('w3b:view:createNewTrade'),
  error: require('debug')('w3b:view:error:createNewTrade'),
}

const ADD_TRADE = 'Add trade'
const APPROVE = 'Approve Contract'

export default {
  data() {
    return {
      ADD_TRADE,
      APPROVE,
      isSelectedContractApproved: false,
      loadingBtn: false,
    }
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
  watch: {
    async tradeSelectedItemFrom(val) {
      createNewTrade.log('tradeSelectedItemFrom', val)
      if (val?.length) {
        const {
          token_address: creatorAssetContract,
          contract_type: creatorAssetType,
        } = val?.find?.((asset) => asset.selected > 0) || {}

        if (!creatorAssetContract || !creatorAssetType) return
        this.loadingBtn = true
        this.isSelectedContractApproved =
          await this.checkIfContractIsApprovedForWallet(
            creatorAssetContract,
            creatorAssetType,
            this.account
          )
        this.loadingBtn = false
      }
    },
  },
  mounted() {},
  methods: {
    async checkIfContractIsApprovedForWallet(
      contractAddress,
      contractType,
      walletAddress
    ) {
      let result
      try {
        result = await this.$store.dispatch('bazaar-connector/isApproved', {
          contractAddress,
          contractType,
          walletAddress,
        })
      } catch (error) {
        createNewTrade.error('error', error)
      }

      return result
    },

    async setApproval(
      contractAddress,
      contractType,
      walletAddress,
      approveValue
    ) {
      let result
      try {
        result = await this.$store.dispatch('bazaar-connector/setApproval', {
          contractAddress,
          contractType,
          walletAddress,
          approveValue,
        })
      } catch (error) {
        createNewTrade.error('error', error)
      }

      return result
    },

    async removeApprove() {
      if (!this.tradeSelectedItemFrom) return
      const {
        token_address: creatorAssetContract,
        contract_type: creatorAssetType,
      } = this.tradeSelectedItemFrom.find((asset) => asset.selected > 0)

      const res = await this.setApproval(
        creatorAssetContract,
        creatorAssetType,
        this.account,
        false
      )
      console.log(res)
    },

    async approveSelectedContract() {
      const {
        token_address: creatorAssetContract,
        contract_type: creatorAssetType,
      } = this.tradeSelectedItemFrom.find((asset) => asset.selected > 0)

      const isApproved = await this.checkIfContractIsApprovedForWallet(
        creatorAssetContract,
        creatorAssetType,
        this.account
      )
      createNewTrade.log('isApproved', isApproved)

      if (!isApproved) {
        const res = await this.setApproval(
          creatorAssetContract,
          creatorAssetType,
          this.account
        )

        console.log(res)
        if (res) {
          this.loadingBtn = true
          let numTries = 5
          const t = setInterval(() => {
            numTries--
            if (numTries === 0) clearInterval(t)
            this.checkIfContractIsApprovedForWallet(
              creatorAssetContract,
              creatorAssetType,
              this.account
            ).then((res) => {
              if (res) {
                this.isSelectedContractApproved = true
                this.loadingBtn = false
                clearInterval(t)
              }
            })
          }, 4 * 1000)
        }
      }
    },
    async newTrade() {
      this.loadingBtn = true

      try {
        createNewTrade.log('tradeSelectedItemFrom', this.tradeSelectedItemFrom)
        createNewTrade.log('tradeSelectedItemTo', this.tradeSelectedItemTo)

        if (!this.tradeSelectedItemFrom) return
        if (!this.tradeSelectedItemTo) return

        const {
          token_address: creatorAssetContract,
          token_id: creatorAssetId,
          chosenAmount: creatorAmount,
          contract_type: creatorAssetType,
        } = this.tradeSelectedItemFrom.find((asset) => asset.selected > 0)

        const creatorObject = {
          creatorAssetContract,
          creatorAssetId,
          creatorAmount,
          creatorAssetType,
        }

        createNewTrade.log('creatorObject', creatorObject)

        const {
          token_address: executorAssetContract,
          token_id: executorAssetId,
          chosenAmount: executorAmount,
          contract_type: executorAssetType,
        } = this.tradeSelectedItemTo.find((asset) => asset.selected > 0)

        const executorWalletAdd = this.itemTo.address

        const executorObject = {
          executorAssetContract,
          executorAssetId,
          executorAmount,
          executorAssetType,
          executorWalletAdd,
        }

        createNewTrade.log('executorObject', executorObject)

        const ownedIds = await this.$store
          .dispatch('bazaar-connector/startTrade', {
            ...creatorObject,
            ...executorObject,
          })
          .catch((e) => {
            createNewTrade.error(e)

            if (e.code === 3) {
              createNewTrade.error(e.message)
            }
          })

        // TODO: check is the contract is approved
        // TODO: remove token from the users lists (update list?? )

        createNewTrade.log('Owned ID ', ownedIds)
      } catch (error) {
        createNewTrade.log('error', error)
      }
      this.loadingBtn = false
    },
  },
}
</script>

<style></style>
