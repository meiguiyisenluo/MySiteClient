
import axios from 'axios'

import { SESSION_STORAGE } from '@/resources/constants'

const CustomAxios = axios.create({
    baseURL: '/clientApi'
})

const toCamelCase: any = (object: any) => {
    let transformedObject = object
    if (typeof object === 'object' && object !== null) {
        if (object instanceof Array) {
            transformedObject = object.map(toCamelCase)
        } else {
            transformedObject = {}
            for (const key in object) {
                if (object[key] !== undefined) {
                    const newKey = key.replace(/(_\w)|(-\w)/g, (k) => k[1].toUpperCase())
                    transformedObject[newKey] = toCamelCase(object[key])
                }
            }
        }
    }
    return transformedObject
}

export const toSnackCase: any = (object: any) => {
    let transformedObject = object
    if (typeof object === 'object' && object !== null) {
        if (object instanceof Array) {
            transformedObject = object.map(toSnackCase)
        } else {
            transformedObject = {}
            for (const key in object) {
                if (object[key] !== undefined) {
                    const newKey = key
                        .replace(/\.?([A-Z]+)/g, function (_, y) {
                            return '_' + y.toLowerCase()
                        })
                        .replace(/^_/, '')
                    transformedObject[newKey] = toSnackCase(object[key])
                }
            }
        }
    }
    return transformedObject
}

CustomAxios.interceptors.response.use(
    (response) => {
        response.data = toCamelCase(response.data)
        return response
    },
    (error) => {
        return Promise.reject(error)
    }
)

CustomAxios.interceptors.request.use(
    (config) => {
        config.data = toSnackCase(config.data)
        config.headers['x-csrf-token'] = window.sessionStorage.getItem(SESSION_STORAGE.csrftoken)
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default CustomAxios
