import axios from 'axios'
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


