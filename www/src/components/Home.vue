<template>
  <div class="hello">
    <div class="searchbar">
      <form @submit.prevent="findSongs">
        <input type="text" v-model="query">
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
