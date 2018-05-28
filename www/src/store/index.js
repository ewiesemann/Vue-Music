import vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
import router from '../router'
import store from '../store'

vue.use(vuex)

var api=axios.create({
    baseURL:'mongodb://student:student@ds016298.mlab.com:16298/musicvue',
    timeout: 3000
})

var musicApi=axios.create({
    baseURL: 'https://itunes.apple.com/',    
    timeout: 3000
})



export default new vuex.Store({
    state:{
        playlist:[],
        songs:[]
    },
    mutations:{
        addToPlaylist(state, song){
            state.playlist.push(song)
          },
          removeFromPlaylist(state, indexToRemove){
            state.playlist.splice(indexToRemove, 1)
          },
          addSongs(state, songs){
            state.songs = songs
          }
          // setActiveSong(state, song){
          //   state.activeSong = song
          // }
    },
    actions:{
        addToPlaylist({commit, dispatch, state}, song){
            commit('addToPlaylist', song)
            router.push({name: 'song'})
          },
          findSongs({commit, dispatch}, query){
            api.get('search?media=music&term=' + query)
              .then(res=> {
                var songList = res.data.results.map(function (song){ 
                  return {
                  title: song.trackName,
                  albumArt: swapUrlSize(song.artworkUrl60, 275),
                  artist: song.artistName,
                  preview: song.previewUrl
                  };
                })
            
                commit('addSongs', songList)
              })
          },
          getTracks() { },
          addTrack() { },
          removeTrack() { },
          promoteTrack() { },
          demoteTrack() { }
        }
      })