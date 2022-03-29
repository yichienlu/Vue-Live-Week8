<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-secondary">
    <div class="container-fluid">
      <router-link to="/admin/products" class="navbar-brand fw-bold">
        <span class="dancing text-white">Eden Handmade</span> 後台管理
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link to="/admin/products" class="nav-link link-light">商品管理</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/orders" class="nav-link link-light">訂單管理</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/coupons" class="nav-link link-light">優惠券管理</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/articles" class="nav-link link-light">文章管理</router-link>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" class="nav-link">回前台</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/404" class="nav-link link-light">404 頁面</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <router-view v-if="checkSuccess"></router-view>
</template>

<script>
// 驗證
export default {
  data () {
    return {
      checkSuccess: false
    }
  },
  methods: {
    checkAdmin () {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
      if (token) {
        this.$http.defaults.headers.common.Authorization = token

        this.$http.post(`${process.env.VUE_APP_API}/api/user/check`)
          .then(() => {
            this.checkSuccess = true
          })
          .catch((error) => {
            // alert(error.response.data.message)
            this.$httpMessageState(error.response, '錯誤訊息')
            this.$router.push('/login')
          }
          )
      } else {
        // alert('您尚未登入')
        this.emitter.emit('push-message', {
          style: 'success',
          title: '錯誤訊息',
          content: '您尚未登入'
        })
        this.$router.push('/login')
      }
    }
  },
  mounted () {
    this.checkAdmin()
  }
}
</script>
