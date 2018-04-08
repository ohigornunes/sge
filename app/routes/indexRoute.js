var express = require('express')
var router = express.Router()
var indexController = require('../controller/indexController')

// Index
router.get('/', function (req, res) {
  console.log('INDEX / (GET)')
  indexController.index(req, res)
})

router.use(require('./homeRoute'))
router.use(require('./userRoute'))
router.use(require('./eventRoute'))
router.use(require('./eventAndUsersRoute'))
router.use(require('./courseRoute'))
// console.log('Carregou as seguintes rotas: home, user, event, email.')
// router.use(require('./registerRoute'))

module.exports = router
