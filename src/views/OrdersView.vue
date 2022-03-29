<template>
  <Loading-component :active="isLoading"></Loading-component>
  <div class="container py-4 py-lg-5">
    <h1 class="fw-bold text-center mb-4 mb-lg-5">我的訂單 <span class="dancing h2 text-secondary fw-bold">Orders</span></h1>
    <div v-for="order in orders" :key="order.id" class="d-md-none p-3 my-3 border">
      <dl class="row">
        <dt class="col-sm-3">訂單編號</dt>
        <dd class="col-sm-9">{{ order.id }}</dd>

        <dt class="col-sm-3">訂單成立時間</dt>
        <dd class="col-sm-9">
          <p>{{ $filters.date(order.create_at) }} <br>
          {{ $filters.time(order.create_at) }}</p>
        </dd>

        <dt class="col-sm-3">訂單內容</dt>
        <dd class="col-sm-9">
          <ul class="list-unstyled">
            <li v-for="product, key in Object.values(order.products)" :key="key">
              {{ product.product.title}} x {{ product.qty }} {{product.product.unit}}
            </li>
          </ul>
        </dd>

        <dt class="col-sm-3">訂購人資訊</dt>
        <dd class="col-sm-9">
            {{ order.user.name }} <br>
            {{ order.user.email }} <br>
            {{ order.user.tel }} <br>
            {{ order.user.address }}
        </dd>

        <dt class="col-sm-3">金額</dt>
        <dd class="col-sm-9">{{ order.total }} 元</dd>

        <dt class="col-sm-3">付款狀態</dt>
        <dd class="col-sm-9">
          <div v-if="!order.is_paid">
            <span class="text-danger me-3">尚未付款</span>
            <router-link :to="`/checkout/${order.id}`">
              <button class="btn btn-primary">去付款</button>
            </router-link>
          </div>
          <div v-else class="text-success">
            <span class="me-3">付款完成</span>
            <router-link :to="`/checkout/${order.id}`">
              <button class="btn btn-outline-primary">查看</button>
            </router-link>
          </div>
        </dd>
      </dl>
    </div>

    <div class="d-none d-md-block">
      <table class="table table-sm align-middle">
        <thead>
        <th>訂單資訊</th>
        <th>訂單內容</th>
        <th>訂購人資訊</th>
        <th>付款狀態</th>
        </thead>
        <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>
            <p>{{ order.id }}</p>
            <p>{{ $filters.date(order.create_at) }} <br>
            {{ $filters.time(order.create_at) }}</p>
          </td>
          <td>
            <ul class="list-unstyled">
              <li v-for="product, key in Object.values(order.products)" :key="key">
                {{ product.product.title}} x {{ product.qty }}
              </li>
            </ul>
            {{ order.total }} 元
          </td>
          <td>
            {{ order.user.name }} <br>
            {{ order.user.email }} <br>
            {{ order.user.tel }} <br>
            {{ order.user.address }}
          </td>
          <td>
            <div v-if="!order.is_paid">
              <span class="text-danger me-3">尚未付款</span>
              <router-link :to="`/checkout/${order.id}`">
                <button class="btn btn-primary">去付款</button>
              </router-link>
            </div>
            <div v-else class="text-success me-3">付款完成
              <router-link :to="`/checkout/${order.id}`">
                <button class="btn btn-outline-primary">查看</button>
              </router-link>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <pagination-component :pages="pagination" @get-items="getOrders"></pagination-component>
  </div>
</template>

<script>
import PaginationComponent from '@/components/PaginationComponent.vue'

export default {
  data () {
    return {
      orders: [],
      tempOrder: {},
      pagination: {},
      isLoading: false
    }
  },
  components: {
    PaginationComponent
  },
  methods: {
    getOrders () {
      this.isLoading = true
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/orders`)
        .then((response) => {
          this.orders = response.data.orders
          this.pagination = response.data.pagination
          this.isLoading = false
        })
        .catch((error) => {
          // alert(error.response.data.message)
          this.$httpMessageState(error.response, '錯誤訊息')
          this.isLoading = false
        })
    }
  },
  mounted () {
    this.getOrders()
  }
}
</script>
