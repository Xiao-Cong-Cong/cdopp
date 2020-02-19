import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		users: [
			{username: 'admin', password: 'admin', level: 9}
		],
		user: {
			login: 0,
			level: 0,
			username: ''
		}
	},
	mutations: {
		register (state, newUser) {
			state.users = [...state.users, newUser]
			// console.log(newUser, state.users)
		},
		login (state, user) {
			// console.log(user)
			for (var u of state.users) {
				if(u.username === user.username && u.password === user.password) {
					state.user.login = 1, state.user.level = u.level, state.user.username = u.username
					break
				}
			}
		},
		signout (state) {
			state.user.login = 0
			state.user.level = 0
			state.user.username = ''
		}
	}
})
