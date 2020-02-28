import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		user: {
			login: 0,
			level: 0,
			username: ''
		}
	},
	mutations: {
		register (state, newUser) {
			state.user.login = 1;
			state.user.level = 1;
			state.user.username = newUser.username;
		},
		login (state, user) {
			state.user.login = 1;
			state.user.level = user.level;
			state.user.username = user.username;
		},
		logout (state) {
			state.user.login = 0;
			state.user.level = 0;
			state.user.username = '';
		}
	}
})
