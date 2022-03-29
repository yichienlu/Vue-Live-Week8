<template>
  <router-link to="/Cart" class="d-lg-none nav-link position-relative" style="cursor: pointer">
    <span class="text-light">Cart</span>
    <i class="bi bi-cart-fill position-absolute top-50 start-50 translate-middle" style="font-size: 2rem"></i>
    <small class="position-absolute top-50 start-50 translate-middle text-white">
      {{ cartData.carts.length }}
    </small>
  </router-link>
  <a class="d-none d-lg-block nav-link position-relative" data-bs-toggle="collapse" data-bs-target="#collapseExample" style="cursor: pointer">
    <span class="text-light">Cart</span>
    <i class="bi bi-cart-fill position-absolute top-50 start-50 translate-middle" style="font-size: 2rem"></i>
    <small class="position-absolute top-50 start-50 translate-middle text-white">
      {{ cartData.carts.length }}
    </small>
  </a>
  <div class="collapse position-absolute top-100 end-0 bg-white shadow-sm p-3" id="collapseExample">
    <div class="d-flex justify-content-between">
      <h5>購物車</h5>
      <button type="button" class="btn btn-close" data-bs-toggle="collapse" data-bs-target="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample"></button>
    </div>
    <div v-if="cartData.carts.length == 0" class="my-5 text-center"  >
      <router-link to="/products">
        <span data-bs-toggle="collapse" data-bs-target="#collapseExample">購物車裡沒有東西！快去逛逛吧！！</span>
      </router-link>
    </div>
    <div v-else>
      <div class="overflow-auto" style="max-height: 50vh">
        <table class="table">
          <tbody>
            <tr v-for="item in cartData.carts" :key="item.id" height="100">
              <td>
                <router-link :to="`/product/${item.product.id}`">
                  <div class="img-cover" style="width: 100px; height: 100px" :style="`background-image: url('${item.product.imageUrl}')`"></div>
                </router-link>
              </td>
              <td>
                <div>
                  <h6 class="fw-bold">{{ item.product.title }}</h6>
                  <div>
                    價格：
                    <span v-if="item.product.price===item.product.origin_price" class="text-danger">
                      {{ item.product.price }} 元
                    </span>
                    <span v-else>
                      <small class="me-2">
                        <del>{{ item.product.origin_price }} 元</del>
                      </small>
                      <span class="text-danger">{{ item.product.price }} 元</span>
                    </span>
                  </div>
                  <div class="d-flex">
                    <span>數量：</span>
                    <div class="input-group input-group-sm mb-3" style="width: 100px">
                      <button class="btn btn-secondary text-white" type="button" @click="updateCartItem(item, -1)">-</button>
                      <input type="number"
                              onkeypress="return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57"
                              class="form-control text-center" v-model.number="item.qty"
                              @change="updateCartItem(item, 0)">
                      <button class="btn btn-secondary text-white" type="button" @click="updateCartItem(item, 1)">+</button>
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <button type="button" class="btn btn-outline-danger btn-sm" @click="removeCartItem(item.id)" :disabled="isLoading">
                  刪除
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <hr>
      <div class="d-flex align-items-center justify-content-between m-2">
        <div class="text-end">
          總金額：<span class="text-danger fw-bold">{{ cartData.total }}</span>元
        </div>
        <router-link to="/cart" class="link-secondary px-2">
          <button class="btn btn-danger" data-bs-toggle="collapse" data-bs-target="#collapseExample">去結帳 <i class="bi bi-arrow-right"></i></button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/libs/emitter'

export default {
  name: 'FrontCart',

  data () {
    return {
      cartData: {
        carts: []
      },
      isLoading: false
    }
  },
  methods: {
    getCart () {
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((response) => {
          //   console.log(response);
          this.cartData = response.data.data
        })
        .catch((error) => {
          this.$httpMessageState(error.response, '錯誤訊息')
        })
    },
    removeCartItem (id) {
      this.isLoading = true
      this.$http
        .delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`)
        .then((response) => {
          // alert(response.data.message)
          this.$httpMessageState(response, '移除購物車品項')
          this.getCart()
          this.isLoading = false
        })
        .catch((error) => {
          // console.dir(error)
          this.$httpMessageState(error.response, '移除購物車品項')
        })
    },
    updateCartItem (item, num) {
      if (item.qty + num === 0) {
        this.removeCartItem(item.id)
        return
      }
      if ((item.qty + num) < 1 || item.qty % 1 !== 0) {
        // alert('輸入數量錯誤')
        this.emitter.emit('push-message', {
          style: 'success',
          title: '錯誤訊息',
          content: '輸入數量錯誤'
        })
        return
      }
      const data = {
        product_id: item.id,
        qty: item.qty + num
      }
      this.isLoading = true
      this.$http
        .put(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`, { data })
        .then((response) => {
          this.$httpMessageState(response, '更新購物車')
          this.getCart()
          this.isLoading = false
        })
        .catch((error) => {
          this.$httpMessageState(error.response, '更新購物車')
        })
    }
  },
  mounted () {
    this.getCart()
    emitter.on('get-cart', () => {
      this.getCart()
    })
  }
}
</script>

<style>
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    display: none;
  }
</style>
