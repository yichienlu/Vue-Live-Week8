<template>
  <loading-component :active="isLoading"></loading-component>
  <div class="container py-5">
    <div class="mb-5">
      <ul class="d-flex justify-content-center list-unstyled">
        <li style="width: 20%" class="text-center position-relative">
          <div class="text-primary fw-bold">購物車</div>
          <div class="step-bar bg-secondary"></div>
          <div class="step-circle bg-primary">
            <span>1</span>
          </div>
        </li>
        <li style="width: 20%" class="text-center position-relative">
          <div class="text-secondary">建立訂單</div>
          <div class="step-bar bg-secondary"></div>
          <div class="step-circle bg-secondary mx-auto">
            <span>2</span>
          </div>
        </li>
        <li style="width: 20%" class="text-center position-relative">
          <div class="text-secondary">付款</div>
          <div class="step-bar bg-secondary"></div>
          <div class="step-circle bg-secondary mx-auto">
            <span>3</span>
          </div>
        </li>
        <li style="width: 20%" class="text-center">
          <div class="text-secondary">付款完成</div>
          <div class="step-circle bg-secondary mx-auto">
            <span>4</span>
          </div>
        </li>
      </ul>
    </div>
    <div v-if="cartData.carts.length == 0" class="my-5 text-center">
      <router-link to="/products">
        購物車裡沒有東西！快去逛逛吧！！
      </router-link>
    </div>
    <div v-else class="my-5">
      <div class="row">
        <div class="col-lg-8">
          <div class="d-lg-none">
            <div v-for="item in cartData.carts" :key="item.id" class="d-flex py-2 mb-4 border-bottom position-relative">
              <a href="#" class="position-absolute end-0" @click.prevent="removeCartItem(item.id)" :disabled="isLoading">
                <i class="bi bi-x fs-2"></i>
              </a>
              <router-link :to="`/product/${item.product.id}`">
                <div class="img-cover me-3" style="width:100px; height: 120px;" :style="`background-image: url('${item.product.imageUrl}')`"></div>
              </router-link>
              <div>
                <div class="fw-bold">
                  <router-link :to="`/product/${item.product.id}`">{{ item.product.title }}</router-link>
                </div>
                <small>{{ item.product.description }}</small>
                <div class="input-group input-group-sm my-2" style="width: 80px">
                  <button class="btn btn-secondary text-white" type="button" @click="updateCartItem(item, -1)">
                    -
                  </button>
                  <input
                    type="number"
                    onkeypress="return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57"
                    class="form-control text-center"
                    v-model.number="item.qty"
                    @change="updateCartItem(item, 0)"
                  />
                  <button class="btn btn-secondary text-white" type="button"  @click="updateCartItem(item, 1)">
                    +
                  </button>
                </div>
                <div>
                  <div v-if="item.product.price === item.product.origin_price" class="text-danger">
                    {{ item.product.price * item.qty }} 元
                  </div>
                  <div v-else>
                    <small>
                      <del>{{ item.product.origin_price * item.qty }} 元</del>
                    </small>
                    <span class="text-danger ms-2">{{ item.product.price * item.qty }} 元</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <table class="d-none d-lg-block table table-responsive-md align-middle">
            <thead>
              <tr>
                <th></th>
                <th>品名</th>
                <th class="text-center">單價</th>
                <th style="width: 100px">數量</th>
                <th class="text-end">合計</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in cartData.carts" :key="item.id">
                <td>
                  <button type="button" class="btn btn-sm" @click="removeCartItem(item.id)" :disabled="isLoading">
                    <i class="bi bi-trash3-fill text-danger fs-5"></i>
                  </button>
                </td>
                <td>
                  <router-link
                    :to="`/product/${item.product.id}`"
                    class="link-dark d-md-flex align-items-center"
                  >
                  <div class="img-cover me-3" style="width:100px; height: 100px;" :style="`background-image: url('${item.product.imageUrl}')`"></div>
                    <div>
                      <p class="fw-bold">{{ item.product.title }}</p>
                      <small>{{ item.product.description }}</small>
                    </div>
                  </router-link>
                </td>
                <td class="text-center">
                  <div v-if="item.product.price === item.product.origin_price" class="text-danger">
                    {{ item.product.price }} 元
                  </div>
                  <div v-else>
                    <small>
                      <del>{{ item.product.origin_price }} 元</del>
                    </small>
                    <div class="text-danger">{{ item.product.price }} 元</div>
                  </div>
                </td>
                <td>
                  <div class="input-group input-group-sm mb-2">
                    <button
                      class="btn btn-secondary text-white"
                      type="button"
                      @click="updateCartItem(item, -1)"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      onkeypress="return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57"
                      class="form-control text-center"
                      v-model.number="item.qty"
                      @change="updateCartItem(item, 0)"
                    />
                    <button
                      class="btn btn-secondary text-white"
                      type="button"
                      @click="updateCartItem(item, 1)"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td class="text-end text-danger">
                  {{ item.total }} 元
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            <button class="btn btn-outline-danger" type="button" :disabled="cartData.carts.length === 0" @click="clearCart">
              清空購物車
            </button>
          </div>
        </div>
        <div class="col-lg-4 mt-4 mt-lg-0">
          <div class="text-end shadow p-3 p-lg-5">
            <p class="d-flex justify-content-between">
              <span>總計：</span>
              <span>{{ cartData.total }} 元</span>
            </p>
            <p v-if="cartData.carts[0].coupon" class="text-danger d-flex justify-content-between">
              <span>優惠券折扣：</span>
              <span>- {{ cartData.total - Math.floor(cartData.final_total) }} 元</span>
            </p>
            <p v-if="cartData.carts[0].coupon" class="text-end">
              <small class="text-danger"
                >(已套用「{{ cartData.carts[0].coupon.title }}」優惠券：{{
                  cartData.carts[0].coupon.code
                }})
                </small>
            </p>
            <p class="d-flex justify-content-between">
              <span>折扣價：</span>
              <span class="fw-bold">{{ Math.floor(cartData.final_total) }} 元</span>
            </p>
            <div class="input-group my-3 input-group-sm">
              <input
              type="text"
              class="form-control"
              v-model="couponCode"
              placeholder="請輸入優惠碼"
              ref="couponCode"/>
              <div class="input-group-append">
                <button class="btn btn-secondary text-white" type="button" @click="addCouponCode">
                  套用
                </button>
              </div>
            </div>
            <router-link to="/order">
              <button class="btn btn-primary w-100" type="button" :disabled="cartData.carts.length === 0">
                填寫訂單
              </button>
            </router-link>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/libs/emitter'

