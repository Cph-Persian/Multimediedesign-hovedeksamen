/**
 * App.jsx — appens routing-tabel.
 */

import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import ChatPage from './pages/ChatPage.jsx'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'

// Lille helper der reducerer gentagelse: ALLE beskyttede sider deler det
// samme Layout-wrapper og samme auth-tjek. I stedet for at gentage
// <ProtectedRoute><Layout>...</Layout></ProtectedRoute> for hver rute,
// laver vi denne wrapper én gang.
function Protected({ children }) {
  return (
    <ProtectedRoute>
      <Layout>{children}</Layout>
    </ProtectedRoute>
  )
}

export default function App() {
  return (
    <Routes>
      {/* Offentlige sider — ingen auth-tjek */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/opret" element={<RegisterPage />} />

      {/* Beskyttede sider — kræver login */}
      <Route path="/"              element={<Protected><HomePage /></Protected>} />
      <Route path="/chat"          element={<Protected><ChatPage /></Protected>} />
      <Route path="/indstillinger" element={<Protected><SettingsPage /></Protected>} />

      {/* Gamle URL'er forwarded så bookmark'ede links ikke brækker */}
      <Route path="/fag"          element={<Navigate to="/chat" replace />} />
      <Route path="/fag/:rest"    element={<Navigate to="/chat" replace />} />
      <Route path="/laeringskort" element={<Navigate to="/" replace />} />
      <Route path="*"             element={<Navigate to="/" replace />} />
    </Routes>
  )
}
