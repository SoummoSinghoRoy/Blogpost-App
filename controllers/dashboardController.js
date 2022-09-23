const { validationResult} = require('express-validator');
const errorFormatter = require('../utils/validationErrorFormatter');
const flash = require('../utils/Flash');
const Profile = require('../models/Profile');
const User = require('../models/User');

exports.dashboardGetController = async (req, res, next) => {
  try {
    let profile = await Profile.findOne({user: req.user._id})

    if(profile) {
      return res.render('../views/pages/dashboard/dashboard.ejs', 
      {
        title: `My Dashboard`,
        flashMessage: flash.getMessage(req)
      })
    }
    res.redirect('/dashboard/create-profile')
  } catch (error) {
    next(error)
  }
}

exports.createProfileGetController = async (req, res, next) => {
  try {
    let profile = await Profile.findOne({user: req.user._id})

    if(profile) {
      return res.redirect('/dashboard/edit-profile')
    }
    res.render('pages/dashboard/create-profile.ejs', 
      {
        title: `Create Your Profile`,
        flashMessage: flash.getMessage(req),
        error: {} 
      })

  } catch (error) {
    next(error)
  }
}

exports.createProfilePostController = async (req, res, next) => {

  let { name, title, bio, website, facebook, twitter, userGithub  } = req.body
  let errors = validationResult(req).formatWith(errorFormatter)
  
  if(!errors.isEmpty()) {

    return res.render('../views/pages/dashboard/create-profile', { 
      title: 'Create Your Profile', 
      error: errors.mapped(), 
      flashMessage: flash.getMessage(req)
    })
    
  }

  try {

    let existUser = await User.findOne({user: req.user._id})
    let userProfilePics = `/uploads/${req.file.filename}`

    if(existUser) {
      let profile = new Profile({
        user:  req.user._id,
        name,
        title,
        bio,
        profilePics: userProfilePics,
        links: {
          website: website || '',
          facebook: facebook || '',
          twitter: twitter || '',
          userGithub: userGithub || ''
        },
        posts: [],
        bookmarks: []
      })

      let createdProfile = await profile.save()
      await User.findOneAndUpdate(
        { _id: req.user._id },
        {$set: {profile: createdProfile._id} }
      )
      req.flash('success', 'profile created successfully')
      res.redirect('/dashboard')
    }
    await User.findOneAndUpdate(
      { _id: req.user._id },
      {$set: {profilePics: userProfilePics} }
    )
    
    res.render('../views/pages/dashboard/create-profile', { 
      title: 'Create Your Profile', 
      flashMessage: flash.getMessage(req),
      error: {}
    })
    
  } catch (error) {
    next(error)
  }
}

exports.editProfileGetController = (req, res, next) => {
  next()
}

exports.editProfilePostController = (req, res, next) => {
  next()
}

// 15.12 IsAuthenticated Middleware -- etar kaj kora hoyeche authMiddleware er modhye.

// 19.1 Conditionally Render Dashboard or Profile -- ei file e & dashboardRoter.js e kaj koechi.
// 19.2 Create Profile Template -- ekhane controller e kaj korechi, dashboardRote.js & views -> pages -> dashboard er modhye edit-profile.ejs r create-profile.ejs e kaj korechi
// 19.3 Upload Controller and Routes -- etar kaj korechi controller -> uploadController.js e.

// 19.5 Upload Profile Pics -- etar video lecture ta dekhechi jehetu croppie niye kaj korte parini tai profile pic upload er kaj ta createProfilePostController er modhye onyovabe korechi. ami korechi muloto jokhon ekjon user profile create er jonyo data dibe tar sathey pic ta store hobe db te. 

// 19.6 Remove Profile Pics -- ei video theke jante parbo kivabe db model theke file data remove houyar sathe sathe upload directiory theke file ta delete kora jai.
// 19.7 Validate Profile -- ekhane create profile er form validation kora hoyeche. etar jonyo kaj korechi validator folder er modhye dashboard folder er profileValidator.js file e.

// 19.9 Save Profile Data -- 
