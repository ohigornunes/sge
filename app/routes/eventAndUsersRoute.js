var express = require('express')
var router = express.Router()
var eventAndUsersController = require('../controller/eventAndUsersController')

router.get('/email', function (req, res) {
  console.log('EVENTANDUSERSROUTE /EMAIL (GET)')
  eventAndUsersController.email(req, res)
})

router.post('/send-email', function (req, res) {
  console.log('EVENTANDUSERSROUTE /SEND-EMAIL (POST)')
  console.log('>>>>>req', req.body)
  eventAndUsersController.sendEmail(req, res)
})

module.exports = router
