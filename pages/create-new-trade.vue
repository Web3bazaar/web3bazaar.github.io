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
          <trade-list-wrapper :new-trade="true" :disabled="loadingBtn" />
        </v-col>
        <v-col cols="12" class="text-center mt-8">
          <ui-action-btn
            v-if="isSelectedContractApproved"
            class="mb-8"
            :loading="loadingBtn"
            :btn-text="ADD_TRADE"
            @click="newTrade"
          >
          </ui-action-btn>

          <ui-action-btn
            v-else
            class="mb-8"
            :loading="loadingBtn"
            :btn-text="APPROVE"
            @click="approveSelectedContract"
          >
          </ui-action-btn>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import { ethers } from 'ethers'
import { mapState, mapActions } from 'vuex'

const createNewTrade = {
  log: require('debug')('w3b:view:createNewTrade'),
  error: require('debug')('w3b:view:error:createNewTrade'),
}

const ADD_TRADE = 'Create Trade'
const APPROVE = 'Approve Contract'

const TRADE_TYPE = {
  NON: 0,
  ERC20: 1,
  ERC1155: 2,
  ERC721: 3,
  NATIVE: 4,
}

export default {
  data() {
    return {
      ADD_TRADE,
      APPROVE,
      contractsToApprove: [],
      loadingBtn: false,
    }
  },
  async fetch() {
    // await this.$store.dispatch('trader/GET_PROJECT_DATA')
  },
  computed: {
    ...mapState('connector', ['isWalletConnected', 'account']),
    ...mapState('trader', [
      'executorAddress',
      'creatorSelectedAssets',
      'executorSelectedAssets',
    ]),
    isSelectedContractApproved() {
      return this.contractsToApprove.length === 0
    },
  },
  watch: {
    async creatorSelectedAssets(val) {
      createNewTrade.log('creatorSelectedAssets watch', val)
      this.loadingBtn = true
      this.contractsToApprove = []
      for (const project in val) {
        const {
          token_address: creatorAssetContract,
          contract_type: creatorAssetType,
        } = val[project][0] || {}
        createNewTrade.log(
          'creatorAssetContract || !creatorAssetType watch',
          creatorAssetContract || creatorAssetType
        )

        if (!creatorAssetContract || !creatorAssetType) continue
        const isApproved = await this.checkIfContractIsApprovedForWallet(
          creatorAssetContract,
          creatorAssetType,
          this.account
        )
        createNewTrade.log('isApproved watch', isApproved)

        if (!isApproved) {
          this.contractsToApprove.push({
            creatorAssetContract,
            creatorAssetType,
          })
        }
      }
      this.loadingBtn = false
      createNewTrade.log('contractsToApprove watch', this.contractsToApprove)
    },
  },
  mounted() {
    this.$store.commit(`trader/resetSelectedAssets`)
  },
  methods: {
    ...mapActions('sound', ['playSFXAudio']),

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
        createNewTrade.log('isApproved', result)
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
        this.$store.commit('modals/setPopupState', {
          type: 'loading',
          isShow: true,
        })

        result = await this.$store.dispatch('bazaar-connector/setApproval', {
          contractAddress,
          contractType,
          walletAddress,
          approveValue,
        })
        if (result === 'REJECTED') {
          return result
        }
      } catch (error) {
        if (error === 'REJECTED') {
          return error
        }
        createNewTrade.error('error', error)
        throw new Error(error)
      }

      return result
    },

    async removeApprove() {
      if (!this.creatorSelectedAssets) return
      const {
        token_address: creatorAssetContract,
        contract_type: creatorAssetType,
      } = this.creatorSelectedAssets.find((asset) => asset.selected > 0)

      const res = await this.setApproval(
        creatorAssetContract,
        creatorAssetType,
        this.account,
        false
      )
      return res
    },

    async approveSelectedContract() {
      createNewTrade.log('contractsToApprove', this.contractsToApprove)
      try {
        if (this.contractsToApprove.length === 0) return

        const promises = []

        for (let i = 0; i < this.contractsToApprove.length; i++) {
          const { creatorAssetContract, creatorAssetType } =
            this.contractsToApprove[i] || {}

          if (!creatorAssetContract || !creatorAssetType) return

          this.loadingBtn = true
          this.$store.commit('modals/setPopupState', {
            type: 'loading',
            isShow: true,
          })

          const isApproved = await this.checkIfContractIsApprovedForWallet(
            creatorAssetContract,
            creatorAssetType,
            this.account
          )
          createNewTrade.log('isApproved', isApproved)

          if (!isApproved) {
            promises.push(
              this.setApproval(
                creatorAssetContract,
                creatorAssetType,
                this.account
              )
            )
          }
        }

        await Promise.all(promises)
        this.contractsToApprove = []
        this.$store.commit('modals/closeModal')
        this.loadingBtn = false
      } catch (error) {
        createNewTrade.error('approveSelectedContract error', error)
        this.$store.commit('modals/closeModal')
        this.loadingBtn = false
      }
    },
    async newTrade() {
      try {
        createNewTrade.log('creatorSelectedAssets', this.creatorSelectedAssets)
        createNewTrade.log(
          'executorSelectedAssets',
          this.executorSelectedAssets
        )

        if (!this.creatorSelectedAssets) return
        if (Object.keys(this.executorSelectedAssets).length === 0) return

        const creatorObject = {
          creatorAssetContract: [],
          creatorAssetId: [],
          creatorAmount: [],
          creatorAssetType: [],
        }

        // const {
        //   token_address: creatorAssetContract,
        //   token_id: creatorAssetId,
        //   chosenAmount: creatorAmount,
        //   contract_type: creatorAssetType,
        // } = this.creatorSelectedAssets.filter((asset) => asset.selected > 0)
        for (const project in this.creatorSelectedAssets) {
          this.creatorSelectedAssets[project].forEach((asset) => {
            if (asset.selected) {
              const amount =
                asset.contract_type === 'ERC20'
                  ? ethers.utils.parseEther(asset.chosenAmount.toString())
                  : asset.chosenAmount

              creatorObject.creatorAssetContract.push(asset.token_address)
              creatorObject.creatorAssetId.push(asset.token_id)
              creatorObject.creatorAmount.push(amount)
              creatorObject.creatorAssetType.push(
                TRADE_TYPE[asset.contract_type]
              )
            }
          })
        }
        createNewTrade.log('creatorObject', creatorObject)

        // const {
        //   token_address: executorAssetContract,
        //   token_id: executorAssetId,
        //   chosenAmount: executorAmount,
        //   contract_type: executorAssetType,
        // } = this.executorSelectedAssets.find((asset) => asset.selected > 0)

        const executorWalletAdd = this.executorAddress

        const executorObject = {
          executorAssetContract: [],
          executorAssetId: [],
          executorAmount: [],
          executorAssetType: [],
          executorWalletAdd,
        }
        for (const project in this.executorSelectedAssets) {
          this.executorSelectedAssets[project].forEach((asset) => {
            if (asset.selected) {
              const amount =
                asset.contract_type === 'ERC20'
                  ? ethers.utils.parseEther(asset.chosenAmount.toString())
                  : asset.chosenAmount

              executorObject.executorAssetContract.push(asset.token_address)
              executorObject.executorAssetId.push(asset.token_id)
              executorObject.executorAmount.push(amount)
              executorObject.executorAssetType.push(
                TRADE_TYPE[asset.contract_type]
              )
            }
          })
        }
        createNewTrade.log('executorObject', executorObject)

        if (
          creatorObject.creatorAmount.length === 0 ||
          executorObject.executorAmount.length === 0
        )
          return

        this.loadingBtn = true

        this.$store.commit('modals/setPopupState', {
          type: 'loading',
          isShow: true,
        })

        const startTrade = await this.$store.dispatch(
          'bazaar-connector/startTrade',
          {
            ...creatorObject,
            ...executorObject,
          }
        )

        this.$store.commit('modals/setPopupState', {
          type: 'loading',
          isShow: true,
          data: {
            state: 'mining',
          },
        })
        await this.$nextTick()

        await startTrade.wait()
        // .catch((e) => {
        //   createNewTrade.error(e)

        //   if (e.code === 3) {
        //     createNewTrade.error(e.message)
        //   }
        // })

        // TODO: remove token from the users lists (update list?? )
        createNewTrade.log('startTrade ', startTrade)
        if (startTrade) {
          createNewTrade.log('Trade successfully created')

          // this.$store.commit('modals/closeModal')

          this.$store.commit('modals/setPopupState', {
            type: 'success',
            isShow: true,
            data: {
              txHash: startTrade.hash,
              message:
                'Your trade is now open in the Bazaar. Check its status in the Main Square.',
            },
          })
          this.playSFXAudio({ audioToPlay: 'successState' })
        }
      } catch (error) {
        createNewTrade.log('error', error)
        this.$store.commit('modals/closeModal')
        this.$store.commit('modals/setPopupState', {
          type: 'error',
          isShow: true,
          data: {},
        })
      }
      this.loadingBtn = false
    },
  },
}
</script>

<style></style>
