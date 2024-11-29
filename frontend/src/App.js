import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

// pages & components
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';  // New ForgotPassword page
import Navbar from './components/Navbar';

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            {/* Protected Route for Home */}
            <Route 
              path="/" 
              element={user ? <Home /> : <Navigate to="/login" />} 
            />
            
            {/* Login Route */}
            <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/" />} 
            />
            
            {/* Signup Route */}
            <Route 
              path="/signup" 
              element={!user ? <Signup /> : <Navigate to="/" />} 
            />
            
            {/* Forgot Password Route */}
            <Route 
              path="/forgot-password" 
              element={<ForgotPassword />} 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;