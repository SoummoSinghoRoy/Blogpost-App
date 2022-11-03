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
              console.log(err.message);
              alert(err.message)
            })
      }else{
        alert('please enter a valid comment')
      }
    }
  })
  commentHolder.addEventListener('keypress', function(event) {
    if(commentHolder.hasChildNodes(event.target)) {
      if(event.key === 'Enter') {
        let commentId = event.target.dataset.comment
        let replyValue = event.target.value
        if(replyValue) {
          let data = {
            body: replyValue
          }
          let req = generateReq(`/api/comments/replies/${commentId}`, 'POST', data)

          fetch(req)
              .then(response => response.json())
              .then(replydata => {
                let replyElement = createReplyElement(replydata)
                let parent = event.target.parentElement
                parent.previousElementSibling.appendChild(replyElement)
                event.target.value = ''
              })
              .catch(err => {
                console.log(err.message);
                alert(err.message)
              })
        }else{
          alert('submit a valid comment as a reply')
        }
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

function createReplyElement (reply) {
  let innerHTML = `
  <img src="${reply.profilePics}" class="align-self-start me-3 rounded-circle" style="width: 40px;">
  <div class="media-body">
    <p>${reply.body}</p>
  </div>
  `
  let div = document.createElement('div')
  div.className = 'media mt-3'
  div.innerHTML = innerHTML

  return div
}

// 22.9 Handle Comments From Frontend -- comment er kaj front end theke kora hoyeche ekhane & er script add kora hoyeche singlePostPage.ejs e.
// 22.10 Reply Comment from Frontend -- etar kaj ei file ei kora hoyeche jehetu comment er under e theke reply comment kaj korbe.
// 22.11 Create Search Backend -- etar kaj kora hoyeche models --> post.js e.