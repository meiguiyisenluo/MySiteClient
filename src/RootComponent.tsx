import React, { useEffect } from 'react'
import { RouterProvider, createHashRouter, useLocation, useNavigate, RouteObject, Outlet } from 'react-router-dom'
import HomePage from '@/pages/HomePage/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import { NavBar, Loading, Button } from 'react-vant'
import { GoodJobO } from '@react-vant/icons'
import './styles/main.sass'
import './styles/vant-custom.css'

import { useAppDispatch } from '@/store/reducers/store'
import { setBrowserInfo } from '@/store/actions/data'

import { isDebug, isMobile, ua } from '@/utility/env'

export type RouteObj = RouteObject & {
    path: string
    name: string
    authority: boolean
    order: number
    vantCssVars?: { [key: string]: string }
    fixed?: boolean
    border?: boolean
    showName?: boolean
}

export const ROUTES: Array<RouteObj> = [
    { path: '/statistics', name: '数据', authority: isDebug, order: 0, lazy: async () => import('@/pages/Statistics/index') },
    { path: '/testPage', name: '测试', authority: isDebug, order: 0, lazy: () => import('@/pages/TestPage/index') },
    { path: '/browserDetect', name: '浏览器检测', authority: isDebug, order: 0, lazy: () => import('@/pages/BrowserDetect/index') },
    { path: '/browserFingerprint', name: '浏览器指纹', authority: isDebug, order: 0, lazy: () => import('@/pages/BrowserFingerprint/index') },
    { path: '/networkAbout', name: '网络测试', authority: isDebug, order: 0, lazy: async () => import('@/pages/NetWorkAbout/index') },
    {
        path: '/',
        name: '首页',
        authority: true,
        order: 9999,
        element: <HomePage />,
        // showName: false,
        fixed: true,
        border: false,
        vantCssVars: {
            '--rv-nav-bar-background-color': 'transparent'
        }
    },
    { path: '/gerensuodeshui', name: '个税计算器', authority: true, order: 9999, lazy: () => import('@/pages/Gerensuodeshui/index') },
    { path: '/faceSymmetry', name: '脸对称测试', authority: true, order: 9999, lazy: () => import('@/pages/FaceSymmetry/FaceSymmetry') },
    { path: '/autoSound', name: '速读', authority: true, order: 9999, lazy: () => import('@/pages/AutoSound/AutoSound') },
    { path: '/fanyi', name: '翻译', authority: true, order: 9999, lazy: () => import('@/pages/Fanyi/index') },
    { path: '/wechatFeat', name: '微信功能', authority: true, order: 9999, lazy: () => import('@/pages/WechatFeat/index') },
    { path: '/guestNumber', name: '猜数字', authority: true, order: 9999, lazy: () => import('@/pages/GuestNumber/index') },
    { path: '/flowBorder', name: '流动边框', authority: true, order: 9999, lazy: () => import('@/pages/FlowBorder/index') },
    { path: '/sudoku', name: '九宫格', authority: !isMobile, order: 9999, lazy: () => import('@/pages/Sudoku/index') },
    { path: '/randomTree', name: '随机树', authority: true, order: 9999, lazy: () => import('@/pages/RandomTree/index') },
    {
        path: '/randomTree2',
        name: '随机树2',
        authority: true,
        order: 9999,
        lazy: () => import('@/pages/RandomTree2/index'),
        showName: false,
        fixed: true,
        border: false,
        vantCssVars: {
            '--rv-nav-bar-background-color': 'transparent',
            '--rv-nav-bar-icon-color': '#fff',
            '--rv-nav-bar-title-text-color': '#fff'
        }
    },
    { path: '/ballAnimation', name: '悬浮球动画', authority: true, order: 9999, lazy: () => import('@/pages/BallAnimation/index') },
    { path: '/scrollSnapType', name: 'scrollSnapType轮播图', authority: true, order: 9999, lazy: () => import('@/pages/ScrollSnapType/index') },
    { path: '/svgStrokeAnimation', name: 'svg描边动画', authority: true, order: 9999, lazy: () => import('@/pages/SvgStrokeAnimation/index') },
    { path: '/categoryStyle', name: '通讯录分类效果', authority: true, order: 9999, lazy: () => import('@/pages/CategoryStyle/index') },
    { path: '/xiaomisu7', name: '小米SU7', authority: true, order: 9999, lazy: () => import('@/pages/MISU7/index') },
    {
        path: '/IKE',
        name: '艾克',
        authority: true,
        order: 9999,
        lazy: () => import('@/pages/IKE/index'),
        showName: false,
        fixed: true,
        border: false,
        vantCssVars: {
            '--rv-nav-bar-background-color': 'transparent',
            '--rv-nav-bar-icon-color': '#fff',
            '--rv-nav-bar-title-text-color': '#fff'
        }
    },
    { path: '/omgTv', name: 'OmgTV', authority: true, order: 1, lazy: () => import('@/pages/OmgTV/index') },
    {
        path: '/nitingdedao',
        order: 1,
        name: '你听得到',
        authority: true,
        showName: false,
        fixed: true,
        border: false,
        vantCssVars: {
            '--rv-nav-bar-background-color': 'transparent',
            '--rv-nav-bar-icon-color': '#fff',
            '--rv-nav-bar-title-text-color': '#fff'
        },
        lazy: () => import('@/pages/Nitingdedao/index')
    },
    {
        path: '/sassStar',
        name: 'Sass 星空',
        authority: true,
        order: 1,
        lazy: () => import('@/pages/SassStar/index'),
        showName: false,
        fixed: true,
        border: false,
        vantCssVars: {
            '--rv-nav-bar-background-color': 'transparent',
            '--rv-nav-bar-icon-color': '#fff',
            '--rv-nav-bar-title-text-color': '#fff'
        }
    },
    {
        path: '/particleJS',
        name: 'ParticleJS',
        authority: true,
        order: 1,
        lazy: () => import('@/pages/ParticleJS/index'),
        showName: false,
        fixed: true,
        border: false,
        vantCssVars: {
            '--rv-nav-bar-background-color': 'transparent',
            '--rv-nav-bar-icon-color': '#fff',
            '--rv-nav-bar-title-text-color': '#fff'
        }
    }
]

