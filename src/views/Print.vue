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
					<li v-if="this.$route.name === 'Print'">
						<input multiple type="file" ref="files" id="file-input" @change="selectFiles"/>
						<a @click="chooseFile"><span class="glyphicon glyphicon-open-file"></span> 选择文件</a>
					</li>
					<li v-if="this.$route.name === 'Print'">
						<a @click="confirmPDF"><span class="glyphicon glyphicon-send"></span> 确认打印</a>
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
						<tr v-for="singleFile in allFiles" :key="singleFile.filename">
							<td>
								<a class="text-danger" v-show="!singleFile.confirm" ng-click="cancel($index)">
									<span class="glyphicon glyphicon-remove"></span>
								</a>
								<p class="text-success" v-show="singleFile.confirm">
									<span class="glyphicon glyphicon-ok-circle"></span>
								</p>
							</td>
							<td><span>{{singleFile.filename}}</span></td>
							<td>{{ singleFile.filesize }} MB</td>
							<td>page</td>
							<td><input type="number" min="1" style="width:50px;" v-model="singleFile.copies" ng-disabled="singleFile.msg==='' || singleFile.confirm"></td>
							<td>price</td>
							<td>
								{{ singleFile.progress }}%
								<!-- <progressbar ng-show="singleFile.msg===''" class="progress-striped active" value="singleFile.progress" type="{{singleFile.progress === 100 ? 'success' : 'primary'}}">{{singleFile.progress}}%</progressbar> -->
								<!-- <p v-show="singleFile" class="text-{{singleFile.msgType}}">{{singleFile.msg}}</p> -->
							</td>
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
	import axios from 'axios';
	import $ from 'jquery'
	export default {
		name: "Print",
		data() {
			return {
				allFiles: [],
				choosen: 0,
				uploading: 0
			}
		},
		methods: {
			chooseFile() {
				$('#file-input').trigger('click');
			},
			// // TODO: handle duplicate
			selectFiles() {
				// console.log(this.$ref);
				var files = this.$refs.files.files;
				if(files) {
					for(var i = 0; i < files.length; i++) {
						this.selectFile(files[i]);
					}
				}
			},
			confirmPDF() {

			},
			selectFile(file) {
				if(this.choosen === 0 || this.choosen === 2) {
					this.allFiles = [];
					this.choosen = 0;
				}
				if(file) {
					this.choosen = 1;
					this.uploading += 1;
					if(file.size > 10 * 1024 * 1024) {
						alert('提交文件过大');
						return;
					}
					if(file.type !== 'application/pdf' && file.type !== 'application/kswps') {
						alert('请提交A4纸大小的PDF文件');
						return;
					}
					this.allFiles.push({
						fid: 0,
						filename: file.name,
						size: file.size,
						filesize: Math.floor(file.size / 1024.0 / 1024.0 * 100) / 100,
						progress: 0,
						copies: 1,
						msg: '',
						msgType: 'success',
						confirm: 0
					});
					var id = this.allFiles.length - 1;
					this.sendFile(id, file).then((res) => {
						this.uploading -= 1;
						if(res.data.success) {
							this.allFiles[id].msg = "Successful";
							this.allFiles[id].msgType = "success";
							// set fid from server
						}
					});
				}
			},
			async sendFile(fileId, file) {
				const formData = new FormData();
				formData.append('file', file);

				try {
					return await axios.post('/api/upload/file', formData, {
						onUploadProgress: e => this.allFiles[fileId].progress = Math.round(e.loaded * 100 / e.total)
					});
				} catch(err) {
					console.log(err);
					this.allFiles[fileId].msgType = 'warning';
					this.allFiles[fileId].msg = err.response.data.error;
				}
			}
		},
		// filters: {
		// 	keepTwoDecimalPlaces(value) {
		// 		return value.toFixed(2);
		// 	}
		// }
	}
</script>

<style scoped>
	#file-input {
		display: none;
	}
</style>
