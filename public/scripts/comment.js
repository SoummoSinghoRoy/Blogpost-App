window.onload = function () {
  const comment = document.getElementById('comment');
  const commentHolder = document.getElementById('commentHolder');

  comment.addEventListener('keypress', function(event) {
    if(event.key === 'Enter') {
      if(event.target.value) {
        let postId = comment.dataset.post
        let commentBody = {
          body: event.target.value
        }
        let req = generateReq(`/api/comments/${postId}`, 'POST', commentBody)

        fetch(req)
             .then(response => response.json())
             .then(data => {
              let commentElement = createComment(data)
              commentHolder.insertAdjacentElement('beforebegin', commentElement)
              
              event.target.value = ''
             })
             .catch(err => {
              console.log(err);
              alert(err.response.data.error)
            })
      }else{
        alert('please enter a valid comment')
      }
    }
  })
}

function createComment(comment) {
  let innerHTML = `
    <img src="${comment.user.profilePics}" class="rounded-circle mx-3 my-3" style="width: 40px">
    <div class="media-body my-3">
      <p>${comment.body}</p>
      <div class="my-3">
        <input type="text" class="form-control" name="reply" placeholder="press enter to reply" data-comment=${comment._id}>
      </div> 
    </div>
  `
  let div = document.createElement('div')
  div.className = 'media border'
  div.innerHTML = innerHTML

  return div
}

function generateReq (url, method, body) {
  let headers = new Headers()
  headers.append('Accept', 'Application/JSON')
  headers.append('Content-Type', 'Application/JSON')

  let req = new Request(url, {
    method,
    headers,
    body: JSON.stringify(body),
    mode: 'cors'
  })
  return req
}


// 22.9 Handle Comments From Frontend -- comment er kaj front end theke kora hoyeche ekhane & er script add kora hoyeche singlePostPage.ejs e.