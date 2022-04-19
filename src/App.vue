<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
      <h1 v-if="randomWord"> <word-comp :word="randomWord" /> and other fake words </h1>
      <h1 v-else> GALLAGROOVATURE and other fake words </h1>
    <router-view/>
  </div>
</template>

<script>
import { db } from '@/firebaseConfig'
import WordComp from './components/WordComp.vue'
export default {
    components: { WordComp },
  data: function() {
    return {
      words: false,
    }
  },
  firestore: {
    words: db.collection("words")
  },
  computed: {
    randomWord: function() {
      if (this.words) {
        return this.words[Math.floor(Math.random()*this.words.length)]
      } else {
        return false
      }
    }
  }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
