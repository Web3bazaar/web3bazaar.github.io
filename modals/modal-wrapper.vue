<template>
  <div v-if="modalType" class="modal-wrap">
    <NetworkModal v-if="modalType === 'network'" @close="closeModal" />
    <LoadingModal v-if="modalType === 'loading'" @close="closeModal" />
    <BetaModal v-if="modalType === 'beta'" @close="closeModal" />
    <ErrorModal
      v-if="modalType === 'error'"
      :modal-data="modalData"
      @close="closeModal"
    />
    <SuccessModal
      v-if="modalType === 'success'"
      :modal-data="modalData"
      @close="closeModal"
    />

    <!-- <TokenStakeModal
      v-if="modalType === 'token-stake'"
      @close="closeModal"
    />
    <DepositModal v-if="modalType === 'deposit'" @close="closeModal" /> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'

// const TokenStakeModal = () => import('@/modals/token-stake-modal.vue')
// const DepositModal = () => import('@/modals/deposit-modal')

const NetworkModal = () => import('@/modals/network-modal.vue')
const SuccessModal = () => import('@/modals/success-modal.vue')
const LoadingModal = () => import('@/modals/loading-modal.vue')
const BetaModal = () => import('@/modals/beta-modal.vue')
const ErrorModal = () => import('@/modals/error-modal.vue')

export default {
  components: {
    NetworkModal,
    LoadingModal,
    SuccessModal,
    BetaModal,
    ErrorModal,

    // TokenStakeModal,
    // DepositModal,
  },
  computed: {
    ...mapState('modals', ['modalType', 'modalData']),
  },
  methods: {
    // ...mapActions('modals', ['updateDashboard']),

    closeModal() {
      // if (this.modalType === 'success') {
      //   this.$store.commit('modals/setPopupState', {
      //     type: 'loading',
      //     isShow: true,
      //     data: {
      //       state: 'mining',
      //     },
      //   })

      //   await this.updateDashboard()
      // }

      this.$store.commit('modals/closeModal')
    },
  },
}
</script>

<style lang="scss" scoped>
$headerHeight: 80px;

.modal-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 300;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  padding-bottom: 60px;
  // padding-top: $headerHeight;
  background: rgba($color: #03091f, $alpha: 0.94);

  padding-top: 0;
  z-index: 9999;
}
@media screen and(max-width: 640px) {
  .modal-wrap {
    display: block;
    padding-bottom: 30px;
  }
}
</style>
