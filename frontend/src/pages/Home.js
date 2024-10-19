import React, { useState } from 'react';
import Footer from '../compornents/Footer';
import Login from '../pages/Login';  // Import your Login form component
import Signup from '../pages/Signup';  // Import your Signup form component (if available)

const Home = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setSignupModalOpen] = useState(false);

  // Function to open the login modal
  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  // Function to open the signup modal
  const openSignupModal = () => {
    setSignupModalOpen(true);
  };

  // Function to close both modals
  const closeModal = () => {
    setLoginModalOpen(false);
    setSignupModalOpen(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="max-w-[1350px] mx-auto mt-8 rounded-lg overflow-hidden" style={{ borderRadius: "20px" }}>
        <header className="relative bg-cover bg-center h-[500px]" style={{backgroundImage: "url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')"}}>
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <div className="relative container mx-auto px-6 py-16 h-full flex flex-col justify-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">Your Literary Journey Starts Here</h1>
            <p className="text-xl mb-8 text-gray-200">Discover, track, and share your reading adventures with BookExpress</p>
            <a href="#" onClick={openSignupModal} className="bg-red-800 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-900 transition duration-300 inline-block w-max">Get Started</a>
          </div>
        </header>
      </div>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Track Your Books</h2>
            <p className="text-gray-600">Easily manage your reading list and track your progress.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Discover New Titles</h2>
            <p className="text-gray-600">Explore curated lists and personalized recommendations.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Connect with Readers</h2>
            <p className="text-gray-600">Join a community of book lovers and share your thoughts.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-200">
        <div className="container mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-semibold mb-4">Ready to Embark on Your Reading Journey?</h2>
          <p className="text-xl text-gray-600 mb-8">Join thousands of readers who have already discovered the joy of BookExpress.</p>
          <a href="#" onClick={openLoginModal} className="bg-red-800 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-600 transition duration-300">Login</a>
        </div>
      </section>

      {/* Modals */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <button onClick={closeModal} className="text-gray-600 hover:text-gray-900 absolute top-3 right-3">&times;</button>
            <Login /> {/* Render the Login component */}
          </div>
        </div>
      )}

      {isSignupModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <button onClick={closeModal} className="text-gray-600 hover:text-gray-900 absolute top-3 right-3">&times;</button>
            <Signup /> {/* Render the Signup component */}
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
