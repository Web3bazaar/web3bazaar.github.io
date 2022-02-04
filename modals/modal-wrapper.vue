<template>
  <div v-if="modalType" class="popup-wrap">
    <NetworkPopup v-if="modalType === 'network'" @close="closePopup" />

    <!-- <SwapPopup v-if="popupActiveType === 'swap'" @close="closePopup" />
    <TokenStakePupup
      v-if="popupActiveType === 'token-stake'"
      @close="closePopup"
    />
    <DepositPopup v-if="popupActiveType === 'deposit'" @close="closePopup" />
    <BrowserPopup v-if="popupActiveType === 'browser'" @close="closePopup" />
    <DevicePopup
      v-if="popupActiveType === 'device-error'"
      @close="closePopup"
    />
    <TransactionSuccessPopup
      v-if="popupActiveType === 'transaction'"
      @close="closePopup"
    />
    <WrongNetworkPopup
      v-if="popupActiveType === 'wrong-network'"
      @close="closePopup"
    />
    <StakePopup v-if="popupActiveType === 'stake'" @close="closePopup" />
    <UnstakePopup v-if="popupActiveType === 'unstake'" @close="closePopup" />
    <MobileMenu v-if="popupActiveType === 'sidemenu'" /> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'

// const SwapPopup = () => import('@/components/Popups/SwapPopup')
// const StakePopup = () => import('@/components/Popups/StakePopup')
// const UnstakePopup = () => import('@/components/Popups/UnstakePopup')
// const TokenStakePupup = () => import('@/components/Popups/TokenStakePupup')
// const DepositPopup = () => import('@/components/Popups/DepositPopup')
// const BrowserPopup = () => import('@/components/Popups/BrowserPopup')
// const DevicePopup = () => import('@/components/Popups/DeviceError')
// const WrongNetworkPopup = () => import('@/components/Popups/WrongNetworkPopup')
// const TransactionSuccessPopup = () =>
//   import('@/components/Popups/TransactionSuccess')
// const MobileMenu = () => import('@/components/MobileMenu')

const NetworkPopup = () => import('@/modals/network-modal.vue')
export default {
  components: {
    NetworkPopup,

    // SwapPopup,
    // DepositPopup,
    // BrowserPopup,
    // TransactionSuccessPopup,
    // MobileMenu,
    // TokenStakePupup,
    // WrongNetworkPopup,
    // StakePopup,
    // UnstakePopup,
    // DevicePopup,
  },
  computed: {
    ...mapState('modals', ['modalType']),
  },
  methods: {
    closePopup() {
      this.$store.commit('modals/closeModal')
    },
  },
}
</script>

<style lang="scss" scoped>
$headerHeight: '60px';

.popup-wrap {
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
  .popup-wrap {
    display: block;
    padding-bottom: 30px;
  }
}
</style>
