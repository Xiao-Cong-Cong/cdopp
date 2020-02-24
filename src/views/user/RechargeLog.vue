<template>
    <div class="recharge-log">
        <h3>充值记录</h3>
        <Pagination v-model="page" :total="total"></Pagination>
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>#</th>
                    <th>提交时间</th>
                    <th>用户</th>
                    <th>支付宝账户</th>
                    <th>真实姓名</th>
                    <th>金额</th>
                    <th>充值状态</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="log in rechargeLogs" :key="log.pid">
                    <td>{{log.pid}}</td>
                    <td>{{log.submit_time}}</td>
                    <td>{{log.username}}</td>
                    <td>{{log.alipayAccount}}</td>
                    <td>{{log.realname}}</td>
                    <td>{{log.amount}}</td>
                    <td>
                        <span :class="{'text-muted': log.status===status.Pending, 'text-success': log.status===status.Recharged, 'text-danger': log.status===status.Failed}">
                            <span :class="{'glyphicon glyphicon-time': log.status===status.Pending, 'glyphicon glyphicon-ok': log.status===status.Recharged, 'glyphicon glyphicon-remove': log.status===status.Failed}"></span>
                            <span>{{statusArray[log.status]}}</span>
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import api from '../../axios';
    import { EventBus } from '../../EventBus';
    import Pagination from '@/components/Pagination';
    export default {
        name: "RechargeLog",
        components: {
            Pagination
        },
        data() {
            return {
                page: 1,
                total: 1,
                rechargeLogs: [],
                status: {
                    Pending: 0,
                    Recharged: 1,
                    Failed: 2
                },
                statusArray: ['Pending', 'Recharged', 'Failed']
            }
        },
        methods: {
            update() {
                api.payGetLogsByUser({page: this.page}).then(({data}) => {
                    if(data.success) {
                        this.total = Math.ceil(data.total / 10);
                        this.rechargeLogs = data.data;
                    } else {
                        EventBus.$emit('contact-server-failed');
                    }
                })
            }
        },
        mounted() {
            this.update();
        },
        watch: {
            page: function() { this.update(); }
        }
    }
</script>