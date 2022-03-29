<template>
  <div class="toast-container position-fixed top-0 end-0"  style="z-index: 1500">
    <div class="toast show" :class="`toast${key}`" role="alert" aria-live="assertive" aria-atomic="true" v-for="(msg,key) in messages" :key="key">
      <div class="toast-header">
        <span :class="`bg-${msg.style}`"
          class="p-2 rounded me-2 d-inline-block"
        ></span>
        <strong class="me-auto">{{ msg.title }}</strong>
        <button type="button" class="btn-close" data-bs-dismiss="toast" @click="clearToast(key)" aria-label="Close"></button>
      </div>
      <div class="toast-body" v-if="msg.content">
        {{ msg.content }}
      </div>
    </div>
  </div>
</template>

<script>
// import emitter from '@/libs/emitter'

export default {
  data () {
    return {
      messages: []
    }
  },
  inject: ['emitter'],
  methods: {
    toastShow () {
      setTimeout(() => {
        this.messages.shift()
      }, 5000)
    },
    clearToast (index) {
      this.messages.splice(index, 1)
    }
  },
  mounted () {
    this.emitter.on('push-message', (message) => {
      const { style = 'success', title, content } = message
      this.messages.push({ style, title, content })
      this.toastShow()
    })
  }
}
</script>
