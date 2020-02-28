<template>
    <div class="print-log">
        <h3>打印记录</h3>
        <div class="col-md-12">
            <Pagination v-model="page" :total="total"></Pagination>
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
                    <th>打印状态</th>
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
                    <td>
                        <span :class="{'text-muted': log.status===status.Submitted, 'text-primary': log.status===status.Permitted, 'text-info': log.status===status.Printing, 'text-success': log.status===status.Printed, 'text-danger': log.status===status.Failed}">
                            <span :class="{'glyphicon glyphicon-upload': log.status===status.Submitted, 'glyphicon glyphicon-check': log.status===status.Permitted, 'glyphicon glyphicon-file': log.status===status.Printing, 'glyphicon glyphicon-ok': log.status===status.Printed, 'glyphicon glyphicon-remove': log.status===status.Failed}"></span>
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
        name: 'Printlog',
        components: {
            Pagination
        },
        data() {
            return {
                page: 1,
                total: 0,
                printLogs: [],
                status: {
                    Submitted: 0,
                    Permitted: 1,
                    Printing: 2,
                    Printed: 3,
                    Failed: 4
                },
                statusArray: ['Submitted', 'Permitted', 'Printing', 'Printed', 'Failed']
            }
        },
        methods: {
            update() {
                api.fileGetLogsByUser({ page: this.page }).then(({data}) => {
                    if(data.success) {
                        this.printLogs = data.data;
                        this.total = Math.ceil(data.total / 10)
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

<style>
</style>