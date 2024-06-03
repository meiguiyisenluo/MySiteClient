import UAParser from 'ua-parser-js'
export const ua = new UAParser().getResult()
export const isMobile = ua.device.type === 'mobile'

export const isProd = process.env.NODE_ENV === 'production'
export const isDebug = !isProd || !(!/eruda=true/.test(window.location.href) && localStorage.getItem('active-eruda') != 'true')
