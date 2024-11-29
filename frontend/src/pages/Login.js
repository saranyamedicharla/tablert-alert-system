import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useLogin();
  const navigate = useNavigate(); // Use navigate for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  const handleForgotPassword = () => {
    // Redirect to the forgot password page
    navigate("/forgot-password"); // Use navigate to redirect
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>
      
      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />

      <button disabled={isLoading}>Log in</button>
      
      {error && <div className="error">{error}</div>}

      {/* Forgot Password Link */}
      <div className="forgot-password-link">
        <span onClick={handleForgotPassword} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>
          Forgot Password?
        </span>
      </div>
    </form>
  );
};

export default Login;
