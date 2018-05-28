let router = require ('express').Router();
let Users = require ('../models/user');
let session = require ('./session')

let loginError = new Error('Bad Email or Password')

router.post('/auth/register', (req, res) => {
    if (req.body.password.length < 7) {
      return res.status(400).send({
        error: 'Password must be at least 7 characters'
      })
    }

    req.body.password = Users.generateHash(req.body.password)
    Users.create(req.body)
      .then(user => {
        delete user._doc.password
        req.session.uid = user._id
        res.send(user)
      })
      .catch(err => {
        res.status(400).send(err)
      })
  })

  router.post('/auth/login', (req, res) => {
    Users.findOne({
        email: req.body.email
      })
      .then(user => {
        if (!user) {
          return res.status(400).send(loginError)
        }
        if (!user.validatePassword(req.body.password)) {
          return res.status(400).send(loginError)
        }
        delete user._doc.password
        req.session.uid = user._id
        res.send(user)
      }).catch(err => {
        res.status(400).send(loginError)
      })
  })
  
  router.delete('/auth/logout', (req, res) => {
    req.session.destroy(err => {
      if (err) {
        return res.send(err)
      }
      return res.send({
        message: 'Logout Successful'
      })
    })
  })

  module.exports = {
    router,
    session
  }