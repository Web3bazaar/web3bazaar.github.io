<template>
  <v-container class="asset-selection-grid">
    <v-row>
      <v-col
        v-for="(asset, index) in value"
        :key="index"
        cols="3"
        :class="{ selected: asset.selected }"
        @click="changeSelection(index)"
      >
        <div>
          <v-img contain :src="asset.image" />

          {{ asset.name }}
        </div>
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
        console.log(value.length, oldvalue.length)
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
    setValue(value) {
      this.internalValue = value
      this.$emit('change', value)
    },
    changeSelection(index) {
      const internalValue = this.value.slice()
      console.log(this.previousIndex, index)
      if (index > internalValue.length) return
      if (index === this.previousIndex)
        internalValue[index].selected = !internalValue[index].selected
      else {
        internalValue[index].selected = true

        if (
          this.previousIndex > -1 &&
          this.previousIndex < internalValue.length
        ) {
          internalValue[this.previousIndex].selected = false
        }
        this.previousIndex = index
      }
      this.setValue(internalValue)
    },
  },
}
</script>

<style lang="scss" scoped>
.asset-selection-grid {
  max-height: 250px;
  overflow: hidden;
  overflow-y: auto;
  .col > div {
    border: solid 1px red;
    font-size: 12px;
  }
  .selected {
    border: solid 1px blueviolet;
  }
}
</style>
