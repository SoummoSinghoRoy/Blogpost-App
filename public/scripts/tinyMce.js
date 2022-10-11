/*window.onload = function () {
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
        method: 'POST',
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
}*/

window.onload = function () {
  tinymce.init({
    selector: "#tiny-mce-post-body",
    plugins: ['a11ychecker', 'advcode', 'advlist', 'lists', 'link', 'checklist', 'autolink', 'autosave', 'code', 'preview', 'searchreplace', 'wordcount', 'media', 'table', 'emoticons', 'image', 'imagetools'],
    toolbar: 'bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media | forecolor backcolor emoticons | code preview',
    height: 400,
    automatic_uploads: true,
    relative_urls: false,
    images_upload_url: '/uploads/postimage',
    images_upload_handler: example_image_upload_handler
  })
}
const example_image_upload_handler = (blobInfo, progress) => new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest();
  xhr.withCredentials = false;
  xhr.open('POST', '/uploads/postimage');

  xhr.upload.onprogress = (e) => {
    progress(e.loaded / e.total * 100);
  };

  xhr.onload = () => {
    if (xhr.status === 403) {
      reject({ message: 'HTTP Error: ' + xhr.status, remove: true });
      return;
    }

    if (xhr.status < 200 || xhr.status >= 300) {
      reject('HTTP Error: ' + xhr.status);
      return;
    }

    const json = JSON.parse(xhr.responseText);

    if (!json || typeof json.imgUrl != 'string') {
      reject('Invalid JSON: ' + xhr.responseText);
      return;
    }

    resolve(json.imgUrl);
  };

  xhr.onerror = () => {
    reject('Image upload failed due to a XHR Transport error. Code: ' + xhr.status);
  };

  const formData = new FormData();
  formData.append('post-img', blobInfo.blob(), blobInfo.filename());

  xhr.send(formData);
});

// note: amra fetch method use korte pari abar xmlhttprequest darao korte pari. most prefer xhr method.

// 20.3 Tiny MCE Front End Setup -- front end script er kaj ta korechi ekhane
// 20.4 Tiny MCE Bachend~backend -- etar kaj kora hoyeche uploadController.js & uploadRoute.js e.