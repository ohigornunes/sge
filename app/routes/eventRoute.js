var express = require('express')
var router = express.Router()
var eventController = require('../controller/eventController')

// Event GET
router.get('/event', function (req, res) {
  console.log('EVENTROUTE /NEW-EVENT (GET)')
  eventController.event(req, res)
})

// Event POST
router.post('/add-event', function (req, res) {
  console.log('EVENTROUTE /ADD-EVENT (POST)')
  eventController.addEvent(req, res)
})

// Event GET
router.get('/enroll-event', function (req, res) {
  console.log('EVENTROUTE /ENROLL-EVENT (GET)')
  eventController.enrollEvent(req, res)
})

router.get('/unenroll-event', function (req, res) {
  console.log('UNEVENTROUTE /ENROLL-EVENT (GET)')
  eventController.unenrollEvent(req, res)
})

// Event chamada interna
router.get('/get-all-events', function (req, res) {
  console.log('EVENTROUTE /GET-ALL-EVENTS (GET)')
  eventController.getAllEvents(req, res)
})

router.get('/remove-event', function (req, res) {
  console.log('EVENTROUTE /REMOVE-EVENT (GET)')
  eventController.removeEvent(req, res)
})

router.get('/get-events-detail', function (req, res) {
  console.log('EVENTROUTE /GET-EVENTS-DETAIL (GET)')
  eventController.getEventDetail(req, res)
})

router.get('/add-event-files', function (req, res) {
  console.log('EVENTROUTE /ADDEVENTFILE (GET)')
  req.session.filePath = './app/public/uploads/' + req.query.event_id
  res.render('event2View')
})

router.post('/add-event-files', function (req, res) {
  console.log('EVENTROUTE /ADDEVENTFILE (POST)')
  var filePath = req.session.filePath
  eventController.addEventFiles(req, res, filePath)
})

module.exports = router
