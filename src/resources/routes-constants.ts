export type RouteObj = { path: string; name: string; authority: boolean }

export const ROUTES: { [key: string]: RouteObj } = {
    HOMEPAGE_ROUTE: { path: '/', name: '首页', authority: false },
    FACE_SYMMETRY: { path: '/faceSymmetry', name: '脸对称测试', authority: true },
    AUTO_SOUND: { path: '/autoSound', name: '速读', authority: true },
    FLOW_BORDER: { path: '/flowBorder', name: '流动边框', authority: true }
}

export const TITLES: { [key: string]: string } = {}

for (const key in ROUTES) {
    const item: RouteObj = ROUTES[key]
    TITLES[item.path] = item.name
}
