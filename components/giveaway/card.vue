<template>
  <v-container class="giveaway-card pa-2 pa-sm-3">
    <v-row class="justify-center">
      <!-- <v-col cols="12">
          <div id="account_from">{{ asset.address | truncate(9) }}</div>
        </v-col> -->
      <v-col
        cols="12"
        md="12"
        class="d-flex flex-column justify-center item-info"
      >
        <v-row class="d-flex justify-start align-center pl-4">
          <v-col cols="2"> Amount</v-col>
          <v-col cols="3" class=""> Ticket Type </v-col>
          <v-col cols="4" class="pl-sm-0"> Total Cost </v-col>
          <v-col v-if="ticketAmount && ticketAmount.length > 0" cols="auto">
            Raffle Ticket
          </v-col>
        </v-row>
      </v-col>
      <v-col
        cols="12"
        md="12"
        class="d-flex flex-column justify-left item-info pb-0"
      >
        <v-row
          v-for="(ticket, index) in tickets"
          :key="ticket"
          class="d-flex align-center justify-left pl-4"
        >
          <v-col cols="2" class="pr-0">
            <div class="amount-wrapper">
              <div class="d-flex justify-start">
                <input
                  class="amount-input d-flex mr-2"
                  min="0"
                  :value="ticketAmount[index]"
                  @input="updateAmount($event, index)"
                />
                <span
                  class="grey--text max-button mt-1"
                  style="cursor: pointer"
                  :class="{
                    disabled: !ticketAmount[index] || ticketAmount[index] === 0,
                  }"
                  @click.prevent="updateAmount(getTokenMaxAmount(index), index)"
                >
                  Max ({{ getTokenMaxAmount(index) }})
                </span>
              </div>
            </div>
          </v-col>

          <v-col cols="3" class="pr-0">
            <img
              contain
              class="mx-auto"
              style="max-height: 120px; max-width: 100%; cursor: pointer"
              :src="ticketImg(index)"
              @click.prevent="
                updateAmount((ticketAmount[index] || 0) + 1, index)
              "
            />
            <v-spacer />
            <p class="text-center mt-n4">
              Price: {{ getTicketPrice(index) }}
              <img
                contain
                class="mt-n1"
                style="max-height: 25px; max-width: 120px"
                :src="tokenImage"
              />
            </p>
          </v-col>
          <v-col cols="2" class="pl-sm-0">
            <div
              class="ticket-cost"
              :class="{
                disabled: !ticketAmount[index] || ticketAmount[index] === 0,
              }"
            >
              {{ totalTicketCost(index, ticketAmount[index]) }}
              {{ tokenSymbol }}
            </div>
            <!-- <img
              contain
              class="mt-n1"
              style="max-height: 35px; max-width: 120px"
              :src="tokenImage"
            /> -->
          </v-col>
          <v-col cols="auto">
            <ui-action-btn
              class=""
              small
              :disabled="
                !ticketAmount[index] ||
                ticketAmount[index] === 0 ||
                giveawayEnded
              "
              :loading="loadingBtn"
              :btn-text="'Mint'"
              @click="enterGiveaway(index)"
            >
            </ui-action-btn>
          </v-col>
          <v-col
            v-if="!(!ticketAmount[index] || ticketAmount[index] === 0)"
            cols="2"
            class="d-flex justify-start align-center item-info"
          >
            {{ (ticketAmount[index] || 0) * ticket }}x
            <img
              contain
              class="ml-0 ticket-image"
              :class="{
                disabled: !ticketAmount[index] || ticketAmount[index] === 0,
              }"
              style="max-height: 100px; max-width: 80px"
              :src="raffleTicketImage"
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col
        cols="12"
        md="auto"
        class="d-flex flex-column justify-center item-info pt-0"
      >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ethers } from 'ethers'
import { mapGetters, mapState } from 'vuex'

