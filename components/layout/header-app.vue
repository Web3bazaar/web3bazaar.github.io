<template>
  <div>

    <div :class="{'Scrolled': Scrolled }" class="navbar"> 
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

              
                <div class="ham-menu" @click ="showBar= !showBar" >
                  <img v-if="showBar" src="@/assets/fromfigma/Svgelements/ham-menu.svg" alt="ham-menu" width="100%" />
                  <img v-if="!showBar" src="@/assets/fromfigma/Svgelements/cancel_sign.svg" alt="cancel-sign" width="100%">
                </div>
               
              
            
      </div>
             
     
  </div> 

  <transition name="slidy">
    <div
      ref="bar"
      v-if="showBar" 
      :class="{ active:showBar }" 
      class="socialmediatab">
                <div :class="{'Scrolled': Scrolled }" class="socialmediacontainer">
                  <ul>
                      <li class="web3wiki" onclick="window.open('https://docs.web3bazaar.org/','_blank')">
                        <div class="web3wiki_1"><img :src="require('@/assets/fromfigma/logos/Web3Bazaar_Logo_2048px.6343b52.png')" alt="web3wiki" width="100%">
                        </div>
                        <button class="web3wiki_2"><img :src="require('@/assets/img/site-logos/Web3Bazaar_Logo_2048px.png')" alt="web3wiki" width="100%">
                        </button>  
                      </li>
                    
                      <li class="discord"  onclick="window.open('https://discord.gg/Z5GqrdHWJP','_blank')">
                        <div class="discord_1"><img :src="require('@/assets/fromfigma/logos/discord-logo.png')" alt="discord" width="95%">
                        </div>
                        <button class="discord_2"><img :src="require('@/assets/img/pixel-logos/discord-pixel.png')" alt="discord" width="95%">
                        </button>
                      </li>
                    
                      <li class="github" onclick="window.open('https://github.com/Web3bazaar','_blank')">
                        <div class="github_1"><img :src="require('@/assets/fromfigma/logos/git-hub_logo.png')" alt="github" width="95%" height="35.74vw">
                        </div>
                        <button class="github_2"><img :src="require('@/assets/img/pixel-logos/github-pixel.png')" alt="github" width="95%">
                        </button>
                      </li> 

                      <li class="twitter" onclick="window.open('https://twitter.com/Web3Bazaar','_blank')">
                        <div class="twitter_1"><img :src="require('@/assets/fromfigma/logos/twitter_logo.png')" alt="github" width="100%"></div>
                        <button class="twitter_2"><img :src="require('@/assets/img/pixel-logos/twitter-pixel.png')" alt="github" width="100%"></button>
                      </li>
                      
                        
                        
                  </ul>
                </div>
    </div>
  </transition>
   

  <transition name="slidy">
    <div 
    ref="bar"
    v-if="!showBar"
    :class="{ socialmediatab:!showBar }" 
    class="socialmediatab">
              <div :class="{'Scrolled': Scrolled }" class="socialmediacontainer">
                <ul>
                    <li class="web3wiki" onclick="window.open('https://docs.web3bazaar.org/','_blank')">
                      <div class="web3wiki_1"><img :src="require('@/assets/fromfigma/logos/Web3Bazaar_Logo_2048px.6343b52.png')" alt="web3wiki" width="100%">
                      </div>
                      <button class="web3wiki_2"><img :src="require('@/assets/img/site-logos/Web3Bazaar_Logo_2048px.png')" alt="web3wiki" width="100%">
                      </button>  
                    </li>
                  
                    <li class="discord"  onclick="window.open('https://discord.gg/Z5GqrdHWJP','_blank')">
                      <div class="discord_1"><img :src="require('@/assets/fromfigma/logos/discord-logo.png')" alt="discord" width="95%">
                      </div>
                      <button class="discord_2"><img :src="require('@/assets/img/pixel-logos/discord-pixel.png')" alt="discord" width="95%">
                      </button>
                    </li>
                  
                    <li class="github" onclick="window.open('https://github.com/Web3bazaar','_blank')">
                      <div class="github_1"><img :src="require('@/assets/fromfigma/logos/git-hub_logo.png')" alt="github" width="95%" height="35.74vw">
                      </div>
                      <button class="github_2"><img :src="require('@/assets/img/pixel-logos/github-pixel.png')" alt="github" width="95%">
                      </button>
                    </li> 

                    <li class="twitter" onclick="window.open('https://twitter.com/Web3Bazaar','_blank')">
                      <div class="twitter_1"><img :src="require('@/assets/fromfigma/logos/twitter_logo.png')" alt="github" width="100%"></div>
                      <button class="twitter_2"><img :src="require('@/assets/img/pixel-logos/twitter-pixel.png')" alt="github" width="100%"></button>
                    </li>
                  
                      
                </ul>
              </div>
    </div>
  </transition>
    

  </div>
 
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {

  data: () => {
    return {
      showBar: true,
      Scrolled: false
    }
    
  },
 
  computed: {
    ...mapState('networks', ['activeNetwork', 'networksData']),
    ...mapState('connector', ['isWalletConnected']),

    ...mapState('modals', ['showModal', 'modalType']),
  },

  mounted() {
    window.addEventListener('scroll', this.updateOnScroll)
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

    updateOnScroll(){
      const scrollPosition = window.scrollY
      if (scrollPosition > 30) {
      this.$refs.bar.classList.add('Scrolled') 
      this.Scrolled = true 
      }else {
        this.$refs.bar.classList.remove('Scrolled')
        this.Scrolled = false 
      }
    }

  },
}



</script>


<style scoped src="assets/css/for_index.css">
  
</style>


