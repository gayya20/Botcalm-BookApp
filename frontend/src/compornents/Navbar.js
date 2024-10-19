// src/components/Navbar.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user')); // Assuming you store user info in local storage
    if (userData) {
      setUsername(userData.username); // Set username from local storage
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken'); // Remove the token from local storage
    localStorage.removeItem('username'); // Remove user info from local storage
    navigate('/login'); // Redirect to the login page
  };

  const isAuthenticated = () => {
    return !!localStorage.getItem('accessToken'); // Check if the token exists
  };
  const un = localStorage.getItem('username'); // Retrieve token from local storage


  return (
<nav className="bg-white p-4 max-w-4xl mx-auto">
<div className="container mx-auto flex justify-between items-center">
        <div>
          <Link to="/" className="text-black font mr-4">Home</Link>
          <Link to="/books" className="text-black font mr-4">Books</Link>
        </div>
        <div className="flex items-center">
          {isAuthenticated() ? ( // Show username and sign out button if authenticated
            <>
              <span className="text-black font mr-4">Welcome, {un}!</span>
              <button 
                onClick={handleLogout} 
                className="text-red-600 font"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-black font mr-4">Login</Link>
              <Link to="/signup" className="text-black font">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
