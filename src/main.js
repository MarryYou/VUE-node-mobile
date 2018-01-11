import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import axios from 'axios'
import moment from 'moment'
import('../node_modules/vuetify/dist/vuetify.min.css') 
Vue.prototype.$http = axios
Vue.use(Vuetify)
Vue.use(moment)
Vue.config.productionTip = false
Vue.filter('formatDate',function(time){
	return moment(time).format('YYYY-MM-DD hh:mm:ss');  ;
})
Vue.filter('fromNow',function(time){
	return moment(time, "YYYYMMDD").fromNow();
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
