<template>
<button class="button_3">
    <div class="connect_wallet">
    <div class="overlay_3">
      <div class="overtop_3">
        <div class="over_in_3">
            <div 
              class="overspread_3"
              :class="{ load: connectLoader }"
              @click="walletBtnHandler"
              @mouseenter="itsHover = true"
              @mouseleave="itsHover = false"
            >
              <ui-btn-loader v-if="connectLoader" />
              <template v-else-if="itsHover && isWalletConnected && false">
                Main Square
              </template>
              <template v-else>
                <h3>{{ getAccount }}</h3>
              </template>
            </div>
        </div>
      </div>
      
    </div>
</div>
</button>

 
</template>

<script>
import { mapState } from 'vuex'

export default {
  components: {},
  props: {
    btnText: {
      type: String,
      default: 'CONNECT WALLET',
    },
  },
  data() {
    return {
      itsHover: false,
      connectLoader: false,
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
    async walletBtnHandler() {
      if (this.isWalletConnected) {
        // this.$router.push({ name: 'main-square' })
        return false
      }
      if (!window.ethereum) return false
      this.connectLoader = true
      try {
        await this.$store.dispatch('connector/connectAccount', window.ethereum)
        if (this.isWalletConnected) {
          // switch to mumbai
          // await this.$store.dispatch('networks/switchNetwork', {
          //   chainId: '0x13881',
          // })

          this.$store.commit('modals/setPopupState', {
            type: 'beta',
            isShow: true,
          })
          // this.$router.push({ name: 'main-square' })
        }
      } catch (e) {
        
      }
      this.connectLoader = false
    },
  },
}
</script>

<style scoped src="assets/css/for_index.css">

</style>
<style lang="scss" scoped>
.login-btn {
  width: 176px !important;
  height: 35px !important;
  font-size: 16px;
}
</style>
