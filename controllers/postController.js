const Flash = require('../utils/Flash');
const { validationResult } = require('express-validator');
const errorFormatter = require('../utils/validationErrorFormatter');
const readingTime = require('reading-time');
const Post = require('../models/Post');
const Profile = require('../models/Profile');

exports.createBlogPost_GetController = (req, res, next) => {
  res.render('../views/pages/dashboard/post/createPost.ejs', {
    title: 'Create a new post',
    error: {},
    value: {},
    flashMessage: Flash.getMessage(req)
  })
}

exports.createBlogPost_PostController = async (req, res, next) => {
  
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

  if(tags) {
    tags = tags.split(',')
    tags = tags.map(tag => tag.trim())
  }

  let readTime = readingTime(body).text

  const post = new Post({
    title,
    body,
    tags,
    author: req.user._id,
    thumbnail: '',
    readTime,
    likes: [],
    dislikes: [],
    comments: []
  })

  if(req.file) {
    post.thumbnail = `/uploads/${req.file.filename}`
  }

  try {

    let createdPost = await post.save()
    await Profile.findOneAndUpdate(
      { user: req.user._id },
      { $push: {'posts' : createdPost._id} }
      )
    
    req.flash('success', 'post created successfully')
    return res.redirect(`/posts/edit/${createdPost._id}`)

  } catch(error) {
    next(error)
  }
}

// 20.2 Create Post Template -- handle all controller for post feature in here.
// 20.3 Tiny MCE Front End Setup -- etar kaj korechi createPost.ejs & public --> script --> tineMce.js file e.
// 20.5 Post Validation -- createBlogPost_PostController theke postValidation er error handle kora hoyeche.
// 20.6 Error Handling -- createBlogPost_PostController er modhye error handle kora hoyeche.
// 20.7 Create Post Controller -- etar kaj korechi createBlogPost_PostController e & postRoute e.
// 20.8 Post Create Testing -- post create korar somoy kono error thakle seta handle kora hoyeche ei lecture e. 