// @flow
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var userController = require('../controller/userController')
// var eventAndUsersController = require('../controller/eventController')
// var eventController = require('../controller/eventController')
var objectId = require('mongodb').ObjectId
var multer = require('multer')
var path = require('path')
var fs = require('fs')

// Model Events
var EventSchema = new Schema({
  owner_id: { type: Number },
  event_name: { type: String, required: [true, 'O nome do evento é obrigatório!'] },
  sponsor_name: { type: String, required: [true, 'O nome do responsável é obrigatório!'] },
  date_initial: { type: Date, required: [true, 'A data inicial é obrigatória!'] },
  date_final: { type: Date, required: [true, 'A data final é obrigatória!'] },
  hour_initial: { type: String, required: [true, 'A hora inicial é obrigatória!'] },
  hour_final: { type: String, required: [true, 'A hora do final é obrigatória!'] },
  qtd_total: { type: Number, required: [true, 'A hora do final é obrigatória!'] },
  event_acquisition: { type: String },
  event_type: { type: String, required: [true, 'O tipo do evento é obrigatório!'] },
  event_iframe: { type: String },
  description: { type: String, required: [true, 'A descrição é necessária!'] },
  qtd_remained: { type: Number },
  users_enrolled: [{ type: String }],
  user_current_enrolled: { type: Boolean, default: false },
  created_at: { type: Date, required: true, default: Date.now }
})

// EventSchema.methods.updateUserCurrentEnrolled = function (req, res, userIdStr) {
//   console.log('EVENTMODEL .UPDATEUSERCURRENTENROLLED')
//   // Event.findByIdAndUpdate({ users_enrolled: objectId(userId) }, {$set: { user_current_enrolled: true }})
//   // Event.update({}, { $eq: { users_enrolled: userIdStr }, $set: { user_current_enrolled: true } })
//   Event.update({ users_enrolled: { $in: [userIdStr] } }, { $set: { user_current_enrolled: true } })
//     .then(function (results) {
//       console.log('====>>> Usuario corrente foi atualizado com os eventos', results)
//       console.log('EVENTMODEL .EVENTCONTROLLER.GETALLEVENTS')
//       res.redirect('/home')
//     })
//     .catch(function (err) {
//       console.log(err)
//     })
// }

EventSchema.methods.enrollEvent = function (req, res, eventIdStr, userIdStr) {
  console.log('EVENTMODEL .ENROLLEVENT')
  Event.findByIdAndUpdate({ _id: objectId(eventIdStr) }, { $push: { users_enrolled: userIdStr }, $inc: { qtd_remained: -1 } })
    .then(function (result) {
      console.log('===>>>> Cadastrado ID do usuário no evento')
      var eventName = result.event_name
      var userEmail = req.session.user_current.email
      console.log('===>>>> userEmail', userEmail)
      userController.enrollUser(req, res, eventIdStr, userIdStr, eventName, userEmail)
    })
    .catch(function (err) {
      console.log(err)
    })
  // mongoose.connection.close()
}

EventSchema.methods.unenrollEvent = function (req, res, eventIdStr, userIdStr) {
  console.log('EVENTMODEL .UNENROLLEVENT')
  Event.update({ _id: objectId(eventIdStr) }, { $pull: { users_enrolled: userIdStr }, $inc: { qtd_remained: +1 } })
    .then(function (result) {
      console.log('===>>>> Descadastrado ID do usuário no evento')
      console.log('===>>>> result', result.event_name)
      var eventName = result.event_name
      userController.enrollUser(req, res, eventIdStr, userIdStr, eventName)
    })
    .catch(function (err) {
      console.log(err)
    })
  // mongoose.connection.close()
}

// EventSchema.methods.enrollEvent = function (req, res, eventIdStr, userIdStr) {
//   console.log('EVENTMODEL .ENROLLEVENT')
//   EventAndUsersModel.findByIdAndUpdate({ _id: objectId(eventIdStr) }, { $push: { users_enrolled: userIdStr }, $inc: { qtd_remained: -1 } })
//     .then(function (result) {
//       console.log('===>>>> Cadastrado ID do usuário no evento')
//       userController.enrollUser(req, res, eventIdStr)
//     })
//     .catch(function (err) {
//       console.log(err)
//     })
// }

