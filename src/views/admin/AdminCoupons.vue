<template>
  <Loading-component :active="isLoading"></Loading-component>
  <div class="container my-5">
    <h1 class="text-secondary">優惠券管理</h1>
        <!-- 產品modal -->
    <coupon-modal :coupon="tempCoupon" :current-page="currentPage" ref="CouponModal" @get-coupons="getCoupons"></coupon-modal>
    <!-- 刪除modal -->
    <delete-modal :item="tempCoupon" ref="deleteModal" @delete-item="deleteCoupon"></delete-modal>

    <div class="text-end mt-3">
      <button class="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#couponModal" @click="tempCoupon={due_date: new Date().getTime() / 1000, is_enabled:0}">
        建立新的優惠券
      </button>
    </div>
    <table class="table mt-4">
      <thead>
      <tr>
        <th>名稱</th>
        <th>折扣百分比</th>
        <th>到期日</th>
        <th>是否啟用</th>
        <th>編輯</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(coupon, key) in coupons" :key="key">
        <td>{{ coupon.title }}</td>
        <td>{{ coupon.percent }}%</td>
        <td>{{ $filters.date(coupon.due_date) }}
        </td>
        <td>
          <span v-if="coupon.is_enabled === 1" class="text-success">啟用</span>
          <span v-else class="text-muted">未啟用</span>
        </td>
        <td>
          <div class="btn-group">
            <button type="button" class="btn btn-outline-primary btn-sm" data-bs-toggle="modal"
              data-bs-target="#couponModal" @click="openCouponModal(coupon)">
              編輯
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm" data-bs-toggle="modal"
              data-bs-target="#deleteModal" @click="openDeleteModal(coupon)">
              刪除
            </button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
    <pagination-component :pages="pagination" @get-items="getCoupons"></pagination-component>
  </div>
</template>

<script>
import CouponModal from '@/components/CouponModal.vue'
import DeleteModal from '@/components/DeleteModal.vue'
import PaginationComponent from '@/components/PaginationComponent.vue'

export default {
  data () {
    return {
      coupons: [],
      tempCoupon: {
      },
      pagination: {},
      currentPage: 1,
      isLoading: false
    }
  },
  components: {
    PaginationComponent,
    CouponModal,
    DeleteModal
  },
  methods: {
    getCoupons (page = 1) {
      this.isLoading = true
      this.currentPage = page
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupons/?page=${page}`)
        .then((response) => {
          this.coupons = response.data.coupons
          this.pagination = response.data.pagination
          this.isLoading = false
        })
        .catch((error) => {
          // alert(error.response.data.message)
          this.$httpMessageState(error.response, '錯誤訊息')
          this.isLoading = false
        })
    },
    openCouponModal (item) {
      this.isLoading = true
      this.tempCoupon = JSON.parse(JSON.stringify(item))
      this.isLoading = false
    },
    openDeleteModal (item) {
      this.isLoading = true
      this.tempCoupon = item
      this.isLoading = false
    },
    deleteCoupon () {
      this.isLoading = true
      this.$http.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`)
        .then((response) => {
          // alert(response.data.message)
          this.$httpMessageState(response, '刪除優惠券')
          this.getCoupons()
          this.isLoading = false
        })
        .catch((error) => {
          // alert(error.response.data.message)
          this.$httpMessageState(error.response, '刪除優惠券')
          this.isLoading = false
        })
    }
  },
  mounted () {
    this.getCoupons()
  }
}
</script>
