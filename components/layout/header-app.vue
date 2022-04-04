<template>
  <v-app-bar id="banner" app elevate-on-scroll>
    <!-- Brand -->
    <v-toolbar-title>
      <router-link class="navbar-brand" to="/">
        <span>
          <img
            width="45"
            src="@/assets/img/site-logos/Web3Bazaar_Logo_2048px.png"
            alt="logo"
          />
        </span>
        <span> Web3Bazaar </span>
      </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>

    <v-col cols="auto" class="">
      <ui-network-btn
        :network-type="activeNetwork"
        @click="networkClickHandler"
      />
    </v-col>
    <v-col cols="auto" class="lh-55px d-none d-sm-flex">
      <a
        href="http://docs.web3bazaar.org/"
        target="_blank"
        class="btn login-btn ml-50 pixel2 w3b-c-purple"
        >Wiki</a
      >
    </v-col>
    <v-col cols="auto" class="lh-55px m">
      <div>
        <ui-connect-btn />
      </div>
    </v-col>
  </v-app-bar>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('networks', ['activeNetwork', 'networksData']),
    ...mapState('modals', ['showModal', 'modalType']),
  },
  methods: {
    showSwapPopup() {
      this.$store.commit('setPopupState', {
        type: 'swap',
        isShow: true,
      })
    },
    async networkClickHandler() {
      // only use mumbai
      const chainId = '0x13881'
      try {
        if (chainId === '0x1') {
          alert('Change in Metamask:(')
          return false
        }
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
        }
        console.log(resp)
      } catch (error) {
        console.log(error)
      }
      this.$store.commit('modals/setPopupState', {
        type: 'network',
        isShow: true,
      })
    },
  },
}
</script>

<style lang="scss">
#banner {
  background-color: transparent;
  z-index: 999;

  &.v-app-bar--is-scrolled {
    background-color: #03091f;
  }
  .v-toolbar__content {
    max-width: 1200px;
    margin: 0 auto;
  }
}
</style>
