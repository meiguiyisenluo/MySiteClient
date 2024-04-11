import React, { Suspense } from 'react'
import { HashRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import { ROUTES, TITLES } from './resources/routes-constants'
import { NavBar } from 'react-vant'
import './styles/main.sass'
import './styles/vant-custom.css'

const FaceSymmetryLazy = React.lazy(() => import('./pages/FaceSymmetry/FaceSymmetry'))

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
            <Route path={ROUTES.HOMEPAGE_ROUTE} element={<HomePage />} />
            <Route
                path={ROUTES.FACE_SYMMETRY}
                element={
                    <Suspense fallback="loading...">
                        <FaceSymmetryLazy />
                    </Suspense>
                }
            />
        </Routes>
    )
}

export default RootComponent
