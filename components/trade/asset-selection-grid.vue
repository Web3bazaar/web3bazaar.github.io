<template>
  <v-container class="asset-selection-grid">
    <v-row>
      <v-col
        v-for="(asset, index) in value"
        :key="index"
        cols="4"
        class="pa-3 d-flex align-center"
        :class="{ selected: asset.selected }"
        @click="changeSelection(index)"
      >
        <v-hover>
          <template #default="{}">
            <v-container class="px-0">
              <v-row no-gutters>
                <v-col class="pa-0">
                  <div class="img-wrapper">
                    <img :src="asset.image" />
                  </div>
                  <v-fade-transition>
                    <v-overlay
                      v-if="asset.selected"
                      absolute
                      color="transparent"
                    >
                      <v-container class="pa-3">
                        <v-row justify="center">
                          <v-col cols="12" class="pa-0">
                            <p class="text-center">{{ asset.name }}</p>
                          </v-col>
                          <v-spacer />
                          <v-col cols="2" class="pa-0">
                            <v-btn
                              dark
                              fab
                              x-small
                              color="primary"
                              @click.stop="decreaseAmount(index)"
                            >
                              <v-icon dark> mdi-minus </v-icon>
                            </v-btn>
                          </v-col>
                          <v-col cols="2" class="pa-0">
                            <v-text-field :value="getAmount(index)" />
                          </v-col>

                          <v-col cols="2" class="pa-0">
                            <v-btn
                              fab
                              dark
                              x-small
                              @click.stop="increaseAmount(index)"
                            >
                              <v-icon dark> mdi-plus </v-icon>
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-overlay>
                  </v-fade-transition>
                </v-col>
              </v-row>
            </v-container>
          </template>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      previousIndex: -1,
      lazyValue: this.value,
    }
  },
  computed: {
    internalValue: {
      get() {
        return this.lazyValue
      },
      set(val) {
        this.lazyValue = val
        this.$emit('input', val)
      },
    },
  },
  watch: {
    value: {
      handler(value, oldvalue) {
        if (
          oldvalue.length !== value.length &&
          value.length > this.previousIndex
        ) {
          this.previousIndex = -1
        }
      },
      deep: true,
    },
  },
  methods: {
    getAmount(index) {
      return this.value[index].chosenAmount
    },
    setValue(value) {
      this.internalValue = value
      this.$emit('change', value)
    },
    setAmount(index) {
      const internalValue = this.value.slice()

      this.setValue(internalValue)
    },
    increaseAmount(index) {
      const internalValue = this.value.slice()

      console.log(internalValue[index])

      if (
        internalValue[index].chosenAmount >= 0 &&
        internalValue[index].chosenAmount < internalValue[index].amount
      ) {
        internalValue[index].chosenAmount++
      } else {
        internalValue[index].chosenAmount = 0
      }

      this.setValue(internalValue)
    },
    decreaseAmount(index) {
      const internalValue = this.value.slice()

      internalValue[index].chosenAmount =
        internalValue[index].chosenAmount > 0
          ? internalValue[index].chosenAmount - 1
          : 0

      this.setValue(internalValue)
    },
    changeSelection(index) {
      const internalValue = this.value.slice()
      if (index > internalValue.length) return
      if (index === this.previousIndex) {
        internalValue[index].selected = !internalValue[index].selected
        if (!internalValue[index].selected) {
          internalValue[index].chosenAmount = 0
        } else {
          internalValue[index].chosenAmount = 1
        }
      } else {
        internalValue[index].selected = true
        internalValue[index].chosenAmount = 1

        if (
          this.previousIndex > -1 &&
          this.previousIndex < internalValue.length
        ) {
          internalValue[this.previousIndex].selected = false
          internalValue[this.previousIndex].chosenAmount = 0
        }
        this.previousIndex = index
      }
      this.setValue(internalValue)
    },
  },
}
</script>

<style lang="scss">
.asset-selection-grid {
  max-height: 250px;
  overflow: hidden;
  overflow-y: auto;
  p {
    font-size: 0.9em !important;
    color: white;
  }
  .v-overlay {
    // .v-overlay__scrim {
    //   opacity: 0.5 !important;
    //   background: radial-gradient(
    //     rgba(30, 7, 94, 1) 50%,
    //     rgba(188, 101, 193, 0) 70%
    //   );
    // }
    .v-overlay__content {
      font-size: 13px;

      .v-btn {
        font-size: 6px;

        height: 14px;
        width: 14px;
      }
      //   input {
      //     display: flex;
      //     max-width: 15px;
      //   }
      .v-text-field {
        height: 10px;
        padding-top: 0;
        margin-top: 4px;
        margin-bottom: 2px;
        .v-input__control {
          height: 10px;
          .v-input__slot {
            height: 10px;
            &::before,
            &::after {
              content: none;
            }
          }
        }
      }
    }
  }
  .col > div .img-wrapper {
    display: inline-flex;
    position: relative;
    height: 100%;
    width: auto;
    border-radius: 5px;
    font-size: 12px;

    display: flex;
    justify-content: center;
    img {
      border-radius: 5px;

      height: 110px;
      outline: solid 2px purple;
    }
  }
  .selected > div .img-wrapper {
    img {
      outline: solid 2px yellow;
      filter: grayscale(100%);
    }
  }
}
</style>
