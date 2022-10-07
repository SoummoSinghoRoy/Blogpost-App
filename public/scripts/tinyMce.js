window.onload = function () {
  tinymce.init({
    selector: "#tiny-mce-post-body",
    plugins: ['a11ychecker', 'advcode', 'advlist', 'lists', 'link', 'checklist', 'autolink', 'autosave', 'code', 'preview', 'searchreplace', 'wordcount', 'media', 'table', 'emoticons', 'image', 'imagetools'],
    toolbar: 'bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media | forecolor backcolor emoticons | code preview',
    height: 400,
    automatic_uploads: true,
    images_upload_url: '/uploads/postimage', // form er action ba jekhan theke pic ba file upload controller er kaj hobe sei url.
    images_upload_handler: function (blobInfo, success, failure) {
      let headers = new Headers()
      headers.append('Accept', 'Application/JSON')

      let formData = new FormData();
      formData.append('post-img', blobInfo.blob(), blobInfo.filename())

      let req = new Request('/uploads/postimage', {
        method: 'post',
        headers,
        mode:'cors',
        body: formData
      })

      fetch(req)
          .then(res => res.json())
          .then(data => success(data.imgUrl))
          .catch(error => failure(error))

    }
  })
}

// 20.3 Tiny MCE Front End Setup -- front end script er kaj ta korechi ekhane
// next start from here