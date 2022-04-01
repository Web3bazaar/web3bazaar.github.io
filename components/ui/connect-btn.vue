<template>
  <button
    class="btn login-btn pixel2 w3b-c-purple"
    :class="{ load: connectLoader }"
    @click="walletBtnHandler"
    @mouseenter="itsHover = true"
    @mouseleave="itsHover = false"
  >
    <ui-btn-loader v-if="connectLoader" />
    <template v-else-if="itsHover && isWalletConnected && false">
      dashboard
    </template>
    <template v-else>
      {{ getAccount }}
    </template>
  </button>
</template>

<script>
import { mapState } from 'vuex'

export default {
  components: {},
  data() {
    return {
      itsHover: false,
      connectLoader: false,
      btnText: 'Connect wallet',
    }
  },
  computed: {
    ...mapState('connector', ['isWalletConnected', 'account']),
    ...mapState('networks', ['networksData']),

    getAccount() {
      return this.account
        ? this.$options.filters.truncate(this.account, 9)
        : this.btnText
    },
  },
  methods: {
    async switchNetwork(chainId) {
      const data = Object.assign(
        {},
        this.networksData.find((item) => item.chainId === chainId)
      )
      delete data.apiURL
      delete data.code
      delete data.name
      delete data.w3bChainWalletAddress
      delete data.tokenAddress
      const resp = await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [data],
      })
      if (resp === null) {
        this.$store.commit('networks/setActiveNetwork', chainId)
        this.closePopup()
      }
    },
    async walletBtnHandler() {
      if (this.isWalletConnected) {
        this.$router.push({ name: 'main-square' })
        return false
      }
      if (!window.ethereum) return false
      this.connectLoader = true
      try {
        await this.$store.dispatch('connector/connectAccount', window.ethereum)
        if (this.isWalletConnected) {
          // switch to mumbai
          this.switchNetwork('0x13881')

          this.$store.commit('modals/setPopupState', {
            type: 'beta',
            isShow: true,
          })
          // this.$router.push({ name: 'main-square' })
        }
      } catch (e) {
        console.log('e:', e)
      }
      this.connectLoader = false
    },
  },
}
</script>

<style lang="scss" scoped>
.login-btn {
  width: 176px !important;
  height: 48px !important;
  font-size: 16px;
}
</style>
