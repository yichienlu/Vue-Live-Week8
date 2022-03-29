<template>
  <div class="bg-light d-flex justify-content-center align-items-center" style="height: 100vh">
    <div>
      <h1 class="text-center dancing fw-bold text-secondary mb-5">Eden Handmade</h1>
      <h2 class="text-center mb-3">請登入帳號</h2>
      <form id="form" class="form-signin mx-auto" @submit.prevent="login" style="width: 240px">
        <div class="form-floating mb-3">
          <input type="email" class="form-control" id="username" placeholder="name@example.com" required autofocus
            v-model="user.username">
          <label for="username">電子信箱</label>
        </div>
        <div class="form-floating">
          <input type="password" class="form-control" id="password" placeholder="Password" required
            v-model="user.password">
          <label for="password">密碼</label>
        </div>
        <button class="btn btn-lg btn-secondary text-white w-100 mt-3" type="submit" id="loginBtn">
          登入
        </button>
      </form>
    </div>

  </div>

</template>

<script>
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      this.$http.post(`${process.env.VUE_APP_API}/admin/signin`, this.user)
        .then((response) => {
          const { token, expired } = response.data
          document.cookie = `hexToken = ${token}; expires=${new Date(expired)}`
          // alert(response.data.message)
          this.$httpMessageState(response, '登入')
          this.$router.go(-1)
        })
        .catch((error) => {
          // alert(error.response.data.message + ': \n' + error.response.data.error.message)
          this.$httpMessageState(error.response, '登入')
        })
    }
  }
}
</script>
