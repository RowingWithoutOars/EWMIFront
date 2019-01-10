import axios from 'axios'
// axios.defaults.baseURL = 'http://139.180.214.182:8080/EWMIS/'
axios.defaults.baseURL = 'http://localhost:8080/'

export const listData = params => {
    return axios.post('/data/listData', params).then(
        res => res.data
    )
}

export const listSingleData = params => {
    return axios.post('/data/listSingleData', params).then(
        res => res.data
    )
}

export const statisticData = params => {
    return axios.post('/data/statisticData', params).then(
        res => res.data
    )
}

export const listUsers = params => {
    return axios.post('/user/listusers', params).then(
        res => res.data
    )
}

export const adduser = params => {
    return axios.post('/user/adduser', params).then(
        res => res.data
    )
}

export const deluser = params => {
    return axios.post('/user/deluser', params).then(
        res => res.data
    )
}

export const updateuser = params => {
    return axios.post('/user/updateuser', params).then(
        res => res.data
    )
}

export const requestLogin = params => {
    return axios.post('/user/login', params).then(
        res => res.data
    )
}
