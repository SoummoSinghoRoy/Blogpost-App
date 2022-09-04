exports.dashboardGetController = (req, res, next) => {
  res.render('../views/pages/dashboard/dashboard.ejs', {title: `My Dashboard`})
}

// 15.12 IsAuthenticated Middleware -- etar kaj kora hoyeche authMiddleware er modhye.