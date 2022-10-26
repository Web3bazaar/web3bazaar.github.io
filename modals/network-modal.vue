<template>
  <div class="network-popup">
    <div class="network-popup_board">
        <div class="close-btn" @click="closePopup">
      <CloseButton />
        </div>

        <p class="title">Choose network</p>

        <div class="networks-wrap">
          <div
            v-for="network in networksData"
            :key="network.chainId"
            class="item-wrap"
          >
            <ui-network-btn
              :network-type="network.chainId"
          
              @click="switchNetwork(network.chainId)"
            />
            <h5 class="network_label">{{network.name}}</h5>
          </div>
          <div>
            
          <div>
            
          
            </div>
          </div>
          

        <div class="info-wrap">
          <p class="block-title">Currently connected to:</p>
          <p class="network-name">{{ currentNetwork }}</p>
        </div>
        </div>
   
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CloseButton from '~/assets/img/svg/CloseButton.vue'

export default {
  components: {
    CloseButton,
  },

  computed: {
    ...mapState('networks', ['networksData']),
    currentNetwork() {
      const activeNetwork = this.$store.state.networks.activeNetwork
      if (activeNetwork === '0x38') return 'Binance Smart Chain'
      if (activeNetwork === '0xfa') return 'Fantom Opera'
      if (activeNetwork === '0xa86a') return 'Avalanche'
      if (activeNetwork === '0x89') return 'Polygon Mainnet'
      // testnet
      if (activeNetwork === '0x13881') return 'Polygon Mumbai'

      return ''
    },
  },
  methods: {
    closePopup() {
      this.$emit('close')
    },
    async switchNetwork(chainId) {
      await this.$store.dispatch('networks/switchNetwork', { chainId })
      this.closePopup()
     
    },
  },
}
</script>

<style lang="scss" scoped>

.network_label {
    display:none
  }
.item-wrap.active {
    background:#E83E8C
  }

