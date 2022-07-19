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
        class="btn login-btn ml-50 pixel2"
        @click="playSound"
        >Wiki</a
      >
    </v-col>
    <v-col
      v-if="isWalletConnected && $route.path !== '/'"
      cols="auto"
      class="lh-55px d-none d-sm-flex"
    >
      <router-link
        to="/main-square"
        class="btn login-btn ml-50 pixel2 px-4"
        @click.native="playSound"
        >Main Square</router-link
      >
    </v-col>
    <v-col
      v-if="activeNetwork === '0x13881'"
      cols="auto"
      class="lh-55px d-none d-sm-flex"
    >
      <nuxt-link
        to="/giveaways"
        class="btn login-btn ml-50 pixel2 px-4"
        @click.native="playSound"
        >Giveaways</nuxt-link
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
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('networks', ['activeNetwork', 'networksData']),
    ...mapState('connector', ['isWalletConnected']),

    ...mapState('modals', ['showModal', 'modalType']),
  },
  methods: {
    ...mapActions('sound', ['playSFXAudio']),

    playSound() {
      this.playSFXAudio({ audioToPlay: 'actionButton' })
    },
    showSwapPopup() {
      this.$store.commit('setPopupState', {
        type: 'swap',
        isShow: true,
      })
    },
    networkClickHandler() {
      // only use mumbai

      // const chainId = '0x13881'
      // try {
      //   await this.$store.dispatch('networks/switchNetwork', {
      //     chainId,
      //   })
      // } catch (error) {
      //   console.log(error)
      // }
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
    max-width: 1260px;
    margin: 0 auto;
  }
}
</style>
