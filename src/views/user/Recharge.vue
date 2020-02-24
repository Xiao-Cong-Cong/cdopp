<template>
    <div class="modal fade" id="recharge-modal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h3>充值申请表</h3>
                </div>
                <div class="modal-body">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-sm-3">
                                <img src="../../../public/QRCode.png" width="100%">
                            </div>
                            <div class="col-sm-9">
                                <form class="form-horizontal" onsubmit="return false;">
                                    <div class="form-group">
                                        <label class="col-sm-3 control-label">充值金额</label>
                                        <div class="col-sm-9">
                                            <input type="number" min="1" class="form-control" v-model="amount">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-3 control-label">支付宝账户</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" maxlength="100" v-model="alipayAccount">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-3 control-label">真实姓名</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" maxlength="10" v-model="realname">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="col-sm-9 col-sm-offset-3">
                                            <p class="form-control-static" style="color: red"><b>请先填写充值申请，再用支付宝转账，转账成功后24小时内处理充值申请</b></p>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="form-group">
                        <div class="col-sm-9 col-sm-offset-3">
                            <button type="button" :class="{'btn btn-danger': true, 'disabled': recharging}" @click="recharge">充值</button>
                            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import api from '../../axios'
    import $ from 'jquery'
    export default {
        name: "Recharge",
        data() {
            return {
                amount: 1,
                realname: '',
                alipayAccount: '',
                recharging: false
            }
        },
        methods: {
            recharge() {
                this.recharging = true;
                api.payRecharge({ 
                    realname: this.realname,
                    alipayAccount: this.alipayAccount,
                    amount: this.amount}).then(({data}) => {
                        if(data.success) {
                            this.amount = 1;
                            this.recharging = false;
                            $('#recharge-modal').modal('hide');
                            this.$parent.rechargeSuccess();
                        } else {
                            alert(data.errorMessage);
                        }
                })
            }
        },
        mounted() {
            api.payData().then(({data}) => {
                if(data.success) {
                    if(data.realname) this.realname = data.realname;
                    if(data.alipayAccount) this.alipayAccount = data.alipayAccount;
                }
            })
        }
    }
</script>