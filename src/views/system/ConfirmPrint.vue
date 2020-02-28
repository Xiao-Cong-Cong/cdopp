<template>
    <div class="modal fade" id="confirm-print-modal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="container-fluid">
                    <h3>打印确认</h3>
                    <table class="table table-hover">
                        <tbody>
                            <tr>
                                <th>用户名</th>
                                <td>{{log.username}}</td>
                            </tr>
                            <tr>
                                <th>页数</th>
                                <td>{{log.pages}}</td>
                            </tr>
                            <tr>
                                <th>份数</th>
                                <td>{{log.copies}}</td>
                            </tr>
                            <tr>
                                <th>价格</th>
                                <td>{{log.price}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <p align="right">
                        <button class="btn btn-success" @click="print(log.fid)">确认打印</button>
                        <button class="btn btn-danger" @click="cancel(log.fid)">取消打印</button>
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
        name: "ConfirmPrint",
        props: ['log'],
        methods: {
            print(fid) {
                api.fileConfirmById({ fid: fid }).then(({data}) => {
                    $('#confirm-print-modal').modal('hide');
                    if(data.success) {
                        this.$parent.update();
                    } else {
                        console.log(data.errorMessage);
                        EventBus.$emit('contact-server-failed');
                    }
                })
            },
            cancel(fid) {
                api.fileCancelById({ fid: fid }).then(({data}) => {
                    $('#confirm-print-modal').modal('hide');
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