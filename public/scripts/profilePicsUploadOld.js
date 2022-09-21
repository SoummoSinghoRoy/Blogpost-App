/*window.onload = function () {
  let baseCropping = $('#cropped-img').croppie({
    viewport: {
      width: 200, 
      height: 200
    },
    boundry: {
      width: 300,
      height: 300
    },
    showZoomer: true
  })
  function readableFile (file) {
    let reader = new FileReader()
    reader.onload = function(event) {
      baseCropping.croppie('bind', {
        url: event.target.result
      }).then(() => {
        $('.cr-slider').attr({
          'min': 0.5000,
          'max': 1.5000 
        })
      })
    }
    reader.readAsDataURL(file)
  }
  $('#profilePicsFile').on('change', function(event) {
    if(this.files[0]) {
      readableFile(this.files[0])
      $('#crop-modal').modal({
        backdrop: 'static',
        keyboard: false
      })
    }
  })
  $('#cancel-cropping').on('click', function() {
    $('#crop-modal').modal('hide')
    setTimeout(() => {
      baseCropping.croppie('destroy')
    }, 1000)
  })
}*/

// let baseCropping = $('#cropped-img').croppie({
//   viewport: {
//     width: 200, 
//     height: 200
//   },
//   boundry: {
//     width: 300,
//     height: 300
//   },
//   showZoomer: true
// })
// function readableFile (file) {
//   let reader = new FileReader()
//   reader.onload = function(event) {
//     baseCropping.croppie('bind', {
//       url: event.target.result
//     }).then(() => {
//       $('.cr-slider').attr({
//         'min': 0.5000,
//         'max': 1.5000 
//       })
//     })
//   }
//   reader.readAsDataURL(file)
// }
// $('#profilePicsFile').on('change', function(event) {
//   readableFile(this.files[0])
//   $('#crop-modal').modal('show')
// })
// $('#cancel-cropping').on('click', function() {
//   $('#crop-modal').modal('hide')
//   setTimeout(() => {
//     baseCropping.croppie('destroy')
//   }, 1000)
// })

window.onload = function () {
  let baseCropping = $('#cropped-img').croppie({
    viewport: {
      width: 200, 
      height: 200
    },
    boundry: {
      width: 300,
      height: 300
    },
    showZoomer: true
  })
  function readableFile (file) {
    let reader = new FileReader()
    reader.onload = function(event) {
      baseCropping.croppie('bind', {
        url: event.target.result
      }).then(() => {
        $('.cr-slider').attr({
          'min': 0.5000,
          'max': 1.5000 
        })
      })
    }
    reader.readAsDataURL(file)
  }
  $('#profilePicsFile').on('change', function(event) {
    if(this.files[0]) {
     
      $('#crop-modal').modal({
        backdrop: 'static',
        keyboard: false
      })
      readableFile(this.files[0])
    }
  })
  $('#cancel-cropping').on('click', function() {
    $('#crop-modal').modal('hide')
    setTimeout(() => {
      baseCropping.croppie('destroy')
    }, 1000)
  })
}


// 19.4 Setup Croppie JS
