var express = require('express')
var router = express.Router()
var homeController = require('../controller/homeController')

// Home GET
router.get('/home', function (req, res) {
  console.log('INDEXROUTE HOMEVIEW (GET)')
  homeController.home(req, res)
})

module.exports = router
