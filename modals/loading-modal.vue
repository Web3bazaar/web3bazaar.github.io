<template>
  <div class="loading-popup">
    <p class="title text-center">{{ title }}</p>

    <div class="networks-wrap">
      <v-img v-if="reading" class="mb-16" :src="readingGif" max-height="300" />
      <v-img v-else :src="miningGif" max-height="300" />
    </div>

    <p class="title text-center">
      {{ message }}
    </p>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  components: {},
  props: {},
  data() {
    return {
      miningGif: require('../assets/gifs/MinerAnimation.gif'),
      readingGif: require('../assets/gifs/reader.gif'),

      modalTexts: {
        loading: {
          title: 'Loading...',
          message: 'Please wait while we fetch your trades on the blockchain.',
        },
        mining: {
          title: 'Hold tight...',
          message:
            'Miners are working hard to write your transaction on the blockchain.',
        },
        approveContract: {
          title:
            'Confirm this action in your wallet to approve the Bazaar to move your assets',
          message: '',
        },
        cancelTrade: {
          title: 'Confirm this action in your wallet to cancel the trade',
          message: '',
        },
      },
    }
  },
  computed: {
    ...mapState('modals', ['modalType', 'modalData']),

    reading() {
      return this.modalData?.reading
    },
    state() {
      return this.modalData?.state
    },
    title() {
      return this.modalTexts?.[this.state]?.title || 'Loading...'
    },
    message() {
      return this.modalTexts?.[this.state]?.message
    },
  },
  methods: {},
}
</script>
<style lang="scss" scoped>
.loading-popup {
  padding: 20px;
  background: #03091f;
  background: none !important;
  box-shadow: none;
  // box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
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
    margin-bottom: 0px;
    position: relative;
    z-index: 2;
    color: #ffffff;
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
