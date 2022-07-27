<template>
  <div class="loading-popup text-center">
    <div class="close-btn" @click="closePopup">
      <CloseButton />
    </div>
    <h3 class="title text-center">{{ title }}</h3>

    <div class="networks-wrap">
      <v-img :src="successGIF" max-height="300" />
    </div>
    <p class="modal-message text-center">{{ message }}</p>
    <p v-if="txHash" class="title text-center">
      You can check the transaction

      <a
        v-if="txHash"
        :href="transactionUrl"
        target="_blank"
        class="title text-center"
        >here
        <img :width="16" :src="linkIcon" />
      </a>
    </p>

    <ui-action-btn
      v-if="button"
      class="mt-6"
      :loading="loadingBtn"
      :btn-text="button"
      @click="closePopup"
    >
    </ui-action-btn>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CloseButton from '~/assets/img/svg/CloseButton.vue'

export default {
  components: { CloseButton },
  props: {
    modalData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      successGIF: require('../assets/gifs/success-trade.gif'),
      linkIcon: require('@/assets/img/icons/link.png'),
    }
  },
  computed: {
    ...mapGetters('networks', {
      BlockExplorerURL: 'getActiveChainBlockExplorerURL',
    }),
    title() {
      return this.modalData?.title || 'Hurray!'
    },
    message() {
      return this.modalData?.message
    },
    button() {
      return this.modalData?.button
    },
    animated() {
      return this.modalData?.animated
    },
    txHash() {
      return this.modalData?.txHash
    },
    transactionUrl() {
      return this.BlockExplorerURL + 'tx/' + this.txHash
    },
  },
  methods: {
    closePopup() {
      this.$router.push({ name: 'main-square' })
      this.$emit('close')
    },
  },
}
</script>
<style lang="scss">
.modal-wrap {
  background: rgba($color: #03091f, $alpha: 0.6);
}
</style>
<style lang="scss" scoped>
.loading-popup {
  padding: 20px;
  background: #03091f;
  background: none;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
  box-shadow: none;
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
    width: 30px;
    height: 30px;
    cursor: pointer;
    object-fit: contain;
    z-index: 3;
    svg {
      width: 30px;
      height: 30px;
    }
  }
  .title {
    font-size: 24px;
    line-height: 1.7;
    text-transform: uppercase;
    margin-bottom: 0px;
    position: relative;
    z-index: 2;
  }

  .modal-message {
    font-size: 16px;
    line-height: 1.2;
    text-transform: uppercase;
    margin-bottom: 0px;
    position: relative;
    z-index: 2;
    white-space: pre-line;
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
