var router = require('express').Router()
var Playlists = require('../models/playlist')
var Users = require('../models/user')

router.get('mongoApi/playlists', (req, res, next) =>{
    Playlists.find({})
    .then(playlists => {
        res.status(200).send(playlists)
    })
    .catch(err => {
        res.status(400).send(err)
    })
})

router.post('/mongoApi/playlists', (req, res, next) => {
    var playlist = req.body
    Playlists.create(playlist)
      .then(newPlaylist => {
        res.status(200).send(newPlaylist)
      })
      .catch(err => {
        res.status(400).send(err)
      })
  })

  router.delete('/mongoApi/playlists', (req, res, next)=>{
    Playlists.findByIdAndRemove(req.params.id)
      .then(data=>{
        res.send("Successfully Deleted Playlists")
      })
      .catch(err => {
        res.status(400).send(err)
      })
  })

  module.exports = {
    router
  }