var express = require('express')
var router = express.Router()
var courseController = require('../controller/courseController')
var eventController = require('../controller/eventController')

router.get('/get-my-events', function (req, res) {
  console.log('COURSEROUTE /MY-EVENTS (GET)')
  courseController.getMyEvents(req, res)
})

router.get('/go-to-event', function (req, res) {
  console.log('COURSEROUTE /GOTOEVENTS (GET)')
  courseController.goToEvent(req, res)
})

module.exports = router
