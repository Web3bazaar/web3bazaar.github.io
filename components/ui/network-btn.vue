<template>
  <button class="btn mini login-btn network-btn" @click="clickHandler">
    <img :src="activeNetwork.icon" alt="" />

    {{ activeNetwork.title }}
  </button>
</template>

<script>
import avaxIcon from '@/assets/img/pixel-logos/avalanche-pixel.png'
import binanceIcon from '@/assets/img/pixel-logos/binance-pixel.png'
import fantomIcon from '@/assets/img/pixel-logos/fantom-pixel.png'
import polygonIcon from '@/assets/img/pixel-logos/polygon-pixel.png'
export default {
  props: {
    networkType: {
      type: String,
      default: '0xa86a',
    },
  },
  data() {
    return {
      networks: [
        {
          chainId: '0xa86a',
          title: 'Avalanche',
          icon: avaxIcon,
        },
        {
          chainId: '0x38',
          title: 'BSC',
          icon: binanceIcon,
        },
        {
          chainId: '0xfa',
          title: 'FANTOM',
          icon: fantomIcon,
        },
        {
          chainId: '0x89',
          title: 'POLYGON',
          icon: polygonIcon,
        },
      ],
    }
  },
  computed: {
    activeNetwork() {
      return this.networks.find((item) => item.chainId === this.networkType)
    },
  },
  methods: {
    clickHandler() {
      this.$emit('click')
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
