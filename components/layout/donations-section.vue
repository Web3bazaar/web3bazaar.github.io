<template>
  <v-container fluid class="donations-section">
    <v-row align="center">
      <v-col cols="12" md="12"> <h3>Are you enjoying the Bazaar?</h3> </v-col>
      <v-col cols="12" md="4" class="">
        The Bazaar is open to all aand free to use. Help the team keeping it
        this way forever by donating in your favorite network
      </v-col>
      <v-spacer />
      <v-col cols="12" sm="auto" class="py-0">
        <h3 class="mb-0">Donate:</h3>
      </v-col>
      <v-col
        v-for="percentage in percentages"
        :key="percentage"
        cols="auto"
        class="py-0"
      >
        <button class="pixel2" @click="callDonateAmount(percentage)">
          {{ getCurrentChainValue(percentage) }}
        </button>
      </v-col>
      <v-col cols="12" md="5" offset-md="7" class="pt-0">
        <p>or send us any gift to: {{ w3bDonationAddress }}</p></v-col
      >
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
      const finalAmount =
        this.getBaseValue(this.activeNetwork?.chainId) * (percentage / 100)

      await this.donateAmount({ amount: finalAmount })
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
    padding: 16px 0;
    max-width: 1200px;

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
