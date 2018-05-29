<template>
    <ol class="col-sm-6">
      <li v-for="song in list">
        <img :src="song.albumArt">
        <p>{{song.artist}}</p>
        <p>{{song.title}}</p> 
        <audio controls controlsList="nodownload" :src="song.preview"></audio>
        <button @click="handleButtonClick(song)">{{buttonText}}</button>
      </li>
    </ol>
  </template>
  
  <script>
    export default {
      name: 'songs-list',
      props: {
        list: {
          type: Array,
          required: true
        },
        buttonText: {
          type: String,
          required: true
        },
        handleButtonClick: {
          type: Function,
          required: true
        }
      }
    }
  </script>