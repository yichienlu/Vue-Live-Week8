<template>
  <Loading-component :active="isLoading"></Loading-component>
  <div class="container my-5">
    <h1 class="text-secondary">文章管理</h1>
    <!-- modal -->
    <admin-article-modal :article="tempArticle" :current-page="currentPage" ref="adminArticleModal" @get-articles="getArticles"></admin-article-modal>
    <!-- 刪除modal -->
    <delete-modal :item="tempArticle" ref="deleteModal" @delete-item="deleteArticle"></delete-modal>

    <div class="text-end mt-3">
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#adminArticleModal" @click="tempArticle={isPublic:false,tags:[],create_at: new Date().getTime() / 1000}">
        建立新的貼文
      </button>
    </div>
    <table class="table my-4">
      <thead>
        <tr>
          <th style="width: 200px">標題</th>
          <th style="width: 200px">作者</th>
          <th>描述</th>
          <th style="width: 100px">建立時間</th>
          <th style="width: 100px">是否上架</th>
          <th style="width: 120px">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="article in articles" :key="article.id">
          <td>{{ article.title }}</td>
          <td>{{ article.author }}</td>
          <td>{{ article.description }}</td>
          <td>{{ $filters.date(article.create_at) }}</td>
          <td>
            <span v-if="article.isPublic">已上架</span>
            <span v-else>未上架</span>
          </td>
          <td>
            <div class="btn-group">
              <button type="button" class="btn btn-outline-primary btn-sm" data-bs-toggle="modal"
                data-bs-target="#adminArticleModal" @click="getArticle(article.id)">
                編輯
              </button>
              <button type="button" class="btn btn-outline-danger btn-sm" data-bs-toggle="modal"
                data-bs-target="#deleteModal" @click="openDeleteModal(article)">
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination-component :pages="pagination" @get-items="getArticles"></pagination-component>
  </div>
</template>

<script>
import AdminArticleModal from '@/components/AdminArticleModal.vue'
import DeleteModal from '@/components/DeleteModal.vue'
import PaginationComponent from '@/components/PaginationComponent.vue'

export default {
  data () {
    return {
      articles: [],
      tempArticle: {
        tags: []
      },
      pagination: {},
      currentPage: 1,
      isLoading: false
    }
  },
  components: {
    PaginationComponent,
    AdminArticleModal,
    DeleteModal
  },
  methods: {
    getArticles (page = 1) {
      this.isLoading = true
      this.currentPage = page
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/articles/?page=${page}`)
        .then((response) => {
          this.articles = response.data.articles
          this.pagination = response.data.pagination
          this.isLoading = false
        })
        .catch((error) => {
          // alert(error.response.data.message)
          this.emitter.emit('push-message', {
            title: '連線錯誤',
            style: 'danger',
            content: error.message
          })
          this.isLoading = false
        })
    },
    getArticle (id) {
      this.isLoading = true
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article/${id}`)
        .then((response) => {
          this.tempArticle = JSON.parse(JSON.stringify(response.data.article))
          this.isLoading = false
        })
        .catch((error) => {
          // alert(error.response.data.message)
          this.emitter.emit('push-message', {
            title: '連線錯誤',
            style: 'danger',
            content: error.message
          })
          this.isLoading = false
        })
    },
    openDeleteModal (item) {
      this.isLoading = true
      this.tempArticle = item
      this.isLoading = false
    },
    deleteArticle () {
      this.isLoading = true
      this.$http.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article/${this.tempArticle.id}`)
        .then((response) => {
          // alert(response.data.message)
          this.$httpMessageState(response, '刪除貼文')
          this.getArticles()
          this.isLoading = false
        })
        .catch((error) => {
          // alert(error.response.data.message)
          this.$httpMessageState(error.response, '刪除貼文')
          this.isLoading = false
        })
    }
  },
  mounted () {
    this.getArticles()
  }
}
</script>
