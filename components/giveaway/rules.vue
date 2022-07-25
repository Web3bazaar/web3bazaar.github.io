<template>
  <v-card class="mx-auto giveaway-rules" max-width="400">
    <v-container>
      <v-row>
        <v-col class="">
          <h5>Giveaway rules:</h5>

          <p>
            <span class="rules-list-dot">⁙</span> Buy raffle tickets for a
            chance to win an Aavegotchi prize.
          </p>
          <p>
            <span class="rules-list-dot">⁙</span> There are a total of 100k
            unique Purple Tickets
          </p>
          <p>
            <span class="rules-list-dot">⁙</span> Bronze tickets will get you 1x
            # Purple Tickets while Silver will get you 8x and Gold 20x
          </p>
          <p>
            <span class="rules-list-dot">⁙</span> After minting the tickets
            complete the trade in the Main square to get them in your wallet
          </p>
          <p>
            <span class="rules-list-dot">⁙</span> 5 winning tickets will be
            drawn in a raffle
          </p>

          <p>
            <span class="rules-list-dot">⁙</span> Winning tickets will be able
            to claim their prizes in the Bazaar
          </p>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {}
</script>

<style lang="scss">
.giveaway-rules {
  border-radius: 8px;
  .rules-list-dot {
    top: 2px;
    position: relative;
    color: pink;
  }
  P {
    color: white;
    font-size: 14px;
  }
}
</style>
