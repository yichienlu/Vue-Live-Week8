import axios from 'axios'

class MyUploadAdapter {
  constructor (loader) {
    // The file loader instance to use during the upload.
    this.loader = loader
  }

  // Starts the upload process.
  upload () {
    const formData = new FormData()
    return new Promise((resolve) => {
      this.loader.file
        .then((loadFile) => {
          formData.append('file-to-upload', loadFile)
          return axios.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/upload`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
        }).then((response) => {
          resolve({
            default: response.data.imageUrl
          })
        })
    })
  }

  // Aborts the upload process.
  abort () {
    if (this.xhr) {
      this.xhr.abort()
    }
  }

  // Prepares the data and sends the request.
  _sendRequest (file) {
    // Prepare the form data.
    const data = new FormData()

    data.append('upload', file)

    // Important note: This is the right place to implement security mechanisms
    // like authentication and CSRF protection. For instance, you can use
    // XMLHttpRequest.setRequestHeader() to set the request headers containing
    // the CSRF token generated earlier by your application.

    // Send the request.
    this.xhr.send(data)
  }
}

// ...

// function MyCustomUploadAdapterPlugin (editor) {
//   editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
//     // Configure the URL to the upload script in your back-end here!
//     return new MyUploadAdapter(loader)
//   }
// }

// // ...

// ClassicEditor.create(document.querySelector('#editor'), {
//   extraPlugins: [MyCustomUploadAdapterPlugin]

//   // ...
// })
//   .catch(error => {
//     console.log(error)
//   })

export default MyUploadAdapter
