<template>
  <Loading-component :active="isLoading"></Loading-component>
  <div class="container my-5">
    <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/products">商品列表</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
      </ol>
    </nav>
    <div class="row row-cols-1 row-cols-md-2">
      <article class="col mb-3">
        <h1>{{ product.title }}</h1>
        <h5 class="mb-4 text-secondary">{{ product.description }}</h5>
        <div class="mb-2 fw-bold">成份：{{ product.ingredients }}</div>
        <div class="mb-5">{{ product.content }}</div>
        <h5 class="mb-3 text-danger" v-if="product.price==product.origin_price">{{ product.origin_price }} 元</h5>
        <h5 class="mb-3" v-else>
          <del class="h6">{{ product.origin_price }} 元</del>
          <div class="h5 text-danger">{{ product.price }} 元</div>
        </h5>
        <button type="button" class="btn btn-outline-primary mb-5"
                @click="addToCart(product.id)">
          加到購物車
        </button>
      </article>
      <div class="col">
        <div class="text-center">
          <img :src="product.shownUrl" class="mb-2" style="height: 300px; object-fit: cover; width:100%">
        </div>
        <template v-for="image in product.imagesUrl" :key="image">
          <img :src="image" alt="商品照片" class="images me-2"
                style="height: 150px;" @mouseenter="product.shownUrl=image" @mouseout="product.shownUrl=product.imageUrl">
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/libs/emitter'

export default {
  data () {
    return {
      product: {},
      isLoading: false
    }
  },
  methods: {
    addToCart (id, qty = 1) {
      this.isLoading = true
      const data = {
        product_id: id,
        qty
      }
      this.$http
        .post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`, { data })
        .then((response) => {
          // alert(response.data.message)
          this.$httpMessageState(response, '加入購物車')
          emitter.emit('get-cart')
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
    this.isLoading = true
    this.$http
      .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${this.$route.params.id}`)
      .then((response) => {
        this.product = response.data.product
        this.product.shownUrl = this.product.imageUrl
        this.isLoading = false
      })
      .catch((error) => {
        // alert(error.response.data.message)
        this.$httpMessageState(error.response, '錯誤訊息')
        this.isLoading = false
      })
  }
}
</script>
