<template>
    <div 
    class="carousel-indicators">
        <button class="carousel-indicator"
        v-for="(item, index) in total" 
        :class="{ active: currentIndex === index }"
        :key="index"
        @click="$emit('slideSelect', index)"
        >
        </button>
    </div>
</template>

<script>

export default {
    emits: ['slideSelect'],
    props: ["total","currentIndex"],
    
};

</script>


<style>
    .carousel-indicators {
        position:absolute;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width:19%;
        height: 3%;
        left: 25%;
        bottom: -10%;
    }

    .carousel-indicator {
        background: rgba(0, 0, 0, 0.651);
        width: 11%;
        height:100%;
        border-radius:4px
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
            width:40%;
            height: 3%;
            left: 13%;
            bottom: 28%;
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
            left: 10%;
            bottom: 32%;
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
        left: 10%;
        bottom: 25%;
    }

    .carousel-indicator {
        background: rgba(0, 0, 0, 0.651);
        width: 11%;
        height:100%;
        border-radius:4px
    }
    
    }

</style>