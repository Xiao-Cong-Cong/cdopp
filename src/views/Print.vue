<template>
	<div class="container">
		<!-- <p class="text-info" align="center"><strong> globalConfig.notice </strong></p> -->
		<h1 align="center">Online Print Platform V0.3.0</h1>
		<div class="row">
			<div class="col-sm-3">
				<h4><small><strong>类型</strong></small></h4>
				<ul class="nav nav-pills nav-stacked">
					<li>
						<router-link to="/"><span class="glyphicon glyphicon-file"></span> PDF</router-link>
					</li>
					<li>
						<router-link to="/code"><span class="glyphicon glyphicon-console"></span> CODE</router-link>
					</li>
				</ul>
				<hr>
				<h4><small><strong>操作</strong></small></h4>
				<ul class="nav nav-pills nav-stacked">
					<li>
						<a href="javascript:" type="file" multiple accept="application/pdf" ngf-max-size="10MB"><span class="glyphicon glyphicon-open-file"></span> 选择文件</a>
					</li>
					<li v-if="this.$route.name === 'Print'">
						<a href="javascript:"><span class="glyphicon glyphicon-send"></span> 确认打印</a>
					</li>
					<li v-if="this.$route.name === 'Code'">
						<a href="javascript:"><span class="glyphicon glyphicon-send"></span> 提交打印</a>
					</li>
				</ul>
			</div>
			<div class="col-sm-9">
				<div v-if="this.$route.name === 'Print'">
					<h3>PDF打印 <small>请提交不超过10MB的A4大小未加密PDF文件</small></h3>
					<table class="table table-hover">
						<tr>
							<td>#</td>
							<td>文件名</td>
							<td>文件大小</td>
							<td>页数</td>
							<td>打印份数</td>
							<td>价格</td>
							<td width="40%">上传进度</td>
						</tr>
					</table>
				</div>
				<div v-if="this.$route.name === 'Code'">
					<h3>代码打印 <small>请上传不超过100KB的代码</small>
					<div class="btn-group">
						<label class="btn btn-sm btn-default" btn-radio="'cpp'">cpp</label>
						<label class="btn btn-sm btn-default" btn-radio="'java'">java</label>
						<label class="btn btn-sm btn-default" btn-radio="'pascal'">pascal</label>
					</div></h3>
					<textarea class="form-control" rows="20" ng-model="code.content"></textarea>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Print",
		data() {
			return {
				
			}
		}
	}
</script>

<style>
</style>
