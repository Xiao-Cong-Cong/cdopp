<template>
	<nav class="navbar navbar-default">
		<div class="container-fluid">
			<div class="navbar-header">
				<router-link class="navbar-brand" to="/">CDOPP</router-link>
			</div>
			<div class="collapse navbar-collapse" id="cdopp-navbar-collapse">
				<ul class="nav navbar-nav">
					<li :class="{ active: this.$route.name === 'Print' }"><router-link to="/">打印</router-link></li>
					<li :class="{ active: this.$route.name === 'Help' }"><router-link to="/help">帮助</router-link></li>
					<li :class="{ active: this.$route.name === 'Feedback' }"><router-link to="/feedback">反馈</router-link></li>
					<li :class="{ active: this.$route.name === 'About' }"><router-link to="/about">关于</router-link></li>
					<li :class="{ active: this.$route.name === 'User' }" v-if="user.login === 1"><router-link to="/user">用户中心</router-link></li>
					<li :class="{ active: this.$route.name === 'System' }" v-if="user.login === 1 && user.level === 9"><router-link to="/system">系统管理</router-link></li>
				</ul>
				<div class="navbar-right">
					<form class="navbar-form" v-if="user.login === 0">
						<div class="form-group">
							<input type="text" class="form-control" placeholder="username" v-model="form.username">
							<input type="password" class="form-control" placeholder="password" v-model="form.password">
							<button type="button" class="btn btn-success" @click="login">登陆</button>
							<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#register-modal">注册</button>
						</div>
					</form>
					<ul class="nav navbar-nav" v-if="user.login === 1">
						<li><router-link to="/user">欢迎, {{ user.username }}</router-link></li>    
						<li><a @click="logout">登出</a></li>
					</ul>
				</div>
			</div>
		</div>
	</nav>
</template>

<script>
	import api from '../axios'
	export default {
		name: "Header",
		data() {
			return {
				user: this.$store.state.user,
				form: {
					username: '',
					password: ''
				}
			}
		},
		methods: {
			login() {
				api.userLogin(this.form).then(({data}) => {
					console.log(data)
					if(data.success) {
						this.$store.commit('login', data)
						this.$router.push({path:'/user'})
					} else {
						alert(data.errorMessage)
					}
				})
			},
			logout() {
				api.userLogout().then(({data}) => {
					console.log(data)
					if(data.success) {
						this.form = {
							username: '',
							password: ''
						}
						this.$store.commit('logout')
						this.$router.push({path:'/'})
					}
				})
			}
		},
		beforeCreate() {
			api.userData().then(({data}) => {
				console.log(data);
				if(data.success)
					this.$store.commit('login', data.data);
			})
		}
	}
</script>

<style scoped>
	input, .btn {
		margin-right: 3px;
	}
</style>
