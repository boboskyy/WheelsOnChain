import '@mantine/core/styles.css'
import { TemplateUserView } from './components/common/TemplateUserView'
import CarPage from './pages/car-page/CarPage'
import LandingPage from './pages/landing-page/LandingPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Notifications } from '@mantine/notifications'
import LoginPage from './pages/admin-page/LoginPage'
import AdminPage from './pages/admin-page/AdminPage'
import RequireAuth from './app/router/RequireAuth'

function App() {
  return (
    <Router>
      <TemplateUserView>
        <Notifications />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/car/:carId" element={<CarPage />} />
          <Route path="/admin" element={<LoginPage />} />
          <Route path="/admin/panel" element={<RequireAuth />}>
            <Route index element={<AdminPage />} />
          </Route>
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </TemplateUserView>
    </Router>
  )
}

export default App
