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
                                <input type="text" class="form-control" maxlength="20" placeholder="User Name" v-model="username">
                            </div>
                            <div class="col-sm-6">
                                <!-- <span ng-class="{'form-control-static text-danger glyphicon glyphicon-remove': !isValid_userName(), 'form-control-static text-success glyphicon glyphicon-ok': isValid_userName()}"></span> -->
                                <!-- <span class="" ng-show="errorMsg.userName !== ''">{{errorMsg.userName}}</span> -->
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">密码</label>
                            <div class="col-sm-4">
                                <input type="password" class="form-control" maxlength="30" placeholder="Password" v-model="password">
                            </div>
                            <div class="col-sm-6">
                                <!-- <span ng-class="{'form-control-static text-danger glyphicon glyphicon-remove': !isValid_password(), 'form-control-static text-success glyphicon glyphicon-ok': isValid_password()}"></span> -->
                                <!-- <span class="" ng-show="errorMsg.password !== ''">{{errorMsg.password}}</span> -->
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">确认密码</label>
                            <div class="col-sm-4">
                                <input type="password" class="form-control" maxlength="30" placeholder="Password" v-model="password2">
                            </div>
                            <div class="col-sm-6">
                                <!-- <span ng-class="{'form-control-static text-danger glyphicon glyphicon-remove': !isValid_password2(), 'form-control-static text-success glyphicon glyphicon-ok': isValid_password2()}"></span> -->
                                <!-- <span class="" ng-show="errorMsg.password !== ''">{{errorMsg.password2}}</span> -->
                            </div>
                        </div>
                        <!-- <div class="form-group" ng-hide="errorMsg.msg === ''">
                            <div class="col-sm-10 col-sm-offset-2">
                                <p class="text-danger">{{errorMsg.msg}}</p>
                            </div>
                        </div> -->
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
    export default {
        name: "Register",
        data() {
            return {
                username: '',
                password: '',
                password2: ''
            }
        },
        methods: {
            register() {
                if(this.password === this.password2) {
                    var user = {
                        username: this.username,
                        password: this.password,
                        level: 1
                    }
                    this.$store.commit('register', user)
                }
            }
        }
    }
</script>

<style>
</style>
