<template>
	<div class="container">
		<div class="row">
			<div class="col-sm-2">
				<ul class="nav nav-pills nav-stacked">
					<li class="navbar-text"><h4><strong>&nbsp;</strong></h4></li>
				</ul>
				<hr>
				<h4><small><strong>个人</strong></small></h4>
				<ul class="nav nav-pills nav-stacked">
					<li :class="{active: tab==='user.printLog'}" @click="tab='user.printLog'">
						<a href="javascript:"><span class="glyphicon glyphicon-th-list"></span> 打印记录</a>
					</li>
					<li :class="{active: tab==='user.basic'}" @click="tab='user.basic'">
						<a href="javascript:"><span class="glyphicon glyphicon-user"></span> 个人信息</a>
					</li>
					<li :class="{active: tab==='user.rechargeLog'}" @click="tab='user.rechargeLog'">
						<a href="javascript:"><span class="glyphicon glyphicon-yen"></span> 充值记录</a>
					</li>
				</ul>
				<!-- <h4><small><strong>打印机</strong></small></h4>
				<ul class="nav nav-pills nav-stacked">
					<li :class="{active: tab==='printer.new'}" @click="tab='printer.new'">
						<a href="javascript:"><span class="glyphicon glyphicon-plus"></span> 我有打印机</a>
					</li>
					<li v-show="user.level>=5" :class="{active: tab==='printer.admin'}" @click="tab='printer.admin'">
						<a href="javascript:"><span class="glyphicon glyphicon-print"></span> 打印机管理</a>
					</li>
					<li v-show="user.level>=5" :class="{active: tab==='printer.task'}" @click="tab='printer.task'">
						<a href="javascript:"><span class="glyphicon glyphicon-inbox"></span> 打印任务</a>
					</li>
				</ul> -->
			</div>
			<div class="col-sm-10">
				<Printlog v-show="tab==='user.printLog'"></Printlog>
				<Person v-show="tab==='user.basic'"></Person>
				<div v-show="tab==='user.rechargeLog'">
					<h3>充值记录</h3>
					<!-- <pagination boundary-links="true" total-items="rechargeLogs.total_items" items-per-page="10" max-size="10" ng-model="rechargeLogs_currentPage" class="pagination-sm" previous-text="&lsaquo;" next-text="&rsaquo;" first-text="&laquo;" last-text="&raquo;"></pagination> -->
					<table class="table table-hover table-bordered">
						<tr>
							<th>#</th>
							<th>提交时间</th>
							<th>用户</th>
							<th>支付宝账户</th>
							<th>真实姓名</th>
							<th>金额</th>
							<th>充值状态</th>
						</tr>
						<tr ng-repeat="log in rechargeLogs.data">
							<td>{{log.pid}}</td>
							<td>{{log.submitTime}}</td>
							<td>{{log.userName}}</td>
							<td>{{log.payAccount}}</td>
							<td>{{log.realName}}</td>
							<td>{{log.amount}}</td>
							<td>
								<span :class="{'text-muted': log.rechargeStatus==='Pending', 'text-success': log.rechargeStatus==='Recharged', 'text-danger': log.rechargeStatus==='Failed'}">
									<span :class="{'glyphicon glyphicon-time': log.rechargeStatus==='Pending', 'glyphicon glyphicon-ok': log.rechargeStatus==='Recharged', 'glyphicon glyphicon-remove': log.rechargeStatus==='Failed'}"></span>
									<span>{{log.rechargeStatus}}</span>
								</span>
							</td>
						</tr>
					</table>
				</div>
				<!-- <div v-show="tab==='printer.new'">
					<h3>打印机申请</h3><hr>
					<p>请先完善个人信息，然后联系管理员进行相关认证</p>
				</div>
				<div v-show="tab==='printer.admin'">printer.admin</div>
				<div v-show="tab==='printer.task'">printer.task</div> -->
			</div>
		</div>
	</div>
</template>

<script>
	import Person from './Person'
	import Printlog from './Printlog'
	export default {
		name: 'User',
		components: {
			Person,
			Printlog
		},
		data() {
			return {
				tab: 'user.printLog',
				rechargeError: '',
				user: {
					userName: '',
					password: '',
					old_password: '',
					level: 0
				},
				log: {
					submitTime: '',
					userName: '',
					payAccount: '',
					realName: '',
					amount: '',
					fid: '',
					pages: '',
					copies: '',
					price: '',
					printerInfo: {
						location: ''
					}
				}
			}
		}
	}
</script>

<style>
</style>
