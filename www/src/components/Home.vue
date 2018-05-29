<template>
  <div>
    <!-- 
    <div class="login" v-if="!user._id">
      <button @click="sForm=1">Sign In</button>
      <button @click="sForm=2">Sign Up</button>
      <div v-if="sForm==1">
        <form v-on:submit.prevent="getUser">
          <input type="text" name="name" placeholder="Enter User Name" v-model="tuser.name">
          <button type="submit">Submit</button>
        </form>
      </div>
      <div v-if="sForm==2">
        <form v-on:submit.prevent="addUser">
          <input type="text" name="name" placeholder="Select User Name" v-model="tuser.name">
          <button @click="showLogin=1" type="submit">Submit</button>
        </form>
      </div>
    </div>
    
    <div class="search" v-else>
      <h1>Hello, {{user.name}}</h1>
    </div>
  -->
    
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
        showLogin: 0,
        sForm: 0,
        tuser: {
          name: ''
        },
      }
    },

    mounted() {
      this.$store.dispatch('getUsers')
    },

    computed: {
      user() {
        return this.$store.state.user
      },
      songs() {
        return this.$store.state.songs
      },
      playlist() {
        return this.$store.state.playlist
      },
    },
    methods: {
      addUser() {
        this.$store.dispatch('addUser', this.tuser)
      },
      getUser() {
        this.$store.dispatch('getUser', this.tuser)
      },
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