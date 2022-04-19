<template>
  <div>
  <span>Add word: </span><input v-model="newWord" placeholder="type a not-word-word" @keyup.enter="addNewWord" />
  <ul v-if="words !== false">
    <li v-for="wordObj in words" :key="wordObj.id">
      <word-comp :word="wordObj" />
  </li>
  </ul>
  <div v-else>
    LOADING
  </div>
  </div>
</template>

<script>
import { db } from '@/firebaseConfig'
import WordComp from '@/components/WordComp.vue';
export default {
  components: { WordComp },
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
