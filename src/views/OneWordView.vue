<template>
  <div class="about" v-if="wordObj !== false && !deleting">
    <h1>{{wordObj.word}}</h1>
    <button @click="doDelete"> delete </button>
    <textarea v-model="wordObj.definition" /> <button @click="updateDef">save</button>
    <img v-if="wordObj.image" :src="wordObj.image" />
    <button @click="imageUpload = !imageUpload" v-if="!imageUpload">Provide an image!</button>
    <div v-if="imageUpload">
        <input type="file" ref="fileInput" accept="image/*" @change="preview"/>
        <img v-if="imageToUpload" :src="imageToUploadURL" />
        <button v-if="imageToUpload" @click="saveImage"> save image </button>
    </div>
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
            deleting: false,
            imageUpload: false,
            imageToUpload: null
        }
    },
    firestore: function() {
        return {
            wordObj: db.collection("words").doc(this.id)
        }
    },
    watch: {
        id: function() {
            // $bind automatically unbinds the previously bound property
            this.wordObj = false;
            this.$bind('wordObj', db.collection("words").doc(this.id), {wait:true})
        },
        wordObj: function() {
            if (this.wordObj === null && !this.deleting) {
                this.$router.replace({name:'404'})
            } else if (this.wordObj === null && this.deleting) {
                this.$router.push({name:'home'})
            }
        }
    },
    methods: {
        doDelete: function() {
            this.deleting = true
            this.$firestoreRefs.wordObj.delete()
        },
        updateDef: function() {
            this.$firestoreRefs.wordObj.update({definition:this.wordObj.definition})
        },
        preview: function() {
            if (this.$refs.fileInput.files) {
                this.imageToUpload = this.$refs.fileInput.files[0]
            } else {
                this.imageToUpload = null
            }
        },
        saveImage: function() {
            
            console.log("Save image!");
            this.imageToUpload = null
            this.imageUpload = false;
        }
    },
    computed: {
        imageToUploadURL: function() {
            if (this.imageToUpload) {
                return URL.createObjectURL(this.imageToUpload);
            } else {
                return null;
            }
        }
        
    }
}
</script>

<style>

</style>
