<template>
    <div class="body">

        <div class="header_area">
            <div class="herosection">
                <div class="background_image">
                    <img src="../assets/fromfigma/Bg-image.png" alt="" class="image1">
                </div>

                <div class="vector_1">
                    <img src="../assets/fromfigma/Svgelements/Vector_1.svg" alt="" class="vector_1">
                </div> 
                <div class="vector_1_5">
                    <img src="../assets/fromfigma/Svgelements/head_vector.png" alt="" class="vector_1_5">
                </div>

                <div class="Main_info">

                    <div class="info_wrapper">
                        <div class="header">
                        <h1 id="stroked-header">The P2P Exchange for all EVM Chains</h1>
                        </div>

                        <div class="description">
                            <h4 class="description">{{ typeValue }}</h4>
                        </div>
                    
                        <ui-action-btn class="brighten" :btnText="'ENTER THE BAZAAR'" @click="openBetaModal" >
                        </ui-action-btn>
                    </div>
                    
                    <div class="Bazaar_stats">

                        <div class="tradedassets">
                            
                        <h4 class="Asset_Count">{{ tradedAssets }}</h4>
                            
                        </div>

                        <div class="completedtrade">

                            <h4 class="Ct_Count">{{ completedTrades }}</h4>
                            
                        </div>
                    </div>
                 
                </div>
            </div>
        </div>

        <div class="body_area">

            <div class="hacken_audit_area">
                <div class="hackenauditcontainer">
                    <div class="lock">
                        <img src="../assets/fromfigma/icons/lock.png" alt="" width="100%">
                    </div>

                    <div class="text">
                        <h4 class="audit">Our smart contracts are safe <br/>and  have been audited by Hacken.</h4>
                       
                        <button class="button_4" onclick="window.open('https://drive.google.com/file/d/1CjjpCHmor9CecunyKgau96Z7-YBzcC2-/view','_blank')">
                            <div class="learn_more">
                                <div class="overlay_4">
                                    <div class="overtop_4">
                                        <div class="over_in_4">
                                            <div class="overspread_4">
                                                <h3>Learn More</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                            </div>
                        </button>
                    
                    </div>
                    
                    <div class="hacken">
                        <img src="../assets/fromfigma/logos/Hacken.png" alt="" width="100%">
                    </div>
                </div>
            </div>

            <div class="value_proposition_area">

                <div class="value_proposition_header_area">

                    <div class="blue_line">
                        <img src="../assets/fromfigma/Svgelements/Blue_line.svg" alt="">
                    </div>
                    <div class="value_prop">
                        <div class="wrap_a">
                            <div class="wrap_b">
                                <div class="wrap_c">
                                    <h3 class="value_proposition_header">A UNIQUE SMART CONTRACT ARCHITECTURE</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="pink_line">
                        <img src="../assets/fromfigma/Svgelements/pink_line.svg" alt="">
                    </div>
                    
                </div>

                <div class="proposition_container">

                    <div class="non_custodial_container">
                        <div class="wrapper_1">
                            <div class="unlocked_icon">
                                <img src="../assets/fromfigma/icons/unlocked_icon.png" alt="" width="70%">
                            </div> 

                            <div class="non_custodial_description"> 
                                <h4 class="description_header">Non-Custodial</h4>
                                <h5> This means it never stores users' assets and they never leave their owners' wallet until the moment of exchange.</h5>
                            </div>
                    
                        </div>
                        
                    </div>

                    <div class="permisionless_container">
                        <div class="wrapper_2">
                            <div class="universe_icon">
                                <img src="../assets/fromfigma/icons/universe.png" alt="" width="80%">
                            </div> 
                            <div class="Permisionless_description">
                                <h4 class="description_header" >Permisionless</h4>
                                <h5> There's no KYC or token listing at the smart contract level. Everyone and every asset can be trades.</h5>
                            </div>
                        </div>
                        
                        
                    </div>

                    <div class="free_to_use_container">
                        <div class="wrapper_3">
                            <div class="hand_with_gift">
                                <img src="../assets/fromfigma/icons/Mask_group.png" alt="" width="60%">
                            </div>
                            <div class="free_to_Use_description"> 
                            <h4 class="description_header">Free to use</h4>
                            <h5>No fees charged to user besides network fees.</h5>
                        </div>
                        </div>
                    </div>

                    <div class="supports_batch_transfer_container">
                        <div class="wrapper_4">
                            <div class="connected_logo">
                                <img src="../assets/fromfigma/icons/connected.png" alt="" width="50%">
                            </div>
                            <div class="supports_batch_transfer_description">
                                <h4 class="description_header">Supports batch transfers</h4>
                                <h5>Users can trade one or multiple assets in the same transaction.</h5>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>

    


        </div>

        <div class="how_to_area">
            <div class="bazaar_header_area">

                <div class="blue_line">
                    <img src="../assets/fromfigma/Svgelements/Blue_line.svg" alt="">
                </div>
                <div class="bazaar_title_place">
                    <div class="wrap_d">
                        <div class="wrap_e">
                            <div class="wrap_f">
                                <h3 class="bazaar_title_container">HOW TO USE THE BAZAAR</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pink_line">
                    <img src="../assets/fromfigma/Svgelements/pink_line.svg" alt="">
                </div>
                    
            </div>
            
            <div class="carousel_container">

            <carousel
                 @next="next"
                 @prev="prev"
                >  
                    <carousel-slide v-for="(slide,index) in slides" 
                        :key="slide" 
                        :index="index"
                        :visibleSlide="visibleSlide"
                        :direction="direction"
                    >
                    <transition name="trans">
                            <img :src="slide.url">
                    </transition>
                    </carousel-slide>

                            
            </carousel> 
            
                <carousel-indicator 
                :total="slides.length" :currentIndex="visibleSlide" @slideSelect="slideSelect">
                </carousel-indicator>
        
            </div>

        </div>

    </div>
