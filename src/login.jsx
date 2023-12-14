import React, { useState } from 'react';
import { auth } from './firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
// ... (your imports)

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Use signInWithEmailAndPassword from Firebase auth
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Logged in successfully!');
    } catch (error) {
      console.error('Error logging in:', error.message);
       toast.error('User is not authenticated. Please enter valid credentials.');
      // You might want to display an error message to the user here
    }
  };

  return (
    <div className='login-container'>
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <input
          type='email'
          placeholder='Enter Your Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          placeholder='Enter Your password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit'>Login</button>
      </form>
      <ToastContainer/>
    </div>
  );
};

export default Login;
