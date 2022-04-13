<template>
  <div>
  <h1> GALLAGROOVATURE and other fake words </h1>
  <span>Add word: </span><input v-model="newWord" placeholder="type a not-word-word" @keyup.enter="addNewWord" />
  <ul v-if="words !== false">
    <li v-for="wordObj in words" :key="wordObj.id">
      <router-link :to="{ name: 'oneWord', params: { id: wordObj.id }}">{{wordObj.word}}</router-link>
    </li>
  </ul>
  <div v-else>
    LOADING
  </div>
  </div>
</template>

<script>
import { db } from '@/firebaseConfig'
export default {
  name: 'HomeView',
  data: function() {
    return {
      words: false,
      newWord: ""
    }
  },
  firestore: {
    words: db.collection("words")
  },
  methods: {
    addNewWord: function() {
      let newWord = {
        word: this.newWord,
        definition: ""
      };
      this.newWord = ""
      db.collection("words").add(newWord)
    }
  }
}
</script>