.network-popup {
  padding: 0px;
  background: linear-gradient( to left, #E83E8C, #7C5AC1, #007BFF);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  width: 80%;
  height: 48%;
  min-height:270px;
  max-height: 280px;
  max-width: 590px;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  z-index: 2;
}
    .network-popup_board {
      padding: 20px;
      position: relative;
      width: 98%;
      height: 105%;
      background: #03091f;
      border-radius: 8px;
      

      .bg-img {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: auto;
        z-index: 1;
      }
      .close-btn {
        position: absolute;
        top: 20px;
        right: 20px;
        width: 20px;
        height: 20px;
        cursor: pointer;
        object-fit: contain;
        z-index: 3;
      }
      .title {
        font-size: 1.8vw;
        line-height: 1.7;
        text-transform: uppercase;
        margin-bottom: 6%;
        position: relative;
        z-index: 2;
        color: #90FFDE;
      }
      .networks-wrap {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        position: relative;
        z-index: 2;
        .item-wrap {
          margin-left: auto;
          margin-right: auto;
          width: 40%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      .info-wrap {
        width: 100%;
        max-width: 400px;
        padding: 15px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-left: auto;
        margin-right: auto;
        margin-top: 10%;
        position: relative;
        z-index: 2;
        .block-title {
          line-height: 1.3;
          margin-bottom: 10px;
        }
        .network-name {
          position: relative;
          color: #E83E8C;
          &::before {
            content: '';
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #90FFDE;
            position: absolute;
            top: 50%;
            right: calc(100% + 10px);
            transform: translateY(-50%);
          }
        }
      }
    }
     
    .network-popup_board::before {
    content: '';
    position: absolute;
    width: 98%;
    height:103%;
    top:-1.5%;
    left:0.75%;
    background: linear-gradient( to left, #E83E8C, #7C5AC1, #007BFF);
    border-radius: 8px;
    z-index: -1;
    }


@media screen and (max-width:960px) {
  .network-popup {
    padding: 0px;
    background: linear-gradient( to left, #E83E8C, #7C5AC1, #007BFF);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    width: 80%;
    height: 30%;
    max-width: 590px;
    position: relative;
    margin-left: auto;
    margin-right: auto;
    z-index: 2;

    .network-popup_board {
      padding: 20px;
        position: relative;
        width: 98%;
        height: 105%;
        background: #03091f;
        border-radius: 8px;
        

        .bg-img {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: auto;
          z-index: 1;
        }
        .close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 20px;
          height: 20px;
          cursor: pointer;
          object-fit: contain;
          z-index: 3;
        }
        .title {
          font-size: 21px;
          line-height: 0.7;
          text-transform: uppercase;
          margin-bottom: 50px;
          position: relative;
          z-index: 2;
        }
        .networks-wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          position: relative;
          z-index: 2;
          .item-wrap {
            margin-left:auto;
            margin-right:auto;
            width: 40%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
        .info-wrap {
          width: 100%;
          max-width: 400px;
          padding: 15px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-left: auto;
          margin-right: auto;
          margin-top: 10%;
          position: relative;
          z-index: 2;
          .block-title {
            line-height: 1.3;
            margin-bottom: 10px;
          }
          .network-name {
            position: relative;
            &::before {
              content: '';
              width: 10px;
              height: 10px;
              border-radius: 50%;
              position: absolute;
              top: 50%;
              right: calc(100% + 10px);
              transform: translateY(-50%);
            }
          }
        }
      }

     .network-popup_board::before {
    content: '';
    position: absolute;
    width: 98%;
    height:103%;
    top:-1.5%;
    left:0.75%;
    background: linear-gradient( to left, #E83E8C, #7C5AC1, #007BFF);
    border-radius: 8px;
    z-index: -1;
    }

  }

   
}

@media screen and (max-width:799.5px){
  .network_label {
    margin-top:20%;
    font-size:4vw;
    color:#90FFDE;
    display:none
  }

  .network_label:active {
    color: #E83E8C;
  }
  
  .network-popup {
    padding: 0px;
    background: linear-gradient( to left, #E83E8C, #7C5AC1, #007BFF);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    width: 80%;
    height: 40%;
    max-width: 590px;
    position: relative;
    margin-top: 15%;
    margin-left: auto;
    margin-right: auto;
    z-index: 2;

    .network-popup_board {
      padding: 20px;
        position: relative;
        width: 98%;
        height: 105%;
        background: #03091f;
        border-radius: 8px;
        

        .bg-img {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: auto;
          z-index: 1;
        }
        .close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 20px;
          height: 20px;
          cursor: pointer;
          object-fit: contain;
          z-index: 3;
        }
        .title {
          font-size: 4vw;
          line-height: 0.7;
          text-transform: uppercase;
          margin-bottom: 50px;
          position: relative;
          z-index: 2;
        }
        .networks-wrap {
          
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          position: relative;
          z-index: 2;
          .item-wrap {
            margin-top:4%;
            margin-bottom:4%;
            margin-left:auto;
            margin-right:auto;
            padding:0%;
            width: 40%;
            display: flex;
            flex-direction:column;
            align-items: center;
            justify-content: center;
          }
          .info-wrap {
            width: 100%;
            max-width: 400px;
            padding: 15px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 10%;
            margin-left: auto;
            margin-right: auto;
            position: relative;
            z-index: 2;
          .block-title {
            line-height: 1.3;
            margin-bottom: 10px;
          }
          .network-name {
            position: relative;
            &::before {
              content: '';
              width: 10px;
              height: 10px;
              border-radius: 50%;
              position: absolute;
              top: 50%;
              right: calc(100% + 10px);
              transform: translateY(-50%);
            }
          }
          }
        }
       
      }

     .network-popup_board::before {
    content: '';
    position: absolute;
    width: 98%;
    height:103%;
    top:-1.5%;
    left:0.75%;
    background: linear-gradient( to left, #E83E8C, #7C5AC1, #007BFF);
    border-radius: 8px;
    z-index: -1;
    }

  }
}

@media screen and (max-width:500.5px) {
  .network_label {
    margin-top:20%;
    font-size:4vw;
    color:#90FFDE;
    display:flex
  }

  .network_label:active {
    color: #E83E8C;
  }


  .network-popup {
    padding: 0px;
    background: linear-gradient( to left, #E83E8C, #7C5AC1, #007BFF);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    width: 80%;
    height: 40%;
    min-height: 280px;
    max-width: 590px;
    position: relative;
    margin-top: 10%;
    margin-bottom: 10%;
    margin-left: auto;
    margin-right: auto;
    z-index: 2;

    .network-popup_board {
      padding: 5%;
        position: relative;
        width: 98%;
        height: 105%;
        background: #03091f;
        border-radius: 8px;
        

        .bg-img {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: auto;
          z-index: 1;
        }
        .close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 20px;
          height: 20px;
          cursor: pointer;
          object-fit: contain;
          z-index: 3;
        }
        .title {
          font-size: 17px;
          line-height: 0.7;
          text-transform: uppercase;
          margin-bottom: 50px;
          position: relative;
          z-index: 2;
        }
        .networks-wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          position: relative;
          z-index: 2;
          .item-wrap {
            margin-top:0%;
            margin-bottom:0%;
            margin-left:auto;
            margin-right:auto;
            padding:0%;
            width: 20%;
            display: flex;
            flex-direction:column;
            align-items: center;
            justify-content: center;
          }
          .info-wrap {
            max-width: 400px;
            padding: 15px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 10%;
            margin-bottom: 10%;
            margin-left: auto;
            margin-right: auto;
            position: relative;
            z-index: 2;
          .block-title {
            line-height: 1.3;
            margin-bottom: 10px;
          }
          .network-name {
            position: relative;
            &::before {
              content: '';
              width: 10px;
              height: 10px;
              border-radius: 50%;
              position: absolute;
              top: 50%;
              right: calc(100% + 10px);
              transform: translateY(-50%);
            }
          }
          }
        }
       
      }

     .network-popup_board::before {
    content: '';
    position: absolute;
    width: 98%;
    height:103%;
    top:-1.5%;
    left:0.75%;
    background: linear-gradient( to left, #E83E8C, #7C5AC1, #007BFF);
    border-radius: 8px;
    z-index: -1;
    }

  }
}



</style>
