// @flow
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var helper = require('sendgrid').mail
var async = require('async')
// var objectId = require('mongodb').ObjectId()

// Model Events
var EventAndUsersSchema = new Schema({
  event_id: { type: String },
  event_name: { type: String },
  users_id_enrolled: [{ type: String }],
  users_name_enrolled: [{ type: String }],
  users_email_enrolled: [{ type: String }]
})

// findOneAndUpdate({ _id: id }, { $set: { user_type: 'user' } })

EventAndUsersSchema.methods.addEventAndUsers = function (req, res, eventIdStr, userIdStr, eventName, userEmail) {
  console.log('EVENTANDUSERMODEL .ADDEVENTANDUSER')
  EventAndUsers.findOneAndUpdate(
    { event_id: eventIdStr },
    { $set: { event_name: eventName },
      $push: { users_id_enrolled: userIdStr, users_email_enrolled: userEmail, users_name_enrolled: req.session.user_current.first_name } },
    { upsert: true })
    .then(function (result) {
      console.log('>>> Atualizou o Doc: ', result)
    })
    .catch(function (err) {
      console.log('>>> Erro: ', err)
    })
  // mongoose.connection.close()
}

EventAndUsersSchema.methods.email = function (req, res, eventIdStr) {
  console.log('EVENTANDUSERMODEL .EMAIL')
  console.log('>>> eventIdStr', eventIdStr)
  EventAndUsers.findOne({ event_id: eventIdStr })
    .then(function (result) {
      console.log('>>> Achou o Doc: ', result)
      console.log('EVENTANDUSERMODEL .RENDER EMAILVIEW')
      res.render('emailView', {event: result})
    })
    .catch(function (err) {
      console.log('>>> Erro: ', err)
    })
  // mongoose.connection.close()
}

EventAndUsersSchema.methods.sendEmail = function (req, res, eventId) {
  console.log('EVENTANDUSERMODEL .SENDEMAIL')
  console.log('eventId', eventId)
  EventAndUsers.findOne({ event_id: eventId })
    .then(function (results) {
      var message = req.body.message
      console.log('>>>>>> email', req.session.user_current.email)
      async.parallel([
        function (callback) {
          sendEmail(
            callback,
            req.session.user_current.email,
            results.users_email_enrolled,
            req.body.subject,
            'Text Content',
            `<p style="font-size: 28px;"> ${message} </p>`
          )
        }
      ], function (err, results) {
        if (err) {
          console.log(err)
        } else {
          console.log({ success: true,
            message: 'Emails enviados com com sucesso!', 
            successfulEmails: results[0].successfulEmails,
            errorEmails: results[0].errorEmails
          })
          req.session.user_current.msg_sended_email_all = true
          res.redirect('/home')
        }
      })

      function sendEmail(parentCallback, fromEmail, toEmails, subject, textContent, htmlContent) {
        const errorEmails = []
        const successfulEmails = []
        const sg = require('sendgrid')('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')
        async.parallel([
          function (callback) {
            // Add to emails
            for (var i = 0; i < toEmails.length; i += 1) {
              // Add from emails
              const senderEmail = new helper.Email(fromEmail)
              // Add to email
              const toEmail = new helper.Email(toEmails[i])
              // HTML Content
              const content = new helper.Content('text/html', htmlContent)
              const mail = new helper.Mail(senderEmail, subject, toEmail, content)
              var request = sg.emptyRequest({
                method: 'POST',
                path: '/v3/mail/send',
                body: mail.toJSON()
              })
              sg.API(request, function (error, response) {
                console.log('SendGrid')
                if (error) {
                  console.log('Error response received')
                }
                console.log(response.statusCode)
                console.log(response.body)
                console.log(response.headers)
              })
            }
            // return
            callback(null, true)
          }
        ], function (err, results) {
          if (err) {
            console.log(err)
          } else {
            console.log('Done')
          }
        })
        parentCallback(null,
          {
            successfulEmails: successfulEmails,
            errorEmails: errorEmails
          }
        )
      }
    })
    .catch(function (err) {
      console.log(err)
    })
  // mongoose.connection.close()
}

var EventAndUsers = mongoose.model('event_and_users', EventAndUsersSchema)
module.exports = EventAndUsers

// console.log('achou um err ===>>>', err)
// var eventAndUser = { event_id: eventIdStr, users_id_enrolled: [] }
// var EventNewDoc = new EventAndUsers(eventAndUser)
// EventNewDoc.save(function (err) {
//   console.log(err)
// })
// console.log('Doc salvo')
// EventAndUsers.update({ event_id: eventIdStr }, { $push: { users_id_enrolled: userIdStr } })
//   .then(function (result) {
//     console.log('Doc atulizado ===>>>', result)
//   })
//   .catch(function (err) {
//     console.log('Erro ao Atualizar documento: ', err)
//   })

// mongoose.connection.db.listCollections({ name: 'event_and_users' })
//   .next(function (err, collinfo) {
//     if (err) {
//       console.log(err)
//     } else {
//       console.log('Existe====>', collinfo)
//       console.log('achou um eventAndUsersExist===>>>', eventAndUsersExist)
//     }
//   })

// EventAndUsers.update({ event_id: eventIdStr }, { $push: { users_id_enrolled: userIdStr } })
//   .then(function (result) {
//     console.log('Atualizou doc===>>>', result)
//   })
//   .catch(function (err) {
//     console.log('Erro ao Atualizar documento: ', err)
//   })

//   eventAndUser = JSON.stringify(eventAndUser)
//   console.log(eventAndUser)
//   EventAndUsers.create({ })
//     .then(function (results) {
//       console.log('deu certo?', results)
//     })
//     .catch(function (err) {
//       console.log(err)
//     })
// }
