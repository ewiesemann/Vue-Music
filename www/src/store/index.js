import vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
import router from '../router'
import store from '../store'

vue.use(vuex)

var mongoApi = axios.create({
    baseURL: 'mongodb://student:student@ds016298.mlab.com:16298/musicvue',
    timeout: 3000
})

var musicApi = axios.create({
    baseURL: 'https://itunes.apple.com/',
    timeout: 3000
})


function swapUrlSize(url, pixels) {
    var sizeString = `${pixels}x${pixels}`;
    var newURL = url.replace("60x60", sizeString);
    return newURL;
}

export default new vuex.Store({
    state: {
        playlist: [],
        songs: []
    },
    mutations: {
        addSongs(state, songs) {
            state.songs = songs
        },
        addToPlaylist(state, song) {
            state.playlist.push(song)
        },
        removeFromPlaylist(state, indexToRemove) {
            state.playlist.splice(indexToRemove, 1)
        }
    },
    actions: {
        addToPlaylist({ commit, dispatch, state }, song) {
            commit('addToPlaylist', song)
    
        },
        findSongs({ commit, dispatch }, query) {
            musicApi.get('search?media=music&term=' + query)
                .then(res => {
                    var songList = res.data.results.map(function (song) {
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

        removeFromPlaylist({ dispatch, commit, state }, song) {
            var index = state.playlist.findIndex(s => s.id == song.id)
            commit('removeFromPlaylist', index)

        }
    }

})