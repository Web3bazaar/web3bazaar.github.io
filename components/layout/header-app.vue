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
        Web3Bazaar
      </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <li class="lh-55px">
      <ui-network-btn
        :network-type="activeNetwork"
        @click="networkClickHandler"
      />
    </li>
    <li class="lh-55px">
      <a
        href="http://docs.web3bazaar.org/"
        target="_blank"
        class="btn login-btn ml-50"
        >Wiki</a
      >
    </li>
    <li class="lh-55px">
      <div class="ml-50">
        <ui-connect-btn />
      </div>
    </li>
  </v-app-bar>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('networks', ['activeNetwork']),
    ...mapState('modals', ['showModal', 'modalType']),
  },
  methods: {
    showSwapPopup() {
      this.$store.commit('setPopupState', {
        type: 'swap',
        isShow: true,
      })
    },
    networkClickHandler() {
      this.$store.commit('modals/setPopupState', {
        type: 'network',
        isShow: true,
      })

      console.log(this.showModal)
      console.log(this.modalType)
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
