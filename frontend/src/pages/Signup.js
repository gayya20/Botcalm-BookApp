import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import imge from '../compornents/bok6.jpg'

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/auth/register', { username, email, password })
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        console.error("Signup error", error);
      });
  };

  return (
    <div className="container mx-auto mt-16 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-xl overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row">
          {/* Image Side */}
          <div className="md:w-3/5 bg-cover bg-center h-80 md:h-auto" style={{backgroundImage: `url(${imge})`}}>
            {/* <div className="w-full h-full flex flex-col justify-center items-center backdrop-blur-sm bg-black bg-opacity-40 text-white p-12">
              <h2 className="text-4xl font-bold mb-6 text-center">Join BookExpress</h2>
              <p className="text-xl text-center">Start your literary journey and connect with book lovers around the world</p>
            </div> */}
          </div>

          {/* Signup Form Side */}
          <div className="md:w-2/5 py-8 px-6 md:px-10">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Create Your Account</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input 
                  type="text" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Choose a username"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Create a password"
                  required
                />
              </div>
              <div>
                <button 
                  type="submit" 
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-800 hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                >
                  Sign Up
                </button>
              </div>
            </form>
            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;