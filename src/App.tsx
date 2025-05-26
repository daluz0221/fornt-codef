

import './App.css'
import { RegisterLayout } from './components/register/layout'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginLayout } from './components/login/layout';
import { Home } from './components/Home';
import ProtectedRoute from './components/routes/ProtectedRoutes';

function App() {
  

  return (
    <div className="bg-blue-900 text-white min-h-screen flex items-center justify-center">
      <Router>
        <Routes>
          <Route path="/" element={<ProtectedRoute>
            <Home />
          </ProtectedRoute>} />
          <Route path="/register" element={<RegisterLayout />} />
          <Route path="/login"  element={<LoginLayout />} />
          <Route path="*" element={<LoginLayout />} />
        </Routes>
      </Router>

    </div>
  )
}

export default App
