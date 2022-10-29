<template>
    <div class="carousel-indicators">
            <button 
            v-for="(item, index) in total"
            :key="index" 
            class="carousel-indicator"
            :class="{ active: currentIndex === index }"
            @click="$emit('slideSelect', index)"
            >
            </button>
    </div>
</template>

<script>

export default {
    props: ['total','currentIndex'],
    emits: ['slideSelect'],
   
    
};

</script>


<style>
   
    .carousel-indicators {
        position:absolute;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width:25%;
        height: 3%;
        left:0%;
        right:0%;
        bottom:5%;
        margin: 0 auto;
    }

    .carousel-indicator {
        background: rgba(0, 0, 0, 0.651);
        width: 11%;
        height:100%;
        border-radius:4px
    }

    .carousel-indicator:focus {
        border:1px solid magenta;
    }

    .carousel-indicator.active {
        background: #E83E8C
    }

    
    @media screen and (max-width:960px) and (min-height:1070px){
        .carousel-indicators {
            position:absolute;
            display: flex;
            justify-content: space-between;
            align-items: center;
            width:35%;
            height: 3%;
            left: 0;
            right: 0;
            margin: 0 auto;
            bottom: 3%;
        }
    }
    @media screen and (max-width:799px) and (min-width:500.5px){
        .carousel-indicators {
        position:absolute;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width:50%;
        height: 3%;
        left:0%;
        right:0%;
        bottom:30%;
        margin: 0 auto;
        }
    }    

    @media screen and (max-width:500px){
        .carousel-indicators {
        position:absolute;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width:50%;
        height: 3%;
        left:0%;
        right:0%;
        bottom:4%;
        margin: 0 auto;
    }

    .carousel-indicator {
        background: rgba(0, 0, 0, 0.651);
        width: 11%;
        height:100%;
        border-radius:4px
    }
    
    }

</style>