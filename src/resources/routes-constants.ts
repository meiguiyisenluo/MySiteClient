export type RouteObj = { path: string; name: string; authority: boolean; order: number }

export const ROUTES: { [key: string]: RouteObj } = {
    HOMEPAGE_ROUTE: { path: '/', name: '首页', authority: false, order: 9999 },
    FACE_SYMMETRY: { path: '/faceSymmetry', name: '脸对称测试', authority: true, order: 9999 },
    AUTO_SOUND: { path: '/autoSound', name: '速读', authority: true, order: 9999 },
    FLOW_BORDER: { path: '/flowBorder', name: '流动边框', authority: true, order: 9999 },
    OMEG_TV: { path: '/omgTv', name: 'OmgTV', authority: true, order: 1 }
}

export const TITLES: { [key: string]: string } = {}

for (const key in ROUTES) {
    const item: RouteObj = ROUTES[key]
    TITLES[item.path] = item.name
}
