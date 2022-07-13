<template>
  <v-container class="trade-tab-asset pa-2 pa-sm-3">
    <v-row class="justify-center">
      <!-- <v-col cols="12">
          <div id="account_from">{{ asset.address | truncate(9) }}</div>
        </v-col> -->
      <v-col
        cols="12"
        md="auto"
        class="d-flex flex-column justify-center item-info pb-0"
      >
        <a
          :href="externalUrl"
          target="_blank"
          class="item-name small-links d-flex align-center"
        >
          <div v-if="asset.contractTypeIndex !== 1" class="">
            Token ID:
            <span>
              {{ asset.idAsset }}
            </span>
          </div>
          <div v-else>
            {{ assetName }}
          </div>
          <img class="ml-1" style="width: 16px; height: 16px" :src="linkIcon" />
        </a>
      </v-col>
      <v-col cols="auto" class="d-flex justify-center">
        <a :href="externalUrl" target="_blank">
          <div
            v-if="imageData"
            class="svg-img"
            style="width: 100px"
            v-html="imageData"
          ></div>
          <img
            v-else
            contain
            class="ml-0"
            style="max-height: 100px; max-width: 120px"
            :src="baseImg"
          />
        </a>
      </v-col>
      <v-col
        cols="12"
        md="auto"
        class="d-flex flex-column justify-center item-info pt-0"
      >
        <p class="item-quantity mb-0">
          Amount:<span> {{ formattedQuantity }} </span>
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ethers } from 'ethers'

export default {
  props: {
    asset: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      linkIcon: require('@/assets/img/icons/link.png'),
      baseImg: null,
      projectLink: null,
      assetName: null,
      externalUrl: null,
      imageData: null,
    }
  },
  async fetch() {
    const projectInfo = await this.$store.dispatch('getProjectInfo', {
      contractAddress: this.asset.contractAddress,
      idAsset: this.asset.idAsset,
      contractTypeIndex: this.asset.contractTypeIndex,
    })
    this.baseImg = projectInfo.baseImg
    this.imageData = projectInfo.imageData
    this.projectLink = projectInfo.projectLink
    this.assetName = projectInfo.assetName || projectInfo.projectName
    this.externalUrl = projectInfo.externalUrl
  },
  computed: {
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
}
</script>

<style lang="scss">
.trade-tab-asset {
  // &:not(:nth-child(3)) {
  //   .row {
  //     .item-info-col {
  //       border-right: solid 1px lightgray;
  //     }
  //   }
  // }
  .item-quantity {
    display: inline;
    font-size: 0.75rem;
  }
  .item-info {
    * {
      text-align: left !important;
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
