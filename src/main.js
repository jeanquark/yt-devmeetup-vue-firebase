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
      apiKey: 'AIzaSyCCsNmyXzFJkFZG9g8Qp0bfk9hHC_QJcc8',
      authDomain: 'fir-auth-vue-1aa66.firebaseapp.com',
      databaseURL: 'https://fir-auth-vue-1aa66.firebaseio.com',
      projectId: 'fir-auth-vue-1aa66',
      storageBucket: 'fir-auth-vue-1aa66.appspot.com',
      messagingSenderId: '392469771982'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
    this.$store.dispatch('loadMeetups')
  }
})
