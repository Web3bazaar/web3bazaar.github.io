<template>
    <div class="body">

        <div class="header_area">
            <div class="herosection"
             @mousemove="parallax"
             @touchmove="parallaxe" 
           >
                <div class="background_image">
                    <div class="img_1">
                        <img src="../assets/fromfigma/Web3Bazaar_1of1_ArtPiece_HD_FINAL 8.png">
                    </div>
                    <div class="img_2" :style="{translate: `${xDirection+'px'} ${yDirection+'px'}`}">
                        <img src="../assets/fromfigma/Web3Bazaar_1of1_ArtPiece_HD_FINAL 8.png">
                    </div>
                    <div class="img_3" :style="{translate: `${-xDirection+'px'} ${yDirection+'px'}`}">
                        <img src="../assets/fromfigma/Web3Bazaar_1of1_ArtPiece_HD_FINAL 8.png">
                    </div>
                    <div class="img_4" :style="{translate: `${xDirection+'px'} ${yDirection+'px'}`}">
                        <img src="../assets/fromfigma/Web3Bazaar_1of1_ArtPiece_HD_FINAL 8.png">
                    </div>
                    <div class="img_5" :style="{translate: `${-xDirection+'px'} ${yDirection+'px'}`}">
                        <img src="../assets/fromfigma/Web3Bazaar_1of1_ArtPiece_HD_FINAL 8.png">
                    </div>
                    <div class="img_6" :style="{translate: `${-xDirection+'px'} ${yDirection+'px'}`}">
                        <img src="../assets/fromfigma/Web3Bazaar_1of1_ArtPiece_HD_FINAL 8.png">
                    </div>
                    <div class="img_7" :style="{translate: `${xDirection+'px'} ${yDirection+'px'}`}">
                        <img src="../assets/fromfigma/Web3Bazaar_1of1_ArtPiece_HD_FINAL 8.png">
                    </div>
                    <div class="img_8" :style="{translate: `${-xDirection+'px'} ${yDirection+'px'}`}">
                        <img src="../assets/fromfigma/Web3Bazaar_1of1_ArtPiece_HD_FINAL 8.png">
                    </div>
                    <div class="img_9" :style="{translate: `${xDirection+'px'} ${yDirection+'px'}`}">
                        <img src="../assets/fromfigma/Web3Bazaar_1of1_ArtPiece_HD_FINAL 8.png">
                    </div>
                   
                
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
                            <h4 class="description">The Web3 Bazaar is the peer-to-peer exchange for web3 assets supported by non-custodial escrow smart contracts that enable swaps of any NFT or ERC-20 token.</h4>
                        </div>
                    
                        <ui-action-btn class="brighten" :btnText="'ENTER THE BAZAAR'" @click="openBetaModal">
                        </ui-action-btn>
                    </div>
                    
                    <div class="Bazaar_stats">

                        <div ref="one" class="tradedassets">
                            
                        <h4 class="Asset_Count">{{ tradedAssets }}+</h4>
                            
                        </div>

                        <div  ref="two" class="completedtrade">

                            <h4 class="Ct_Count">{{ completedTrades }}+</h4>
                            
                        </div>
                    </div>
                 
                </div>
            </div>
        </div>

        <div class="body_area">

            <div ref="three" class="hacken_audit_area" >
                <div class="hackenauditcontainer">
                    <div ref="fifteen" class="lock">
                        <img src="../assets/fromfigma/icons/lock.png" alt="" width="100%">
                    </div>

                    <div class="text">
                        <h4 class="audit">Our smart contracts are safe <br/>{{typeValue}}</h4>
                       
                        <button class="button_4" onclick="window.open('https://drive.google.com/file/d/1CjjpCHmor9CecunyKgau96Z7-YBzcC2-/view','_blank')">
                            <div class="learn_more">
                                <div class="overlay_4">
                                    <div class="overtop_4">
                                        <div class="over_in_4">
                                            <div class="overspread_4">
                                                <h3>LEARN MORE</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                            </div>
                        </button>
                    
                    </div>
                    
                    <div ref="sixteen" class="hacken">
                        <img src="../assets/fromfigma/logos/Hacken.png" alt="" width="100%">
                    </div>
                </div>
            </div>

            <div class="value_proposition_area">

                <div class="value_proposition_header_area">

                    <div ref="four"  class="blue_line">
                        <img src="../assets/fromfigma/Svgelements/Blue_line.svg" alt="">
                    </div>
                    <div ref="five" class="value_prop">
                        <div class="wrap_a">
                            <div class="wrap_b">
                                <div class="wrap_c">
                                    <h3 ref="seventeen" class="value_proposition_header">A UNIQUE SMART CONTRACT ARCHITECTURE</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div ref="six" class="pink_line">
                        <img src="../assets/fromfigma/Svgelements/pink_line.svg" alt="">
                    </div>
                    
                </div>

                <div class="proposition_container">

                    <div ref="seven" class="non_custodial_container" @click="isClicked = !isClicked">
                        <div :class="{'clicked': isClicked}" class="wrapper_1">
                            <div class="unlocked_icon">
                                <img src="../assets/fromfigma/icons/unlocked_icon.png" alt="" width="70%">
                            </div> 

                            <div class="non_custodial_description"> 
                                <h4 class="description_header">Non-Custodial</h4>
                                <h5> This means it never stores users' assets and they never leave their owners' wallet until the moment of exchange.</h5>
                            </div>
                    
                        </div>
                        
                    </div>

                    <div ref="eight" class="permisionless_container" @click="isClicked = !isClicked">
                        <div :class="{'clicked': isClicked}" class="wrapper_2">
                            <div class="universe_icon">
                                <img src="../assets/fromfigma/icons/universe.png" alt="" width="80%">
                            </div> 
                            <div class="Permisionless_description">
                                <h4 class="description_header" >Permisionless</h4>
                                <h5> There's no KYC or token listing at the smart contract level. Everyone and every asset can be trades.</h5>
                            </div>
                        </div>
                        
                        
                    </div>

                    <div ref="nine" class="free_to_use_container" @click="isClicked = !isClicked">
                        <div :class="{'clicked': isClicked}" class="wrapper_3">
                            <div class="hand_with_gift">
                                <img src="../assets/fromfigma/icons/Mask_group.png" alt="" width="60%">
                            </div>
                            <div class="free_to_Use_description"> 
                            <h4 class="description_header">Free to use</h4>
                            <h5>No fees charged to user besides network fees.</h5>
                        </div>
                        </div>
                    </div>

                    <div ref="ten" class="supports_batch_transfer_container" @click="isClicked = !isClicked">
                        <div :class="{'clicked': isClicked}" class="wrapper_4">
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

                <div ref="eleven" class="blue_line">
                    <img src="../assets/fromfigma/Svgelements/Blue_line.svg" alt="">
                </div>
                <div  ref="twelve" class="bazaar_title_place">
                    <div class="wrap_d">
                        <div class="wrap_e">
                            <div class="wrap_f">
                                <h3 ref="eighteen" class="bazaar_title_container">HOW TO USE THE BAZAAR</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div ref="thirteen" class="pink_line">
                    <img src="../assets/fromfigma/Svgelements/pink_line.svg" alt="">
                </div>
                    
            </div>
            
            <div ref="fourteen" class="carousel_container">
                <div class="inner_container" @mouseenter="stopAutoPlay" @mouseleave="resumeAutoPlay">
                    <carousel
                        :showArrow="showArrow"
                        @next="next"
                        @prev="prev"
                       
                    >  
                        <carousel-slide v-for="(slide,index) in slides" 
                            :key="slide" 
                            :index="index"
                            :visibleSlide="visibleSlide"
                            :direction="direction"
                            @performSlide="performSlide"
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
        typeString: 'and have been audited by Hacken.',
        typingSpeed: 100,
        typeIndex:0,

        xDirection: 0,
        yDirection: 0,
        

        completedTrades: '',
        numerical:1,
        target:110,
        calcSpeed:140,
        

        tradedAssets: '',
        targetOne: 175,
      
        isClicked: false,

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
        touchDirection: null,
        showArrow: false,
        autoPlayFunction: null,
        

        options: {
        rootMargin: "0px 0px -20px 0px",
        threshold: 0.5
        },

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

  mounted(){
    this.callBackFunction()
    this.observeStats()
    this.observeHackenAudit()
    this.observeCarousel()
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

    parallax(e) {
        this.xDirection=(e.clientX/5)
        this.yDirection=(e.clientY/10)
        this.count=0
    },

    parallaxe(e){
        this.xDirection=(e.targetTouches.item(0).clientX/5)
        this.yDirection=(e.targetTouches.item(0).clientY/10)
        this.count=0
    },

    countTrade() {
    if(this.numerical < this.target) {
    this.numerical++;
    this.completedTrades = this.numerical
    }
    else if(this.numerical >= this.target) {
    this.completedTrades = this.target   
    } 
    else {
    this.target = false
    }  setTimeout(this.countTrade,this.calcSpeed)
    },

    countAsset() {
    if(this.numerical < this.targetOne) {
    this.numerical++;
    this.tradedAssets = this.numerical
    }    
    else if(this.numerical >= this.targetOne) {
    this.tradedAssets =  this.targetOne
    }
    else {
    this.targetOne = false
    }setTimeout(this.countAsset,1)
    },

    typeText() {
    if(this.typeIndex < this.typeString.length) {
    this.typeValue += this.typeString.charAt(this.typeIndex)
    this.typeIndex++;
    }
    else {
    this.typeValue =this.typeString;
    } setTimeout(this.typeText,this.typingSpeed)
    },

    next() {
        if (this.visibleSlide >= this.slidesLen - 1) {
            this.visibleSlide=0;
            this.showArrow =false
        }else {
            this.visibleSlide++;
            this.showArrow =true
            
        }
        this.direction="left"
        clearTimeout(this.autoPlayFunction)
    },

    prev() {
         if (this.visibleSlide <= 1) {
            this.visibleSlide = 0;
            this.showArrow =false
        }else {
            this.visibleSlide--;
            this.showArrow =true
        }
        this.direction="right"
        clearTimeout(this.autoPlayFunction)
    },

    slideSelect(index) {
       this.visibleSlide = index  
       this.direction="trans"
       if (this.visibleSlide <= 0) {
            this.showArrow =false
        }
        else{
            this.showArrow= true 
        }clearTimeout(this.autoPlayFunction)

    },

    autoPlayCarousel(){
        if (this.visibleSlide >= this.slidesLen - 1) {
            this.visibleSlide=0;
            this.showArrow =false
        }else {
            this.visibleSlide++;
            this.showArrow =true
        }
        this.direction="left"
        this.autoPlayFunction = setTimeout(()=>{
            this.autoPlayCarousel()
        }, 5000)      
    },
    
    stopAutoPlay(){
        clearTimeout(this.autoPlayFunction)
    },

    resumeAutoPlay() {
        this.autoPlayCarousel()
    },
    
    performSlide(slideDirection){
        this.touchDirection = slideDirection
        if(this.touchDirection < -50){
           this.next()
        }else if(this.touchDirection > 30){
            this.prev()
        }clearTimeout(this.autoPlayFunction) 
    },

    callBackFunction(){

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry=>{
            if(entry.isIntersecting) {
          entry.target.classList.add('visible')
            }
        })
            
        }, this.options
    );
        observer.observe(this.$refs.one)
        observer.observe(this.$refs.two)
        observer.observe(this.$refs.three)
        observer.observe(this.$refs.four)
        observer.observe(this.$refs.five)
        observer.observe(this.$refs.six)
        observer.observe(this.$refs.seven)
        observer.observe(this.$refs.eight)
        observer.observe(this.$refs.nine)
        observer.observe(this.$refs.ten)
        observer.observe(this.$refs.eleven)
        observer.observe(this.$refs.twelve)
        observer.observe(this.$refs.thirteen)
        observer.observe(this.$refs.fourteen)
        observer.observe(this.$refs.fifteen)
        observer.observe(this.$refs.sixteen)
        observer.observe(this.$refs.seventeen)
        observer.observe(this.$refs.eighteen)
  },

    observeStats(){
        const observer = new IntersectionObserver(entries => {
        entries.forEach(entry=>{
            if(entry.isIntersecting) {
             this.countTrade()
             this.countAsset()
            }
        })
            
        }, this.options
    );
        observer.observe(this.$refs.one)
        observer.observe(this.$refs.two)
    },

    observeHackenAudit(){
        const observer = new IntersectionObserver(entries => {
        entries.forEach(entry=>{
            if(entry.isIntersecting) {
                this.typeText()
            }
        })
            
        }, this.options
    );
        observer.observe(this.$refs.three)
    },

    observeCarousel(){
        const observer = new IntersectionObserver(entries => {
        entries.forEach(entry=>{
            if(entry.isIntersecting) {
                this.autoPlayFunction = setTimeout(()=>{
                this.autoPlayCarousel()
                }, 5000)
            }
        })
            
        }, this.options
    );
        observer.observe(this.$refs.fourteen) 
    }
    
  },

   




}

    
</script>



.<style scoped src="assets/css/for_index.css">
    
</style>