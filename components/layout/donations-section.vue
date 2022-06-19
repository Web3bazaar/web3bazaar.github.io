<template>
  <v-container fluid class="donations-section">
    <v-row align="start" class="pt-4">
      <v-col cols="12" md="12"> <h3>Want to support the Bazaar?</h3> </v-col>
      <v-col cols="12" md="4" class="">
        Send a donation to help us keep the Bazaar open to all and free to use
        forever.
      </v-col>
      <v-spacer />

      <v-col cols="12" md="6" class="">
        <v-row>
          <v-col cols="12" sm="auto" class="d-flex align-center">
            <h3 class="mb-0">Donate:</h3>
          </v-col>
          <v-col
            v-for="percentage in percentages"
            :key="percentage"
            cols="auto"
            class="d-flex align-center"
          >
            <button class="pixel2" @click="callDonateAmount(percentage)">
              {{ getCurrentChainValue(percentage) }}
            </button>
          </v-col>
          <v-col cols="12" md="5" class="">
            <h6>
              or send us any gift to:
              <span style="color: rgba(116, 80, 254, 0.7) !important"
                >{{ w3bDonationAddress }}
              </span>
            </h6>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      percentages: [1, 10, 100],
    }
  },
  computed: {
    ...mapGetters('networks', { activeNetwork: 'getActiveChain' }),
    ...mapGetters('donations', ['getBaseValue', 'getW3BDonationAddress']),
    w3bDonationAddress() {
      return this.getW3BDonationAddress(this.activeNetwork?.chainId)
    },
  },
  methods: {
    ...mapActions('donations', { donateAmount: 'donateAmount' }),
    async callDonateAmount(percentage) {
      // check if user is on mumbai then switch to polygon
      // if (this.activeNetwork?.chainId === '0x13881') {
      await this.$store.dispatch('networks/switchNetwork', {
        chainId: '0x89',
      })
      // }

      const finalAmount =
        this.getBaseValue(this.activeNetwork?.chainId) * (percentage / 100)
      if (this.activeNetwork?.chainId === '0x89') {
        await this.donateAmount({ amount: finalAmount })
      }
    },
    getCurrentChainValue(percentage) {
      const finalAmount =
        this.getBaseValue(this.activeNetwork?.chainId) * (percentage / 100)

      return finalAmount + ' ' + this.activeNetwork?.nativeCurrency?.symbol
    },
  },
}
</script>

<style lang="scss">
.donations-section {
  position: relative;
  background: linear-gradient(0deg, #020a27 20%, #1e075e 50%);
  display: flex;
  justify-content: center;
  align-items: center;
  .row {
    max-width: 1260px;

    .donate-btn {
      position: relative;
      z-index: 1;
      color: #fff;
      font-size: 18px;
      text-transform: uppercase;
      line-height: 34px;
      padding: 0 20px;
      min-width: 100px;
      color: #fff !important;
      background: rgba(255, 255, 255, 0.1);
      height: 35px;
      border-radius: 50%;
      letter-spacing: 1px;
    }
  }
}
</style>
