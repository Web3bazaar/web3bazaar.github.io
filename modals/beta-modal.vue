<template>
  <div class="loading-popup">
    <div class="close-btn" @click="closePopup">
      <CloseButton />
    </div>
    <h3 class="title">Welcome to the Bazaar Beta test</h3>

    <div class="networks-wrap"></div>
    <p class="">
      Everything you'll do in this beta version is on Polygon's Mumbai Testnet.
      You won't pay any real fees nor trade Mainnet assets
    </p>
    <p class="">
      <a
        :href="'https://medium.com/@web3bazaar/the-web3-bazaar-opens-for-tests-on-polygon-83f0ed26625c'"
        target="_blank"
      >
        Here
      </a>
      is a user guide to support you on this journey. Thanks for helping us
      fine-tune the Bazaar before it goes line on main nets.
    </p>
    <ui-action-btn
      class="d-flex mx-auto mt-6 mb-5"
      :btn-text="'Enter Bazaar'"
      :loading="connectLoader"
      @click="enterBazaar"
    >
    </ui-action-btn>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CloseButton from '~/assets/img/svg/CloseButton.vue'

export default {
  components: { CloseButton },
  props: {},
  data() {
    return { connectLoader: false }
  },
  computed: {
    ...mapState('connector', ['isWalletConnected']),
  },
  methods: {
    async enterBazaar() {
      if (this.isWalletConnected) {
        this.$router.push({ name: 'main-square' })
      }
      this.connectLoader = true
      try {
        await this.$store.dispatch('connector/connectAccount', window.ethereum)
        if (this.isWalletConnected) {
          // switch to mumbai
          // await this.$store.dispatch('networks/switchNetwork', {
          //   chainId: '0x13881',
          // })

          this.$router.push({ name: 'main-square' })
        }
      } catch (e) {
        console.log('e:', e)
      }
      this.connectLoader = false
    },
    closePopup() {
      this.$emit('close')
    },
  },
}
</script>
<style lang="scss">
.modal-wrap.loading {
  background: rgba($color: #03091f, $alpha: 0.6);
}
</style>
<style lang="scss" scoped>
.loading-popup {
  padding: 20px;
  background: #03091f;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  width: 95%;
  max-width: 590px;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  .bg-img {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: auto;
    z-index: 1;
  }
  .close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 20px;
    height: 20px;
    cursor: pointer;
    object-fit: contain;
    z-index: 3;
  }
  .title {
    font-size: 24px;
    line-height: 1.7;
    text-transform: uppercase;
    margin-bottom: 30px;
    position: relative;
    z-index: 2;
  }
  .networks-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    position: relative;
    z-index: 2;
    .item-wrap {
      margin: 10px;
    }
  }
  .info-wrap {
    max-width: 400px;
    padding: 15px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    position: relative;
    z-index: 2;
    .block-title {
      line-height: 1.3;
      margin-bottom: 10px;
    }
    .network-name {
      position: relative;
      &::before {
        content: '';
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #cfd2d5;
        position: absolute;
        top: 50%;
        right: calc(100% + 10px);
        transform: translateY(-50%);
      }
    }
  }
}
</style>
