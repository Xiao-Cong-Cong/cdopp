<template>
    <div class="print-task">
        <h3>打印控制面板&nbsp;&nbsp;<small>非特殊情况管理员不要在此操作打印</small></h3>
        <div class="col-md-6">
            <Pagination v-model="page" :total="total"></Pagination>
        </div>
        <div class="col-md-6">
            <div align="right" class="print-task-search">
                <label>User Name
                    <input type="text" v-model="search.username">
                </label>
                <label>Status
                    <div class="btn-group">
                        <label :class="{active: search.Submitted, 'btn btn-primary btn-xs': true}" btn-checkbox @click="search.Submitted = !search.Submitted">Submitted</label>
                        <label :class="{active: search.Permitted, 'btn btn-primary btn-xs': true}" btn-checkbox @click="search.Permitted = !search.Permitted">Permitted</label>
                        <label :class="{active: search.Printing, 'btn btn-primary btn-xs': true}" btn-checkbox @click="search.Printing = !search.Printing">Printing</label>
                        <label :class="{active: search.Printed, 'btn btn-primary btn-xs': true}" btn-checkbox @click="search.Printed = !search.Printed">Printed</label>
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
                    <th>页数</th>
                    <th>份数</th>
                    <th>价格</th>
                    <!-- <th>打印机</th> -->
                    <th>打印状态</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="log in printLogs" :key="log.fid">
                    <td>{{log.fid}}</td>
                    <td>{{log.submit_time}}</td>
                    <td>{{log.username}}</td>
                    <td>{{log.pages}}</td>
                    <td>{{log.copies}}</td>
                    <td>{{log.price}}</td>
                    <!-- <td>{{log.printerInfo.location}}</td> -->
                    <td>
                        <span :class="{'text-muted': log.status===status.Submitted, 'text-primary': log.status===status.Permitted, 'text-info': log.status===status.Printing, 'text-success': log.status===status.Printed, 'text-danger': log.status===status.Failed}">
                            <span :class="{'glyphicon glyphicon-upload': log.status===status.Submitted, 'glyphicon glyphicon-check': log.status===status.Permitted, 'glyphicon glyphicon-file': log.status===status.Printing, 'glyphicon glyphicon-ok': log.status===status.Printed, 'glyphicon glyphicon-remove': log.status===status.Failed}"></span>
                            <span>{{statusArray[log.status]}}</span>
                        </span>
                    </td>
                    <td>
                        <a href="javascript:" ng-click="confirmPrintSubmitted($index)"><span class="glyphicon glyphicon-file"></span><span>operation</span></a>
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
        name: "PrintTask",
        components: {
            Pagination
        },
        data() {
            return {
                page: 1,
                total: 10,
                printLogs: [],
                search: {
                    status: [0, 1, 2, 3, 4],
                    username: '',
                    Submitted: true,
                    Permitted: true,
                    Printing: true,
                    Printed: true,
                    Failed: true
                },
                status: {
                    Submitted: 0,
                    Permitted: 1,
                    Printing: 2,
                    Printed: 3,
                    Failed: 4
                },
                statusArray: ['Submitted', 'Permitted', 'Printing', 'Printed', 'Failed'],
            }
        },
        methods: {
            update() {
                api.fileGetLogsByAdmin({ page: this.page, username: this.search.username, status: this.search.status})
                   .then(({data}) => {
                    if(data.success) {
                        this.printLogs = data.data;
                        this.total = Math.ceil(data.total / 10);
                    } else {
                        console.log(data.errorMessage);
                        EventBus.$emit('contact-server-failed');
                    }
                })
            },
            updateStatus() {
                this.search.status = [];
                for(var i = 0; i <= 4; i++)
                    if(this.search[this.statusArray[i]])
                        this.search.status.push(i);
            }
        },
        mounted() {
            this.update();
        },
        watch: {
            page: function() { this.update(); },
            'search.username': function() { this.update(); },
            'search.Submitted': function() { this.updateStatus(); this.update(); },
            'search.Permitted': function() { this.updateStatus(); this.update(); },
            'search.Printing': function() { this.updateStatus(); this.update(); },
            'search.Printed': function() { this.updateStatus(); this.update(); },
            'search.Failed': function() { this.updateStatus(); this.update(); }
        }
    }
</script>

<style scoped>
    .print-task-search {
        padding-top: 20px;
    }
</style>