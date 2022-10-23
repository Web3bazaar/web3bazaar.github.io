<template>
  <button class="button_2"  @click="clickHandler">
      <div class="choose_network">
         <div class="overlay_2">
          <div class="overtop_2">
            <div class="over_in_2">
              <div class="overspread_2">
                <img :src="getNetworkIcon(activeNetwork.name)" alt="" />
                <h4 ref="nameHighlight"  class="network_name">{{ getNetworkName }}</h4> 
              </div>
            </div>
          </div>
      </div>
    </div>
     
  </button>
    
 
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: {
    networkType: {
      type: String,
      default: '0xa86a',
    },
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState('networks', ['networksData', 'activeNetwork']),

    activeNetwork() {
      return this.networksData.find((item) => item.chainId === this.networkType)
    },
    getNetworkName() {
      // return this.activeNetwork?.chainId === '0x13881'
      //   ? this.activeNetwork.chainName
      //   : 'Switch to mumbai testnet'
      return this.activeNetwork.chainName
    },
  },
  methods: {
    ...mapActions('sound', ['playSFXAudio']),

    playSound() {
      this.playSFXAudio({ audioToPlay: 'actionButton' })
      this.$emit('click')
    },
    clickHandler() {
      this.playSound()
      this.$refs.nameHighlight.classList.add('active')
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

<style scoped src="assets/css/for_index.css" >

</style>

<style scoped>
   img {
    width: 7vw;
    height: auto;
    margin-top: 0.5vw;
      
  }
  .network_name {
      display: none
    }

    .active {
    color: #90ffde ;
  }
    @media screen and (min-width:500.5px) {
    img {
      width: 6vw;
      height: auto;
      margin-top: 0vw;
      margin-right: 7px;

    } 
    .network_name {
      display: flex;
      font-weight: 100;
      font-size: 3vw;
      text-transform: uppercase;
    }
  }

  @media screen and (min-width:800px) {
    img {
    width: 4vw;
    height: auto;
    margin-top: 0vw;
    margin-right: 5px;

  }

  .network_name {
      display: flex;
      font-size: 1.5vw;
      text-transform: uppercase;

    }
  }

  @media screen and (min-width:960px) {
    img {
    width: 2vw;
    height: auto;
    margin-top: 0vw;
    margin-right: 6px;
  
  }

  .network_name {
      display: flex;
      font-size: 1.5vw;
      text-transform: uppercase;
    }
  }
  
  

</style>
