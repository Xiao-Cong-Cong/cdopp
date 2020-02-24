<template>
	<div class="container">
		<!-- Next version TODO -->
		<div class="row">
			<div class="col-sm-2">
				<ul class="nav nav-pills nav-stacked">
					<li class="navbar-text"><h4><strong>DashBoard</strong></h4></li>
				</ul>
				<hr>
				<h4><small><strong>用户管理</strong></small></h4>
				<ul class="nav nav-pills nav-stacked">
					<li :class="{active: tab === 'user'}" @click="tab='user'">
						<a href="javascript:"><span class="glyphicon glyphicon-user"></span> 用户信息</a>
					</li>
					<li :class="{active: tab === 'recharge'}" @click="tab='recharge'">
						<a href="javascript:"><span class="glyphicon glyphicon-yen"></span> 充值管理</a>
					</li>
				</ul>
				<hr>
				<h4><small><strong>系统管理</strong></small></h4>
				<ul class="nav nav-pills nav-stacked">
					<li :class="{active: tab === 'printer'}" @click="tab='printer'">
						<a href="javascript:"><span class="glyphicon glyphicon-print"></span> 打印机</a>
					</li>
					<li :class="{active: tab === 'print'}" @click="tab='print'">
						<a href="javascript:"><span class="glyphicon glyphicon-inbox"></span> 打印任务</a>
					</li>
					<li :class="{active: tab === 'site'}" @click="tab='site'">
						<a href="javascript:"><span class="glyphicon glyphicon-cloud"></span> 网站</a>
					</li>
				</ul>
			</div>
			<div class="col-sm-10">
                <UserInfo v-show="tab==='user'"></UserInfo>
				<RechargeTask v-show="tab==='recharge'"></RechargeTask>
				<div v-show="tab==='printer'">
					<div class="pull-right">
						<!-- <button class="btn btn-danger" ng-click="newPrinter()">新打印机</button> -->
					</div>
					<h3>打印机管理 <small>将打印机机主设为0即表示删除此打印机</small></h3>
					<table class="table table-hover table-bordered">
						<tr>
							<th>#</th>
							<th>备注</th>
							<th>状态</th>
						</tr>
						<!-- <tr ng-repeat="printer in printers">
							<td>
								<p>编号：{{printer.pid}}</p>
								<p>机主：<input class="editor" v-model="printer.uid"></p>
								<p>地址：<input class="editor" v-model="printer.location"></p>
							</td>
							<td>
								<textarea class="form-control editor" v-model="printer.instruction" rows="5"></textarea>
							</td>
							<td ng-init="printer.statusBool = printer.status==1?true:false">
								<p>营业状态：<toggle-switch v-model="printer.statusBool" on-label="ON" off-label="OFF" ng-click="printer.status=printer.statusBool?'1':'0'"></toggle-switch></p>
								<p>打印机状态：Avaliable</p>
								<p><button class="btn btn-success" ng-click="modifyPrinter($index)">保存更改</button></p>
							</td>
						</tr> -->
					</table>
				</div>
				<PrintTask v-show="tab==='print'"></PrintTask>
				<div v-show="tab==='site'">
					<div class="pull-right">
						<!-- <span class="text-{{site.msgType}}" ng-hide="site.msg===''"><strong>** {{site.msg}} ** </strong></span> -->
						<button class="btn btn-primary" ng-click="saveConfig()">保存修改</button>
					</div>
					<h3>网站控制面板</h3>
					<table class="table">
						<tr>
							<th>打印功能</th>
							<td>
								<div class="btn-group">
									<!-- <label class="btn btn-sm" :class="{'btn-success': site.config.print==='1', 'btn-danger': site.config.print==='0'}" ng-model="site.config.print" btn-radio="'1'">开</label>
									<label class="btn btn-sm" :class="{'btn-success': site.config.print==='1', 'btn-danger': site.config.print==='0'}" ng-model="site.config.print" btn-radio="'0'">关</label> -->
								</div>
							</td>
						</tr>
						<tr>
							<th>注册开放</th>
							<td>
								<div class="btn-group">
									<!-- <label class="btn btn-sm" :class="{'btn-success': site.config.register==='1', 'btn-danger': site.config.register==='0'}" ng-model="site.config.register" btn-radio="'1'">开</label>
									<label class="btn btn-sm" :class="{'btn-success': site.config.register==='1', 'btn-danger': site.config.register==='0'}" ng-model="site.config.register" btn-radio="'0'">关</label> -->
								</div>
							</td>
						</tr>
						<tr>
							<th>网站公告</th>
							<td><input class="form-control" ng-model="site.config.notice" placeholder="站点公告"></td>
						</tr>
					</table>
				</div>
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
				tab: 'user',
				userLogs_userName: '',
				userLogs_currentPage: '',
				rechargeLogs_userName: '',
				printLogs_userName: '',
				log: {
					userName: '',
					uid: '',
					level: '',
					balance: 0,
					fid: '',
					submitTime: '',
					pages: '',
					copies: '',
					price: '',
					printerInfo: {
						location: ''
					},
					printStatus: 0
				},
				site: {
					cofig: {
						register: '0',
						print: '0'
					}
				}
			}
		}
	}
</script>

<style>
</style>