const ROUTE: { [key: string]: RouteObj } = {}

for (const key in ROUTES) {
    const item: RouteObj = ROUTES[key]
    ROUTE[item.path] = item
}

const RootComponent: React.FC = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(setBrowserInfo(ua))
    }, [dispatch])
    return <RouterProvider router={router} fallbackElement={<CustomLoading />} />
}

const Topbar: React.FC = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const route = ROUTE[location.pathname]

    const fixed = route.fixed ?? false
    const border = route.border ?? true
    const showName = route.showName ?? true
    const title = showName ? route.name ?? location.pathname : ''

    document.title = route.name

    useEffect(() => {
        const vantCssVars = route.vantCssVars ?? {}
        for (const key in vantCssVars) {
            document.documentElement.style.setProperty(key, vantCssVars[key])
        }
        return () => {
            for (const key in vantCssVars) {
                document.documentElement.style.removeProperty(key)
            }
        }
    }, [route])

    return <NavBar zIndex={9999} fixed={fixed} border={border} title={title} onClickLeft={() => navigate(-1)} rightText={<GoodJobO fontSize={20} onPointerEnterCapture onPointerLeaveCapture />} onClickRight={()=>window.open(window._githubSrc)} />
}

const CustomLoading: React.FC = () => {
    return (
        <div className="page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Loading type="ball" />
        </div>
    )
}

const NoAuthority: React.FC<{ tips?: string }> = ({ tips }) => {
    const navigate = useNavigate()
    return (
        <div className="page" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{tips ?? 'NoAuthority'}</div>
            <br />
            <Button type="primary" onClick={() => navigate('/')}>
                back to home
            </Button>
        </div>
    )
}

const ErrorElement: React.FC = () => {
    const navigate = useNavigate()
    return (
        <div className="page" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>something run wrong...</div>
            <br />
            <Button type="primary" onClick={() => navigate('/')}>
                back to home
            </Button>
        </div>
    )
}

export const router = createHashRouter([
    { path: '*', element: <NotFoundPage /> },
    {
        element: (
            <>
                <Topbar />
                <Outlet />
            </>
        ),
        children: [
            ...ROUTES.map((route) => {
                const routeObj: RouteObject = {
                    path: route.path,
                    errorElement: <ErrorElement />
                }
                if (route.authority) {
                    if (route.element) routeObj.element = route.element
                    if (route.lazy) routeObj.lazy = route.lazy
                } else {
                    routeObj.element = <NoAuthority />
                }
                return routeObj
            })
        ]
    }
])

export default RootComponent
