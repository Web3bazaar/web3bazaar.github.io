<template>
  <div class="metamask-checker"></div>
</template>

<script>
import detectEthereumProvider from '@metamask/detect-provider'
// import { ethers } from 'ethers'
import { mapState } from 'vuex'

const providerDetector = {
  log: require('debug')('w3b:view:ProviderDetector'),
  error: require('debug')('w3b:view:error:ProviderDetector'),
}

export default {
  data() {
    return {
      checkInProgress: true,
    }
  },
  computed: {
    ...mapState('networks', ['networksData']),
    ...mapState('connector', ['isWalletConnected', 'chainId']),
  },
  watch: {
    isWalletConnected(value) {
      if (value && !this.checkInProgress) {
        this.compareNetworkSupport(this.chainId)
        this.setAccountListeners()
        // this.$emit('checkSuccess')
      }
    },
  },
  created() {
    this.checkProvider()
  },
  methods: {
    async checkProvider() {
      providerDetector.log('checkProvider')
      const provider = await detectEthereumProvider()
      if (!provider) {
        this.$store.commit('setPopupState', {
          type: 'browser',
          isShow: true,
        })
        this.$emit('checkError', 'Please install MetaMask!')
        return false
      }
      if (provider !== window.ethereum) {
        this.$emit('checkError', 'Do you have multiple wallets installed?')
        return false
      }
      // const userProvider = new ethers.providers.Web3Provider(window.ethereum)
      // const userSigner = userProvider.getSigner()
      // console.log(userSigner)
      // this.$store.commit('connector/setSigner', userSigner)

      // this.$store.commit('connector/setSigner', Object.freeze(userSigner))
      this.$store.commit('connector/setMetamaskActive', true)
      await this.checkConnection()
    },
    async checkConnection() {
      providerDetector.log('checkConnection')

      const address = await this.$store.dispatch(
        'connector/fetchAccount',
        window.ethereum
      )
      providerDetector.log(address)
      if (!address) {
        this.$emit('checkError', '')
        this.checkInProgress = false
        return false
      }
      const chainId = await this.$store.dispatch(
        'connector/fetchChainId',
        window.ethereum
      )
      providerDetector.log(chainId)

      this.compareNetworkSupport(chainId)

      this.$store.commit('connector/setWalletConnection', true)
      this.setAccountListeners()
      this.checkInProgress = false

      // const routeName = this.$route.name
      // console.log(routeName)
      // if (routeName !== 'main-square')
      //   this.$router.push({ name: 'main-square' })
      this.$emit('checkSuccess')
    },
    compareNetworkSupport(chainId) {
      const networkObject = this.networksData.find(
        (network) => network.chainId === chainId
      )
      // if (chainId !== '0xa86a') {
      //   this.$store.commit('modals/setPopupState', {
      //     type: 'wrong-network',
      //     isShow: true,
      //   })
      //   const routeName = this.$route.name
      //   console.log(routeName)
      //   if (routeName !== 'index') this.$router.push({ name: 'index' })
      // }
      if (networkObject)
        this.$store.commit('networks/setActiveNetwork', chainId)
    },
    setAccountListeners() {
      providerDetector.log('SET METAMASK ACCOUNT LISTENERS FUNC')
      window.ethereum.on('chainChanged', this.onChainIdChange)
      window.ethereum.on('accountsChanged', this.onAccountChange)
    },
    onAccountChange(accounts) {
      if (accounts.length === 0) {
        // MetaMask is locked or the user has not connected any accounts
        providerDetector.log('Please connect to MetaMask.')
        this.disconnectHandler()
      } else {
        this.$store.commit('connector/setAccount', accounts[0])
      }
    },
    onChainIdChange() {
      window.location.reload()
    },
    disconnectHandler() {
      providerDetector.log('disconnectHandler')
      this.$store.commit('modals/closeModal')
      this.$store.commit('connector/setAccount', null)
      this.$store.commit('connector/setWalletConnection', false)
      this.$store.commit('connector/setChainId', null)
      // this.$store.commit('networks/setActiveNetwork', '0x1')
      // Clear data as well

      const routeName = this.$route.name
      if (routeName !== 'index') this.$router.push({ name: 'index' })
      this.$emit('checkError', 'Please connect to MetaMask.')
    },
  },
}
</script>
