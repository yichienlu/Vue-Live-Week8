<template>
  <Loading-component :active="isLoading"></Loading-component>
  <div class="container my-5">
    <h1 class="text-secondary">商品管理</h1>
    <!-- 產品modal -->
    <admin-product-modal :product="tempProduct" :current-page="currentPage" ref="adminProductModal" @get-products="getProducts"></admin-product-modal>
    <!-- 刪除modal -->
    <delete-modal :item="tempProduct" ref="deleteModal" @delete-item="deleteProduct"></delete-modal>

    <div class="text-end mt-3">
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#adminProductModal" @click="tempProduct={imagesUrl:[],is_enabled:0}">
        建立新的產品
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">
            分類
          </th>
          <th>產品名稱</th>
          <th width="120">
            原價
          </th>
          <th width="120">
            售價
          </th>
          <th width="100">
            是否啟用
          </th>
          <th width="120">
            編輯
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-end">{{ item.origin_price }}</td>
          <td class="text-end">{{ item.price }}</td>
          <td>
            <span class="text-success" v-if="item.is_enabled">啟用</span>
            <span class="text-secondary" v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button type="button" class="btn btn-outline-primary btn-sm" data-bs-toggle="modal"
                data-bs-target="#adminProductModal" @click="openAdminProductModal(item)">
                編輯
              </button>
              <button type="button" class="btn btn-outline-danger btn-sm" data-bs-toggle="modal"
                data-bs-target="#deleteModal" @click="openDeleteModal(item)">
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination-component :pages="pagination" @get-items="getProducts"></pagination-component>
  </div>
</template>

<script>
import AdminProductModal from '@/components/AdminProductModal.vue'
import DeleteModal from '@/components/DeleteModal.vue'
import PaginationComponent from '@/components/PaginationComponent.vue'
import emitter from '@/libs/emitter'

export default {
  data () {
    return {
      products: [],
      tempProduct: {
        imagesUrl: []
      },
      pagination: {},
      currentPage: 1,
      isLoading: false
    }
  },
  components: {
    PaginationComponent,
    AdminProductModal,
    DeleteModal
  },
  methods: {
    getProducts (page = 1) {
      this.isLoading = true
      this.currentPage = page
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products/?page=${page}`)
        .then((response) => {
          this.isLoading = false
          this.products = response.data.products
          this.pagination = response.data.pagination
          emitter.emit('get-products')
        })
        .catch((error) => {
          this.isLoading = false
          // alert(error.response.data.message)
          this.$httpMessageState(error.response, '錯誤訊息')
        })
    },
    openAdminProductModal (item) {
      this.isLoading = true
      this.tempProduct = JSON.parse(JSON.stringify(item))
      this.isLoading = false
    },
    openDeleteModal (item) {
      this.isLoading = true
      this.tempProduct = item
      this.isLoading = false
    },
    deleteProduct () {
      this.isLoading = true
      this.$http.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`)
        .then((response) => {
          // alert(response.data.message)
          this.$httpMessageState(response, '刪除商品')
          this.getProducts()
          this.isLoading = false
        })
        .catch((error) => {
          // alert(error.response.data.message)
          this.$httpMessageState(error.response, '刪除商品')
          this.isLoading = false
        })
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>
