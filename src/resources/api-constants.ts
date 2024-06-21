import CustomAxios from '@/utility/customAxios.ts'

// type AxiosData = { [key: string]: string | number }

// -------------------- test start -----------------------------
export const testApi1 = () => {
    return CustomAxios({
        url: '/ipv4',
        method: 'get'
    })
}
// -------------------- test end -----------------------------
// 埋点
export const report = (data: { event: 'total_pv' }) => {
    return CustomAxios({
        url: '/report',
        method: 'post',
        data
    })
}
// 统计数据
export const statistics = () => {
    return CustomAxios({
        url: '/statistics',
        method: 'get'
    })
}

// 翻译
export const mymemoryTranslate = (params: { text: string; langpair: string }) => {
    return CustomAxios({
        url: '/fanyi/translate',
        method: 'get',
        params
    })
}

// 网络
export const getIpv4 = () => {
    return CustomAxios({
        url: '/networkAbout/ipv4',
        method: 'get'
    })
}

export const dnsResolve = (data: { hostname: string }) => {
    return CustomAxios({
        url: '/networkAbout/dns-resolve',
        method: 'get',
        params: data
    })
}

// csrf
export const csrftoken = () => {
    return CustomAxios({
        url: '/csrf-token',
        method: 'get'
    })
}
