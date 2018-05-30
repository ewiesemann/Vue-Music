<template>
  <div>
    <div class="searchbar">
      <div>
        <form v-on:submit.prevent="findSongs">
          <input type="text" v-model="query">
        </form>
      </div>
      <div class="songs-section">
        <div class="results">
          <h4>Music Search Results {{title}}:</h4>
          <div class="row">
            <songs :list="songs" button-text="Add to playlist" :handle-button-click="addToPlaylist"></songs>
          </div>
        </div>
        <hr>
        <div class="playlist">
          <div class="row">
            <songs :list="playlist" button-text="Remove from playlist" :handle-button-click="removeFromPlaylist"></songs>
          </div>
        </div>
      </div>
    </div>
    
  </div>
  </template>

<script>
  import songs from './songs.vue'
  export default {
    name: 'Home',
    components: {
      songs
    },
    data() {
      return {
        query: '',
        title: '',
      }
    },
    computed: {
      songs() {
        return this.$store.state.songs
      },
      playlist() {
        return this.$store.state.playlist
      },
    },
    methods: {
      findSongs() {
        this.$store.dispatch('findSongs', this.query)
        this.title = this.query
        this.query = ''
      },
      addToPlaylist(song) {
        this.$store.dispatch('addToPlaylist', song)
      },
      removeFromPlaylist(song) {
        this.$store.dispatch('removeFromPlaylist', song)
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .songs-section {
    display: grid;
    grid-template-areas: "results playlist"
  }
  .results {
    grid-area: results
  }
  .playlist {
    grid-area: playlist
  }
  ol {
    list-style-type: none;
  }
</style>