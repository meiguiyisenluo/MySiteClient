import UAParser from 'ua-parser-js'
const result = new UAParser().getResult()

const isProd = process.env.NODE_ENV === 'production'
const isDebug = !isProd || !(!/eruda=true/.test(window.location.href) && localStorage.getItem('active-eruda') != 'true')
const isMobile = result.device.type === 'mobile'
console.log('isMobile => ', isMobile)

export type RouteObj = {
    path: string
    name: string
    authority: boolean
    order: number
    vantCssVars?: { [key: string]: string }
    fixed?: boolean
    border?: boolean
    showName?: boolean
}

export const ROUTES: { [key: string]: RouteObj } = {
    TEST_PAGE: { path: '/testPage', name: '测试', authority: isDebug, order: 0 },
    BROWSER_DETECT: { path: '/browserDetect', name: '浏览器检测', authority: isDebug, order: 0 },
    BROWSER_FINGERPRINT: { path: '/browserFingerprint', name: '浏览器指纹', authority: isDebug, order: 0 },
    HOMEPAGE_ROUTE: { path: '/', name: '首页', authority: false, order: 9999 },
    FACE_SYMMETRY: { path: '/faceSymmetry', name: '脸对称测试', authority: true, order: 9999 },
    AUTO_SOUND: { path: '/autoSound', name: '速读', authority: true, order: 9999 },
    OMEG_TV: { path: '/omgTv', name: 'OmgTV', authority: true, order: 1 },
    WECHAT_FEAT: { path: '/wechatFeat', name: '微信功能', authority: true, order: 9999 },
    GUEST_NUMBER: { path: '/guestNumber', name: '猜数字', authority: true, order: 9999 },
    FLOW_BORDER: { path: '/flowBorder', name: '流动边框', authority: true, order: 9999 },
    SUDOKU: { path: '/sudoku', name: '九宫格', authority: !isMobile, order: 9999 },
    JAY: {
        path: '/jay',
        order: 1,
        name: '周杰伦',
        authority: !isMobile,
        showName: false,
        fixed: true,
        border: false,
        vantCssVars: {
            '--rv-nav-bar-background-color': 'transparent',
            '--rv-nav-bar-icon-color': '#fff',
            '--rv-nav-bar-title-text-color': '#fff'
        }
    }
}

export const ROUTE: { [key: string]: RouteObj } = {}

for (const key in ROUTES) {
    const item: RouteObj = ROUTES[key]
    ROUTE[item.path] = item
}
