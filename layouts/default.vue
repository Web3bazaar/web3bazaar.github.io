<template>
  <v-app id="web3_bazaar">
    <nav id="banner" class="navbar navbar-expand-lg navbar-white fixed-top">
      <v-container>
        <!-- Brand -->
        <a class="navbar-brand" href="/"
          ><span
            ><img
              width="45"
              src="@/assets/img/site-logos/Web3Bazaar_Logo_2048px.png"
              alt="logo"
          /></span>
          Web3Bazaar</a
        >

        <!-- Toggler/collapsibe Button -->
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavbar"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Navbar links -->
        <div id="collapsibleNavbar" class="collapse navbar-collapse">
          <ul class="navbar-nav ml-auto">
            <!-- <li class="nav-item">
              <a class="nav-link" href="/">Home</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="" data-toggle="dropdown"
                >Discover</a
              >
              <div class="dropdown-menu">
                <a class="dropdown-item" href="">Live Auctions</a>
                <a class="dropdown-item" href="">Discover</a>
                <a class="dropdown-item" href="item-details">Item Details</a>
              </div>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="">Activity</a>
            </li>

            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="" data-toggle="dropdown"
                >Pages</a
              >
              <div class="dropdown-menu">
                <a class="dropdown-item" href="">Wallet Connect</a>
                <a class="dropdown-item" href="create-new-trade">Create Item</a>
                <a class="dropdown-item" href="">Authors</a>
              </div>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="">Contact</a>
            </li> -->
            <li class="lh-55px">
              <a href="http://docs.web3bazaar.org/" class="btn login-btn ml-50"
                >Wiki</a
              >
            </li>
          </ul>
        </div>
      </v-container>
    </nav>
    <div id="main-b">
      <div class="jumbotron-fluid">
        <Nuxt />
      </div>
    </div>
    <footer class="main-footer text-center">
      <!--Footer Bottom-->
      <div class="footer-bottom">
        <div class="auto-container">
          <div class="copyright-text">Copyright ©{{ getYear }} Web3 Bazaar</div>
        </div>
      </div>
    </footer>
    <!-- ##### Footer Area End ##### -->
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
  computed: {
    getYear() {
      return new Date().getFullYear()
    },
  },
}
</script>
