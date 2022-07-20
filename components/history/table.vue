<template>
  <v-container class="trades-history">
    <v-simple-table>
      <template #default>
        <thead>
          <tr>
            <th class="text-left">Date</th>
            <th class="text-left">Creator Wallet</th>
            <th class="text-left">Project/Asset</th>
            <th class="text-left">Amount</th>
            <th class="text-left">Executor Wallet</th>
            <th class="text-left">Project/Asset</th>
            <th class="text-left">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="trade in tradesHistory" :key="trade.tradeId">
            <td>
              <div>
                {{ trade.tradeId }}
              </div>
            </td>
            <td>
              <div>
                {{ trade.creator.address | truncate(9) }}
              </div>
            </td>

            <td style="white-space: pre-line">
              <div>
                {{ getAssetsIds(trade.creator.assetsByProject) }}
              </div>
            </td>
            <td>
              <div>
                {{ getAssetsAmount(trade.creator.assetsByProject) }}
              </div>
            </td>
            <td>
              <div>
                {{ trade.executor.address | truncate(9) }}
              </div>
            </td>
            <td>
              <div>
                {{ getAssetsIds(trade.executor.assetsByProject) }}
              </div>
            </td>
            <td>
              <div>
                {{ getAssetsAmount(trade.executor.assetsByProject) }}
              </div>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import { ethers } from 'ethers'

export default {
  computed: {
    ...mapState(['tradesHistory']),
  },
  methods: {
    getAssetsAmount(projects) {
      const list = []

      for (const p in projects) {
        for (const a in projects[p].assets) {
          list.push(this.formattedQuantity(projects[p].assets[a]) + '\n')
        }
      }
      return list.join('')
    },
    getAssetsIds(projects) {
      const list = []
      for (const p in projects) {
        for (const a in projects[p].assets) {
          list.push(
            this.$options.filters.truncate(
              projects[p].assetName || projects[p].assets[a].contractAddress,
              10
            ) +
              '/' +
              projects[p].assets[a].idAsset +
              '\n'
          )
        }
      }
      return list.join('')
    },
    formattedQuantity(asset) {
      if (asset?.contractType === this.$contractTypes.ERC20) {
        return ethers.utils.formatUnits((asset?.amount.toString() || 0) + '')
      } else {
        return asset?.amount
      }
    },
  },
}
</script>

<style lang="scss">
.trades-history {
  tr,
  th {
    border-bottom: thin solid rgba(255, 255, 255, 0.12);
  }

  tr {
    display: flex;
    justify-content: space-around;
  }
  thead tr {
    padding-right: 12px;
  }
  tbody tr {
    overflow-y: scroll;
    height: 80px !important;
  }

  td {
    height: unset !important;
    padding-top: 16px;
  }

  th {
    padding-top: 12px !important;
  }

  td,
  th {
    width: 100%;

    border-bottom: none !important;
    white-space: pre-line;
    div {
    }
  }
}
</style>
