<template>
	<div class="container">
		<h1 align="center">Online Print Platform V0.2.0</h1>
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
						<a @click="submitPDF"><span class="glyphicon glyphicon-send"></span> 确认打印</a>
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
							<td width="30%">文件名</td>
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
							<td>{{ singleFile.pages }}</td>
							<td><input type="number" min="1" style="width:50px;" @blur="modifyCopies(singleFile)" v-model="singleFile.copies"
										:disabled="singleFile.msg==='' || !singleFile.msgType['text-success'] || !!singleFile.confirm"></td>
							<td>{{ singleFile.price }}</td>
							<td>
								<div class="progress" v-show="!singleFile.msg">
									<div class="progress-bar" role="progressbar" :style="'width: ' + singleFile.progress + '%;'">
										{{ singleFile.progress }}%
									</div>
								</div>
								<p v-show="singleFile.msg" :class="singleFile.msgType">{{ singleFile.msg }}</p>
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
	import api from '../axios';
	import axios from 'axios';
	import $ from 'jquery'
	export default {
		name: "Print",
		data() {
			return {
				allFiles: [],
				chosen: 0,
				uploading: 0
			}
		},
		methods: {
			chooseFile() {
				$('#file-input').trigger('click');
			},
			// // TODO: handle duplicate
			// // TODO: 文件名截断
			selectFiles() {
				var files = this.$refs.files.files;
				if(files) {
					for(var i = 0; i < files.length; i++) {
						this.selectFile(files[i]);
					}
				}
			},
			modifyCopies(file) {
				api.fileModifyCopies({
					fid: file.fid,
					copies: file.copies
				}).then(({data}) => {
					// console.log(data);
					if(data.success) {
						file.price = file.pages * file.copies * 20 / 100;
					} else {
						file.msg = data.errorMessage;
						file.msgType['text-success'] = false;
						file.msgType['text-warning'] = true;
					}
				})
			},
			submitPDF() {
				if(this.chosen === 0) {
					alert('请先选择文件');
					return;
				}
				if(this.chosen === 2) {
					alert('请不要重复提交打印文件');
					return;
				}
				if(this.uploading) {
					alert('请等待打印文件全部上传成功后再确认打印');
					return;
				}
				this.chosen = 2;
				for(var i = 0; i < this.allFiles.length; i++) {
					var file = this.allFiles[i];
					if(file.msg === 'Successful') {
						api.fileSubmitPDF({
							fid: file.fid
						}).then(({data}) => {
							if(data.success) {
								// console.log(data.fid);
								// try closure
								for(var i = 0; i < this.allFiles.length; i++)
									if(this.allFiles[i].fid === data.fid)
										this.allFiles[i].confirm = 1;
							} else {
								file.msg = data.errorMessage;
								file.msgType['text-success'] = false;
								file.msgType['text-warning'] = true;
							}
						})
					}
				}
				// show accepted message modal
			},
			selectFile(file) {
				if(this.chosen === 0 || this.chosen === 2) {
					this.allFiles = [];
					this.chosen = 0;
				}
				if(file) {
					this.chosen = 1;
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
						pages: 0,
						price: 0.00,
						msg: '',
						msgType: {
							'text-success': true,
							'text-warning': false
						},
						confirm: 0
					});
					var id = this.allFiles.length - 1;
					this.sendFile(id, file).then((res) => {
						// console.log(res);
						this.uploading -= 1;
						if(res.data.success) {
							this.allFiles[id].msg = "Successful";
							this.allFiles[id].msgType['text-success'] = true;
							this.allFiles[id].msgType['text-warning'] = false;
							this.allFiles[id].pages = res.data.file.pages;
							this.allFiles[id].price = res.data.file.price;
							this.allFiles[id].fid = res.data.file.fid;
						}
						// console.log(id, this.allFiles[id]);
					});
				}
			},
			async sendFile(fileId, file) {
				const formData = new FormData();
				formData.append('file', file);
				// console.log(fileId, file);

				try {
					return await axios.post('/api/file/upload', formData, {
						onUploadProgress: e => this.allFiles[fileId].progress = Math.round(e.loaded * 100 / e.total)
					});
				} catch(err) {
					console.log(err);
					this.allFiles[fileId].msgType['text-success'] = false;
					this.allFiles[fileId].msgType['text-warning'] = true;
					this.allFiles[fileId].msg = err.response.data.error;
				}
			}
		}
	}
</script>

<style scoped>
	#file-input {
		display: none;
	}

	table {
		word-wrap: break-word;
		word-break: break-all;
	}

	tr {
		border-bottom: 10px solid;
		border-color: transparent;
	}

	.progress {
		margin-bottom: 0;
	}
	.text-success, .text-warning {
		margin: 0
	}
</style>
