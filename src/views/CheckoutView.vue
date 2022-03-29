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
          <div class="text-primary">建立訂單</div>
          <div class="step-bar bg-primary"></div>
          <div class="step-circle bg-primary mx-auto">
            <span>2</span>
          </div>
        </li>
        <li style="width: 20%" class="text-center position-relative">
          <div class="text-primary fw-bold">付款</div>
          <div class="step-bar bg-secondary"></div>
          <div class="step-circle bg-primary mx-auto">
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

    <div class="my-3 row justify-content-center">
      <form class="col-md-6">
        <table class="table align-middle">
          <thead>
          <th>品名</th>
          <th>數量</th>
          <th>單價</th>
          </thead>
          <tbody>
          <tr v-for="item in order.products" :key="item.id">
            <td>{{ item.product.title }}</td>
            <td>{{ item.qty }} {{ item.product.unit }}</td>
            <td class="text-end">{{ item.final_total }}</td>
          </tr>
          </tbody>
          <tfoot>
          <tr>
            <td colspan="2" class="text-end">總計</td>
            <td class="text-end">{{ order.total }}</td>
          </tr>
          </tfoot>
        </table>

        <table class="table">
          <tbody>
          <tr>
            <th width="100">Email</th>
            <td>{{ order.user.email }}</td>
          </tr>
          <tr>
            <th>姓名</th>
            <td>{{ order.user.name }}</td>
          </tr>
          <tr>
            <th>收件人電話</th>
            <td>{{ order.user.tel }}</td>
          </tr>
          <tr>
            <th>收件人地址</th>
            <td>{{ order.user.address }}</td>
          </tr>
          <tr>
            <th>付款狀態</th>
            <td>
              <span v-if="!order.is_paid" class="text-danger">尚未付款</span>
              <span v-else class="text-success">付款完成</span>
            </td>
          </tr>
          </tbody>
        </table>
        <div class="d-flex justify-content-between">
          <router-link to="/orders">
            <button class="btn btn-outline-primary">回訂單列表</button>
          </router-link>
          <router-link to="/checkout-success">
            <button v-if="order.is_paid === false" class="btn btn-primary" @click="payOrder">確認付款</button>
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      isLoading: false,
      order: {
        user: {}
      },
      orderId: ''
    }
  },
  methods: {
    getOrder () {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order/${this.orderId}`
      this.isLoading = true
      this.$http.get(url).then((response) => {
        this.order = response.data.order
        this.isLoading = false
      }).catch((error) => {
        this.$httpMessageState(error.response, '錯誤訊息')
        // alert(error.response.data.message)
        this.isLoading = false
      })
    },
    payOrder () {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/pay/${this.orderId}`
      this.isLoading = true
      this.$http.post(url).then((response) => {
        this.$httpMessageState(response, '付款')
        this.isLoading = false
        this.getOrder()
      }).catch((error) => {
        this.$httpMessageState(error.response, '錯誤訊息')
        // alert(error.response.data.message)
        this.isLoading = false
      })
    }
  },
  created () {
    this.orderId = this.$route.params.orderId
    this.getOrder()
  }
}
</script>
