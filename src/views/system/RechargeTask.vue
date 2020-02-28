<template>
    <div class="recharge-task">
        <h3>充值控制面板</h3>
        <div class="col-md-5">
            <Pagination v-model="page" :total="total"></Pagination>
        </div>
        <div class="col-md-7">
            <div align="right" class="recharge-task-search">
                <label>User Name
                    <input type="text" v-model="search.username">
                </label>
                <label>Status
                    <div class="btn-group">
                        <label :class="{active: search.Pending, 'btn btn-primary btn-xs': true}" btn-checkbox @click="search.Pending = !search.Pending">Pending</label>
                        <label :class="{active: search.Recharged, 'btn btn-primary btn-xs': true}" btn-checkbox @click="search.Recharged = !search.Recharged">Recharged</label>
                        <label :class="{active: search.Failed, 'btn btn-primary btn-xs': true}" btn-checkbox @click="search.Failed = !search.Failed">Failed</label>
                    </div>
                </label>
            </div>
        </div>
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
                    <th>操作</th>
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
                    <td>
                        <a v-show="log.status===status.Pending" href="javascript:" @click="confirmRechargePending(log)"><span class="glyphicon glyphicon-file"></span> confirm</a>
                    </td>
                </tr>
            </tbody>
        </table>
        <ConfirmRecharge :log="log"></ConfirmRecharge>
    </div>
</template>

<script>
    import Pagination from '@/components/Pagination';
    import ConfirmRecharge from './ConfirmRecharge';
    import { EventBus } from '../../EventBus';
    import api from '../../axios';
    import $ from 'jquery';
    export default {
        name: "rechargeTask",
        components: {
            Pagination,
            ConfirmRecharge
        },
        data() {
            return {
                page: 1,
                total: 1,
                rechargeLogs: [],
                search: {
                    status: [0, 1, 2],
                    username: '',
                    Pending: true,
                    Recharged: true,
                    Failed: true
                },
                status: {
                    Pending: 0,
                    Recharged: 1,
                    Failed: 2
                },
                statusArray: ['Pending', 'Recharged', 'Failed'],
                log: {}
            }
        },
        methods: {
            update() {
                api.payGetLogsByAdmin({ page: this.page, username: this.search.username, status: this.search.status})
                   .then(({data}) => {
                    if(data.success) {
                        this.rechargeLogs = data.data;
                        this.total = Math.ceil(data.total / 10);
                    } else {
                        console.log(data.errorMessage);
                        EventBus.$emit('contact-server-failed');
                    }
                })
            },
            updateStatus() {
                this.search.status = [];
                for(var i = 0; i <= 2; i++)
                    if(this.search[this.statusArray[i]])
                        this.search.status.push(i);
            },
            confirmRechargePending(log) {
                this.log = log;
                $('#confirm-recharge-modal').modal('show');
            }
        },
        mounted() {
            this.update();
        },
        watch: {
            page: function() { this.update(); },
            'search.username': function() { this.update(); },
            'search.Pending': function() { this.updateStatus(); this.update(); },
            'search.Recharged': function() { this.updateStatus(); this.update(); },
            'search.Failed': function() { this.updateStatus(); this.update(); }
        }
    }
</script>

<style scoped>
    .recharge-task-search {
        padding-top: 40px;
    }
</style>