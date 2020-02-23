<template>
    <div class="user-info">
        <h3>用户控制面板</h3>
        <div>
            <!-- <pagination boundary-links="true" total-items="userLogs.total_items" items-per-page="10" max-size="10" v-model="userLogs_currentPage" class="pagination-sm" previous-text="&lsaquo;" next-text="&rsaquo;" first-text="&laquo;" last-text="&raquo;"></pagination> -->
        </div>
        <div align="right">
            <label>User Name
                <input type="text" v-model="userLogs.userName">
            </label>
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
                <tr v-for="log in userLogs.data" :key="log.uid">
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
    export default {
        name: "UserInfo",
        data() {
            return {
                userLogs: {
                    data: [],
                    userName: ''
                },
                log: {
                    uid: '',
                    userName: '',
                    balance: '',
                    level: ''
                },
                userLogs_currentPage: 0
            }
        },
        methods: {
            getUserInfo() {
                api.userInfo().then(({data}) => {
                    if(data.success) {
                        console.log(data);
                        this.userLogs.data = data.data;
                    } else {
                        console.log(data.errorMessage);
                    }
                })
            }
        },
        mounted() {
            this.getUserInfo()
        }
    }
</script>

<style>
</style>
