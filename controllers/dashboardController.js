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
    res.redirect('/uploads/profile-pics')
  } catch (error) {
    next(error)
  }
}


exports.createProfileGetController = async (req, res, next) => {
  try {
    let defaultPics = "/uploads/default.png"
    let user = await User.findOne({_id: req.user._id })

    if(user.profilePics === defaultPics) {
      return res.redirect('/uploads/profile-pics')
    }

    let profile = await Profile.findOne({user: req.user._id})

    if(profile) {
      return res.redirect('/dashboard')
    }
    res.render('pages/dashboard/create-profile.ejs', 
      {
        title: `Create a profile`,
        flashMessage: flash.getMessage(req),
        error: {} 
      })

  } catch (error) {
    next(error)
  }
}

exports.createProfilePostController = async (req, res, next) => {

  let errors = validationResult(req).formatWith(errorFormatter)
  
  if(!errors.isEmpty()) {

    return res.render('../views/pages/dashboard/create-profile', { 
      title: 'Create a profile', 
      error: errors.mapped(), 
      flashMessage: flash.getMessage(req)
    })
    
  }

  let { name, title, bio, website, facebook, twitter, userGithub  } = req.body

  try {

    let existUser = await User.findOne({user: req.user._id})

    if(existUser) {
      let profile = new Profile({
        user:  req.user._id,
        name,
        title,
        bio,
        profilePics: req.user.profilePics,
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
        {$set: { profile: createdProfile._id } }
      )
      req.flash('success', 'profile created successfully')
      res.redirect('/dashboard')
    }
    
    res.render('../views/pages/dashboard/create-profile', { 
      title: 'Create a profile', 
      flashMessage: flash.getMessage(req),
      error: {}
    })
    
  } catch (error) {
    next(error)
  }
}

exports.editProfileGetController = async (req, res, next) => {
  try {

    let profile = await Profile.findOne({user: req.user._id})

    if(!profile) {
      return res.redirect('/dashboard/create-profile')
    }

    res.render('../views/pages/dashboard/edit-profile.ejs', {
      title: 'Edit your profile', 
      profile,
      flashMessage: flash.getMessage(req),
      error: {} 
    })

  } catch (error) {
    next(error)
  }
}

exports.editProfilePostController = async (req, res, next) => {

  let { name, title, bio, website, facebook, twitter, userGithub  } = req.body

  let errors = validationResult(req).formatWith(errorFormatter)


  if(!errors.isEmpty()) {

    return res.render('../views/pages/dashboard/edit-profile', { 
      title: 'Edit your profile', 
      error: errors.mapped(), 
      flashMessage: flash.getMessage(req),
      profile: {
        name, title, bio, 
        links: {
          website,
          facebook,
          twitter,
          userGithub
        },
      }
    })
  }

  try {
    
    let profile = {
      name,
      title,
      bio,
      links: {
        website: website || '',
        facebook: facebook || '',
        twitter: twitter || '',
        userGithub: userGithub || ''
      }
    }

    let updatedProfile = await Profile.findOneAndUpdate(
      { user: req.user._id },
      { $set: profile },
      { new: true }
    )

    req.flash('success', 'profile updated successfully')
    res.render('../views/pages/dashboard/edit-profile.ejs', {
      title: 'Edit your profile', 
      flashMessage: flash.getMessage(req),
      error: {},
      profile: updatedProfile 
    })

  } catch (error) {
    next(error)
  }
}


// 15.12 IsAuthenticated Middleware -- etar kaj kora hoyeche authMiddleware er modhye.

// 19.1 Conditionally Render Dashboard or Profile -- ei file e & dashboardRoter.js e kaj koechi.
// 19.2 Create Profile Template -- ekhane controller e kaj korechi, dashboardRote.js & views -> pages -> dashboard er modhye edit-profile.ejs r create-profile.ejs e kaj korechi
// 19.3 Upload Controller and Routes -- etar kaj korechi controller -> uploadController.js e.

// 19.5 Upload Profile Pics -- etar video lecture ta dekhechi jehetu croppie niye kaj korte parini tai profile pic upload er kaj ta createProfilePostController er modhye onyovabe korechi. ami korechi muloto jokhon ekjon user profile create er jonyo data dibe tar sathey pic ta store hobe db te. 

// 19.6 Remove Profile Pics -- ei video theke jante parbo kivabe db model theke file data remove houyar sathe sathe upload directiory theke file ta delete kora jai.
// 19.7 Validate Profile -- ekhane create profile er form validation kora hoyeche. etar jonyo kaj korechi validator folder er modhye dashboard folder er profileValidator.js file e.

// 19.9 Save Profile Data -- ekhane mouloto profile pic + data eksathe save kora hocche createProfilePostController theke. kintu lecture e ektu vinno vabe kaj kora. 
// 19.10 Edit Profile Template -- etar kaj korechi edit-profile.ejs, editProfileGetController & etar route er modhye.
// 19.12 Bug Fixing -- ei lecture ta jodio ami jevabe profile niye kaj korechi tar sathe somprikto na tobuo porobortite emon kono kaj korle kaje lagbe.

/* projecter structural ekta change enechi stack learner ek rokom koreche but ami profile pic uploader por profile create korte diyechi. er por ekjon user profile delete korte chaile ki hobe tar jonyo kaj korte hobe ebong tar sathe upload folder theke tar pic ta jeno delete hoye jai profile delete korar sathe sei kajtio korte hobe. */ 

// 20.1 Intro -- work with post feature & sidebar
// 20.2 Create Post Template -- etar kaj korechi views --> pages --> dashboard --> post --> createPost.ejs e, route handle korechi routes --> postRoute.js e.
