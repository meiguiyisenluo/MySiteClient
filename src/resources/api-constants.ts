import CustomAxios from '@/utility/customAxios.ts'

type AxiosData = { [key: string]: string | number }

export const appsession = (data: AxiosData = {}) => {
    return CustomAxios.get('/appsession', data)
}

export const test = (data: AxiosData = {}) => {
    return CustomAxios.get('/test', data)
}
