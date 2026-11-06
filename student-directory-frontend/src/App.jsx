import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Students from './pages/Students';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/students" 
          element={
            <ProtectedRoute>
              <Students />
            </ProtectedRoute>
          } 
        />
        <Route path="/" element={<Navigate to="/students" replace />} />
      </Routes>
    </BrowserRouter>
  );
}