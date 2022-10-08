const Flash = require('../utils/Flash');
const { validationResult } = require('express-validator');
const errorFormatter = require('../utils/validationErrorFormatter');

exports.createBlogPost_GetController = (req, res, next) => {
  res.render('../views/pages/dashboard/post/createPost.ejs', {
    title: 'Create a new post',
    error: {},
    value: {},
    flashMessage: Flash.getMessage(req)
  })
}

exports.createBlogPost_PostController = (req, res, next) => {
  
  let {title, body, tags} = req.body

  let errors = validationResult(req).formatWith(errorFormatter)
  if(!errors.isEmpty()) {
    req.flash('fail', 'Something wrong!')
    return res.render('../views/pages/dashboard/post/createPost.ejs', {
      title: 'Create a new post',
      error: errors.mapped(),
      value: { title, body, tags },
      flashMessage: Flash.getMessage(req)
    })
  }
  res.render('../views/pages/dashboard/post/createPost.ejs', {
    title: 'Create a new post',
    error: {},
    flashMessage: Flash.getMessage(req)
  })
}

// 20.2 Create Post Template -- handle all controller for post feature in here.
// 20.3 Tiny MCE Front End Setup -- etar kaj korechi createPost.ejs & public --> script --> tineMce.js file e.
// 20.5 Post Validation -- createBlogPost_PostController theke postValidation er error handle kora hoyeche.
// 20.6 Error Handling -- createBlogPost_PostController er modhye error handle kora hoyeche.
// next start from here