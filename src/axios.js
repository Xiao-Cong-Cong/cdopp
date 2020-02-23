import axios from 'axios'

const service = axios.create({
    baseURL: '/api',
    timeout: 5000
})

export default {
    userRegister(data) {
        return service.post('/user/register', data);
    },
    userLogin(data) {
        return service.post('/user/login', data);
    },
    userLogout() {
        return service.get('/user/logout');
    },
    userModify(data) {
        return service.post('/user/modify', data);
    },
    userInfo(data) {
        return service.get('/user/info', { params: data });
    },
    userData() {
        return service.get('/user/data');
    },
    fileModifyCopies(data) {
        return service.post('/file/modifyCopies', data);
    },
    fileSubmitPDF(data) {
        return service.post('/file/submitPDF', data);
    },
    fileGetLogsByUser(data) {
        return service.get('/file/getLogsByUser', { params: data });
    },
    fileGetLogsByAdmin(data) {
        return service.get('/file/getLogsByAdmin', { params: data });
    }
}