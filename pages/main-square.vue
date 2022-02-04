<template>
  <section class="main-square section-padding-100 darker">
    <v-container>
      <!-- Tittle -->
      <v-row justify="center">
        <v-col cols="12" lg="6" class="d-flex justify-center">
          <h1 class="gradient-text">Main Square</h1>
        </v-col>
      </v-row>
      <!-- Trades submitted by you -->
      <v-row>
        <v-container class="trades submitted">
          <div class="trades--title">Trade submitted by you</div>
          <trade-list-wrapper />
        </v-container>
      </v-row>
      <!-- Trades offered by others -->
      <v-row>
        <v-container class="trades offered">
          <div class="trades--title">
            Trade submitted by your counter-parties
          </div>
          <trade-list-wrapper />
        </v-container>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {}
</script>

<style lang="scss">
.trades {
  font-size: 22px;
  &--title {
    font-size: 1.1em;
    margin-bottom: 20px;
  }
  .project_logo {
    border-radius: 12px;
  }
  #project_from,
  #project_to {
    font-size: 0.7em;
  }
  p {
    font-size: 0.8em;
  }
}

.trade-item {
  div[class^='col'] {
    position: relative;
  }
}
.v-card.item-card {
  height: 260px;
  position: relative;
  background-image: linear-gradient(
    130deg,
    #eb3fa9 0%,
    #395ff6 50%,
    #eb3fa9 100%
  );
  color: whitesmoke;
  * {
    text-align: center;
  }

  .container {
    height: 100%;

    border-radius: 10px;
    background-color: #0a1026;
    position: relative;
    border: solid 1px rgba(255, 255, 255, 0.25);
    text-align: left;
    padding: 10px;
    // width: 97.4%;
    // height: 98.7%;

    top: -3px;
    p {
      margin-bottom: 4px;
    }
    &::before {
      content: '';
      position: absolute;
      width: 102.6%;
      height: 101.3%;
      top: -3px;
      left: -3px;
      border-radius: 10px;
      z-index: -1;
      background-image: linear-gradient(
        130deg,
        #eb3fa9 0%,
        #395ff6 50%,
        #eb3fa9 100%
      );
    }
  }
}
</style>