</template>

 

<script>
import { mapState } from 'vuex';
import carousel from '@/components/layout/carousel.vue';
import carouselSlide from '@/components/layout/carouselSlide.vue';
import carouselIndicator from '@/components/layout/carouselIndicator.vue';

export default {
  name: 'IndexPage',

   components : {
        carousel,
        carouselSlide,
        carouselIndicator,
    },

  data: () => {
    return {
        typeValue: '',
        typeString: 'The Web3 Bazaar is the peer-to-peer exchange for web3 assets supported by non-custodial escrow smart contracts that enable swaps of any NFT or ERC-20 token.',
        typingSpeed: 100,
        typeIndex:0,
        
        completedTrades: '',
        numerical:1,
        target:109,
        calcSpeed:30,
        

        tradedAssets: '',
        targetOne: 174,
      

        slides:[
            { url: require('../assets/fromfigma/for_Carousel/step_1.svg')},
            { url: require('../assets/fromfigma/for_Carousel/step_2.svg')},
            { url: require('../assets/fromfigma/for_Carousel/step_3.svg')},
            { url: require('../assets/fromfigma/for_Carousel/step_4.svg')},
            { url: require('../assets/fromfigma/for_Carousel/step_5.svg')},
            { url: require('../assets/fromfigma/for_Carousel/step_6.svg')}, 
        ],
        visibleSlide:0,
        direction: 'left',
    }
  },

  head() {
    return {
      title: 'Home - ',
    }
  },

  computed: {
    ...mapState('networks', ['activeNetwork']),
    slidesLen() {
        return this.slides.length;
    },
  },

  created() {
    setTimeout(this.typeText,this.typingSpeed);
    setTimeout(this.countTrade,this.calcSpeed);
    setTimeout(this.countAsset,1)
  },

  methods: {
    openBetaModal() {
      if (this.activeNetwork.chainId === '0x13881') {
        this.$store.commit('modals/setPopupState', {
          type: 'beta',
          isShow: true,
        })
      } else {
        this.$router.push({ name: 'main-square' })
      }
    },

     next() {
        if (this.visibleSlide >= this.slidesLen - 1) {
            this.visibleSlide=0;
        }else {
            this.visibleSlide++;
        }
        this.direction="left"
    },

    prev() {
         if (this.visibleSlide <= 0) {
            this.visibleSlide = 0;
        }else {
            this.visibleSlide--;
        }
        this.direction="right"
    },

    slideSelect(index) {
       this.visibleSlide = index  
       this.direction="trans"     
    },

    typeText() {

        if(this.typeIndex < this.typeString.length) {
    
            this.typeValue += this.typeString.charAt(this.typeIndex)
            this.typeIndex++;

            setTimeout(this.typeText,this.typingSpeed)
        }
        else {
            this.typeStatus = false;
        }
    },
    

    countTrade() {
        if(this.numerical <= this.target) {

             this.completedTrades= this.numerical
            this.numerical++;
           

            setTimeout(this.countTrade,this.calcSpeed)
        }else {
            this.target = false
        }
    },

    countAsset() {
        if(this.numerical <= this.targetOne) {

             this.tradedAssets= this.numerical
            this.numerical++;
           

            setTimeout(this.countAsset,10)
        }else {
            this.target = false
        }
    }
  },
}

    
</script>



.<style scoped src="assets/css/for_index.css">
    
</style>