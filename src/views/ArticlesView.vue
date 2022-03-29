<template>
  <div class="container my-5">
    <Loading-component :active="isLoading"></Loading-component>
    <h1>PetPet 資訊站</h1>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 my-4">
      <template v-for="article in articles" :key="article.id">
        <div class="col" v-if="article.isPublic">
          <div class="card">
            <img :src="article.imageUrl" class="card-img-top" />
            <div class="card-body">
              <h5 class="card-title">{{ article.title }}</h5>
              <p>{{ article.description }}</p>
            </div>
            <div class="card-footer text-center">
              <router-link
                :to="`/articles/${article.id}`"
                v-if="article.isPublic"
                class="btn btn-outline-primary">
                文章頁面
              </router-link>
            </div>
          </div>
        </div>
      </template>
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
