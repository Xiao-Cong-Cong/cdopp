import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		user: {
			login: 0,
			level: 0,
			balance: 0,
			username: ''
		}
	},
	mutations: {
		register (state, newUser) {
			state.user.login = 1;
			state.user.level = 1;
			state.user.balance = 0;
			state.user.username = newUser.username;
			// console.log(newUser)
		},
		login (state, user) {
			// console.log(user)
			state.user.login = 1;
			state.user.level = user.level;
			state.user.balance = user.balance;
			state.user.username = user.username;
		},
		logout (state) {
			state.user.login = 0;
			state.user.level = 0;
			state.user.balance = 0;
			state.user.username = '';
		}
	}
})
