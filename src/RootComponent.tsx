import React from 'react'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import FaceSymmetry from './pages/FaceSymmetry/FaceSymmetry'
import NotFoundPage from './pages/NotFoundPage'
import { ROUTES } from './resources/routes-constants'
import './styles/main.sass'

const RootComponent: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="*" element={<NotFoundPage />} />
                <Route path={ROUTES.HOMEPAGE_ROUTE} element={<HomePage />} />
                <Route path="/faceSymmetry" element={<FaceSymmetry />} />
            </Routes>
        </Router>
    )
}

export default RootComponent
