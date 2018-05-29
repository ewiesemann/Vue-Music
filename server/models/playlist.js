let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let schemaName = 'playlist'

let song = new Schema({
    title: {type: String, required: true},
    albumArt: {type: String, required: true},
    artist: {type: String, required: true},
    preview: {type: String, required: true},
    price: {type: String, required: true}
})

let playlist = new Schema({
    title: {type: String, required: true},
    song: [song]
})



playlist.pre('save', function(next){
    this.markModified('songs')
    next()
})


module.exports = mongoose.model(schemaName, playlist)