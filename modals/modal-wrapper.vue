<template>
  <div v-if="modalType" class="modal-wrap">
    <NetworkModal v-if="modalType === 'network'" @close="closeModal" />

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

export default {
  components: {
    NetworkModal,

    // TokenStakeModal,
    // DepositModal,
  },
  computed: {
    ...mapState('modals', ['modalType']),
  },
  methods: {
    closeModal() {
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
  padding-top: $headerHeight;
}
@media screen and(max-width: 640px) {
  .modal-wrap {
    display: block;
    padding-bottom: 30px;
  }
}
</style>
