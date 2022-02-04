<template>
  <div class="network-popup">
    <div class="close-btn" @click="closePopup">
      <CloseButton />
    </div>

    <p class="title">select your network</p>

    <div class="networks-wrap">
      <div v-for="network in networks" :key="network.chainId" class="item-wrap">
        <ui-network-btn
          :network-type="network.chainId"
          @click="switchNetwork(network.chainId)"
        />
      </div>
    </div>

    <div class="info-wrap">
      <p class="block-title">Your MetaMask current network</p>
      <p class="network-name">{{ currentNetwork }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CloseButton from '~/assets/img/svg/CloseButton.vue'

export default {
  components: {
    CloseButton,
  },
  data() {
    return {
      networksData: [
        {
          chainId: '0x38',
          chainName: 'Binance Smart Chain',
          nativeCurrency: {
            name: 'BNB',
            symbol: 'BNB',
            decimals: 18,
          },
          rpcUrls: [
            'https://bsc-dataseed.binance.org/',
            'https://bsc-dataseed1.defibit.io/',
            'https://bsc-dataseed1.ninicoin.io/',
          ],
          blockExplorerUrls: ['https://bscscan.com'],
          iconUrls: [
            'https://s2.coinmarketcap.com/static/img/coins/200x200/1839.png',
          ],
        },
        {
          chainId: '0xfa',
          chainName: 'Fantom Opera Mainnet',
          rpcUrls: [
            'https://rpcapi.fantom.network/',
            'https://rpc.fantom.network/',
          ],
          iconUrls: ['https://ftmscan.com/images/logo-ftmscan.svg?v=0.0.2'],
          blockExplorerUrls: ['https://ftmscan.com/'],
          nativeCurrency: {
            name: 'Fantom',
            symbol: 'FTM',
            decimals: 18,
          },
        },
        {
          chainId: '0xa86a',
          chainName: 'Avalanche Network',
          rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
          iconUrls: [
            'https://snowtrace.io/images/svg/brands/mainbrand-1.svg?v=23.1.3.0',
          ],
          blockExplorerUrls: ['https://snowtrace.io/'],
          nativeCurrency: {
            name: 'Avalanche',
            symbol: 'AVAX',
            decimals: 18,
          },
        },
        {
          chainId: '0x89',
          chainName: 'Polygon Mainnet',
          rpcUrls: ['https://polygon-rpc.com/'],
          iconUrls: ['https://polygonscan.com/images/logo.svg?v=0.0.3'],
          blockExplorerUrls: ['https://polygonscan.com/'],
          nativeCurrency: {
            name: 'Matic',
            symbol: 'MATIC',
            decimals: 18,
          },
        },
      ],
    }
  },
  computed: {
    ...mapState('networks', ['networks']),
    currentNetwork() {
      const activeNetwork = this.$store.state.networks.activeNetwork
      console.log(activeNetwork)
      if (activeNetwork === '0x38') return 'Binance Smart Chain'
      if (activeNetwork === '0xfa') return 'Fantom Opera'
      if (activeNetwork === '0xa86a') return 'Avalanche'
      if (activeNetwork === '0x89') return 'Polygon Mainnet'

      return ''
    },
  },
  methods: {
    closePopup() {
      this.$emit('close')
    },
    async switchNetwork(chainId) {
      try {
        if (chainId === '0x1') {
          alert('Change in Metamask:(')
          return false
        }
        const data = this.networksData.find((item) => item.chainId === chainId)
        const resp = await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [data],
        })
        if (resp === null) {
          this.$store.commit('networks/setActiveNetwork', chainId)
          this.closePopup()
        }
        console.log(resp)
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.network-popup {
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
    margin-bottom: 50px;
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
