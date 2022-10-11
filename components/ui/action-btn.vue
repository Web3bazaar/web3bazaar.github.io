 <template>
 <button class="button_1"
    type="submit"
    :small="small"
    :loading="loading"
    :disabled="disabled"
    :ripple="false"
    @click="playSound">
    <div class="bazaarbutton">
        <div class="overlay">
            <div class="overtop">
                <div class="over_in">

                    <div  class="overspread">
                        <h3>{{ btnText }}</h3>
                    </div>

                </div>
            </div>                           
        </div>
    </div> 
 </button>
  
 
</template>

<script>
import { mapActions } from 'vuex'

export default {
  components: {},
  props: {
    small: {
      type: Boolean,
      default: false,
    },
    btnText: {
      default: '',
      type: String,
    },
    loading: {
      default: false,
      type: Boolean,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {}
  },
  computed: {},
  methods: {
    ...mapActions('sound', ['playSFXAudio']),

    playSound() {
      this.playSFXAudio({ audioToPlay: 'actionButton' })
      this.$emit('click')
    },
  },
}
</script>

<style scoped src="assets/css/for_index.css" >
.login-btn {
  width: 176px !important;
  height: 35px !important;
  font-size: 16px;
}
</style>
<style lang="scss">
.w3b-bg-gradient.v-btn--disabled {
  filter: grayscale(1);

  &::before,
  &::after {
    filter: grayscale(1);
  }
}
</style>
