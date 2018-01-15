import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import router from './router'
import Vuetify from 'vuetify'
import axios from 'axios'
import moment from 'moment'
import store from './vuex/store'
import('../node_modules/vuetify/dist/vuetify.min.css') 
Vue.prototype.$http = axios
Vue.use(Vuex)
Vue.use(Vuetify)
Vue.use(moment)
Vue.config.productionTip = false
Vue.filter('formatDate',function(time){
	return moment(time).format('YYYY-MM-DD hh:mm:ss a');  ;
})
Vue.filter('fromNow',function(time){
	return moment(time, "YYYYMMDD").fromNow();
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  data:{
  	    content: "<h3>vue html5 editor</h3>",
        showModuleName: false
  },
    methods: {
            updateData: function (data) {
                // sync content to component
                this.content = data
            },
            fullScreen: function () {
                this.$refs.editor.enableFullScreen()
            },
            focus: function () {
                this.$refs.editor.focus()
            }
        }
})
