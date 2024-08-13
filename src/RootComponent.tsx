import * as React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import { ROUTES } from './resources/constants/routes-constants'
import './styles/main.scss'
import DashboardPage from './pages/Dashboard/Dashboard'

const RootComponent: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="*" element={<NotFoundPage />} />
                <Route path={ROUTES.HOMEPAGE_ROUTE} element={<DashboardPage />} />
            </Routes>
        </Router>
    )
}

export default RootComponent
