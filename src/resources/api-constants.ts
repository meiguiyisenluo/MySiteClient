import CustomAxios from '@/utility/customAxios.ts'

type AxiosData = { [key: string]: string | number }

export const csrftoken = (data: AxiosData = {}) => {
    return CustomAxios.get('/csrf-token', data)
}

export const test = (data: AxiosData = {}) => {
    return CustomAxios.get('/test', data)
}