EventSchema.methods.addEvent = function (req, res, event, ownerEmail) {
  console.log('EVENTMODEL .ADDEVENT')
  Event.create(event)
    .then(function (result) {
      console.log('EVENTO CADASTRADO: ', result)
      res.redirect('home')
    })
    .catch(function (err) {
      console.log(err)
      console.log('EVENTMODEL .ADDEVENT .RENDER EVENTVIEW')
      res.render('eventView')
    })
}

EventSchema.methods.addEventFiles = function (req, res, filePath) {
  console.log('EVENTMODEL .ADDEVENTFILES')
  Event.find({})
    .then(function (results) {
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath)
      }

      var storage = multer.diskStorage({
        destination: filePath,
        filename: function (req, file, cb) {
          // cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
          cb(null, Date.now() + '-' + file.originalname)
        }
      })

      var upload = multer({
        storage: storage,
        limits: { fileSize: 10000000000 }
      }).single('filename')

      upload(req, res, (err) => {
        if (err) {
          console.log('deu ruim', err)
        } else {
          console.log('deu bom', req.file)
        }
      })

      req.session.user_current.msg_added_event = true
      console.log('EVENTMODEL .ADDEVENT .RENDER HOMEVIEW')
      console.log('>>>>>>>>find events')
      res.render('homeView', { user_current: req.session.user_current, events: results })
    })
    .catch(function (err) {
      console.log(err)
    })
}

EventSchema.methods.removeEvent = function (req, res, eventId) {
  console.log('EVENTMODEL .REMOVEEVENT')
  Event.findByIdAndRemove({ _id: eventId })
    .then(function (result) {
      Event.find({})
        .then(function (results) {
          console.log('EVENTMODEL .REMOVEEVENT .RENDER HOMEVIEW')
          res.render('homeView', { user_current: req.session.user_current, events: results })
        })
        .catch(function (err) {
          console.log(err)
        })
    })
    .catch(function (err) {
      console.log(err)
    })
  // mongoose.connection.close()
}

EventSchema.methods.getMyEvents = function (req, res, userId) {
  console.log('EVENTMODEL .GETMYEVENTS')
  console.log('>>> userId', userId)
  Event.find({ users_enrolled: userId })
    .then(function (results) {
      console.log('EVENTMODEL .GETMYEVENTS .RENDER HOMEVIEW')
      console.log('EVENTOS INSCRITOS: ', results)
      if (results.length > 0) {
        req.session.user_current.msg_my_events = true
        req.session.user_current.all_events = results
      }
      console.log('EVENTMODEL .GETMYEVENTS .RENDER /COURSEVIEW')
      res.render('courseView', { user_current: req.session.user_current, events: results })
    })
    .catch(function (err) {
      console.log(err)
    })
  // mongoose.connection.close()
}

EventSchema.methods.getEventDetail = function (req, res, eventId) {
  console.log('EVENTMODEL .GETEVENTDETAIL')
  Event.findOne({ _id: eventId })
    .then(function (result) {
      console.log('EVENTMODEL .GETEVENTDETAIL .RENDER EVENTDETAILVIEW')
      console.log('>>> Evento:', result)
      req.session.user_current.event_id = eventId
      res.render('eventDetailView', { user_current: req.session.user_current, event: result })
    })
    .catch(function (err) {
      console.log(err)
    })
  // mongoose.connection.close()
}

EventSchema.methods.getAllEvents = function (req, res) {
  console.log('EVENTMODEL .GETALLEVENTS')
  Event.find({})
    .then(function (results) {
      req.session.all_events = results
      console.log('EVENTMODEL .GETALLEVENTS .REDIRECT /HOME')
      res.render('homeView', { user_current: req.session.user_current, events: req.session.all_events })
      // res.redirect('/home')
    })
    .catch(function (err) {
      console.log(err)
    })
}

EventSchema.methods.updateHome = function (req, res) {
  console.log('EVENTMODEL .UPDATEHOME')
  Event.find({})
    .then(function (results) {
      req.session.user_current.msg_user_enroll_success = true
      res.render('homeView', { user_current: req.session.user_current, events: results })
    })
    .catch(function (err) {
      console.log(err)
    })
  // mongoose.connection.close()
}

var Event = mongoose.model('events', EventSchema)
module.exports = Event
