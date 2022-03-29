<template>
  <div class="container">
    <div class="row justify-content-around">
      <div class="col-md-4 border img-cover" style="background-image:url('https://images.unsplash.com/photo-1612800083273-24ea5c80313d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80')">
        <div class="d-block d-lg-none" style="height: 200px"></div>
      </div>
      <div class="col-md-8 col-lg-6 my-4 my-lg-5">
        <h1 class="fw-bold text-center mb-4 mb-lg-5">最新消息 <span class="dancing h2 text-secondary fw-bold">News</span></h1>
        <div class="accordion" id="accordionExample">
          <template v-for="article in articles" :key="article.id">
            <div class="accordion-item">
              <h2 class="accordion-header" :key="article.id">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="`#collapse${article.id}`" aria-expanded="true" :aria-controls="`collapse${article.id}`">
                  <small>{{ $filters.date(article.create_at) }} - </small>
                  <span>{{ article.title }}</span>
                </button>
              </h2>
              <div
                :id="`collapse${article.id}`" class="accordion-collapse collapse show" :aria-labelledby="`heading${article.id}`" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  <p>{{ article.description }}</p>
                  <router-link
                  :to="`/articles/${article.id}`"
                  v-if="article.isPublic">
                  詳細內容
                </router-link>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <pagination-component :pages="pagination" @get-items="getArticles"></pagination-component>
  </div>
</template>

<script>
import PaginationComponent from '@/components/PaginationComponent.vue'

export default {
  data () {
    return {
      articles: [],
      tempArticle: {},
      pagination: {},
      isLoading: false
    }
  },
  components: {
    PaginationComponent
  },
  methods: {
    getArticles (page = 1) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/articles?page=${page}`
      this.$http.get(api).then((response) => {
        this.articles = response.data.articles
        this.pagination = response.data.pagination
        this.isLoading = false
      }).catch((error) => {
        // alert(error.response.data.message)
        this.$httpMessageState(error.response, '錯誤訊息')
        this.isLoading = false
      })
    }
  },
  created () {
    this.getArticles()
  }
}
</script>
