

import './App.css'
import { RegisterLayout } from './components/register/layout'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginLayout } from './components/login/layout';
import { Home } from './components/Home';
import ProtectedRoute from './components/routes/ProtectedRoutes';
import { ValidateEmailLayout } from './components/validateEmail/layout';
import { UpdateEmail } from './components/admin/updatedInfo/email/updateEmail';
import { UpdateProfileData } from './components/admin/updatedInfo/profile/UpdateProfileData';
import { UpdatePassword } from './components/admin/updatedInfo/password/updatePassword';


function App() {


  return (
    <div className="bg-blue-900 text-white min-h-screen flex items-center justify-center">
      <Router>
        <Routes>
          <Route path="/" element={<ProtectedRoute>
            <Home /></ProtectedRoute>} />
          <Route path="/update-email" element={<ProtectedRoute>
            <UpdateEmail />
            </ProtectedRoute>} />

          <Route path="/update-password" element={<ProtectedRoute>
            <UpdatePassword />
            </ProtectedRoute>} />

          <Route path="/update-profile" element={<ProtectedRoute>
            <UpdateProfileData />
            </ProtectedRoute>} />

          <Route path="/register" element={<RegisterLayout />} />
          <Route path="/login" element={<LoginLayout />} />
          <Route path="/validar-email" element={<ValidateEmailLayout />} />
          <Route path="*" element={<LoginLayout />} />
        </Routes>
      </Router>

    </div>
  )
}

export default App
