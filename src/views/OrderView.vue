<template>
  <loading-component :active="isLoading"></loading-component>
  <div class="container py-5">
    <div class="mb-5">
      <ul class="d-flex justify-content-center list-unstyled">
        <li style="width: 20%" class="text-center position-relative">
          <div class="text-primary">購物車</div>
          <div class="step-bar bg-primary"></div>
          <div class="step-circle bg-primary">
            <span>1</span>
          </div>
        </li>
        <li style="width: 20%" class="text-center position-relative">
          <div class="text-primary fw-bold">建立訂單</div>
          <div class="step-bar bg-secondary"></div>
          <div class="step-circle bg-primary mx-auto">
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
    <div class="row row-cols-1 row-cols-lg-2 m-3">
      <div class="col-lg-6 p-3">
        <table class="table align-middle">
          <thead>
            <tr>
              <th>品名</th>
              <th class="text-end">數量</th>
              <th class="text-end">合計</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cartData.carts" :key="item.id">
              <td>
                <router-link  :to="`/product/${item.product.id}`" class="link-dark d-flex align-items-center">
                  <div class="img-cover me-3" style="width:100px; height: 100px;" :style="`background-image: url('${item.product.imageUrl}')`"></div>
                  <div>
                    <div class="fw-bold">{{ item.product.title }}</div>
                    <small>{{ item.product.description }}</small>
                    <div v-if="item.product.price===item.product.origin_price">
                      {{ item.product.price }} 元
                    </div>
                    <div v-else>
                      <small><del>{{ item.product.origin_price }} 元</del></small>
                      <span class="ms-2">{{ item.product.price }} 元</span>
                    </div>
                  </div>
                </router-link>
              </td>
              <td class="text-end">
                {{item.qty}} {{item.product.unit}}
              </td>
              <td class="text-end">
                {{ item.total }} 元
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td class="text-end">總計</td>
              <td colspan="3" class="text-end">{{ cartData.total }}</td>
            </tr>
            <tr>
              <td class="text-end text-success">折扣價</td>
              <td colspan="3" class="text-end text-success">
                {{ Math.floor(cartData.final_total) }} <br>
                <small v-if="cartData.carts[0]?.coupon" class="text-mute">(已套用「{{ cartData.carts[0].coupon.title }}」優惠券：{{ cartData.carts[0].coupon.code }})</small>
              </td>
            </tr>
          </tfoot>
        </table>
        <router-link to="/cart">
          <button class="btn btn-outline-primary mt-5">
            <i class="bi bi-arrow-left"></i>
            回購物車
          </button>
        </router-link>
      </div>

      <div class="col-lg-6 p-3">
        <div class="p-4 shadow">
          <div class="d-flex justify-content-center">
            <form-component ref="form" v-slot="{ errors }" @submit="createOrder">
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <field-component id="email" name="email" type="email" class="form-control" rules="email|required"
                      :class="{ 'is-invalid': errors['email'] }" placeholder="請輸入 Email"
                      v-model="form.user.email"></field-component>
                <error-message name="email" class="invalid-feedback"></error-message>
              </div>
              <div class="row">
                <div class="col mb-3">
                  <label for="name" class="form-label">收件人姓名</label>
                  <field-component id="name" name="姓名" type="text" class="form-control"
                          :class="{ 'is-invalid': errors['姓名'] }" placeholder="請輸入姓名" rules="required"
                          v-model="form.user.name"></field-component>
                  <error-message name="姓名" class="invalid-feedback"></error-message>
                </div>
                <div class="col mb-3">
                  <label for="tel" class="form-label">收件人電話</label>
                  <field-component id="tel" name="電話" type="tel" class="form-control"
                          :class="{ 'is-invalid': errors['電話'] }" placeholder="請輸入電話" :rules="isPhone"
                          v-model="form.user.tel"></field-component>
                  <error-message name="電話" class="invalid-feedback"></error-message>
                </div>
              </div>

              <div class="mb-3">
                <label for="address" class="form-label">收件人地址</label>
                <field-component id="address" name="地址" type="text" class="form-control"
                        :class="{ 'is-invalid': errors['地址'] }" placeholder="請輸入地址" rules="required"
                        v-model="form.user.address"></field-component>
                <error-message name="地址" class="invalid-feedback"></error-message>
              </div>

              <div class="mb-3">
                <label for="message" class="form-label">留言</label>
                <textarea id="message" class="form-control" cols="30" rows="3" v-model="form.message"></textarea>
              </div>
              <button type="submit" class="btn btn-primary w-100"
                      :disabled="Object.keys(errors).length > 0 || cartData.carts.length === 0">
                      送出訂單
              </button>
            </form-component>
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
    createOrder () {
      this.isLoading = true

      const order = {
        data: this.form
      }
      this.$http
        .post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`, order)
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
