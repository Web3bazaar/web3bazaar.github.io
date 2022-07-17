<template>
  <v-card class="mx-auto" max-width="400" tile>
    <v-container class="giveaway-rules">
      <v-row>
        <v-col class="">
          <h5>Giveaway rules:</h5>

          <p>
            <span class="rules-list-dot">⁙</span> Buy raffle tickets for chance
            to receive one of the Gotchi prizes
          </p>
          <p>
            <span class="rules-list-dot">⁙</span> There are a total of 100k
            unique purple tickets that can be minted
          </p>
          <p>
            <span class="rules-list-dot">⁙</span> All minted tickets will be
            entered in a raffle 24 hours after the closing. You can watch the
            raffle live in our Discord
          </p>
          <p>
            <span class="rules-list-dot">⁙</span> Bronze tickets will get you 1x
            # purple tickets while Silver will get you 8x and Gold 20x
          </p>
          <p>
            <span class="rules-list-dot">⁙</span> After minting the tickets,
            make sure you complete the trade in the Main square to get them in
            your wallet
          </p>

          <p>
            <span class="rules-list-dot">⁙</span> Winners will then be able to
            swap their tickets for the prizes in Bazaar’s Main Square
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
  .rules-list-dot {
    top: 2px;
    position: relative;
    color: pink;
  }
  P {
    color: white;
  }
}
</style>
