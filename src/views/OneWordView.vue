<template>
  <div class="about" v-if="wordObj !== false && !deleting">
    <h1>{{wordObj.word}}</h1>
    <button @click="doDelete"> delete </button>
    <textarea v-model="wordObj.definition" /> <button @click="updateDef">save</button>
  </div>
  <div v-else>
      LOADING
  </div>
</template>

<script>
import { db } from '@/firebaseConfig'
export default {
    props:['id'],
    data: function() {
        return {
            wordObj: false,
            deleting: false
        }
    },
    firestore: function() {
        return {
            wordObj: db.collection("words").doc(this.id)
        }
    },
    beforeUpdate: function() {
        if (this.wordObj === null && !this.deleting) {
            this.$router.replace({name:'404'})
        } else if (this.wordObj === null && this.deleting) {
            this.$router.push({name:'home'})
        }
    },
    methods: {
        doDelete: function() {
            this.deleting = true
            this.$firestoreRefs.wordObj.delete()
        },
        updateDef: function() {
            this.$firestoreRefs.wordObj.update({definition:this.wordObj.definition})
        }
    }
}
</script>

<style>

</style>
