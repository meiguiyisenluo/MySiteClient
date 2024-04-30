import UAParser from 'ua-parser-js'
const result = new UAParser().getResult()

const isProd = process.env.NODE_ENV === 'production'
const isDebug = !isProd || !(!/eruda=true/.test(window.location.href) && localStorage.getItem('active-eruda') != 'true')
const isMobile = result.device.type === 'mobile'
console.log('isMobile => ', isMobile)

export type RouteObj = { path: string; name: string; authority: boolean; order: number }

export const ROUTES: { [key: string]: RouteObj } = {
    TEST_PAGE: { path: '/testPage', name: 'testPage', authority: isDebug, order: 0 },
    BROWSER_DETECT: { path: '/browserDetect', name: 'browserDetect', authority: isDebug, order: 0 },
    BROWSER_FINGERPRINT: { path: '/browserFingerprint', name: 'browserFingerprint', authority: isDebug, order: 0 },
    HOMEPAGE_ROUTE: { path: '/', name: '首页', authority: false, order: 9999 },
    FACE_SYMMETRY: { path: '/faceSymmetry', name: '脸对称测试', authority: true, order: 9999 },
    AUTO_SOUND: { path: '/autoSound', name: '速读', authority: true, order: 9999 },
    OMEG_TV: { path: '/omgTv', name: 'OmgTV', authority: true, order: 1 },
    WECHAT_FEAT: { path: '/wechatFeat', name: 'wechatFeat', authority: true, order: 9999 },
    GUEST_NUMBER: { path: '/guestNumber', name: 'guestNumber', authority: true, order: 9999 },
    FLOW_BORDER: { path: '/flowBorder', name: '流动边框', authority: true, order: 9999 },
    SUDOKU: { path: '/sudoku', name: 'sudoku', authority: !isMobile, order: 9999 }
}

export const TITLES: { [key: string]: string } = {}

for (const key in ROUTES) {
    const item: RouteObj = ROUTES[key]
    TITLES[item.path] = item.name
}
