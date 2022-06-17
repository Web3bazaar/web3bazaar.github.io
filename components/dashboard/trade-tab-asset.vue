<template>
  <v-container class="trade-tab-asset pa-2 pa-sm-3">
    <v-row class="justify-space-evenly">
      <!-- <v-col cols="12">
          <div id="account_from">{{ asset.address | truncate(9) }}</div>
        </v-col> -->
      <v-col cols="12" sm="7" class="d-flex justify-center">
        <v-img contain class="ml-0" max-height="150px" :src="baseImg" />
      </v-col>
      <v-col cols="12" sm="5" class="d-flex flex-column justify-space-around">
        <!-- <div id="project_from" class="text-left pb-3">
          <a
            :href="projectLink"
            target="_blank"
            class="item-quantity text-left small-links white--text"
          >
            {{ projectName }}
            <img :width="16" :src="linkIcon" />
          </a>
        </div> -->
        <div class="item-info text-left mb-0">
          <a
            v-if="asset.contractTypeIndex !== 1"
            :href="externalUrl"
            target="_blank"
            class="item-name small-links grey--text mb-6"
          >
            Token ID {{ asset.idAsset }}
            <img :width="16" :src="linkIcon" />
          </a>
          <p class="item-quantity grey--text mb-0">
            Amount {{ formattedQuantity }}
          </p>
        </div>
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
  data: () => {
    return {
      linkIcon: require('@/assets/img/icons/link.png'),
      baseImg: null,
      projectLink: null,
      projectName: null,
      externalUrl: null,
    }
  },
  async fetch() {
    const projectInfo = await this.$store.dispatch('getProjectInfo', {
      contractAddress: this.asset.contractAddress,
      idAsset: this.asset.idAsset,
      contractTypeIndex: this.asset.contractTypeIndex,
    })

    this.baseImg = projectInfo.baseImg
    this.projectLink = projectInfo.projectLink
    this.projectName = projectInfo.projectName
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
  .item-info * {
    text-align: left !important;
  }
  @media (max-width: 620px) {
    .item-info * {
      text-align: center !important;
    }
    .item-info > * {
      font-size: 0.55rem !important;
    }
  }
}
</style>
