console.log('SERVER.JS')

var express = require('express')
var bodyParser = require('body-parser')
var expressSession = require('express-session')
var routes = require('../app/routes/indexRoute')
var dbConnection = require('./dbConnection.js')

// Express
var app = express()

// Setar DB com dbConnection
app.set(dbConnection)

// Midlewares
app.use(express.static('./app/public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Setar as variáveis 'view engine' e 'views' do express */
app.set('view engine', 'ejs')
app.set('views', './app/view')

/* configurar o middleware express-session */
app.use(expressSession({
  secret: 'bfgrhf09rtyuio0cmjheri20q',
  resave: false,
  saveUninitialized: false
}))

// Rotas
app.use(routes)

// error handling middleware
// app.use(function (err, req, res, next) {
//   console.log(err)
//   res.status(422).send({ error: err.message })
// })

module.exports = app
