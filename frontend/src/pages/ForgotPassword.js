import { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state
    setSuccess(null); // Reset success state
    setLoading(true); // Start loading state

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    // Validate password fields
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    // Add your logic to handle forgot password request
    try {
      console.log(`Forgot password request for email: ${email}`);
      // Example API call (uncomment and modify as needed)
      // const response = await fetch('/api/reset-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, newPassword }),
      // });
      // const json = await response.json();
      // if (!response.ok) throw new Error(json.error);
      
      // Set success message (uncomment when using API)
      setSuccess('Your password has been successfully changed. You can now log in with your new password.');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <form className="forgot-password" onSubmit={handleSubmit}>
      <h3>Change Password</h3>
      
      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
        required // Ensures the field is required
      />
      
      <label>New Password:</label>
      <input 
        type="password" 
        onChange={(e) => setNewPassword(e.target.value)} 
        value={newPassword} 
        required // Ensures the field is required
      />
      
      <label>Confirm Password:</label>
      <input 
        type="password" 
        onChange={(e) => setConfirmPassword(e.target.value)} 
        value={confirmPassword} 
        required // Ensures the field is required
      />
      
      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Change Password'}
      </button>

      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
    </form>
  );
};

export default ForgotPassword;
