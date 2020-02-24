<template>
    <div class="personal-info">
        <h3>个人信息</h3>
        <hr>
        <form class="form-horizontal" onsubmit="return false;">
            <div class="form-group">
                <label class="col-sm-2 control-label">用户名</label>
                <div class="col-sm-10">
                    <p class="form-control-static">{{user.username}}</p>
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-2 control-label">原始密码</label>
                <div class="col-sm-10">
                    <input type="password" class="form-control" placeholder="如需任何修改信息，请输入原密码" v-model="user.password_old">
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-2 control-label">新密码</label>
                <div class="col-sm-10">
                    <input type="password" class="form-control" maxlength="30" placeholder="不修改则留空" v-model="user.password">
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-2 control-label">确认密码</label>
                <div class="col-sm-10">
                    <input type="password" class="form-control" maxlength="30" placeholder="不修改则留空" v-model="user.password2">
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-10 col-sm-offset-2">
                    <button class="btn btn-primary" @click="changeBasicInfo()">保存修改</button>
                    <div v-show="errorMsg!==''" :class="{'alert alert-danger': !errorMsg_success, 'alert alert-success': errorMsg_success }" role="alert">{{errorMsg}}</div>
                </div>
            </div>
        </form>
        <h3>账户余额</h3>
        <hr>
        <form class="form-horizontal" onsubmit="return false;">
            <div class="form-group">
                <label class="col-sm-2 control-label">&yen; {{user.balance}}</label>
                <div class="col-sm-10">
                    <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#recharge-modal">申请充值</button>
                    <span class="text-primary">&nbsp;&nbsp;<strong>{{rechargeMessage}}</strong></span>
                </div>
            </div>
        </form>
        <Recharge></Recharge>
    </div>
</template>

<script>
    import api from '../../axios';
    import Recharge from './Recharge';
    export default {
        name: "Person",
        components: {
            Recharge
        },
        data() {
            return {
                user: {
					username: this.$store.state.user.username,
                    password: '',
                    password2: '',
					password_old: '',
                    balance: this.$store.state.user.balance,
                },
                errorMsg: '',
                errorMsg_success: false,
                rechargeMessage: '',
                passwordReg: /^[0-9a-zA-Z!@#()_,.]*$/
            }
        },
        methods: {
            changeBasicInfo: function() {
                this.errorMsg_success = false;
                this.errorMsg = '';
                if (this.user.password.length < 5 || this.user.password.length > 30) {
                    this.errorMsg = '新密码长度必须在5~30位';
                } else if(!this.passwordReg.test(this.user.password)) {
                    this.errorMsg = '新密码只能包含数字、字母和!@#()_,.';
                } else if (this.user.password !== this.user.password2) {
                    this.errorMsg = "新密码和确认密码不一样"
                } else {
                    api.userModify(this.user).then(({data}) => {
                        if(data.success) {
                            this.errorMsg_success = true;
                            this.errorMsg = "修改成功";
                            this.user.password = '';
                            this.user.password2 = '';
                            this.user.password_old = '';
                        } else {
                            this.errorMsg = data.errorMessage;
                        }
                    })
                }
            },
            rechargeSuccess() {
                this.rechargeMessage = "提交申请成功";
            }
        }
    }
</script>

<style scoped>

</style>