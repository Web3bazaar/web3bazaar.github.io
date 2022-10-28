<template>
    <div class="footer_area">
      <div class="vector_2">
        <img :src="require('@/assets/fromfigma/Svgelements/large_screen_fter.png')" alt="" class="vector_2">
      </div>
      <div class="vector_2_5">
        <img :src="require('@/assets/fromfigma/Svgelements/mobile_footer.png')" alt="" class="vector_2_5">
      </div>

      <div class="donation_container">
          <div class="support_the_bazaar">
              <h2 id="stroked-header">Support the Bazaar</h2>
          </div>
          

          <div class="reason_for_donation">
              <h4 ref="twenty">
                {{typeValueTwo}}
              </h4>
          </div> 


          <h3 class="donate">Donate Below:</h3>

          <div class="for_row">
            <div v-for="percentage in percentages" :key="percentage" rows="auto" class="donate_buttons">
                <button class="button_5" @click="callDonateAmount(percentage)">
                  <div class="learn_more donations-btn">
                      <div class="overlay_4">
                        <div class="overtop_4">
                          <div class="over_in_4">
                            <div class="overspread_4">
                              <h3>{{ getCurrentChainValue(percentage) }}</h3>
                            </div>
                          </div>
                        </div>
                          
                      </div>
                  </div>
                </button>
            </div>
    
          </div>

      </div>

      <div class="vector_3">
        <img :src="require('@/assets/fromfigma/Svgelements/line_.png')" alt="" width="97%" height="100%">
      </div>
    </div> 
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      percentages: [1, 10, 100],
      typeValueTwo: '',
      typeStringTwo: 'Send a donation to help us keep the Bazaar open to all and free to use forever.',
      typingSpeedTwo: 100,
      typeIndexTwo:0,

      optionsTwo: {
        rootMargin: "0px 0px -20px 0px",
        threshold: 0.7
        },
  
    }
  },
  computed: {
    ...mapGetters('networks', { activeNetwork: 'getActiveChain' }),
    ...mapGetters('donations', ['getBaseValue', 'getW3BDonationAddress']),
    w3bDonationAddress() {
      return this.getW3BDonationAddress(this.activeNetwork?.chainId)
    },
  },
  created() {
    setTimeout(this.typeTextTwo,this.typingSpeedTwo)
    this.retypeText()
      
  },
  mounted(){
    
  },  
  methods: {
    ...mapActions('donations', { donateAmount: 'donateAmount' }),
    async callDonateAmount(percentage) {
      // check if user is on mumbai then switch to polygon
      // if (this.activeNetwork?.chainId === '0x13881') {
      await this.$store.dispatch('networks/switchNetwork', {
        chainId: '0x89',
      })
      // }

      const finalAmount =
        this.getBaseValue(this.activeNetwork?.chainId) * (percentage / 100)
      if (this.activeNetwork?.chainId === '0x89') {
        await this.donateAmount({ amount: finalAmount })
      }
    },
    getCurrentChainValue(percentage) {
      const finalAmount =
        this.getBaseValue(this.activeNetwork?.chainId) * (percentage / 100)

      return finalAmount + ' ' + this.activeNetwork?.nativeCurrency?.symbol
    },

    typeTextTwo() {
      if(this.typeIndexTwo < this.typeStringTwo.length) {

          this.typeValueTwo += this.typeStringTwo.charAt(this.typeIndexTwo)
          this.typeIndexTwo++;
          setTimeout(this.typeTextTwo,this.typingSpeedTwo)
      }else {
        setTimeout(this.retypeText, 5000)
      }
    },

    retypeText(){
      if(this.typeIndexTwo >= this.typeStringTwo.length){
          this.typeValueTwo ='';
          this.typeIndexTwo = 0
        this.typeTextTwo()
      }
    }
     
  },
}
</script>

<style scoped src="assets/css/for_index.css" >
</style>

