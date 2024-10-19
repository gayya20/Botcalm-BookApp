import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import imge from '../compornents/bok4.jpg'

function Login() {
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/auth/login', { username, password })
      .then((response) => {
        const accessToken = response.data.accessToken; // Get access token from the response
        const refreshToken = response.data.refreshToken; // Get refresh token from the response
        localStorage.setItem('accessToken', accessToken); // Store the access token
        localStorage.setItem('refreshToken', refreshToken); // Store the refresh token
        localStorage.setItem('username',username)
        navigate('/books'); // Redirect to the books page
        console.log(accessToken)
      })
      .catch((error) => {
        console.error("Login error", error);
      });
  };

  return (
    <div className="container mx-auto mt-16 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-xl overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row">
          {/* Image Side */}
          <div className="md:w-3/5 bg-cover bg-center h-80 md:h-auto" style={{backgroundImage:`url(${imge})`}}>
            {/* <div className="w-full h-full flex flex-col justify-center items-center   text-white p-12">
              <h2 className="text-4xl font-bold mb-6 text-center">Welcome to BookExpress</h2>
              <p className="text-xl text-center">Embark on your literary journey and discover new worlds through books</p>
            </div> */}
          </div>

          {/* Login Form Side */}
          <div className="md:w-2/5 py-12 px-6 md:px-10">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Login to Your Account</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input 
                  type="text" 
                  value={username} 
                  onChange={(e) => setusername(e.target.value)} 
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-800 focus:border-red-800 text-sm"
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-800 focus:border-red-800 text-sm"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-red-800 focus:ring-red-800 border-gray-300 rounded" />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-red-800 hover:text-red-800">
                    Forgot your password?
                  </a>
                </div>
              </div>
              <div>
                <button 
                  type="submit" 
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-800 hover:bg-red-00 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-800 transition duration-150 ease-in-out"
                >
                  Sign In
                </button>
              </div>
            </form>
            <p className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="/signup" className="font-medium text-red-800 hover:text-red-800">
                Sign up now
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
