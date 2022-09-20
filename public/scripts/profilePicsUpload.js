/*let profilePicsFile = document.getElementById('profilePicsFile');

let picPreview = document.getElementById('profilePicsPreview');

profilePicsFile.addEventListener('change', function () {
  const uploadFile = this.files[0]
  if(uploadFile) {
    let reader = new FileReader();
    reader.addEventListener('load', function () {
      picPreview.setAttribute("src", this.result)
    })
    reader.readAsDataURL(uploadFile)
  }
})*/

let profilePicsFile = document.getElementById('profilePicsFile');
let picPreview = document.getElementById('profilePicsPreview');
let alertBox = document.getElementById('alertBox');

profilePicsFile.addEventListener('change', function () {
  const uploadedFile = this.files[0]
  if(uploadedFile) {
    let reader = new FileReader();
    reader.addEventListener('load', function(event) {
      let image = new Image();
      image.src = event.target.result
      image.onload = function () {
        const anotherThis = profilePicsFile
        const uploadedFileSize = anotherThis.files[0].size / 1024
        const maxFileSize = 1024 * 2
        let height = this.height;
        let width = this.width;
        let _this = reader
        if (height > 200 || width > 200 || uploadedFileSize > maxFileSize) {
          alertBox.innerHTML = `uploader image must be less then 200px * 200px & size must be less then 2mb`
          alertBox.style.cssText = ` 
          color: red;
          font-weight: bold;`
          return false
        } else {
          picPreview.setAttribute("src", _this.result)
          alertBox.innerHTML = `Attached Successfully`
          alertBox.style.cssText = ` 
          color: green;
          font-weight: bold;`
          return true
        }
      }
    })
    reader.readAsDataURL(uploadedFile)
  }
})