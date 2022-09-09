<template>
  <v-container>
    <v-row
      v-if="!hasEnded"
      class="countdown d-flex justify-center align-center"
    >
      <v-col v-if="timeToEndDate.days >= 0" cols="auto" class="time-separators">
        <div>
          <div>
            {{ timeToEndDate.days }}
          </div>
        </div>
        <span> Days </span>
      </v-col>
      <v-col
        v-if="timeToEndDate.hours >= 0"
        cols="auto"
        class="time-separators"
      >
        <div>
          <div>
            {{ timeToEndDate.hours }}
          </div>
        </div>
        <span> Hours </span>
      </v-col>
      <v-col
        v-if="timeToEndDate.minutes >= 0"
        cols="auto"
        class="time-separators"
      >
        <div>
          <div>
            {{ timeToEndDate.minutes }}
          </div>
        </div>
        <span> Minutes </span>
      </v-col>
      <!-- <v-col
      v-if="timeToEndDate.seconds >= 0"
      cols="auto"
      class="gradient-text px-2"
    >
      <div>
        <div>
          {{ timeToEndDate.seconds }}
        </div>
      </div>
      <span> Seconds </span>
    </v-col> -->
    </v-row>
    <v-row>
      <v-col>
        <h4 class="text-center">This raffle is closed</h4>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const SECOND = 1000
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24

export default {
  props: {
    giveawayEndDate: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      timeToEndDate: {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        ended: false,
      },
    }
  },
  computed: {
    hasEnded() {
      return this.timeToEndDate.ended
    },
  },
  mounted() {
    this.showRemaining()
    setInterval(this.showRemaining, 5 * 1000)
  },
  methods: {
    showRemaining() {
      const now = new Date()

      const distance = new Date(this.giveawayEndDate) - now
      if (distance < 0) {
        this.timeToEndDate.ended = true
        this.$emit('giveaway-ended')
        return
      }
      const days = Math.floor(distance / DAY)
      const hours = Math.floor((distance % DAY) / HOUR)
      const minutes = Math.floor((distance % HOUR) / MINUTE)
      const seconds = Math.floor((distance % MINUTE) / SECOND)

      this.timeToEndDate.days = days || -1
      this.timeToEndDate.hours = hours
      this.timeToEndDate.minutes = minutes
      this.timeToEndDate.seconds = seconds
    },
  },
}
</script>

<style lang="scss">
.countdown {
  .time-separators {
    font-size: 30px;
  }
  .col {
    display: flex;
    align-content: center;
    justify-content: center;

    // .inside ,
    .outside {
      border-radius: 12px;
      //   border-bottom-left-radius: 50%;
      //   border-width: 10px;

      border: solid 5px purple;
    }

    .outside {
      width: 36px;
      height: 36px;

      //   background-color: #ffffff61;
      -webkit-box-shadow: 0px 0px 15px 1px rgba(255, 255, 255, 1);
      -moz-box-shadow: 0px 0px 15px 1px rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 15px 1px rgba(255, 255, 255, 1);
    }
    .inside {
      width: 100%;
      height: 100%;
      background-color: none;

      color: purple;
      line-height: 27px;
      text-align: center;
    }
    span {
      color: lightpink;
      // line-height: 36px;
      margin-left: 4px;
    }
  }
}
</style>
