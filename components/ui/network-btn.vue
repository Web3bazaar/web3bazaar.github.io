<template>
  <button class="btn mini login-btn network-btn px-4" @click="clickHandler">
    <img :src="getNetworkIcon(activeNetwork.name)" alt="" />

    {{ getNetworkName }}
  </button>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    networkType: {
      type: String,
      default: '0xa86a',
    },
  },
  data() {
    return {}
  },
  computed: {
    ...mapState('networks', ['networksData', 'activeNetwork']),

    activeNetwork() {
      return this.networksData.find((item) => item.chainId === this.networkType)
    },
    getNetworkName() {
      console.log(this.activeNetwork)
      return this.activeNetwork?.chainId === '0x13881'
        ? this.activeNetwork.name
        : 'Switch to mumbai testnet'
    },
  },
  methods: {
    clickHandler() {
      // disable network change for now
      this.$emit('click')
    },
    getNetworkIcon(network) {
      if (network && network !== 'rinkeby') {
        return require(`@/assets/img/pixel-logos/${network.toLowerCase()}-pixel.png`)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.network-btn {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  img {
    width: 12px;
    height: auto;
    margin-right: 10px;
  }
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
}
</style>
