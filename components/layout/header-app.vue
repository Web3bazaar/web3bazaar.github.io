<template>
  <div class="navbar"> 
    <!-- Brand -->
      <div class="navcontainer">
                <router-link class="logo_area" to="/"> 
                    <div class="logo_main">
                        <img src="@/assets/fromfigma/Web3Bazaar_Logo_2048px.6343b52.png" alt="Web3Bazaar_Logo"  width="60%">
                    </div>
                   <div class="text_beside_logo">
                        <h4>Web3Bazaar</h4>
                    </div> 
                </router-link>

                <div class="wallet_and_network"> 

                    <ui-network-btn
                        :network-type="activeNetwork"
                        @click="networkClickHandler"
                      />

                    <ui-connect-btn/>
                </div>
            
      </div>

      <div class="socialmediatab">
                <div class="socialmediacontainer">
                    <ul>
                        <div class="web3wiki">
                             <li class="web3wiki_1"><a href="https://docs.web3bazaar.org/"><img :src="require('@/assets/fromfigma/logos/Web3Bazaar_Logo_2048px.6343b52.png')" alt="web3wiki" width="100%"></a>
                             <li class="web3wiki_2"><a href="https://docs.web3bazaar.org/"><img :src="require('@/assets/img/site-logos/Web3Bazaar_Logo_2048px.png')" alt="web3wiki" width="100%"></a>
                            </li>
                        </div>
                       
                       <div class="discord">
                            <li class="discord_1"><a href="https://discord.gg/Z5GqrdHWJP"><img :src="require('@/assets/fromfigma/logos/discord-logo.png')" alt="discord" width="95%"></a></li>
                            <li class="discord_2"><a href="https://discord.gg/Z5GqrdHWJP"><img :src="require('@/assets/img/pixel-logos/discord-pixel.png')" alt="discord" width="95%"></a></li>
                       </div>
                        
                       <div class="github">
                            <li class="github_1"><a href="https://github.com/Web3bazaar"><img :src="require('@/assets/fromfigma/logos/git-hub_logo.png')" alt="github" width="95%" height="35.74vw"></a></li>
                            <li class="github_2"><a href="https://github.com/Web3bazaar"><img :src="require('@/assets/img/pixel-logos/github-pixel.png')" alt="github" width="95%"></a></li>
                        </div> 
                        
                        <div class="twitter">
                            <li class="twitter_1"><a href="https://twitter.com/Web3Bazaar"><img :src="require('@/assets/fromfigma/logos/twitter_logo.png')" alt="github" width="100%"></a></li>
                            <li class="twitter_2"><a href="https://twitter.com/Web3Bazaar"><img :src="require('@/assets/img/pixel-logos/twitter-pixel.png')" alt="github" width="100%"></a></li>
                        </div>
                        
                    </ul>
                </div>
      </div>

  </div>
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


<style scoped src="assets/css/for_index.css">

</style>