export default {
  props: {
    projectName: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      tickets: [1, 8, 20],
      projectBaseCost: 0.08,
      tokenSymbol: null,
      loadingBtn: false,
      isContractApproved: false,
      ticketAmount: [],
      totalTicketAmount: [],
      tokenMaxAmount: 0,
      tokenImage: null,
      projectLink: null,
      assetName: null,
      externalUrl: null,
      imageData: null,
      giveawayEnded: false,
    }
  },
  computed: {
    ...mapGetters('giveaway', ['getGiveawayContract']),
    ...mapState('connector', ['account', 'isWalletConnected']),

    formattedQuantity() {
      if (this.asset?.contractType === this.$contractTypes.ERC20) {
        return ethers.utils.formatUnits(
          (this.asset?.amount.toString() || 0) + ''
        )
      } else {
        return this.asset?.amount
      }
    },
  },

  watch: {
    account(val) {
      if (val) {
        this.getMaxAmount()
      }
    },
  },
  async mounted() {
    const project = await this.$store.dispatch('giveaway/getProjectData', {
      projectName: this.projectName,
    })

    Object.keys(project || {}).forEach(
      (cName) => (this[cName] = project[cName])
    )
    if (this.account) {
      this.getMaxAmount()
    }
  },
  methods: {
    totalTicketCost(index, amount) {
      return +(this.getTicketPrice(index) * amount || 0 * 100).toFixed(2)
    },
    getTokenMaxAmount(index) {
      return Math.floor(this.tokenMaxAmount / this.getTicketPrice(index))
    },

    async getMaxAmount() {
      // console.log('getMaxAmount')
      const resultListERC20Balance = await this.$store.dispatch(
        'relayer-erc20/listERC20',
        {
          // this needs to be the project erc20 token
          contractAddress: this.erc20TokenAddress,
          wa: this.account,
          contractType: 'ERC20',
        },
        { root: true }
      )

      this.tokenMaxAmount = Math.floor(resultListERC20Balance?.amount)
      this.tokenSymbol = resultListERC20Balance?.metadata?.name
    },
    updateAmount(event, index) {
      const value = parseInt(event?.target ? event?.target?.value || 0 : event)

      const newAmount = Math.min(this.getTokenMaxAmount(index), value)

      this.ticketAmount = []
      this.totalTicketAmount = []

      this.$set(this.ticketAmount, index, newAmount)
      this.$set(
        this.totalTicketAmount,
        index,
        Math.round(newAmount * this.tickets[index])
      )
    },
    ticketImg(index) {
      return this.ticketsImages?.[index] // require(`./assets/${this.project}-${ticket}.png`)
    },
    getTicketPrice(index) {
      return ethers.utils.formatUnits(
        this.ticketPrice?.[index] || '0',
        this.erc20TokenDecimals || 18
      )
    },
    async enterGiveaway(index) {
      this.loadingBtn = true
      this.$store.commit('modals/setPopupState', {
        type: 'loading',
        isShow: true,
      })

      try {
        const tx = await this.$store.dispatch('giveaway/enterGiveaway', {
          raffleType: this.tickets[index],
          quantity: this.ticketAmount[index],
          projectName: this.projectName,
          raffleContractAddress: this.raffleContractAddress,
        })
        this.$store.commit('modals/setPopupState', {
          type: 'loading',
          isShow: true,
          data: {
            state: 'mining',
          },
        })
        await tx.wait()

        // this.$store.commit('modals/closeModal')

        this.$store.commit('modals/setPopupState', {
          type: 'success',
          isShow: true,
          data: {
            title: 'Almost there',
            message:
              'Your ticket is minted and ready to be sent to you.\n Make sure to EXECUTE the TRADE in the Main Square to spend your Ghost and get the tickets in your wallet.',
            button: 'Complete in Main Square',
          },
        })
      } catch (error) {
        this.$store.commit('modals/setPopupState', {
          type: 'error',
          isShow: true,
          data: {},
        })
      }

      this.loadingBtn = false
    },
  },
}
</script>

<style lang="scss">
.giveaway-card {
  // &:not(:nth-child(3)) {
  //   .row {
  //     .item-info-col {
  //       border-right: solid 1px lightgray;
  //     }
  //   }
  // }

  .ticket-cost,
  .max-button {
    & .disabled {
      color: grey;
    }
  }

  .amount-wrapper {
    .amount-input {
      padding: 2px 4px;
      margin-top: 4px;
      margin-bottom: 2px;
      align-items: flex-start;
      display: flex;
      flex: 1 1 auto;
      font-size: 16px;
      letter-spacing: normal;
      max-width: 40%;
      margin: 0;

      color: white;
      outline: gray;
      border: solid 1px purple;

      &:focus {
        border-bottom: solid 1px purple;
      }
    }
    span {
      height: 20px;
    }
    * {
      color: aliceblue;
    }
  }
  .item-quantity {
    display: inline;
    font-size: 0.75rem;
  }
  .item-info {
    // * {
    //   text-align: left !important;
    // }
    .ticket-image.disabled {
      filter: grayscale(1);
    }
    .item-name.small-links {
      font-size: 0.75rem;
    }
    .item-name,
    .item-quantity {
      color: lightgray;
      span {
        color: lightpink;
        font-size: 0.85rem;
      }
    }
  }
  @media (max-width: 720px) {
    .item-info * {
      text-align: center !important;
    }
    .item-info > * {
      font-size: 0.65rem !important;
    }
  }
}
</style>
