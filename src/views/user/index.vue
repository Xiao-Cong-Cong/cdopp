<template>
	<div class="container">
		<div class="row">
			<div class="col-sm-2">
				<ul class="nav nav-pills nav-stacked">
					<li class="navbar-text"><h4><strong>DashBoard</strong></h4></li>
				</ul>
				<hr>
				<h4><small><strong>个人</strong></small></h4>
				<ul class="nav nav-pills nav-stacked">
					<li :class="{active: tab==='printLog'}" @click="tab='printLog'">
						<a href="javascript:"><span class="glyphicon glyphicon-th-list"></span> 打印记录</a>
					</li>
					<li :class="{active: tab==='basic'}" @click="tab='basic'">
						<a href="javascript:"><span class="glyphicon glyphicon-user"></span> 个人信息</a>
					</li>
					<li :class="{active: tab==='rechargeLog'}" @click="tab='rechargeLog'">
						<a href="javascript:"><span class="glyphicon glyphicon-yen"></span> 充值记录</a>
					</li>
				</ul>
			</div>
			<div class="col-sm-10">
				<Printlog v-show="tab==='printLog'"></Printlog>
				<Person v-show="tab==='basic'"></Person>
				<RechargeLog v-show="tab==='rechargeLog'"></RechargeLog>
			</div>
		</div>
	</div>
</template>

<script>
	import Person from './Person'
	import Printlog from './Printlog'
	import RechargeLog from './RechargeLog'
	export default {
		name: 'User',
		components: {
			Person,
			Printlog,
			RechargeLog
		},
		data() {
			return {
				tab: 'printLog'
			}
		}
	}
</script>

<style>
</style>
