const Flash = require('../utils/Flash');

exports.createBlogPost_GetController = (req, res, next) => {
  res.render('../views/pages/dashboard/post/createPost.ejs', {
    title: 'Create a new post',
    error: {},
    flashMessage: Flash.getMessage(req)
  })
}

exports.createBlogPost_PostController = (req, res, next) => {
  res.render('../views/pages/dashboard/post/createPost.ejs', {
    title: 'Create a new post',
    error: {},
    flashMessage: Flash.getMessage(req)
  })
}

// 20.2 Create Post Template -- handle all controller for post feature in here.