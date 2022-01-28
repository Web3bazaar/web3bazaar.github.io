<template>
  <section class="blog-area section-padding-100 darker">
    <div class="container">
      <div class="row">
        <div class="col-12 col-lg-3">
          <div class="service_single_content collection-item">
            <!-- Icon -->
            <div class="collection_icon">
              <img
                src="img/art-work/profile-header.jpg"
                class="center-block"
                alt=""
              />
            </div>
            <span class="aut-info">
              <img src="img/authors/2.png" width="50" alt="" />
            </span>
            <div class="collection_info text-center">
              <h6>Morgan Wright</h6>
              <p class="w-text mr-5p">
                Creative NFTs Designer
                <img src="img/art-work/fire.png" width="20" alt="" />
              </p>
              <p class="mt-15">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos
                distinctio labore.
              </p>

              <div class="search-widget-area mt-15">
                <form action="#" method="post">
                  <input
                    id="wallet"
                    type="text"
                    name="wallet"
                    value="Xjo03s-osi6732..."
                  />
                  <button class="btn"><i class="fa fa-copy"></i></button>
                </form>
              </div>

              <ul class="social-links mt-30 mb-30">
                <li>
                  <a href="#"><span class="fa fa-facebook-f"></span></a>
                </li>
                <li>
                  <a href="#"><span class="fa fa-twitter"></span></a>
                </li>
                <li>
                  <a href="#"><span class="fa fa-google-plus"></span></a>
                </li>
                <li>
                  <a href="#"><span class="fa fa-linkedin"></span></a>
                </li>
                <li>
                  <a href="#"><span class="fa fa-instagram"></span></a>
                </li>
              </ul>
              <a href="profile.html" class="more-btn">Follow</a>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-8">
          <div class="creator-sec dd-bg">
            <div class="who-we-contant">
              <div class="dream-dots text-left fadeInUp" data-wow-delay="0.2s">
                <span class="gradient-text">Create New Item</span>
              </div>
              <h4 class="fadeInUp" data-wow-delay="0.3s">Create Item</h4>
            </div>
            <div class="contact_form">
              <form id="main_contact_form" action="#" method="post" novalidate>
                <div class="row">
                  <div class="col-12">
                    <div id="success_fail_info"></div>
                  </div>

                  <div class="col-12 col-md-12">
                    <p class="w-text">Upload Item File</p>
                    <div class="group-file">
                      <p class="g-text">
                        PNG, GIF, WEBP, MP4 or MP3. Max 100mb
                      </p>
                      <div class="new_Btn more-btn">Upload File</div>
                      <br />
                      <input
                        id="upload-btn"
                        type="file"
                        name="upload"
                        required
                      />
                    </div>
                  </div>
                  <div class="col-12 col-md-12">
                    <div class="group">
                      <input id="name" type="text" name="name" required />
                      <span class="highlight"></span>
                      <span class="bar"></span>
                      <label>Item name</label>
                    </div>
                  </div>
                  <div class="col-12 col-md-12">
                    <div class="mb-15">
                      <p>Choose item Category</p>
                      <div class="filers-list">
                        <a href="" class="filter-item">
                          <img src="img/icons/f1.png" alt="" />Art
                        </a>
                        <a href="" class="filter-item">
                          <img src="img/icons/f5.png" alt="" />Virtual Worlds
                        </a>
                        <a href="" class="filter-item">
                          <img src="img/icons/f2.png" alt="" />Purchases
                        </a>
                        <a href="" class="filter-item">
                          <img src="img/icons/f3.png" alt="" />NFT Gifts
                        </a>
                        <a href="" class="filter-item">
                          <img src="img/icons/f4.png" alt="" />Collectibles
                        </a>
                        <a href="" class="filter-item">
                          <img src="img/icons/f6.png" alt="" />Gifts
                        </a>
                        <a href="" class="filter-item">
                          <img src="img/icons/f7.png" alt="" />Trading Cards
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="group">
                      <textarea
                        id="Description"
                        name="Description"
                        required
                      ></textarea>
                      <span class="highlight"></span>
                      <span class="bar"></span>
                      <label>Item Description</label>
                    </div>
                  </div>
                  <div class="col-12 col-md-12">
                    <div class="group">
                      <input id="Price" type="text" name="Price" required />
                      <span class="highlight"></span>
                      <span class="bar"></span>
                      <label>Item Price in ETH</label>
                    </div>
                  </div>
                  <div class="col-12 col-md-6">
                    <div class="group">
                      <input
                        id="Royalties"
                        type="text"
                        name="Royalties"
                        required
                      />
                      <span class="highlight"></span>
                      <span class="bar"></span>
                      <label>Royalties</label>
                    </div>
                  </div>
                  <div class="col-12 col-md-6">
                    <div class="group">
                      <input id="Size" type="text" name="Size" required />
                      <span class="highlight"></span>
                      <span class="bar"></span>
                      <label>Size</label>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="group">
                      <input id="copies" type="text" name="copies" required />
                      <span class="highlight"></span>
                      <span class="bar"></span>
                      <label>Number of copies</label>
                    </div>
                  </div>

                  <div class="col-12 text-center">
                    <button type="submit" class="more-btn mb-15">
                      Create Item
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {}
</script>

<style></style>
