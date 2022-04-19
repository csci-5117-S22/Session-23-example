<template>
  <div class="word">
    <router-link :to="{ name: 'oneWord', params: { id: word.id }}">{{word.word}}</router-link>
    <span @click="showDef = !showDef">(?)</span>
    <span @click="deleteWord">(-)</span>
    <div class="def" v-if="showDef">
        {{word.definition}}
    </div>
  </div>
</template>

<script>
import { db } from '@/firebaseConfig'
export default {
  name: 'WordComp',
  data: function() {
      return {
          showDef: false
      }
  },
  props: ["word"],
  methods: {
      deleteWord: function() {
          db.collection("words").doc(this.word.id).delete();
      }
  }
}
</script>
<style scoped>
.word {
    display:inline;
}
</style>