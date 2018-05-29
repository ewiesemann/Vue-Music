var router = require('express').Router()
var Playlist = require('../models/playlist')

//Get
//Find by Id
router.get('mongoApi/playlists/:id?', (req, res) => {
  if (req.params.id) {
    Playlist.findById(req.params.id)
      .then(playlist => {
        return res.send(playlist)
      })
      .catch(err => {
        return res.status(404).send({ 'error': 'No playlist at that Id' })
      })
  }
  //If no id find all
  Playlist.find({})
    .then(playlist => {
      return res.send(playlist)
    })
    .catch(err => {
      return res.status(404).send({err})
    })
})

//Post
//Create new Playlist
router.post('/mongoApi/playlists', (req, res) => {
  Playlist.create(req.body)
    .then(newPlaylist => {
      return res.send(newPlaylist)
    })
    .catch(err => {
      return res.status(400).send(err)
    })
})

//Put
//Add a song
router.put('/mongoApi/playlists/:id/songs', (req, res) => {
  Playlist.findById(req.params.id)
    .then(function(playlist){
      playlist.songs.addToSet(req.body)
      playlist.save()
      res.send(playlist)
    })
    .catch(err => {
      return res.status(400).send(err)
    })
})

//Update entire song array from entire playlist
router.put('/mongoApi/playlists/:id', (req, res) => {
  Playlist.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(playlist => {
      res.send(playlist)
    })
    .catch(err => {
      return res.status(400).send(err)
    })
})


//Delete
router.delete('/mongoApi/playlists/:id', (req, res, next) => {
  Playlist.findByIdAndRemove(req.params.id)
    .then(oldPlaylist => {
      res.send("Successfully Deleted")
    })
    .catch(err => {
      res.status(400).send(err)
    })

})

module.exports = {router}