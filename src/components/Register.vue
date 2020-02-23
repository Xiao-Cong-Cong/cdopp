<template>
    <div class="modal fade" id="register-modal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h3>用户注册</h3>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" onsubmit="return false;">
                        <div class="form-group">
                            <label class="col-sm-2 control-label">用户名</label>
                            <div class="col-sm-4">
                                <input type="text" class="form-control" maxlength="20" placeholder="User Name" v-model="form.username">
                            </div>
                            <div class="col-sm-6">
                                <span :class="{'form-control-static text-danger glyphicon glyphicon-remove': isValid_username() === 2, 'form-control-static text-success glyphicon glyphicon-ok': isValid_username() === 1}"></span>
                                <span class="" v-show="errorMsg.username !== ''">{{errorMsg.username}}</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">密码</label>
                            <div class="col-sm-4">
                                <input type="password" class="form-control" maxlength="30" placeholder="Password" v-model="form.password">
                            </div>
                            <div class="col-sm-6">
                                <span :class="{'form-control-static text-danger glyphicon glyphicon-remove': isValid_password() === 2, 'form-control-static text-success glyphicon glyphicon-ok': isValid_password() === 1}"></span>
                                <span class="" v-show="errorMsg.password !== ''">{{errorMsg.password}}</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">确认密码</label>
                            <div class="col-sm-4">
                                <input type="password" class="form-control" maxlength="30" placeholder="Password" v-model="form.password2">
                            </div>
                            <div class="col-sm-6">
                                <span :class="{'form-control-static text-danger glyphicon glyphicon-remove': isValid_password2() === 2, 'form-control-static text-success glyphicon glyphicon-ok': isValid_password2() === 1}"></span>
                                <span class="" v-show="errorMsg.password2 !== ''">{{errorMsg.password2}}</span>
                            </div>
                        </div>
                        <div class="form-group" v-show="errorMsg.msg !== ''">
                            <div class="col-sm-10 col-sm-offset-2">
                                <p class="text-danger">{{errorMsg.msg}}</p>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <div class="form-group">
                        <div class="col-sm-6 col-sm-offset-6">
                            <button type="submit" class="btn btn-success" @click="register">注册</button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal">取消</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import api from '../axios'
    import $ from 'jquery'
    export default {
        name: "Register",
        data() {
            return {
                form: {
                    username: '',
                    password: '',
                    password2: ''
                },
                errorMsg: {
                    username: '',
                    password: '',
                    password2: '',
                    msg: ''
                },
                usernameReg: /^[0-9a-zA-Z]*$/,
                passwordReg: /^[0-9a-zA-Z!@#()_,.]*$/
            }
        },
        computed: {
            
        },
        methods: {
            register() {
                if(!this.errorMsg.username && !this.errorMsg.password && !this.errorMsg.password2) {
                    api.userRegister(this.form).then(({data}) => {
                        console.log(data);
                        if(data.success) {
                            this.$store.commit('register', this.form);
                            this.form = {
                                username: '',
                                password: '',
                                password2: ''
                            }
                            $('#register-modal').modal('hide');
                            this.$router.push({path:'/user'});
                        } else {
                            this.errorMsg.msg = data.errorMessage;
                        }
                    })
                }
            },
            isValid_username: function() {
                if(this.form.username === '') {
                    this.errorMsg.username = '';
                    return 0;
                }
                if(this.form.username.length < 5 || this.form.username.length > 20) {
                    this.errorMsg.username = '长度必须在5~20位';
                    return 2;
                }
                if(!this.usernameReg.test(this.form.username)) {
                    this.errorMsg.username = '只能包含数字和字母';
                    return 2;
                }
                if(this.form.username[0] >= 0 && this.form.username[0] <= 9) {
                    this.errorMsg.username = '不能以数字开头';
                    return 2;
                }
                this.errorMsg.username = '';
                return 1;
            },
            isValid_password: function() {
                if(this.form.password === '') {
                    this.errorMsg.password = '';
                    return 0;
                }
                if(this.form.password.length < 5 || this.form.password.length > 30) {
                    this.errorMsg.password = '长度必须在5~30位';
                    return 2;
                }
                if(!this.passwordReg.test(this.form.password)) {
                    this.errorMsg.password = '只能包含数字、字母和!@#()_,.';
                    return 2;
                }
                this.errorMsg.password = '';
                return 1;
            },
            isValid_password2: function() {
                if(this.form.password2 === '') {
                    this.errorMsg.password2 = '';
                    return 0;
                }
                if(this.form.password !== this.form.password2) {
                    this.errorMsg.password2 = '两次密码不一样';
                    return 2;
                }
                this.errorMsg.password2 = '';
                return 1;
            }
        }
    }
</script>

<style>
</style>
