<template>
  <loading-component :active="isLoading"></loading-component>
  <div class="img-cover position-relative" style="height: 25vh; background-image:url('https://images.unsplash.com/photo-1624459311940-0137c5ae2aa8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80');">
    <h1 class="position-absolute top-100 start-50 translate-middle fw-bolder fst-italic dancing" style="font-size: 4rem">Products</h1>
  </div>
  <div class="container my-5 py-5">
    <div class="row gx-5">
      <div class="col-lg-2">
        <ul class="list-unstyled d-flex justify-content-between d-lg-block mb-3">
          <li class="mb-3 me-3 pb-1 pb-lg-0 ps-lg-1" :class="{'bg-primary':selectedCategory==''}">
            <a href="#" @click.prevent="getProducts(1,'')" class="d-block p-2 p-lg-3 bg-white" :class="{'fw-bold':selectedCategory==''}"> 全部商品</a>
          </li>
          <li v-for="category in categories" :key="category" class="mb-3 me-3 pb-1 pb-lg-0 ps-lg-1" :class="{'bg-primary':selectedCategory==category}">
            <a href="#" @click.prevent="getProducts(1,category)" class="d-block p-2 p-lg-3 bg-white" :class="{'fw-bold':selectedCategory==category}"> {{ category }}</a>
          </li>
        </ul>
      </div>
      <div class="col-lg-10">
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 gx-4 gy-5">
          <div class="col" v-for="product in products" :key="product.id">
            <div class="card border-0 h-100 product-card position-relative">
              <div class="card-img-top position-relative" :style="`height:300px; background-image: url(${product.imageUrl}); background-size: cover; background-position:center`">
                <div class="position-absolute top-0 bottom-0 start-0 end-0 product-more" style="background-color: rgba(0,0,0,0.5)">
                  <i class="fs-2 bi bi-search position-absolute top-50 start-50 translate-middle text-secondary"></i>
                  <router-link :to="`/product/${product.id}`" class="stretched-link"></router-link>
                </div>
              </div>
              <div class="card-body p-0">
                <div class="fw-bold mt-2">{{ product.title }}</div>
                <small class="card-text mb-2">{{ product.description }}</small>
              </div>
              <div class="card-footer d-flex align-items-center justify-content-between p-0 bg-transparent border-0">
                <div>
                  <div class="text-primary" v-if="product.price===product.origin_price">
                      $ {{ product.origin_price }}
                  </div>
                  <div v-else>
                    <span class="text-danger me-1">$ {{ product.price }} </span>
                    <del class="text-muted" style="font-size: 0.5rem">$ {{ product.origin_price }} </del>
                  </div>
                </div>
                <button type="button" class="btn btn-primary" @click="addToCart(product.id)"
                    :disabled="isLoading">
                    加入
                </button>
              </div>
            </div>
          </div>
        </div>
        <pagination-component :pages="pagination" @get-items="getProducts"></pagination-component>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/libs/emitter'
import PaginationComponent from '@/components/PaginationComponent.vue'

export default {
  data () {
    return {
      cartData: {
        carts: []
      },
      products: [],
      product: {},
      categories: [],
      selectedCategory: '',
      pagination: {},
      currentPage: 1,
      isLoading: false
    }
  },
  components: {
    PaginationComponent
  },
  methods: {
    getProducts (page = 1, selectedCategory = '') {
      this.isLoading = true
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/?page=${page}&category=${selectedCategory}`)
        .then((response) => {
          this.products = response.data.products
          this.pagination = response.data.pagination
          this.selectedCategory = selectedCategory
          this.currentPage = page
          this.isLoading = false
        })
        .catch((error) => {
          // alert(error.response.data.message)
          this.$httpMessageState(error.response, '錯誤訊息')
          this.isLoading = false
        })
    },
    getCategories () {
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`)
        .then((response) => {
          this.categories = Array.from(new Set(response.data.products.map(i => i.category))).reverse()
        })
        .catch((error) => {
          // alert(error.response.data.message)
          this.$httpMessageState(error.response, '錯誤訊息')
        })
    },
    addToCart (id, qty = 1) {
      if (qty < 1 || qty % 1 !== 0) {
        // alert('輸入數量錯誤')
        this.emitter.emit('push-message', {
          style: 'success',
          title: '錯誤訊息',
          content: '輸入數量錯誤'
        })
        return
      }
      const data = {
        product_id: id,
        qty
      }
      this.isLoading = true
      this.$http
        .post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`, { data })
        .then((response) => {
          // alert(response.data.message)
          this.$httpMessageState(response, '加入購物車')
          emitter.emit('get-cart')
          // this.$refs.productModal.closeModal()
          this.isLoading = false
        })
        .catch((error) => {
          // alert(error.response.data.message)
          this.$httpMessageState(error.response, '加入購物車')
          this.isLoading = false
        })
    }
  },
  mounted () {
    this.getProducts()
    this.getCategories()
  }
}
</script>

<style>
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    display: none;
  }
  .product-card:hover img {
    background-size: 120%;
  }
  .product-more {
    opacity: 0;
    transition-duration: .3s;
  }
  .product-more:hover {
    opacity: 1
  }
</style>