export default {
  data () {
    return {
      cartData: {
        carts: []
      },
      products: [],
      product: {},
      couponCode: '',
      isLoading: false,
      form: {
        user: {
          email: '',
          name: '',
          tel: '',
          address: ''
        },
        message: ''
      }
    }
  },
  methods: {
    getCart () {
      this.isLoading = true
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((response) => {
          this.cartData = response.data.data
          emitter.emit('get-cart')
          this.isLoading = false
        })
        .catch((error) => {
          // alert(error.response.data.message)
          this.$httpMessageState(error.response, '錯誤訊息')
          this.isLoading = false
        })
    },
    removeCartItem (id) {
      this.isLoading = true
      this.$http
        .delete(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`
        )
        .then((response) => {
          // alert(response.data.message)
          this.$httpMessageState(response, '移除購物車品項')
          this.getCart()
          this.isLoading = false
        })
        .catch((error) => {
          // alert(error.response.data.message)
          this.$httpMessageState(error.response, '移除購物車品項')
          this.isLoading = false
        })
    },
    updateCartItem (item, num) {
      if (item.qty + num === 0) {
        this.removeCartItem(item.id)
        return
      }
      if (item.qty + num < 1 || item.qty % 1 !== 0) {
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
        .put(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`,
          { data }
        )
        .then((response) => {
          // alert(response.data.message)
          this.$httpMessageState(response, '更新購物車')
          this.getCart()
          this.isLoading = false
        })
        .catch((error) => {
          // alert(error.response.data.message)
          this.$httpMessageState(error.response, '更新購物車')
          this.isLoading = false
        })
    },
    clearCart () {
      this.isLoading = true

      this.$http
        .delete(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`
        )
        .then((response) => {
          // alert('已清空購物車')
          this.$httpMessageState(response, '清空購物車')
          this.getCart()
          this.isLoading = false
        })
        .catch((error) => {
          // alert(error.response.data.message)
          this.$httpMessageState(error.response, '清空購物車')
          this.isLoading = false
        })
    },
    addCouponCode () {
      this.isLoading = true
      const data = {
        code: this.couponCode
      }
      this.$http
        .post(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/coupon`,
          { data }
        )
        .then((response) => {
          // alert(response.data.message)
          this.$httpMessageState(response, '套用優惠券')
          this.couponCode = ''
          this.getCart()
          this.isLoading = false
        })
        .catch((error) => {
          // alert(error.response.data.message)
          this.$httpMessageState(error.response, '套用優惠券')
          this.couponCode = ''
          this.isLoading = false
        })
    },
    createOrder () {
      this.isLoading = true

      const order = {
        data: this.form
      }
      this.$http
        .post(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`,
          order
        )
        .then((response) => {
          this.$httpMessageState(response, '送出訂單')
          this.$refs.form.resetForm()
          this.form.message = ''
          this.$router.push(`/checkout/${response.data.orderId}`)
          this.isLoading = false
        })
        .catch((error) => {
          // alert(error.response.data.message)
          this.$httpMessageState(error.response, '送出訂單')
          this.isLoading = false
        })
    },

    isPhone (value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '電話格式錯誤'
    }
  },
  mounted () {
    this.getCart()
  }
}
</script>
