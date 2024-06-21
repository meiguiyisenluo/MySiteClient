import axios from 'axios'

import { SESSION_STORAGE } from '@/resources/constants'

const CustomAxios = axios.create({
    baseURL: '/clientApi'
})

CustomAxios.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (['/report'].includes(error.config.url)) return Promise.resolve()
        return Promise.reject(error)
    }
)

CustomAxios.interceptors.request.use(
    (config) => {
        config.headers['x-csrf-token'] = window.sessionStorage.getItem(SESSION_STORAGE.csrftoken)
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default CustomAxios
