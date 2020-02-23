<template>
    <div class="user-info">
        <h3>用户控制面板</h3>
        <div class="col-md-8">
            <Pagination v-model="page" :total="total"></Pagination>
        </div>
        <div class="col-md-4">
            <div align="right" class="username-search">
                <label>User Name
                    <input type="text" v-model="username">
                </label>
            </div>
        </div>
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>#</th>
                    <th>用户名</th>
                    <th>余额</th>
                    <th>等级</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="log in userLogs" :key="log.uid">
                    <td>{{log.uid}}</td>
                    <td>{{log.username}}</td>
                    <td>{{log.balance}}</td>
                    <td>{{log.level}}</td>
                    <td>op</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import api from '../../axios'
    import Pagination from '@/components/Pagination'
    export default {
        name: "UserInfo",
        components: {
            Pagination
        },
        data() {
            return {
                page: 1,
                total: 1,
                username: '',
                userLogs: []
            }
        },
        methods: {
            getUserInfo() {
                api.userInfo({page: this.page, username: this.username}).then(({data}) => {
                    if(data.success) {
                        console.log(data);
                        this.userLogs = data.data;
                        this.total = Math.ceil(data.total / 10);
                    } else {
                        console.log(data.errorMessage);
                    }
                })
            }
        },
        mounted() {
            this.getUserInfo()
        },
        watch: {
            username: function() { this.getUserInfo(); },
            page: function() { this.getUserInfo(); }
        }
    }
</script>

<style>
    .username-search {
        padding-top: 40px;
    }
</style>
