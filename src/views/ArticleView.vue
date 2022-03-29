<template>
  <Loading-component :active="isLoading"></Loading-component>
  <div class="container">
    <div class="row justify-content-around">
      <div class="col-md-4 border img-cover" style="background-image:url('https://images.unsplash.com/photo-1618840392854-0adfa1a86798?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')">
        <div class="d-block d-lg-none" style="height: 200px"></div>
      </div>
      <div class="col-md-8 col-lg-6 my-4 my-lg-5">
        <h1 class="fw-bold text-center mb-4 mb-lg-5">最新消息 <span class="dancing h2 text-secondary fw-bold">News</span></h1>
          <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><router-link to="/articles">最新消息</router-link></li>
            <li class="breadcrumb-item active" aria-current="page">{{ article.title }}</li>
          </ol>
        </nav>
        <div class="row justify-content-center">
          <article class="col">
            <h2>{{ article.title }}</h2>
            <p>
              <small class="text-muted">{{ $filters.date(article.create_at) }}</small>
            </p>
            <img :src="article.imageUrl" alt="" class="img-fluid mb-3">
            <div v-html="article.content"></div>
            <small class="text-muted">{{ article.author }}</small>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      article: {},
      isLoading: false
    }
  },
  methods: {
    getArticle () {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/article/${this.$route.params.articleId}`
      this.$http.get(api).then((response) => {
        this.article = response.data.article
        this.isLoading = false
      }).catch((error) => {
        // alert(error.response.data.message)
        this.$httpMessageState(error.response, '錯誤訊息')
        this.isLoading = false
      })
    }
  },
  created () {
    this.getArticle()
  }
}
</script>
