<template>
  <div id="deleteModal" ref="deleteModal" class="modal fade" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 id="deleteModalLabel" class="modal-title">
              <span>刪除後將無法恢復</span>
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body" v-if="item.title">
            是否確認刪除
            <strong class="text-danger">{{ item.title }}</strong> ?
          </div>
          <div class="modal-body" v-else>
            是否確認刪除 訂單編號
            <strong class="text-danger"> {{ item.id }}</strong> ?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">
              取消
            </button>
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="$emit('delete-item')">
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal'

export default {
  name: 'DeleteModal',
  props: ['item'],
  emits: ['delete-item'],
  data () {
    return {
      modal: {}
    }
  },
  mounted () {
    this.modal = new Modal(this.$refs.deleteModal)
  }
}
</script>
