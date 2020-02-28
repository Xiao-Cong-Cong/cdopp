<template>
    <div class="modal fade" id="confirm-recharge-modal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="container-fluid">
                    <h3>充值确认</h3>
                    <table class="table table-hover">
                        <tbody>
                            <tr>
                                <th>用户名</th>
                                <td>{{log.username}}</td>
                            </tr>
                            <tr>
                                <th>支付宝账户</th>
                                <td>{{log.alipayAccount}}</td>
                            </tr>
                            <tr>
                                <th>真实姓名</th>
                                <td>{{log.realname}}</td>
                            <tr>
                                <th>金额</th>
                                <td>{{log.amount}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <p align="right">
                        <button class="btn btn-success" @click="recharge(log.pid)">确认充值</button>
                        <button class="btn btn-danger" @click="cancel(log.pid)">取消充值</button>
                        <button class="btn btn-default" data-dismiss="modal">关闭窗口</button>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import api from '../../axios';
    import { EventBus } from '../../EventBus';
    export default {
        name: "ConfirmRecharge",
        props: ['log'],
        methods: {
            recharge(pid, username) {
                api.payConfirm({ pid: pid }).then(({data}) => {
                    $('#confirm-recharge-modal').modal('hide');
                    if(data.success) {
                        this.$parent.update();
                    } else {
                        console.log(data.errorMessage);
                        EventBus.$emit('contact-server-failed');
                    }
                })
            },
            cancel(pid) {
                api.payCancel({ pid: pid }).then(({data}) => {
                    $('#confirm-recharge-modal').modal('hide');
                    if(data.success) {
                        this.$parent.update();
                    } else {
                        console.log(data.errorMessage);
                        EventBus.$emit('contact-server-failed');
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .btn {
        margin-right: 5px;
    }
</style>