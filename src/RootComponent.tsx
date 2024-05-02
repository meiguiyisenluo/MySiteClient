import React, { Suspense, useEffect } from 'react'
import { HashRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import { ROUTES, ROUTE } from '@/resources/routes-constants'
import { NavBar, Loading } from 'react-vant'
import './styles/main.sass'
import './styles/vant-custom.css'

const FaceSymmetryLazy = React.lazy(() => import('@/pages/FaceSymmetry/FaceSymmetry'))
const AutoSoundLazy = React.lazy(() => import('@/pages/AutoSound/AutoSound'))
const OmgTVLazy = React.lazy(() => import('@/pages/OmgTV/index'))
const JayLazy = React.lazy(() => import('@/pages/Jay/index'))
const WechatFeatLazy = React.lazy(() => import('@/pages/WechatFeat/index'))
const GuestNumberLazy = React.lazy(() => import('@/pages/GuestNumber/index'))

const TestPageLazy = React.lazy(() => import('@/pages/TestPage/index'))
const BrowserDetectLazy = React.lazy(() => import('@/pages/BrowserDetect/index'))
const BrowserFingerprintLazy = React.lazy(() => import('@/pages/BrowserFingerprint/index'))

const FlowBorderLazy = React.lazy(() => import('@/pages/FlowBorder/index'))
const SudokuLazy = React.lazy(() => import('@/pages/Sudoku/index'))

const RootComponent: React.FC = () => {
    return (
        <Router>
            <Topbar />
            <RoutesList />
        </Router>
    )
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

    return <NavBar fixed={fixed} border={border} title={title} onClickLeft={() => navigate(-1)} />
}

const RoutesList: React.FC = () => {
    return (
        <Routes>
            <Route path="*" element={<NotFoundPage />} />
            <Route path={ROUTES.HOMEPAGE_ROUTE.path} element={<HomePage />} />
            <Route
                path={ROUTES.FACE_SYMMETRY.path}
                element={
                    <Suspense fallback={<CustomLoading />}>
                        <FaceSymmetryLazy />
                    </Suspense>
                }
            />
            <Route
                path={ROUTES.AUTO_SOUND.path}
                element={
                    <Suspense fallback={<CustomLoading />}>
                        <AutoSoundLazy />
                    </Suspense>
                }
            />
            <Route
                path={ROUTES.OMEG_TV.path}
                element={
                    <Suspense fallback={<CustomLoading />}>
                        <OmgTVLazy />
                    </Suspense>
                }
            />
            <Route
                path={ROUTES.WECHAT_FEAT.path}
                element={
                    <Suspense fallback={<CustomLoading />}>
                        <WechatFeatLazy />
                    </Suspense>
                }
            />
            <Route
                path={ROUTES.GUEST_NUMBER.path}
                element={
                    <Suspense fallback={<CustomLoading />}>
                        <GuestNumberLazy />
                    </Suspense>
                }
            />
            <Route
                path={ROUTES.TEST_PAGE.path}
                element={
                    <Suspense fallback={<CustomLoading />}>
                        <TestPageLazy />
                    </Suspense>
                }
            />
            <Route
                path={ROUTES.BROWSER_DETECT.path}
                element={
                    <Suspense fallback={<CustomLoading />}>
                        <BrowserDetectLazy />
                    </Suspense>
                }
            />
            <Route
                path={ROUTES.BROWSER_FINGERPRINT.path}
                element={
                    <Suspense fallback={<CustomLoading />}>
                        <BrowserFingerprintLazy />
                    </Suspense>
                }
            />
            <Route
                path={ROUTES.FLOW_BORDER.path}
                element={
                    <Suspense fallback={<CustomLoading />}>
                        <FlowBorderLazy />
                    </Suspense>
                }
            />
            <Route
                path={ROUTES.SUDOKU.path}
                element={
                    <Suspense fallback={<CustomLoading />}>
                        <SudokuLazy />
                    </Suspense>
                }
            />
            <Route
                path={ROUTES.JAY.path}
                element={
                    <Suspense fallback={<CustomLoading />}>
                        <JayLazy />
                    </Suspense>
                }
            />
        </Routes>
    )
}

const CustomLoading: React.FC = () => {
    return (
        <div className="page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Loading type="ball" />
        </div>
    )
}

export default RootComponent
