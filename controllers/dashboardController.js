const {validationResult} = require('express-validator');
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
    res.render('pages/dashboard/create-profile', {
      title: 'Create A Profile',
      error: {}, 
      flashMessage: flash.getMessage(req)
    })
  } catch (error) {
    next(error)
  }
}

exports.createProfilePostController = async (req, res, next) => {
  let { name, title, bio, website, facebook, twitter, userGithub  } = req.body
  let userProfilePics = `/uploads/${req.file.filename}`

  let errors = validationResult(req).formatWith(errorFormatter)
  if(!errors.isEmpty()) {
    req.flash('fail', 'Something wrong! check your form')
    return res.render('/pages/dashboard/create-profile', { 
      title: 'Create a new accont', 
      error: errors.mapped(), 
      value: {
        name, title, bio, profilePic, website, facebook, twitter, userGithub
      },
      flashMessage: flash.getMessage(req)
    })
  }

  try {

    let existUser = await User.findOne({user: req.user._id})

    if(existUser) {
      let profile = new Profile({
        user: existUser,
        name,
        title,
        bio,
        profilePic: userProfilePics,
        website,
        facebook,
        twitter,
        userGithub
      })

      await profile.save()
    }
    await User.findOneAndUpdate(
      { _id: req.user._id },
      {$set: {profilePics: userProfilePics} }
    )
    res.status(200).json({
      userProfilePics
    })
    res.render('/pages/dashboard/create-profile', {title: 'Create Your Profile', flashMessage: flash.getMessage(req)})
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

// / 19.5 Upload Profile Pics -- etar video lecture ta dekhechi jehetu croppie niye kaj korte parini tai profile pic upload er kaj ta createProfilePostController er modhye onyovabe korechi. ami korechi muloto jokhon ekjon user profile create er jonyo data dibe tar sathey pic ta store hobe db te. 

// ekhono etar kaj baki ache. muloto ekjon user tar profile create korar por ta ke kothay redirect korano hobe seta niye kaj korte hobe. abar form validation o korte hobe.