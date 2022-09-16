const flash = require('../utils/Flash');
const Profile = require('../models/Profile');

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
      flashMessage: flash.getMessage(req)
    })
  } catch (error) {
    next(error)
  }
}

exports.createProfilePostController = (req, res, next) => {
  next()
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