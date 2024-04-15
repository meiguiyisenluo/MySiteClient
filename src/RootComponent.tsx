import React, { Suspense } from 'react'
import { HashRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import { ROUTES, TITLES } from '@/resources/routes-constants'
import { NavBar, Loading } from 'react-vant'
import './styles/main.sass'
import './styles/vant-custom.css'

const FaceSymmetryLazy = React.lazy(() => import('@/pages/FaceSymmetry/FaceSymmetry'))
const AutoSoundLazy = React.lazy(() => import('@/pages/AutoSound/AutoSound'))
const FlowBorderLazy = React.lazy(() => import('@/pages/FlowBorder/index'))
const OmgTVLazy = React.lazy(() => import('@/pages/OmgTV/index'))

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
    const title = TITLES[location.pathname] || location.pathname
    return <NavBar title={title} onClickLeft={() => navigate(-1)} />
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
                path={ROUTES.FLOW_BORDER.path}
                element={
                    <Suspense fallback={<CustomLoading />}>
                        <FlowBorderLazy />
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
