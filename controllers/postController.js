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

exports.editPostGetController = async (req, res, next) => {
  let postId = req.params.postId

  try {
    let post = await Post.findOne({author: req.user._id, _id: postId })

    if(!post) {
      let error = new Error('4O4 not found')
      error.status = 404
      throw error
    }

    res.render('../views/pages/dashboard/post/editPost.ejs', {
      title: 'Edit a post',
      error: {},
      flashMessage: Flash.getMessage(req),
      post
    })
  } catch (error) {
    next(error)
  }
}

exports.editPost_PostController = async (req, res, next) => {
  let {title, body, tags} = req.body
  let postId = req.params.postId

  let errors = validationResult(req).formatWith(errorFormatter)

  try {
    let post = await Post.findOne({author: req.user._id, _id: postId })
    if(!post) {
      let error = new Error('4O4 not found')
      error.status = 404
      throw error
    }

    if(!errors.isEmpty()) {
      req.flash('fail', 'Something wrong!')
      return res.render('../views/pages/dashboard/post/editPost.ejs', {
        title: 'Edit a post',
        error: errors.mapped(),
        post,
        flashMessage: Flash.getMessage(req)
      })
    }
  
    if(tags) {
      tags = tags.split(',')
      tags = tags.map(tag => tag.trim())
    }

    let thumbnail = post.thumbnail
    if(req.file) {
      thumbnail = `/uploads/${req.file.filename}`
    }

    await Post.findOneAndUpdate(
      {id: post._id},
      {$set: {title, body, tags, thumbnail}},
      {new: true}
    )
    req.flash('success', 'post updated successfully')
    res.redirect('/posts/edit/' + post._id)

  } catch (error) {
    next(error)
  }
}

exports.deletePostController = async (req, res, next) => {
  let {postId} = req.params

  try {
    let post = await Post.findOne({author: req.user._id, _id: postId})

    if(!post) {
      let error = new Error('404 not found')
      error.status = 404
      throw error
    }
    await Post.findOneAndDelete({_id: postId})
    await Profile.findOneAndUpdate(
      {user: req.user._id},
      {$pull: {'posts': post._id}}
    )
    req.flash('success', 'post deleted successfully')
    res.redirect('/posts')

  } catch (error) {
    next(error)
  }
}

exports.getAllPostController = async (req, res, next) => {
  try {
    let posts = await Post.find({author: req.user._id})

    res.render('../views/pages/dashboard/post/posts.ejs', {
      title: 'All Posts',
      posts,
      flashMessage: Flash.getMessage(req)
    })
  } catch (error) {
    next(error)
  }
}

// 20.2 Create Post Template -- handle all controller for post feature in here.
// 20.3 Tiny MCE Front End Setup -- etar kaj korechi createPost.ejs & public --> script --> tineMce.js file e.
// 20.5 Post Validation -- createBlogPost_PostController theke postValidation er error handle kora hoyeche.
// 20.6 Error Handling -- createBlogPost_PostController er modhye error handle kora hoyeche.
// 20.7 Create Post Controller -- etar kaj korechi createBlogPost_PostController e & postRoute e.
// 20.8 Post Create Testing -- post create korar somoy kono error thakle seta handle kora hoyeche ei lecture e. 
// 20.9 Edit Post Template -- etar jonyo views --> pages --> dashboard --> post --> editPost.ejs e, post controller er modhye editPostGetController, postRoute e kaj kora hoyeche.
// 20.10 Update Post -- etar kaj kora hoyeche editPost_PostController.
// 20.11 Test Our Edit Functionality -- ekhane test kora hoyeche & postRoute e kaj kora hoyeche.
// 20.12 Delete Post -- etar kaj kora hoyeche editPost.ejs, deletePostController e & postRoute e
// 20.13 Get All My Posts -- posts.ejs e, getAllPostController, postRoute e.
