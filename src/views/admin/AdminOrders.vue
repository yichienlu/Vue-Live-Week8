<template>
  <Loading-component :active="isLoading"></Loading-component>
  <div class="container my-5">
    <h1 class="text-secondary">訂單管理</h1>
    <!-- 訂單modal -->
    <order-modal :order="tempOrder" ref="orderModal" @edit-order="editOrder"></order-modal>
    <!-- 刪除modal -->
    <delete-modal :item="tempOrder" ref="deleteModal" @delete-item="deleteOrder"></delete-modal>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>
            下單時間
          </th>
          <th>email</th>
          <th>
            購買項目
          </th>
          <th>
            應付金額
          </th>
          <th>
            是否付款
          </th>
          <th>
            編輯
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>
            {{ $filters.date(order.create_at) }} <br>
            {{ $filters.time(order.create_at) }}
          </td>
          <td>{{ order.user.email }}</td>
          <td>
            <ul class="list-unstyled">
              <li v-for="(product, i) in order.products" :key="i">
                {{ product.product.title }}：{{ product.qty }}
                {{ product.product.unit }}
              </li>
            </ul>
          </td>
          <td class="text-end">{{ order.total }}</td>
          <td>
            <input
                class="form-check-input me-2"
                type="checkbox"
                :id="`paidSwitch${order.id}`"
                v-model="order.is_paid"
                @change="editOrder(order)"
              />
              <label class="form-check-label" :for="`paidSwitch${order.id}`">
                <span v-if="order.is_paid">已付款</span>
                <span class="text-danger" v-else>未付款</span>
              </label>
          </td>
          <td>
            <div class="btn-group">
              <button type="button" class="btn btn-outline-primary btn-sm" data-bs-toggle="modal"
                data-bs-target="#orderModal" @click="openOrderModal(order)">
                編輯
              </button>
              <button type="button" class="btn btn-outline-danger btn-sm" data-bs-toggle="modal"
                data-bs-target="#deleteModal" @click="openDeleteModal(order)">
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination-component :pages="pagination" @get-items="getOrders"></pagination-component>
  </div>
</template>

<script>
import OrderModal from '@/components/OrderModal.vue'
import DeleteModal from '@/components/DeleteModal.vue'
import PaginationComponent from '@/components/PaginationComponent.vue'
// import emitter from '@/libs/emitter'

export default {
  data () {
    return {
      orders: [],
      tempOrder: {},
      pagination: {},
      currentPage: 1,
      isLoading: false
    }
  },
  components: {
    PaginationComponent,
    OrderModal,
    DeleteModal
  },
  methods: {
    getOrders (page = 1) {
      this.isLoading = true
      this.currentPage = page
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders/?page=${page}`)
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
    },
    openOrderModal (item) {
      this.isLoading = true
      this.tempOrder = JSON.parse(JSON.stringify(item))
      this.isLoading = false
    },
    openDeleteModal (item) {
      this.isLoading = true
      this.tempOrder = item
      this.isLoading = false
    },
    editOrder (item) {
      this.isLoading = true
      this.$http.put(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`, { data: item })
        .then((response) => {
          // alert(response.data.message)
          this.$httpMessageState(response, '更新訂單')
          this.getOrders(this.currentPage)
          this.isLoading = false
        })
        .catch((error) => {
          // alert(error.response.data.message)
          this.$httpMessageState(error.response, '錯誤訊息')
          this.isLoading = false
        })
    },
    deleteOrder () {
      this.isLoading = true
      this.$http.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${this.tempOrder.id}`)
        .then((response) => {
          // alert(response.data.message)
          this.$httpMessageState(response, '刪除訂單')
          this.getOrders()
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
