<template>
  <div class="d-flex align-items-center nav-item dropdown">
    <a class="nav-link" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
      <i class="bi bi-person-fill position-absolute top-50 start-50 translate-middle" style="font-size: 2rem"></i>
    </a>
    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
      <li v-if="loggedIn && checkSuccess">
        <router-link to="/admin/products" class="dropdown-item">後台</router-link>
      </li>
      <li>
        <router-link to="/orders" class="dropdown-item">我的訂單</router-link>
      </li>
      <li><hr class="dropdown-divider"></li>
      <li v-if="!loggedIn">
        <router-link to="/Login" class="dropdown-item">登入</router-link>
      </li>
      <li v-if="loggedIn">
        <a href="#" class="dropdown-item" @click.prevent="logOut">登出</a>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  data () {
    return {
      loggedIn: false,
      checkSuccess: false
    }
  },
  methods: {
    checkAdmin () {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1'
      )
      if (token) {
        this.$http.defaults.headers.common.Authorization = token
        this.$http
          .post(`${process.env.VUE_APP_API}/api/user/check`)
          .then(() => {
            this.loggedIn = true
          })
          .catch((error) => {
            // console.dir(error)
            this.$httpMessageState(error.response, '錯誤訊息')
          })
      }
      //  知道這個做法不對，但是想要模擬登入後，顧客和管理員有不同權限的情況
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products`
        )
        .then(() => {
          // console.log('有後台權限')
          this.checkSuccess = true
        })
    },
    logOut () {
      document.cookie = 'hexToken=;expires=;'
      // alert('已登出')
      this.emitter.emit('push-message', {
        style: 'success',
        title: '登出',
        content: '已登出'
      })
      this.loggedIn = false
      this.checkSuccess = false
    }
  },
  mounted () {
    this.checkAdmin()
  }
}
</script>
