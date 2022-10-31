window.onload = function () {
  const likeBtn = document.getElementById('likeBtn');
  const disLikeBtn = document.getElementById('disLikeBtn');
  
  likeBtn.addEventListener('click', function(event){
    let postId = likeBtn.dataset.post

    reqLikeDislike('likes', postId)
                  .then(response => response.json())
                  .then(data => {
                    let likeText = data.liked ? 'Liked' : 'Like'
                    likeText += `(${data.totalLikes})`
                    let dislikeText = `Dislike (${data.totalDisLikes})`

                    likeBtn.innerHTML = likeText
                    disLikeBtn.innerHTML = dislikeText
                  })
                  .catch(err => {
                    console.log(err);
                    alert(err.response.data.error)
                  })
  })

  disLikeBtn.addEventListener('click', function(event){
    let postId = disLikeBtn.dataset.post

    reqLikeDislike('disLikes', postId)
                  .then(response => response.json())
                  .then(data => {
                    let disLikeText = data.disLiked ? 'Disiked' : 'Dislike'
                    disLikeText += `(${data.totalDisLikes})`
                    let likeText = `Likes (${data.totalLikes})`

                    disLikeBtn.innerHTML = disLikeText
                    likeBtn.innerHTML = likeText
                  })
                  .catch(err => {
                    console.log(err);
                    alert(err.response.data.error)
                  })
  })

  function reqLikeDislike(reactType, postId) {
    let headers = new Headers()
    headers.append('Accept', 'Application/JSON')
    headers.append('Content-Type', 'Application/JSON')

    let req = new Request(`/api/${reactType}/${postId}`, {
      method: 'GET',
      headers,
      mode: 'cors'
    })

    return fetch(req)
  }
}


// 22.8 Like Functionalities Frontend -- like dislike er kaj front theke kora hoyeche ekhane & er script add kora hoyeche singlePostPage.ejs e.