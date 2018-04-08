var express = require('express')
var router = express.Router()
var userController = require('../controller/userController')
// var User = require('../models/userModel')

router.get('/register', function (req, res) {
  console.log('USERROUTE /REGISTER (GET)')
  userController.register(req, res)
})

router.post('/add-user', function (req, res) {
  console.log('USERROUTE /REGISTER REGISTERVIEW (POST)')
  userController.addUser(req, res)
})

router.get('/users', function (req, res) {
  console.log('USERROUTE /USERS (GET)')
  userController.getAllUsers(req, res)
})

router.post('/auth', function (req, res) {
  console.log('USERROUTE /AUTH (POST)')
  userController.auth(req, res)
})

router.get('/log-out', function (req, res) {
  console.log('USERROUTE /LOG-OUT (GET)')
  userController.logOut(req, res)
})

router.get('/turn-admin', function (req, res) {
  console.log('USERROUTE /TURNADMIN (GET)')
  userController.turnAdmin(req, res)
})

router.get('/turn-user', function (req, res) {
  console.log('USERROUTE /TURNUSER (GET)')
  userController.turnUser(req, res)
})

router.get('/delete-user', function (req, res) {
  console.log('USERROUTE /DELETEUSER (GET)')
  userController.deleteUser(req, res)
})

router.get('/enroll-user', function (req, res) {
  console.log('USERROUTE /ENROLLUSER (GET)')
  userController.enrollUser(req, res)
})

module.exports = router

// // Users GET
// router.pos('/users', function (req, res) {
//   console.log('IndexRoute /users (GET)')
//   userController.getAllUsers(req, res)
// })

// // User POST
// router.post('/user', function (req, res) {
//   console.log('IndexRoute /user userView (POST)')
//   User.create(req.body).then(function (user) {
//     res.send(user)
//   }).catch()
// })

// // User PUT
// router.put('/user/:id', function (req, res) {
//   console.log('IndexRoute /user/:id userView (PUT)')
//   console.log('ID passado = ', req.params.id)
//   User.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function () {
//     User.findOne({ _id: req.params.id }).then(function (user) {
//       res.send(user)
//     })
//   })
// })

// // User DELETE
// router.delete('/user/:id', function (req, res) {
//   console.log('IndexRoute /user/:id userView (delete)')
//   console.log('ID passado = ', req.params.id)
//   User.findByIdAndRemove({ _id: req.params.id }).then(function (user) {
//     res.send(user)
//   })
// })

