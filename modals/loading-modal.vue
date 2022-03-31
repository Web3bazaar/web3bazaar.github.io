<template>
  <div class="loading-popup">
    <p class="title">Loading...</p>

    <div class="networks-wrap">
      <v-img :src="loadingGif" max-height="300" />
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      loadingGif: require('../assets/gifs/MinerAnimation.gif'),
    }
  },
  computed: {},
  methods: {},
}
</script>
<style lang="scss">
.modal-wrap.loading {
  background: rgba($color: #03091f, $alpha: 0.6);
}
</style>
<style lang="scss" scoped>
.loading-popup {
  padding: 20px;
  background: #03091f;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  width: 95%;
  max-width: 590px;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  .bg-img {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: auto;
    z-index: 1;
  }
  .close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 20px;
    height: 20px;
    cursor: pointer;
    object-fit: contain;
    z-index: 3;
  }
  .title {
    font-size: 24px;
    line-height: 1.7;
    text-transform: uppercase;
    margin-bottom: 50px;
    position: relative;
    z-index: 2;
  }
  .networks-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    position: relative;
    z-index: 2;
    .item-wrap {
      margin: 10px;
    }
  }
  .info-wrap {
    max-width: 400px;
    padding: 15px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    position: relative;
    z-index: 2;
    .block-title {
      line-height: 1.3;
      margin-bottom: 10px;
    }
    .network-name {
      position: relative;
      &::before {
        content: '';
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #cfd2d5;
        position: absolute;
        top: 50%;
        right: calc(100% + 10px);
        transform: translateY(-50%);
      }
    }
  }
}
</style>
