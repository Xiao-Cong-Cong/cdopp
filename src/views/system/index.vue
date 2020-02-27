<template>
	<div class="container">
		<div class="row">
			<div class="col-sm-2">
				<ul class="nav nav-pills nav-stacked">
					<li class="navbar-text"><h4><strong>DashBoard</strong></h4></li>
				</ul>
				<hr>
				<h4><small><strong>系统</strong></small></h4>
				<ul class="nav nav-pills nav-stacked">
					<li :class="{active: tab === 'user'}" @click="tab='user'">
						<a href="javascript:"><span class="glyphicon glyphicon-user"></span> 用户信息</a>
					</li>
					<li :class="{active: tab === 'print'}" @click="tab='print'">
						<a href="javascript:"><span class="glyphicon glyphicon-inbox"></span> 打印任务</a>
					</li>
					<li :class="{active: tab === 'recharge'}" @click="tab='recharge'">
						<a href="javascript:"><span class="glyphicon glyphicon-yen"></span> 充值管理</a>
					</li>
				</ul>
			</div>
			<div class="col-sm-10">
                <UserInfo v-show="tab==='user'"></UserInfo>
				<PrintTask v-show="tab==='print'"></PrintTask>
				<RechargeTask v-show="tab==='recharge'"></RechargeTask>
			</div>
		</div>
	</div>
</template>

<script>
	import UserInfo from './UserInfo';
	import PrintTask from './PrintTask';
	import RechargeTask from './RechargeTask';
	export default {
        name: 'System',
        components: {
			UserInfo,
			PrintTask,
			RechargeTask
        },
		data() {
			return {
				tab: 'user'
			}
		}
	}
</script>

<style>
</style>
