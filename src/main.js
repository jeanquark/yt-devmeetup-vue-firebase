import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import { store } from './store'
import DateFilter from './filters/date'
import AlertCmp from './components/Shared/Alert.vue'

Vue.use(Vuetify)
Vue.config.productionTip = false

Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyDbl41IZlGdFmGxcNd1jnDEIs8QCMNEI_Q',
      authDomain: 'yt-devmeetup-vue-firebase.firebaseapp.com',
      databaseURL: 'https://yt-devmeetup-vue-firebase.firebaseio.com',
      projectId: 'yt-devmeetup-vue-firebase',
      storageBucket: 'yt-devmeetup-vue-firebase.appspot.com',
      messagingSenderId: '765764608881'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
    this.$store.dispatch('loadMeetups')
  }
})
