<template>
  <div id="adminArticleModal" ref="adminArticleModal" class="modal fade" tabindex="-1" >
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="articleModalLabel" class="modal-title">
            <span v-if="tempArticle.id">編輯貼文</span>
            <span v-else>新增貼文</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  v-model="tempArticle.title"
                  placeholder="請輸入標題"
                />
              </div>
              <div class="mb-3">
                <label for="image" class="form-label">輸入圖片網址</label>
                <input
                  type="text"
                  class="form-control"
                  id="image"
                  v-model="tempArticle.image"
                  placeholder="請輸入圖片連結"
                />
              </div>
              <div class="mb-3">
                <label for="author" class="form-label">作者</label>
                <input
                  type="text"
                  class="form-control"
                  id="author"
                  v-model="tempArticle.author"
                  placeholder="請輸入標題"
                />
              </div>
              <div class="mb-3">
                <label for="create_at">文章建立日期</label>
                <input type="date" class="form-control" id="create_at" v-model="create_at"
                />
              </div>
            </div>
            <div class="col-sm-8">
              <label for="tags" class="form-label">標籤</label>
              <div class="row gx-1 mb-3">
                <div class="col-md-2 mb-1" v-for="(tag, key) in tempArticle.tags" :key="key">
                  <div class="input-group input-group-sm">
                    <input type="text" class="form-control form-control" :id="tag" v-model="tempArticle.tags[key]" placeholder="請輸入標籤"/>
                    <button type="button" class="btn btn-outline-danger" @click="tempArticle.tags.splice(key, 1)">
                      <i class="bi bi-x"></i>
                    </button>
                  </div>
                </div>
                <div class="col-md-2 mb-1">
                  <button
                    class="btn btn-outline-primary btn-sm d-block w-100"
                    @click="tempArticle.tags.push('')" v-if="Array.isArray(tempArticle.tags)">
                    新增標籤
                  </button>
                  <button
                    class="btn btn-outline-primary btn-sm d-block w-100"
                    @click="createTags" v-else>
                    新增標籤
                  </button>
                </div>
              </div>
              <div class="mb-3">
                <label for="description" class="form-label">文章描述</label>
                <textarea
                  type="text"
                  class="form-control"
                  id="description"
                  v-model="tempArticle.description"
                  placeholder="請輸入文章描述"
                ></textarea>
              </div>
              <div class="mb-3">
                <ckeditor
                  :editor="editor"
                  :config="editorConfig"
                  v-model="tempArticle.content"
                ></ckeditor>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="tempArticle.isPublic"
                    id="isPublic"
                  />
                  <label class="form-check-label" for="isPublic">
                    是否公開
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" v-if="tempArticle.id" @click="editArticle">
            確認編輯
          </button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" v-else @click="addArticle">
            確認新增
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import Modal from 'bootstrap/js/dist/modal'
import MyUploadAdapter from '@/libs/myUploadAdapter'

function MyCustomUploadAdapterPlugin (editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => new MyUploadAdapter(loader)
}

export default {
  name: 'AdminArticleModal',
  props: ['article', 'currentPage'],
  data () {
    return {
      modal: {},
      tempArticle: {},
      tags: [],
      create_at: 0,
      // 參考：https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/frameworks/vuejs-v3.html#editor
      editor: ClassicEditor,
      editorConfig: {
        toolbar: {
          items: [
            'heading',
            'bold',
            'italic',
            'link',
            '|',
            'undo',
            'redo'
          ]
        },
        extraPlugins: [MyCustomUploadAdapterPlugin]
      }
    }
  },
  watch: {
    article () {
      this.tempArticle = this.article;
      [this.create_at] = new Date(this.tempArticle.create_at * 1000)
        .toISOString()
        .split('T')
    },
    create_at () {
      this.tempArticle.create_at = Math.floor(new Date(this.create_at) / 1000)
    }
  },
  methods: {
    addArticle () {
      this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article`, { data: this.tempArticle })
        .then((response) => {
          // alert(response.data.message)
          this.$httpMessageState(response, '新增貼文')
          this.$emit('get-articles', this.currentPage)
        })
        .catch((error) => {
          // alert(error.response.data.message)
          this.$httpMessageState(error.response, '錯誤訊息')
        })
    },
    editArticle () {
      this.$http.put(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article/${this.tempArticle.id}`, { data: this.tempArticle })
        .then((response) => {
          // alert(response.data.message)
          this.$httpMessageState(response, '更新貼文')
          this.$emit('get-articles', this.currentPage)
        })
        .catch((error) => {
          // alert(error.response.data.message)
          this.$httpMessageState(error.response, '錯誤訊息')
        })
    },
    createTags () {
      this.tempArticle.tags = []
      this.tempArticle.tags.push('')
    }
  },
  mounted () {
    this.modal = new Modal(this.$refs.adminArticleModal)
  }
}
</script>
