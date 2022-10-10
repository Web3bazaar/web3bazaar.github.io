<template>
    <div class="carousel">

        <div class="arrow_1" @click="prev">
            <img :src="require('@/assets/fromfigma/Svgelements/carousel_arrow.svg')" alt="">
        </div>
        
        <slot></slot>
 
          
        <div class="arrow_2" @click="next">
            <img :src="require('@/assets/fromfigma/Svgelements/carousel_arrow.svg')" alt="">
        </div>
    </div>
</template>

<script>

export default {
    setup() {
        
    },

    methods: {
        next() {
            this.$emit('next')
        },

        prev() {
            this.$emit('prev')
        }
    }
}
</script>

<style>
    .carousel {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 70%;
        height:30vw;
        overflow: hidden;
    }

    .arrow_1 {
        position: absolute;
        transform: scaleX(-1);
        top:35%;
        left:5%;
        cursor: pointer;
        width: 10%;
        z-index: 5;
    }
    
    .arrow_2 {
        position: absolute;
        top:35%;
        right:5%;
        cursor: pointer;
        width: 10%;
    }

    
    @keyframes lightenOnHover {
        0% {
            opacity: 0.4;
        }
        100% {
            opacity: 1;
        }
    }

    @media (hover) {
        .arrow_1 {
            opacity: 0.4;
        }
        .arrow_1:hover {
        animation: lightenOnHover 1.5s forwards ease-in-out;
        }

        .arrow_2 {
            opacity: 0.4;
        }
        .arrow_2:hover {
        animation: lightenOnHover 1.5s forwards ease-in-out;
        }
    }

    @media screen and (max-width:960px) and (min-height:1070px){
        .carousel {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            margin-top: 0%;
            min-height: 30vh;
            overflow: hidden;
        }

         .arrow_1 {
            position: absolute;
            transform: scaleX(-1);
            top:35%;;
            left:5%;
            cursor: pointer;
            width: 5%;
            z-index: 5;
        }
    
        .arrow_2 {
            position: absolute;
            top:35%;
            right:5%;
            cursor: pointer;
            width: 5%;
        }
    
    }
    @media screen and (max-width:799px) and (min-width:500.5px){
        .carousel {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 50vw;
            margin-top: -27%;
            overflow: visible;
        }

         .arrow_1 {
        position: absolute;
        transform: scaleX(-1);
        top:35%;;
        left:5%;
        cursor: pointer;
        width: 5%;
        z-index: 5;
    }
    
    .arrow_2 {
        position: absolute;
        top:35%;
        right:5%;
        cursor: pointer;
        width: 5%;
    }
    }
    @media screen and (max-width:500px){
        .carousel {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            min-height:270px;
            margin-top: 0%;
            overflow: hidden;
        }

         .arrow_1 {
        position: absolute;
        transform: scaleX(-1);
        top:35%;;
        left:5%;
        cursor: pointer;
        width: 5%;
        z-index: 5;
    }
    
    .arrow_2 {
        position: absolute;
        top:35%;
        right:5%;
        cursor: pointer;
        width: 5%;
    }
    }

</style>