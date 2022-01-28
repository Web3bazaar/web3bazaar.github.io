<template>
  <v-container id="index" fluid class="pa-0">
    <!-- ##### Welcome Area Start ##### -->
    <v-container id="home" fluid class="hero-section moving section-padding">
      <v-container fluid class="hero-section--image d-flex align-center">
        <v-row>
          <!-- Welcome Content -->
          <v-col cols="12" class="text-center">
            <div class="dream-btn-group fadeInUp" data-wow-delay="0.4s">
              <a href="#" class="btn more-btn"> Coming soon </a>
            </div>
          </v-col>
        </v-row>
      </v-container>
      <!-- Hero Content -->
    </v-container>
    <!-- ##### Welcome Area End ##### -->

    <div class="clearfix"></div>

    <!-- ##### key topics Start ##### -->

    <section class="hero-section-content">
      <v-container>
        <v-row justify="center">
          <!-- Welcome Content -->
          <v-col cols="12" lg="10" class="text-center">
            <div class="welcome-content">
              <h1 class="fadeInUp" data-wow-delay="0.2s">
                A trustless p2p
                <span class="gradient-text">asset exchange</span>
              </h1>
              <p class="w-text fadeInUp" data-wow-delay="0.3s">
                Web3 Bazaar is the peer-to-peer marketplace for web3 assets
                supported by an escrow smart contract that allows you to swap
                between any ERC-20 token and NFT asset with someone you have
                already agreed terms with.
              </p>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <section class="about-us-area section-padding-100 clearfix">
      <div class="container">
        <div class="creator-sec dd-bg">
          <div class="row align-items-center">
            <div
              class="col-12 col-md-8 d-flex flex-column justify-space-between"
            >
              <div class="author-item">
                <div class="author-img">
                  <v-img
                    contain
                    :src="require('~/assets/img/icons/chest.png')"
                    style="max-width: 70px"
                    alt=""
                  />
                </div>
                <div class="author-info">
                  <h5 class="author-name">
                    Safeguard your p2p trades with a trustless smart contract
                  </h5>
                </div>
              </div>
              <div class="author-item">
                <div class="author-img">
                  <v-img
                    :src="require('@/assets/img/icons/red-potion.png')"
                    style="max-width: 70px"
                    alt=""
                  />
                </div>
                <div class="author-info">
                  <h5 class="author-name">
                    Trade any ERC-20, ERC-721 and ERC-1155 asset from multiple
                    chains.
                  </h5>
                </div>
              </div>
              <div class="author-item">
                <div class="author-img">
                  <v-img
                    :src="require('@/assets/img/icons/sword.png')"
                    style="max-width: 70px"
                    alt=""
                  />
                </div>
                <div class="author-info">
                  <h5 class="author-name">
                    Keep full control over your assets until counter-party's are
                    available
                  </h5>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-4">
              <div class="author-img">
                <v-img
                  max-height="280"
                  :src="
                    require('@/assets/img/core-img/Web3Bazaar_1080x1080_FINAL.png')
                  "
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- ##### key topics End ##### -->

    <!-- ##### Follow us part ##### -->
    <section class="section-padding-0-70 clearfix text-center">
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <a
              href="http://docs.web3bazaar.org/"
              class="service_single_content collection-item wow fadeInUp"
              data-wow-delay="0.2s"
            >
              <!-- Content -->
              <div class="collection_info">
                <h6>Know all about the project</h6>
              </div>
              <!-- Icon -->
              <v-img
                class="mx-auto mb-4"
                style="border-radius: 50%"
                contain
                max-width="100"
                :src="require('@/assets/img/pixel-logos/gitbook-pixel.png')"
              />
            </a>
          </v-col>
          <v-col cols="12" md="4">
            <a
              href="https://github.com/Web3bazaar"
              class="service_single_content collection-item wow fadeInUp"
              data-wow-delay="0.3s"
            >
              <!-- Content -->
              <div class="collection_info">
                <h6>Check out our open-source code</h6>
              </div>
              <!-- Icon -->
              <v-img
                class="mx-auto mb-4"
                contain
                max-width="100"
                :src="require('@/assets/img/pixel-logos/github-pixel.png')"
              />
            </a>
          </v-col>
          <v-col cols="12" md="4">
            <a
              href="https://discord.gg/Z5GqrdHWJP"
              class="service_single_content collection-item wow fadeInUp"
              data-wow-delay="0.4s"
            >
              <!-- Content -->
              <div class="collection_info">
                <h6>Join our community</h6>
              </div>
              <!-- Icon -->
              <v-img
                class="mx-auto mb-4"
                contain
                max-width="100"
                :src="require('@/assets/img/pixel-logos/discord-pixel.png')"
              />
            </a>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section class="features section-padding-0-100">
      <div class="container">
        <div class="section-heading text-center">
          <!-- Dream Dots -->
          <div
            class="dream-dots justify-content-center fadeInUp"
            data-wow-delay="0.2s"
          >
            <span>Trade on</span>
          </div>
          <h2 class="fadeInUp" data-wow-delay="0.3s">
            Bazaar is a verified smart contract available on multiple chains
            <img src="@/assets/img/art-work/fire.png" width="20" alt="" />
          </h2>
        </div>
        <v-row>
          <v-col cols="6" sm="3">
            <v-img
              class="mx-auto"
              contain
              max-width="80"
              style="border-radius: 50%"
              :src="require('@/assets/img/pixel-logos/polygon-pixel.png')"
            />
          </v-col>
          <v-col cols="6" sm="3">
            <v-img
              class="mx-auto"
              contain
              max-width="80"
              :src="require('@/assets/img/pixel-logos/binance-pixel.png')"
            />
          </v-col>
          <v-col cols="6" sm="3">
            <v-img
              class="mx-auto"
              contain
              max-width="80"
              :src="require('@/assets/img/pixel-logos/avalanche-pixel.png')"
            />
          </v-col>
          <v-col cols="6" sm="3">
            <v-img
              class="mx-auto"
              contain
              max-width="80"
              :src="require('@/assets/img/pixel-logos/fantom-pixel.png')"
            />
          </v-col>
        </v-row>
      </div>
    </section>
  </v-container>
</template>

<script>
export default {
  name: 'IndexPage',
  head() {
    return {
      title: 'Home - ',
    }
  },
}
</script>
