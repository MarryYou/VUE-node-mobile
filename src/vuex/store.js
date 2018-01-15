import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
	loginStatus :false
}

const actions = {
	loginSuccess:({commit}) => commit('loginSuccess'),
	loginOut:({commit}) => commit('loginOut')
}

const mutations ={
	loginSuccess(state){
		state.loginStatus = true
		window.localStorage.setItem('loginStatus','true')
	},
	loginOut(state){
		state.loginStatus = false
		window.localStorage.setItem('loginStatus','false')
	}
}
const getters = {
	
}

export default  new Vuex.Store({
	state,
	mutations,
	actions,
	getters
})
