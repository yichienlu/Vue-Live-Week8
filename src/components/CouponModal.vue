<template>
  <div class="modal fade" id="couponModal" tabindex="-1" ref="couponModal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span v-if="tempCoupon.id">編輯優惠券</span>
            <span v-else>新增優惠券</span>
          </h5>
          <button type="button" class="btn-close"
                  data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="title">標題</label>
            <input type="text" class="form-control" id="title" v-model="tempCoupon.title"
                   placeholder="請輸入標題">
          </div>
          <div class="mb-3">
            <label for="coupon_code">優惠碼</label>
            <input type="text" class="form-control" id="coupon_code" v-model="tempCoupon.code"
                   placeholder="請輸入優惠碼">
          </div>
          <div class="mb-3">
            <label for="due_date">到期日</label>
            <input type="date" class="form-control" id="due_date"
                   v-model="due_date">
          </div>
          <div class="mb-3">
            <label for="price">折扣百分比</label>
            <input type="number" class="form-control" id="price"
            min="0" v-model.number="tempCoupon.percent" placeholder="請輸入折扣百分比">
          </div>
          <div class="mb-3">
            <div class="form-check">
              <input id="is_enabled" class="form-check-input" type="checkbox" :true-value="1" :false-value="0" v-model="tempCoupon.is_enabled">
              <label class="form-check-label" for="is_enabled">是否啟用</label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" v-if="tempCoupon.id" @click="editCoupon">
            確認編輯
          </button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" v-else @click="addCoupon">
            確認新增
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal'

export default {
  name: 'CouponModal',
  emits: ['get-coupons'],
  props: {
    coupon: {}
  },
  data () {
    return {
      modal: {},
      tempCoupon: {},
      due_date: ''
    }
  },
  watch: {
    coupon () {
      this.tempCoupon = this.coupon
      const dateAndTime = new Date(this.tempCoupon.due_date * 1000)
        .toISOString().split('T');
      [this.due_date] = dateAndTime
    },
    due_date () {
      this.tempCoupon.due_date = Math.floor(new Date(this.due_date) / 1000)
    }
  },
  methods: {
    addCoupon () {
      this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon`, { data: this.tempCoupon })
        .then((response) => {
          // alert(response.data.message)
          this.$httpMessageState(response, '新增優惠券')
          this.$emit('get-coupons', this.currentPage)
        })
        .catch((error) => {
          // alert(error.response.data.message)
          this.$httpMessageState(error.response, '錯誤訊息')
        })
    },
    editCoupon () {
      this.$http.put(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`, { data: this.tempCoupon })
        .then((response) => {
          // alert(response.data.message)
          this.$httpMessageState(response, '編輯優惠券')
          this.$emit('get-coupons', this.currentPage)
        })
        .catch((error) => {
          // alert(error.response.data.message)
          this.$httpMessageState(error.response, '錯誤訊息')
        })
    }
  },
  mounted () {
    this.modal = new Modal(this.$refs.couponModal)
  }
}
</script>
