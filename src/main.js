import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { firestorePlugin } from 'vuefire'
import { auth, provider } from '@/firebaseConfig.js'

Vue.use(firestorePlugin)

Vue.config.productionTip = false

// 1 we have to activate the vuefire plugin
// 2 we want to add a auth listener

let app
auth.onAuthStateChanged((user)=>{
    if (!user) {
        auth.signInWithRedirect(provider);
    }
    if (user && !app) {
        new Vue({
            router,
            render: h => h(App)
        }).$mount('#app')
    }  
});