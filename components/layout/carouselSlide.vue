<template>
    <transition :name="direction">
        <div v-show="visibleSlide === index" class="carousel-slide" @touchend="performSlide" @touchstart="compute">
            <slot></slot>
        </div>
    </transition>
  
</template>

<script>
export default {
    props:['visibleSlide','index','direction'],
    data() {
        return{
            down: null,
            slideDirection: 0
        }
    }, 
    setup() {
        
    },

     methods: {
        compute(e){
            this.down = e.targetTouches.item(0).clientX
            console.log(this.down)
        },
        
        performSlide(e){
            this.slideDirection=(e.changedTouches.item(0).clientX)-this.down
            console.log(this.slideDirection+'pt')
            this.$emit('performSlide',this.slideDirection)
        }
     }
}  
 
</script>

<style>
    .carousel-slide {
        position: absolute;
        top:-5%;
        left:0%;
        right:0%;
        bottom:0%;
        display:flex;
        flex-direction:column;
        align-items: center;
        justify-content:center;
            
    }

    .carousel-slide *{
        width: 70%;
        
    }

    .left-enter-active {
        animation: leftInAnimation 0.75s ease-in-out;
    }

    .left-leave-active {
        animation: leftOutAnimation 0.75s ease-in-out;
    }

    @keyframes leftInAnimation {
        from{transform: translateX(100%);}
        to{transform: translateX(0);}
    }

    @keyframes leftOutAnimation {
        from{transform: translateX(0);}
        to{transform: translateX(-100%);}
    }

    .right-enter-active {
        animation: rightInAnimation 0.75s ease-in-out;
    }

    .right-leave-active {
        animation: rightOutAnimation 0.75s ease-in-out;
    }

    @keyframes rightInAnimation {
        from{transform: translateX(-100%);}
        to{transform: translateX(0);}
    }

    @keyframes rightOutAnimation {
        from{transform: translateX(0);}
        to{transform: translateX(100%);}
    }


    @media screen and (max-width:960px) and (min-height:1070px){
         .carousel-slide {
            position: absolute;
            top:-5%;
            left:-5%;
            right:0%;
            margin: 0 auto;
            bottom:0%;
            display:flex;
            flex-direction:column;
            align-items: center;
            justify-content:center;
            width: 110%;
        }
    }
    @media screen and (max-width:799px) and (min-width:500.5px){
        .carousel-slide {
            position: absolute;
            top:0%;
            left:-20%;
            right:0%;
            margin: 0 auto;
            bottom:0%;
            display:flex;
            flex-direction:column;
            align-items: center;
            justify-content:center;
            width: 140%;
        }
    }

    @media screen and (max-width:500px){
        .carousel-slide {
        position: absolute;
        top:0%;
        left:0%;
        right:0%;
        margin: 0 auto;
        bottom:0%;
        display:flex;
        flex-direction:column;
        align-items: center;
        justify-content:center;
        width: 105%;

        
    }

    .carousel-slide *{
        width: 100%;
       
    }

    }

</style>
