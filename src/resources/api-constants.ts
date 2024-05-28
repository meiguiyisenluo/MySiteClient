import CustomAxios from '@/utility/customAxios.ts'

type AxiosData = { [key: string]: string | number }

export const youdaoTranslate = (data: AxiosData = {}) => {
    return CustomAxios.post('/youdao/translate', data)
}

export const getIpv4 = (data: AxiosData = {}) => {
    return CustomAxios.post('/networkAbout/ipv4', data)
}

export const dnsResolve = (data: AxiosData = {}) => {
    return CustomAxios.post('/networkAbout/dns-resolve', data)
}

export const csrftoken = (data: AxiosData = {}) => {
    return CustomAxios.get('/csrf-token', data)
}

export const test = (data: AxiosData = {}) => {
    return CustomAxios.get('/test', data)
}
